
# Building Orchestra

## 1. Configure your system
In order to build orchestra you have to first have the right developers tools. You must have [Node.js](https://nodejs.org/en/) installed. Following you must clone this repo and then in the root folder run:

```
npm run configure
```

Then you should install the libraries we need:

```
npm install
```

## 2. Building for your platform:

Currently we support building for macOS and Linux. You can simply run these commands to get the job done:

```
npm run build-mac
```

Or

```
npm run build-linux
```

Build files go into two folders: `_installers` and `_release` where the release is the built app and installers contain the installer for the built app