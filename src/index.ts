import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

import messageServices from './services/message-services'

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
  ipcMain.handle('getMessages', () => messageServices.getMesssages())

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
