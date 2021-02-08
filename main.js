const { app, BrowserWindow } = require('electron');
const path = require('path');
const { windowsStore } = require('process');

let mainWindow;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function createWindow () {
    mainWindow = new BrowserWindow({
    title:"Flix Client",
    icon: path.join(__dirname, "/assets/img/favicon.png"),
    width: 1280,
    height: 720,
    frame: false,
    show: false,
    resizable: false,
    webPreferences: {
        preload: path.join(__dirname, "/assets/scripts/preload.js"),
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        titleBarStyle: "hiddenInset",
        worldSafeExecuteJavaScript: true
    },

    backgroundColor: '#2c3338'
    
  })

    splash = new BrowserWindow({width: 325, height: 400, transparent: true, frame: false, alwaysOnTop: true, webPreferences:{ contextIsolation: false }});
    splash.loadFile(path.join(__dirname, 'assets/html/splash.html'));
    splash.setSkipTaskbar(true)
    mainWindow.loadFile(path.join(__dirname, 'assets/html/index.html'));



    mainWindow.on('closed', () => {
        mainWindow = null
    });

    mainWindow.once('ready-to-show', () => {
        sleep(750)
        splash.destroy();
        mainWindow.show();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        mainWindow.destroy()
        app.quit()
    }
});

