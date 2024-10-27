import * as path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'

import messageControllers from './controllers/message-controller'

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
  ipcMain.handle('getMessage', messageControllers.getById)
  ipcMain.handle('getMessages', messageControllers.getAll)

  ipcMain.on('createMessage', messageControllers.create)
  ipcMain.on('editMessage', messageControllers.edit)
  ipcMain.on('removeMessage', messageControllers.remove)

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
