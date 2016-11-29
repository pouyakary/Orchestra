
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

'use strict'

//
// ─── DEFS ───────────────────────────────────────────────────────────────────────
//

    const electron                          = require( 'electron' )
    const { ipcMain, BrowserWindow, app }   = require( 'electron' )
    const messenger                         = require( 'messenger' )
    const fs                                = require( 'fs' )
    const path                              = require( 'path' )

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const uniqueWindowIdKey = 'orchestra-unique-window-id'

    const orchestraVersion = '1.0'
    const quartetVersion = '1.2'

//
// ─── STORAGE ────────────────────────────────────────────────────────────────────
//

    let windowCount = 0
    let isHelpWindowOpen = false
    let isAboutWindowOpen = false
    let helpWindow

//
// ─── HELPER TOOLS ───────────────────────────────────────────────────────────────
//

    function existsSync ( filename ) {
        try {
            fs.accessSync( filename )
            return true
        } catch ( ex ) {
            return false
        }
    }

//
// ─── GENERATE MAIN WINDOW ───────────────────────────────────────────────────────
//

    function createWindow ( args = { mode: 'start' } ) {
        let editorWindow
        windowCount++

        const window_width = 1100
        const window_height = 640
        editorWindow = new BrowserWindow({
            show: false,
            width:  window_width,   minWidth: window_width - 150,
            height: window_height,  minHeight: window_height - 100,
            backgroundColor: '#F7F7F7',
            frame: false,
            fullscreen: false,
        })

        editorWindow.maximize( )
        editorWindow.setMenuBarVisibility( false )
        //editorWindow.openDevTools( )


        if ( args.mode === 'file' )
            editorWindow.loadURL( `file://${ __dirname }/index.html?${
                encodeURI(JSON.stringify({
                    file: args.file
                }))}`)

        else if ( args.mode === 'parse' )
            editorWindow.loadURL( `file://${ __dirname }/index.html?${
                encodeURI(JSON.stringify({
                    regexp: args.regexp
                }))}`)

        else
            editorWindow.loadURL( `file://${ __dirname }/index.html?{}` )



        editorWindow.once( 'ready-to-show', ( ) => {
            editorWindow.show( )
            editorWindow.focus( )
        })

        // editorWindow.openDevTools( );

        editorWindow.on( 'closed' , ( ) => {
            windowCount--
        })
    }

//
// ─── OPEN HELP WINDOW ───────────────────────────────────────────────────────────
//

    function openHelpWindow ( arg = '' ) {
        if ( isHelpWindowOpen ) return
        isHelpWindowOpen = true

        helpWindow = new BrowserWindow({
            title: "Quartet's Block Reference",
            width:  1050, minWidth: 1050,
            height: 600, minHeight: 200,
            backgroundColor: 'white',
            fullscreen: false,
        })

        helpWindow.openDevTools( )

        if ( arg === '' )
            helpWindow.loadURL( `file://${ __dirname }/help/index.html?none` )
        else
            helpWindow.loadURL( `file://${ __dirname }/help/index.html?ref-${ arg }` )

        helpWindow.on( 'closed' , ( ) => {
            isHelpWindowOpen = false
            helpWindow = null
        })
    }

//
// ─── OPEN ABOUT PAGE ────────────────────────────────────────────────────────────
//

    function openAboutWindow ( ) {
        if ( isAboutWindowOpen ) return
        isAboutWindowOpen = true

        let aboutWindow = new BrowserWindow({
            title: 'About Orchestra',
            width: 650, minWidth: 650, maxWidth: 650,
            height: 410, minHeight: 410, maxHeight: 410,
            backgroundColor: '#ECECEC',
            minimizable: false,
            maximizable: false,
            resizable: false
            //show: false
        })

        aboutWindow.loadURL( `file://${ __dirname }/about/index.html?ov=${ orchestraVersion }&qv=${ quartetVersion }` )

        /*aboutWindow.once( 'ready-to-show', ( ) => {
            aboutWindow.show( )
        });*/

        aboutWindow.on( 'closed' , ( ) => {
            isAboutWindowOpen = false
            aboutWindow = null
        })
    }

//
// ─── SINGE INSTANCE APP ─────────────────────────────────────────────────────────
//

    const mustQuit = app.makeSingleInstance(( argv, workingDir ) => {
        createWindow( parseArgs( argv ) )
    })

    if ( mustQuit ) app.quit( )

//
// ─── ON READY ───────────────────────────────────────────────────────────────────
//

    app.on( 'ready' , ( ) => {
        console.log(`Orchestra, Version ${ orchestraVersion }`)
        console.log('Copyright 2016 - Kary Foundation, Inc.')

        // runExtensionServer( )
        createWindow( parseArgs( process.argv ) )
    })

//
// ─── ON OPEN FILE EVENT ─────────────────────────────────────────────────────────
//

    app.on( 'open-file', ( event, filePath ) => {
        event.preventDefault( )
        createWindow({ mode: 'file', file: filePath })
    })

//
// ─── ON OPEN HELP WINDOW ────────────────────────────────────────────────────────
//

    ipcMain.on ( 'open-help-page', ( event, arg ) => openHelpWindow ( ))

//
// ─── OPEN HELP FOR REFERENCE ────────────────────────────────────────────────────
//

    ipcMain.on ( 'open-help-for-ref', ( event, arg ) => {
        if ( isHelpWindowOpen ) {
            helpWindow.focus( )
            helpWindow.webContents.send( 'help-window-open-ref', `ref-${ arg }` )
        } else
            openHelpWindow( arg )
    })

//
// ─── ON WINDOW ASKS ─────────────────────────────────────────────────────────────
//

    ipcMain.on( 'open-new-window', ( event, arg ) => createWindow( ) )

//
// ─── OPEN ABOUT PAGE ────────────────────────────────────────────────────────────
//

    ipcMain.on( 'open-about-page', ( event, arg ) => openAboutWindow( ) )

//
// ─── ON APP QUIT REQUEST ────────────────────────────────────────────────────────
//

    ipcMain.on( 'app-quit', ( event, arg ) => app.quit( ) )

//
// ─── QUIT APP ON WINDOWS CLOSE ──────────────────────────────────────────────────
//

    app.on( 'window-all-closed', ( e, win ) => {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if ( process.platform !== 'darwin' )
            app.quit( )
    })

//
// ─── ON ACTIVE ──────────────────────────────────────────────────────────────────
//

    app.on( 'activate', ( ) => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if ( windowCount === 0 )
            createWindow( )
    });

//
// ─── PARSE ARGS ─────────────────────────────────────────────────────────────────
//

    function parseArgs ( args ) {
        if ( args.length === 2 )
            if ( args[ 1 ].endsWith( '.quartet' ) )
                return {
                    mode: 'file',
                    file: args[ 1 ]
                }
        if ( args.length === 3 )
            if ( args[ 1 ] === 'parse' )
                return {
                    mode: 'parse',
                    regexp: args[ 2 ]
                }
        return { mode: 'start' }
    }

//
// ─── EXTENSION SERVER ───────────────────────────────────────────────────────────
//

    function runExtensionServer ( ) {

        //
        // ─── CREATE SERVER ───────────────────────────────────────────────
        //

            const extensionServer = messenger.createListener( 5994 )

        //
        // ─── ON OPEN ORCHESTRA FOR A REGEX ───────────────────────────────
        //

            extensionServer.on( 'open', ( message, regX ) => {
                if ( regX !== null || regX !== undefined )
                    if ( existsSync( regX ) )
                        createWindow({ mode: 'parse', regexp: regX })
                    else
                        message.reply( '404' )
                else
                    createWindow( )
            })

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
