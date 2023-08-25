const { app, BrowserWindow } = require('electron')
const path = require('path')

const isDev = process.env.NODE_ENV !== 'production'
const isMac = process.platform !== 'darwin';

// Metodo para gerar a primeira janela
async function createWindow () {

  const port = 8080;

  const window = new BrowserWindow({
    width: 1200,
    height: 600,
    fullscreen : isDev? false : true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: isDev? true : false
    },
  })

  if(!isDev){
    window.setMenu(null);
  }
  
  if(isDev){
    window.webContents.openDevTools();
  }

  
  window.loadURL(`http://localhost:${port}`);
  window.show();
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