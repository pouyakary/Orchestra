
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.dialogs {

    //
    // ─── ON NEW FILE ────────────────────────────────────────────────────────────────
    //

        export function onNewFile ( force = false ) {
            if ( !( checkForSavingChanges( ) || force ) ) return;
            orchestra.storage.currentFile = orchestra.constants.defaultFileObject;
            quartet.updateWorkspaceWithNewXML( orchestra.constants.defaultFileXML );
        }

    //
    // ─── ON OPEN FILE ───────────────────────────────────────────────────────────────
    //

        export function onOpenFile ( ) {
            if ( !checkForSavingChanges( ) ) return;

            // get file path
            let filePath = orchestra.externals.electron.dialog.showOpenDialog(
                                getWindowForDialogSheets( ), {
                properties: [ 'openFile' ],
                filters: [{
                    name: 'Quartet Language',
                    extensions: [ 'quartet' ]
                }]
            })

            if ( filePath === undefined ) return;

            // done let's load.
            filesystem.openFileWithPath( filePath[ 0 ] );
        }

    //
    // ─── ON SAVE FILE ───────────────────────────────────────────────────────────────
    //

        export function onSaveFile ( force = false ) {
            if ( checkPathAndAskForPathIfNeeded( force ) )
                filesystem.saveFileWithInfo( );
        }

    //
    // ─── ON SAVE FILE AS ────────────────────────────────────────────────────────────
    //

        export function onSaveFileAs ( ) {
            onSaveFile( true );
        }

    //
    // ─── ON EXPORT SVG FILE ─────────────────────────────────────────────────────────
    //

        export function onExportWorkspaceToSVG ( ) {
            if ( orchestra.storage.workspace.getTopBlocks( ).length === 1 ) {
                let filePath = orchestra.externals.electron.dialog.showSaveDialog( getWindowForDialogSheets( ), {
                    filters: [{
                        name: 'SVG',
                        extensions: [ 'svg' ],
                    }]})

                if ( filePath !== undefined )
                    filesystem.exportSVGImageTo( filePath );
            }

            else alert("Your workspace contains blocks in top level other than Quartet Compose Block. Please clean up your workspace and try again.");
        }

    //
    // ─── GET WINDOW FOR DIALOG SHEETS ───────────────────────────────────────────────
    //

        export function getWindowForDialogSheets ( ) {
            return ( orchestra.externals.orchestraWindow.isMaximized( ) )?
                orchestra.externals.orchestraWindow : null;
        }

    //
    // ─── CHECK AND ASK FOR FILE PATH ────────────────────────────────────────────────
    //

        export function checkPathAndAskForPathIfNeeded ( forceAsk = false ) {
            if ( orchestra.storage.currentFile.path === orchestra.constants.defaultEmptyPath ||
                forceAsk ) {
                const newPath = orchestra.externals.electron.dialog.showSaveDialog( getWindowForDialogSheets( ), {
                    filters: [{
                        name: 'Quartet',
                        extensions: [ 'quartet' ],
                    }]});

                if ( newPath !== undefined ) {
                    orchestra.storage.currentFile.path = newPath;
                    return true;
                } else {
                    orchestra.storage.currentFile = orchestra.constants.defaultFileObject;
                    return false;
                }
            }
            return true;
        }

    //
    // ─── SAVE BEFORE FILE CHANGE ────────────────────────────────────────────────────
    //

        export function checkForSavingChanges ( ) {
            if ( filesystem.getFileDirtStatus( ) ) {
                const ans = orchestra.externals.electron.dialog.showMessageBox(
                                getWindowForDialogSheets( ), {
                    buttons: [ "Save Them", "Cancel", "Don't Save" ],
                    title: "Orchestra",
                    message: "Don't let your saves be lost",
                    detail: "If you don't save then everything since your last save will be lost. You're a developer you know that."
                });

                if ( ans === 0 )
                    onSaveFile( );
                else if ( ans === 1 )
                    return false;
            }

            return true;
        }

    // ────────────────────────────────────────────────────────────────────────────────

}