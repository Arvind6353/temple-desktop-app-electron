
var mainWindow = null;
var splashScreenWindow=null;
 var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});


function createSplashScreen() {
  splashScreenWindow = new BrowserWindow({ width: 400, height: 150, resizable: false, frame: false,
                                           webPreferences: { nodeIntegration: false, alwaysOnTop: true } });
  splashScreenWindow.setMenu(null);
  splashScreenWindow.loadURL('file://' + __dirname + '/scripts/home/splash.html');

  splashScreenWindow.on('closed', function() {
    splashScreenWindow = null;
  });
}


function initializeApp() {
  createSplashScreen();
  
  setTimeout(function(){

    createMainWindow();    
  },3000);
  
  
}

app.on('ready', initializeApp);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
 function createMainWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 800 });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the devtools.
  // mainWindow.openDevTools();

 if (splashScreenWindow !== null) {
      splashScreenWindow.close();
    }

    mainWindow.maximize();
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });




mainWindow.on('ready-to-show', function() {
    if (splashScreenWindow !== null) {
      splashScreenWindow.close();
    }
  });


};