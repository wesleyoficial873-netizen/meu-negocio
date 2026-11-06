const {app, BrowserWindow, dialog, ipcMain, protocol, net} = require('electron');
const path = require('path');
const fs = require('fs/promises');
const {pathToFileURL} = require('url');
protocol.registerSchemesAsPrivileged([{scheme:'twophon',privileges:{standard:true,secure:true,supportFetchAPI:true,stream:true,corsEnabled:true}}]);
const extensions = new Set(['.mp3','.wav','.flac','.aac','.m4a','.ogg']);
async function scan(dir, files=[]) {
  let entries; try { entries = await fs.readdir(dir,{withFileTypes:true}); } catch { return files; }
  for (const entry of entries) { const p=path.join(dir,entry.name); if(entry.isDirectory()) await scan(p,files); else if(entry.isFile() && extensions.has(path.extname(entry.name).toLowerCase())) files.push(p); }
  return files;
}
async function readTracks(folder){
 const {parseFile} = await import('music-metadata');
 const files=await scan(folder);
 return Promise.all(files.map(async file => {
  let common={}, format={}; try { ({common,format}=await parseFile(file,{duration:true})); } catch {}
  const picture=common.picture?.[0];
  let lyrics=common.lyrics?.find(item=>item.text)?.text || ""; try { lyrics=await fs.readFile(file.slice(0,-path.extname(file).length)+".lrc","utf8"); } catch {}
  return {id:'file:'+file, path:file, folder, url:'twophon://local/audio?path='+encodeURIComponent(file), title:common.title || path.basename(file,path.extname(file)), artist:common.artist || 'Artista desconhecido', album:common.album || 'Álbum desconhecido', duration:format.duration || 0, cover:picture ? `data:${picture.format};base64,${Buffer.from(picture.data).toString('base64')}` : '', lyrics, format:path.extname(file).slice(1).toUpperCase()};
 }));
}
app.whenReady().then(()=>{
 protocol.handle('twophon', async request => {const u=new URL(request.url); if(u.hostname!=='local'||u.pathname!=='/audio') return new Response('Not found',{status:404}); const file=u.searchParams.get('path'); if(!file || !extensions.has(path.extname(file).toLowerCase())) return new Response('Forbidden',{status:403}); const response=await net.fetch(pathToFileURL(file).toString(),{headers:request.headers}); const headers=new Headers(response.headers); headers.set('Access-Control-Allow-Origin','*'); return new Response(response.body,{status:response.status,statusText:response.statusText,headers});});
 ipcMain.handle('select-folder',async()=>{const result=await dialog.showOpenDialog({properties:['openDirectory']}); if(result.canceled) return null; const folder=result.filePaths[0]; return {folder,tracks:await readTracks(folder)};});
 const win=new BrowserWindow({width:1440,height:900,minWidth:720,minHeight:600,backgroundColor:'#090a09',title:'2FON',autoHideMenuBar:true,webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false}});
 win.loadFile(path.join(__dirname,'../dist/index.html'));
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin') app.quit();});
