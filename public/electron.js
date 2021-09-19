// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require("electron");
const isDev = require("electron-is-dev");
//const Store = require("electron-store");
const path = require("path");
const url = require("url");

let window;

if (process.platform === "darwin") app.dock.hide();

function createWindow() {
  // Create the browser window.
  window = new BrowserWindow({
    width: 420,
    minWidth: 420,
    height: 560,
    minHeight: 560,
    show: true,
    frame: true,
    title: "Less Than Simple Initiative Tracker",
    fullscreenable: true,
    resizable: true,
    transparent: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "icosahedron.png"),
    nodeIntegration: false,
  });

  let menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(menu);

  window.on("closed", () => (mainWindow = null));

  // and load the index.html of the app.
  if (isDev) {
    window.loadURL("http://localhost:3000");
  } else {
    window.loadURL(
      url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  // Open the DevTools.
  //window.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//const store = new Store();
//store.set("userSettings.theme", "dark");
