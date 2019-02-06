const {app, BrowserWindow, ipcMain} = require('electron')
const {autoUpdater} = require("electron-updater")

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', function() {
  createWindow()
  autoUpdater.checkForUpdates()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
    autoUpdater.checkForUpdates()
  }
})

autoUpdater.on('update-downloaded', (info) => {
    mainWindow.webContents.send('updateReady')
})

ipcMain.on("quitAndInstall", (event, arg) => {
    autoUpdater.quitAndInstall()
})
