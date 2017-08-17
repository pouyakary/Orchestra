
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── ON NEW FILE ────────────────────────────────────────────────────────────────
//

    function onNewFile ( force = false ) {
        if ( !( checkForSavingChanges( ) || force ) ) return;

        currentFile =
            Object.assign({ }, defaultFileObject)
        currentFile.compilerOptions =
            Object.assign({ }, compileOptionsBaseOptions )
        renderCompilerOptionsView( )

        updateWorkspaceWithNewXML( defaultFileXML )
    }

//
// ─── ON OPEN FILE ───────────────────────────────────────────────────────────────
//

    function onOpenFile ( ) {
        if ( !checkForSavingChanges( ) ) return;

        // get file path
        let filePath = dialog.showOpenDialog( getWindowForDialogSheets( ), {
            properties: [ 'openFile' ],
            filters: [{
                name: 'Orchestra Language',
                extensions: [ 'orchestra' ]
            }]
        })

        if ( filePath === undefined ) return;

        // done let's load.
        openFileWithPath( filePath[ 0 ] )
    }

//
// ─── ON SAVE FILE ───────────────────────────────────────────────────────────────
//

    function onSaveFile ( force = false ) {
        if ( checkPathAndAskForPathIfNeeded( force ) )
            saveFileWithInfo( )
    }

//
// ─── ON SAVE FILE AS ────────────────────────────────────────────────────────────
//

    function onSaveFileAs ( ) {
        onSaveFile( true )
    }

//
// ─── ON EXPORT SVG FILE ─────────────────────────────────────────────────────────
//

    function onExportWorkspaceToSVG ( ) {
        if ( workspace.getTopBlocks( ).length === 1 ) {
            let filePath = dialog.showSaveDialog( getWindowForDialogSheets( ), {
                filters: [{
                    name: 'SVG',
                    extensions: [ 'svg' ],
                }]})

            if ( filePath !== undefined )
                exportSVGImageTo( filePath )
        }

        else alert("Your workspace contains blocks in top level other than Quartet Compose Block. Please clean up your workspace and try again.")
    }

//
// ─── GET WINDOW FOR DIALOG SHEETS ───────────────────────────────────────────────
//

    function getWindowForDialogSheets ( ) {
        return ( OrchestraWindow.isMaximized( ) )? OrchestraWindow : null
    }

//
// ─── CHECK AND ASK FOR FILE PATH ────────────────────────────────────────────────
//

    function checkPathAndAskForPathIfNeeded ( forceAsk = false ) {
        if ( currentFile.path === defaultEmptyPath || forceAsk ) {
            const newPath = dialog.showSaveDialog( getWindowForDialogSheets( ), {
                filters: [{
                    name: 'Orchestra Language',
                    extensions: [ 'orchestra' ],
                }]})

            if ( newPath !== undefined ) {
                currentFile.path = newPath
                return true
            } else {
                currentFile = Object.assign({ }, defaultFileObject )
                return false
            }
        }
        return true
    }

//
// ─── SAVE BEFORE FILE CHANGE ────────────────────────────────────────────────────
//

    function checkForSavingChanges ( ) {
        if ( getFileDirtStatus( ) ) {
            const ans = dialog.showMessageBox( getWindowForDialogSheets( ), {
                buttons: [ "Save Them", "Cancel", "Don't Save" ],
                title: "Orchestra",
                message: "Don't let your saves be lost",
                detail: "If you don't save then everything since your last save will be lost. You're a developer you know that."
            })

            if ( ans === 0 )
                onSaveFile( )
            else if ( ans === 1 )
                return false
        }

        return true
    }

// ────────────────────────────────────────────────────────────────────────────────
