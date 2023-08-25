const { app, BrowserWindow } = require('electron')
const path = require('path')


const isMac = process.platform !== 'darwin';

// Metodo para gerar a primeira janela
async function createWindow () {

  const port = 8080;

  const window = new BrowserWindow({
    width: 800,
    height: 600,
    // fullscreen : true,                   IS DEV!
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // devTools: false                   IS DEV!
    },
  })

  //window.setMenu(null)
  window.show();

  window.loadURL(`http://localhost:${port}`);
}

// Metodo chamado depois que o app foi devidamente carregado
app.whenReady().then(async () => {
  await createWindow()

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