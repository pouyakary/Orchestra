
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra {

    //
    // ─── INIT WINDOW ────────────────────────────────────────────────────────────────
    //

        export function initWindow ( ) {
            orchestra.quartet.setupWorkspace( );
            dialogs.onNewFile( );
            menu.initMainMenu( );
            menu.setMenuEnableFactor( true );
            trafficlights.appendTrafficLightEvents( );
        }

    //
    // ─── CHOOSE RANDOMLY FROM ARRAY ─────────────────────────────────────────────────
    //

        export function chooseRandom ( arr ) {
            return arr[ Math.floor( Math.random( ) * arr.length ) ];
        }

    //
    // ─── PUSH ERROR NOTIFICATION ────────────────────────────────────────────────────
    //

        export function report ( text ) {
            console.error( text );
            let notification = new Notification( 'Orchestra', {
                body: text,
                sticky: true
            });
            notification.onclick = ( ) => {
                externals.orchestraWindow.openDevTools( );
                notification = null;
            }
        }

    //
    // ─── ON CLOSE ───────────────────────────────────────────────────────────────────
    //

        export function fireWindowCloseRequest ( ) {
            if ( onBeforeWindowClose( 'Close') )
                externals.orchestraWindow.close( );
        }

    //
    // ─── ON QUIT ────────────────────────────────────────────────────────────────────
    //

        export function fireAppQuitRequest ( ) {
            if ( onBeforeWindowClose( 'Quit' ) )
                externals.electron.ipcRenderer.send( 'app-quit' );
        }

    //
    // ─── ON BEFORE WINDOW CLOSE ─────────────────────────────────────────────────────
    //

        export function onBeforeWindowClose ( closeButtonText ) {
            if ( filesystem.getFileDirtStatus( ) ) {
                const ans = externals.electron.dialog.showMessageBox(
                                dialogs.getWindowForDialogSheets( ), {
                    buttons: [ "Let's Save",  "Don't Close", `Nah! Just ${ closeButtonText }`],
                    title: "Orchestra",
                    message: 'You have changes that are not saved. Should we do something or pretend this conversation never happened?',
                    detail: "A Jedi always takes care of it's files. Be in the good side and may the Force be with you.",
                });

                if ( ans === 0 )
                    dialogs.onSaveFile( );
                else if ( ans === 1 )
                    return false;
            }
            menu.setMenuEnableFactor( false );
            return true;
        }

    //
    // ─── ON MINIMIZE ────────────────────────────────────────────────────────────────
    //

        export function fireWindowMinimizeRequest ( ) {
            externals.orchestraWindow.minimize( );
        }

    //
    // ─── ON MAXIMIZE ────────────────────────────────────────────────────────────────
    //

        export function fireWindowMaximizeRequest ( ) {
            if ( externals.orchestraWindow.isMaximized( ) )
                externals.orchestraWindow.unmaximize( );
            else
                externals.orchestraWindow.maximize( );
        }

    //
    // ─── WINDOW BUTTONS BLUR ────────────────────────────────────────────────────────
    //

        export function makeWindowButtonsBlur ( ) {
            document.getElementById('window-button-close').className = 'window-buttons-blur-mode';
            document.getElementById('window-button-minimize').className = 'window-buttons-blur-mode';
            document.getElementById('window-button-maximize').className = 'window-buttons-blur-mode';
        }

    //
    // ─── MAKE WINDOW BUTTONS ACTIVE ─────────────────────────────────────────────────
    //

        export function makeWindowButtonsActive ( ) {
            document.getElementById('window-button-close').className = 'window-button-close-active';
            document.getElementById('window-button-minimize').className = 'window-button-minimize-active';
            document.getElementById('window-button-maximize').className = 'window-button-maximize-active';
        }

    //
    // ─── OPEN NEW WINDOW ────────────────────────────────────────────────────────────
    //

        export function openNewWindow ( ) {
            externals.electron.ipcRenderer.send( 'open-new-window' );
        }

    //
    // ─── ON OPEN HELP PAGE ──────────────────────────────────────────────────────────
    //

        export function onOpenHelpPage ( ) {
            externals.electron.ipcRenderer.send( 'open-help-page' );
        }

    //
    // ─── OPEN HELP WINDOW FOR REFERENCE ─────────────────────────────────────────────
    //

        export function openHelpWindowForReference ( refID ) {
            externals.electron.ipcRenderer.send( 'open-help-for-ref', refID );
        }

    //
    // ─── OPEN ABOUT PAGE ────────────────────────────────────────────────────────────
    //

        export function openAboutPage ( ) {
            externals.electron.ipcRenderer.send( 'open-about-page' );
        }

    // ────────────────────────────────────────────────────────────────────────────────

}