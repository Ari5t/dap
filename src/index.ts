import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import * as path from 'path'

import messageServices, { IMessage } from './services/message-services'

function handleCreateMessage(_event: IpcMainEvent, data: IMessage) {
  return messageServices.create(data)
}

function handleEditMessage(_event: IpcMainEvent, data: IMessage) {
  return messageServices.edit(data)
}

function handleRemoveMessage(_event: IpcMainEvent, id: string) {
  return messageServices.remove(id)
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: true,
    },
  })

  mainWindow.webContents.openDevTools()
  mainWindow.loadFile(path.join(__dirname, '../src/pages/index.html'))
}

app.whenReady().then(() => {
  ipcMain.handle('getMessages', () => messageServices.getAll())
  ipcMain.handle('getMessage', (_e, id: string) => messageServices.getById(id))
  ipcMain.on('createMessage', handleCreateMessage)
  ipcMain.on('editMessage', handleEditMessage)
  ipcMain.on('removeMessage', handleRemoveMessage)

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
