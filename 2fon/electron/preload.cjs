const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('twofon',{selectFolder:()=>ipcRenderer.invoke('select-folder')});
