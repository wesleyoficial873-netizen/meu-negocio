export type LyricLine = {time:number;text:string};
/** Parses standard LRC timestamps, including multiple timestamps per line and offsets. */
export function parseLyrics(raw:string):{synced:boolean;lines:LyricLine[]} {
 const offsetMatch=raw.match(/^\[offset:([+-]?\d+)\]/im);
 const offset=offsetMatch?Number(offsetMatch[1])/1000:0;
 const lines:LyricLine[]=[];
 for(const line of raw.replace(/^\uFEFF/,'').split(/\r?\n/)){
   const stamps=[...line.matchAll(/\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g)];
   const text=line.replace(/\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g,'').trim();
   for(const stamp of stamps){const seconds=Number(stamp[1])*60+Number(stamp[2])+Number('0.'+(stamp[3]||'0'));if(text)lines.push({time:Math.max(0,seconds+offset),text})}
 }
 if(lines.length)return {synced:true,lines:lines.sort((a,b)=>a.time-b.time)};
 return {synced:false,lines:raw.split(/\r?\n/).filter(line=>!/^\[[a-z]+:.*\]$/i.test(line.trim())).map(text=>({time:0,text}))};
}
