import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import * as path from 'path'

import messageServices, { IMessage } from './services/message-services'

function handleCreateMessage(_event: IpcMainEvent, data: IMessage) {
  return messageServices.create(data)
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
  ipcMain.on('createMessage', handleCreateMessage)

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
