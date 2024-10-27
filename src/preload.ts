import { contextBridge, ipcRenderer } from 'electron'
import type { IMessage } from './services/message-services'

contextBridge.exposeInMainWorld('storages', {
  messages: () => ipcRenderer.invoke('getMessages'),
  message: (id: string) => ipcRenderer.invoke('getMessage', id),
  createMessage: (message: IMessage) =>
    ipcRenderer.send('createMessage', message),
  editMessage: (message: IMessage) => ipcRenderer.send('editMessage', message),
  removeMessage: (id: string) => ipcRenderer.send('removeMessage', id),
})
