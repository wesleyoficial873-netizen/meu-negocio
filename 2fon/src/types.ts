export type Track={id:string;title:string;artist:string;album:string;duration:number;cover:string;format:string;folder:string;url?:string;path?:string};
export type Playlist={id:string;name:string;trackIds:string[]};
export type State={tracks:Track[];playlists:Playlist[];favorites:string[];history:string[];folders:string[];volume:number;eq:[number,number,number]};
declare global {interface Window {twofon?:{selectFolder:()=>Promise<{folder:string;tracks:Track[]}|null>}}}
