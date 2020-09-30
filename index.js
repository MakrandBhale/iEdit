var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
var mainWindow = null;
var fs = require('fs');

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});


app.on('ready',function(){
    mainWindow = new BrowserWindow({
        width : 1150,
        height : 700,
        //frame: false
          
    });
    
    mainWindow.openDevTools();
    mainWindow.loadURL('file://'+ __dirname +'/index.html');
    
   
})