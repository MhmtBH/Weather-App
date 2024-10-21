const { app, BrowserWindow, ipcMain, shell } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: (1080 + 16),
        height: (630 + 39),
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: __dirname + '/preload.js'
        }
    })

    win.loadFile("index.html")
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

ipcMain.on('open-external', (event, url) => {
    shell.openExternal(url);
});