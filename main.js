const electron = require('electron');
const usb = require('usb');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let usbList = usb.getDeviceList();
let usbdev;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ 
    width: 1200, 
    height: 800,
    resizable: true,
    frame: true
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/app/mainWindow.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  usbList.forEach( (dev) => {
    console.log('VID: ', dev.deviceDescriptor.idVendor, 'PID: ', dev.deviceDescriptor.idProduct);
    // console.log(dev.deviceDescriptor);
  });
  // usbdev = usb.findByIds(0x0403,0x6001);  // for ft232
  // usbdev = usb.findByIds(0x1A86,0x7523);  // for ch340
  usbdev = usb.findByIds(0x0483,0x374B);  // for nucleo
  if(usbdev!==undefined){
    console.log('VID: ', usbdev.deviceDescriptor.idVendor, 'PID: ', usbdev.deviceDescriptor.idProduct);
    console.log('deviceDescriptor: ', usbdev.deviceDescriptor);
    console.log('configDescriptor: ', usbdev.configDescriptor);
    usbdev.open();
    let iface = usbdev.interfaces[0]
    if(iface!==undefined){
      // iface.claim();
      inEndpoint = iface.endpoints[0];
      outEndpoint = iface.endpoints[1];
      inEndpoint.transferType = 2;
      inEndpoint.transfer(64, function (error, data) {
          if (!error) {
              console.log(data);
          } else {
              console.log(error);
          }
      });
      inEndpoint.on('data', function (data) {
          console.log(data);
      });
      inEndpoint.on('error', function (error) {
          console.log(error);
      });
      outEndpoint.transferType = 2;
      outEndpoint.transfer(new Buffer('d\n'), function (err) {
          console.log(err);
      });
    }
    // usbdev.close();
    // usbdev.getStringDescriptor(usbdev.deviceDescriptor.iManufacturer, (e, s)=>{
    //   if (e===undefined) {
    //     console.log(s);
    //   } else {
    //     console.log(e);
    //   }
    // });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
