# benchpsu
A benchPSU calibration and controll application

install nodejs

set the npm mirror
```bash
npm config set registry https://registry.npm.taobao.org
```
###Problems with windows, node-gyp

  refer to node-gyp [Readme](https://github.com/nodejs/node-gyp/blob/master/README.md)

  FIRST of ALL, before install Visual Studio 2015, if using Windows 7, install Windows SDK 7.1(before this, you may need to install .Net Framework 4.0)
  
  For 64-bit builds of node and native modules you will also need the [Windows 7 64-bit SDK](https://www.microsoft.com/en-us/download/details.aspx?id=8279)

  install Visual Studio 2015 Community, with Visual C++ 2015, SDK

  You may need to run one of the following commands if your build complains about WindowsSDKDir not being set, and you are sure you have already installed the SDK:
```bash
call "C:\Program Files\Microsoft SDKs\Windows\v7.1\bin\Setenv.cmd" /Release /x86
```
or
```bash
call "C:\Program Files\Microsoft SDKs\Windows\v7.1\bin\Setenv.cmd" /Release /x64
```

install python 2.7, set environment variable PYTHON to C:\Python27\python.exe, not to a folder C:\Python27\

Set the environment variable GYP_MSVS_VERSION=2015

Run the command prompt as Administrator

###Any problems about serialport(nodejs), refer to this [issue](https://github.com/voodootikigod/node-serialport/issues/538#issuecomment-184251385)
```bash
npm run clean (delete node_module in windows)
```
```bash
npm install
```

###it may fail due to the bad network when download electron-prebuilt, you can run
```bash
cd ~/.electron
wget https://github.com/electron/electron/releases/download/v1.2.0/electron-v1.2.0-darwin-x64.zip
```

```bash
rm ./node_module/serialport/build/Release/serialport.node
```
```bash
npm run rebuild-serialport
```

```bash
npm start
```
or use vscode debug

if electron path.txt not found

go to ./node_modules/electron-prebuilt/
```bash
cd node_modules/electron-prebuilt/
node install.js
```

note: if in windows 7, modify ./.vscode/launch.json
```json
"runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron",
```
with
```json
"runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron.cmd",
```

using node-usb


    in windows, node-usb need VS2013 instead of VS2015 to compile. don't forget Set the environment variable GYP_MSVS_VERSION=2013
    make sure install node the same version as electron use, for example, electron v1.2.0 use nodejs 6.1.0
```bash
Instead of using electron-rebuild (which couldn't get to work with node-usb's use of node-pre-gyp), use node-gyp directly:

$ npm install node-gyp --save-dev
First you need to change the variables property in the node_modules/usb/binding.gyp to include module_name and module_path:

  'variables': {
    'use_udev%': 1,
    'use_system_libusb%': 'false',
    'module_name': 'usb_bindings',
    'module_path': './src/binding'
  },
Then, rebuild with node-gyp:

$ cd node_modules/usb
$ ../.bin/node-gyp rebuild --target=1.2.0 --arch=x64 --dist-url=https://atom.io/download/atom-shell

The --target flag for the last command specifies the version of electron you are building for and must be set accordingly.
You can get your version by typing the command electron -v.
```