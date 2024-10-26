import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('storages', {
  messages: () => ipcRenderer.invoke('getMessages')
})
