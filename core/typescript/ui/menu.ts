
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.menu {

    //
    // ─── MENU ───────────────────────────────────────────────────────────────────────
    //

        var MainMenu = [

            //
            // ─── FILE ────────────────────────────────────────────────────────
            //

                {
                    label: 'File',
                    submenu: [
                        {
                            label: 'New File',
                            accelerator: 'CmdOrCtrl+N',
                            click: dialogs.onNewFile
                        },
                        {
                            label: 'New Window',
                            accelerator: 'Shift+CmdOrCtrl+N',
                            click: openNewWindow
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Open...',
                            accelerator: 'CmdOrCtrl+O',
                            click: dialogs.onOpenFile
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Save',
                            accelerator: 'CmdOrCtrl+S',
                            click: ( ) => dialogs.onSaveFile( )
                        },
                        {
                            label: 'Save As',
                            accelerator: 'Shift+CmdOrCtrl+S',
                            click: dialogs.onSaveFileAs
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Export to SVG',
                            accelerator: 'CmdOrCtrl+E',
                            click: dialogs.onExportWorkspaceToSVG
                        },
                    ]
                },

            //
            // ─── EDIT MENU ───────────────────────────────────────────────────
            //

                {
                    label: 'Edit',
                    submenu: [
                        {
                            label: 'Undo',
                            accelerator: 'CmdOrCtrl+Z',
                            role: 'undo'
                        },
                        {
                            label: 'Redo',
                            accelerator: 'Shift+CmdOrCtrl+Z',
                            role: 'redo'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: 'Cut',
                            accelerator: 'CmdOrCtrl+X',
                            role: 'cut'
                        },
                        {
                            label: 'Copy',
                            accelerator: 'CmdOrCtrl+C',
                            role: 'copy'
                        },
                        {
                            label: 'Paste',
                            accelerator: 'CmdOrCtrl+V',
                            role: 'paste'
                        },
                        {
                            label: 'Select All',
                            accelerator: 'CmdOrCtrl+A',
                            role: 'selectall'
                        }
                    ]
                },

            //
            // ─── WINDOW MENU ────────────────────────────────────────────────────────────────
            //

                {
                    label: 'Window',
                    role: 'window',
                    submenu: [
                        {
                            role: 'minimize'
                        },
                        {
                            role: 'togglefullscreen'
                        },
                        {
                            role: 'close'
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: "Open Developer Tools",
                            click: externals.orchestraWindow.openDevTools
                        }
                    ]
                },

            //
            // ─── HELP MENU ──────────────────────────────────────────────────────────────────
            //

                {
                    label: 'Help',
                    role: 'help',
                    submenu: [
                        {
                            label: "Quartet Language's Reference (Offline)",
                            click: onOpenHelpPage
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: "RegExp on ECMA-262 Edition 6.0 (June 2015)",
                            click: ( ) => externals.openExternal('http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-regular-expression-objects')
                        },
                        {
                            label: "RegExp on Mozilla Developer Network",
                            click: ( ) => externals.openExternal('https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp')
                        },
                        {
                            type: 'separator'
                        },
                        {
                            label: "Kary Foundation's Website",
                            click: ( ) => externals.openExternal('https://www.karyfoundation.org/')
                        },
                        {
                            label: "Report an issue...",
                            click: ( ) => externals.openExternal('https://github.com/karyfoundation/orchestra/issues')
                        },
                        {
                            label: "Orchestra and Quartet on GitHub",
                            click: ( ) => externals.openExternal('https://github.com/karyfoundation/orchestra')
                        },
                    ]
                },

            // ────────────────────────────────────────────────────────────────────────────────

        ];

    //
    // ─── OS SPECIFIC MENUS ──────────────────────────────────────────────────────────
    //

        var AboutPageButton = {
            label: 'About Orchestra',
            click: openAboutPage
        }

        if ( process.platform == 'darwin' ) {
            var name = require( 'electron' ).remote.app.getName( )
            var menuIndex = MainMenu.length - 1
            MainMenu.unshift( <any> {
                label: name,
                submenu: [
                    AboutPageButton,
                    {
                        type: 'separator'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Hide ' + name,
                        accelerator: 'Command+H',
                        role: 'hide'
                    },
                    {
                        label: 'Hide Others',
                        accelerator: 'Command+Alt+H',
                        role: 'hideothers'
                    },
                    {
                        label: 'Show All',
                        role: 'unhide'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Quit',
                        accelerator: 'Command+Q',
                        click: fireAppQuitRequest
                    }
                ]})
        } else {
            ( <any> MainMenu[ menuIndex ] ).submenu.push( AboutPageButton )
        }

    //
    // ─── INIT MENU ──────────────────────────────────────────────────────────────────
    //

        export function initMainMenu ( ) {
            const remote = require('electron').remote;
            const Menu = remote.Menu;
            const MenuItem = remote.MenuItem;

            storage.OrchestraAppMenu = new Menu( );

            storage.OrchestraAppMenu = Menu.buildFromTemplate([ MainMenu ]);
            Menu.setApplicationMenu( storage.OrchestraAppMenu );
        }

    //
    // ─── ON MENU DISABLE ────────────────────────────────────────────────────────────
    //

        export function setMenuEnableFactor ( control ) {
            for ( let menuIndex = 0; menuIndex < storage.OrchestraAppMenu.items.length; menuIndex++ ) {
                let submenu = storage.OrchestraAppMenu.items[ menuIndex ].submenu.items;
                for ( let submenuIndex = 0; submenuIndex < submenu.length; submenuIndex++ )
                    submenu[ submenuIndex ].enabled = control;
            }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}