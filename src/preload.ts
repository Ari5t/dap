import { contextBridge, ipcRenderer } from 'electron'
import type { IMessage } from './services/message-services'

contextBridge.exposeInMainWorld('storages', {
  messages: () => ipcRenderer.invoke('getMessages'),
  createMessage: (message: IMessage) =>
    ipcRenderer.send('createMessage', message),
  removeMessage: (message: IMessage) =>
    ipcRenderer.send('removeMessage', message),
})
