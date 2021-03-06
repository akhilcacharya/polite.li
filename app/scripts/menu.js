'use strict';

const app = require('app');
const path = require('path');
const dialog = require('dialog');
const session = require('electron').session; 
const NativeImage = require('native-image');


const appName = app.getName();
const template = [{
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function(item, focusedWindow) {
      if (focusedWindow)
      focusedWindow.reload();
    }
  }, {
    label: 'Toggle Full Screen',
    accelerator: (function() {
      if (process.platform == 'darwin')
      return 'Ctrl+Command+F';
      else
      return 'F11';
    })(),
    click: function(item, focusedWindow) {
      if (focusedWindow)
      focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: (function() {
      if (process.platform == 'darwin')
      return 'Alt+Command+I';
      else
      return 'Ctrl+Shift+I';
    })(),
    click: function(item, focusedWindow) {
      if (focusedWindow)
      focusedWindow.toggleDevTools();
    }
  },
]}, {
  label: 'Window',
  role: 'window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  },
]}, 
];

var darwinMenu = [{
  label: appName,
  submenu: [{
    label: 'About ' + app.getName(),
    click: function(item, focusedWindow) {
      var file = path.resolve(__dirname, 'assets/epp.png');
      var appIcon = NativeImage.createFromPath(file);
      dialog.showMessageBox(focusedWindow, {
        'type': 'info',
        'title': app.getName(),
        'message': app.getName() + ' ' + app.getVersion(),
        'icon': appIcon,
        'buttons': ['ok']
      });
    }
  }, {
    type: 'separator'
  },   
  {
    label: 'Logout',
    selector: 'logout:', 
    click(item, focusedWindow){
      const contents = focusedWindow.webContents; 
      session.defaultSession.clearStorageData(() => {
        //Clear local storage token in the window
        contents.executeJavaScript(`localStorage.clear()`); 
        //Force reload the page to commit. 
        contents.reload(); 
      }); 
    }
  }, 
   {
    type: 'separator'
  }, {
    label: 'Quit',
    accelerator: 'Cmd+Q',
    click() {
      app.quit();
    }
  }]
}]

var menu = template;
if (process.platform == 'darwin') {
  menu = darwinMenu.concat(template)
}

module.exports = menu;
