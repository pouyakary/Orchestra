
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//


'use strict';

//
// ─── DEFS ───────────────────────────────────────────────────────────────────────
//

    const electron      = require( 'electron' );
    const app           = electron.app;
    const BrowserWindow = electron.BrowserWindow;
    const { ipcMain }   = require( 'electron' );

//
// ─── GENERATE MAIN WINDOW ───────────────────────────────────────────────────────
//

    let mainWindow;

    function createWindow ( ) {
        const window_width = 1100;
        const window_height = 640;
        mainWindow = new BrowserWindow({
            width:  window_width,   minWidth: window_width - 150,
            height: window_height,  minHeight: window_height - 100,
            backgroundColor: 'white',
            //frame: false,
            titleBarStyle: 'hidden-inset',
            fullscreen: false
        });

        // mainWindow.openDevTools( );
        mainWindow.maximize( );

        mainWindow.loadURL( 'file://' + __dirname + '/index.html' );

        mainWindow.on( 'closed' , function( ) {
            mainWindow = null;
            app.quit( );
        });
    }

//
// ─── ON WINDOW CLOSE STATUS ─────────────────────────────────────────────────────
//

    ipcMain.on( 'window-status', ( event, arg ) => {
        if ( arg === 'close' ) {
            mainWindow = null;
            app.quit( );
        }
    });

//
// ─── ON READY ───────────────────────────────────────────────────────────────────
//

    app.on( 'ready' , createWindow );

// ────────────────────────────────────────────────────────────────────────────────
