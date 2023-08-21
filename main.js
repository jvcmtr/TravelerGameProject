const { app, BrowserWindow } = require('electron')
const path = require('path')

const isMac = process.platform !== 'darwin';

// Metodo para gerar a primeira janela
function createWindow () {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    }
  })

  window.show();

  window.loadURL('http://localhost:8080');
  //window.loadFile(path.join(__dirname, './viteProcess/index.html'))
}

// Metodo chamado depois que o app foi devidamente carregado
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Configuração para mac
app.on('window-all-closed', () => {
  if (isMac) {
    app.quit()
  }
})