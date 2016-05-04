# benchpsu
A benchPSU calibration and controll application

install nodejs

set the npm mirror
```bash
npm config set registry https://registry.npm.taobao.org
```
###Problems with windows, node-gyp

  refer to node-gyp [Readme](https://github.com/nodejs/node-gyp/blob/master/README.md)

  install Visual Studio 2015 Community, with Visual C++ 2015, SDK

  For 64-bit builds of node and native modules you will also need the [Windows 7 64-bit SDK](https://www.microsoft.com/en-us/download/details.aspx?id=8279)

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
```bash
rm ./node_module/serialport/build/Release/serialport.node
```
```bash
npm run electron-rebuild
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
