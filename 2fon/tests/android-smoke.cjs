// Android WebView functional smoke test over its debugging protocol.
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
async function main() {
 let targets,lastError;
 for(let i=0;i<60;i++) { try { targets=await (await fetch('http://127.0.0.1:9222/json')).json(); if(targets.length)break; } catch (e) {lastError=e.message} await wait(1000); }
 if(!targets?.length) throw new Error('WebView debugging target not found: '+(lastError||JSON.stringify(targets)));
 const ws=new WebSocket(targets[0].webSocketDebuggerUrl); await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
 let id=0; const pending=new Map();
 ws.onmessage=e=>{const msg=JSON.parse(e.data);if(msg.id&&pending.has(msg.id)){const {resolve,reject}=pending.get(msg.id);pending.delete(msg.id);msg.error?reject(new Error(msg.error.message)):resolve(msg.result)}};
 const call=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;const timer=setTimeout(()=>{pending.delete(n);reject(new Error('CDP timeout: '+method))},15000);pending.set(n,{resolve:v=>{clearTimeout(timer);resolve(v)},reject:e=>{clearTimeout(timer);reject(e)}});ws.send(JSON.stringify({id:n,method,params}))});
 const evaljs=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.text);return r.result.value};
 const until=async(expr,label)=>{for(let i=0;i<60;i++){if(await evaljs(expr))return;await wait(1000)}throw new Error('Timeout: '+label)};
 const click=async selector=>{const rect=await evaljs(`(()=>{const e=document.querySelector(${JSON.stringify(selector)});if(!e)return null;e.scrollIntoView({block:'center'});let r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()`);if(!rect)throw new Error('Element not found: '+selector);await call('Input.dispatchMouseEvent',{type:'mousePressed',x:rect.x,y:rect.y,button:'left',clickCount:1});await call('Input.dispatchMouseEvent',{type:'mouseReleased',x:rect.x,y:rect.y,button:'left',clickCount:1})};
 await until("[...document.querySelectorAll('button')].some(b=>b.textContent.includes('Sincronizar celular'))",'sync control');
 await click('.quick-actions > button:last-child');
 await until("[...document.querySelectorAll('.track-title strong')].some(e=>e.textContent.includes('2fon-test'))",'device music import');
 await click('.track-title');
 await until("!!document.querySelector('.np-screen') && document.querySelector('audio') && !document.querySelector('audio').paused",'player and playback');
 await click('.np-tools button:first-child');
 await click('.lyrics-head > button');
 await until("!!document.querySelector('.lyrics-edit textarea')",'lyrics editor');
 await evaljs(`(()=>{let e=document.querySelector('.lyrics-edit textarea');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(e,'[00:00.00]Primeira linha\\n[00:05.00]Segunda linha');e.dispatchEvent(new Event('input',{bubbles:true}));})()`);
 await click('.lyrics-save');
 await until("document.querySelector('.lyrics-lines')?.innerText.includes('Primeira linha')",'synced lyrics');
 console.log('Android 16: media import, player playback and LRC editor OK'); ws.close();
}
main().catch(e=>{console.error('::error title=Android functional test::'+e.message);process.exit(1)});
