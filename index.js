import { ipcMain } from 'electron';
import { app, BrowserWindow } from 'electron/main';

ipcMain.handle('show-help-dialog', () => {
  const helpWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    }
  });
  helpWindow.loadFile('help.html');
});

function createWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 700,
    webPreferences: {
      preload: '/Users/amrithesh/Documents/electron/custom-gpt/preload.js',
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    }
  })

  win.loadFile('index.html');
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})