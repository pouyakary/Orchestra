
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── SET DIRTY ──────────────────────────────────────────────────────────────────
//

    function setFileDirty ( dirt ) {
        currentFile.dirty = dirt
        OrchestraWindow.setDocumentEdited( dirt )
        updateConsoleTitle( )
    }

//
// ─── GET FILE DIRT STATUS ───────────────────────────────────────────────────────
//

    function getFileDirtStatus ( ) {
        return ( currentFile.emptyNewFile )? false : currentFile.dirty
    }

//
// ─── GET FILE NAME ──────────────────────────────────────────────────────────────
//

    function getFileName ( ) {
        return ( currentFile.path === defaultEmptyPath )?
            'Untitled.orchestra' : path.basename( currentFile.path )
    }

//
// ─── LOAD NEW FILE ──────────────────────────────────────────────────────────────
//

    function loadFile ( fileJSONString ) {
        const fileJSON = JSON.parse( fileJSONString )

        // setupWorkspaceWithNewFile( fileJSON.workspaceXML );
        playgroundEditor.setValue( fileJSON.playgroundText )
    }

//
// ─── SERIALIZE FILE ─────────────────────────────────────────────────────────────
//

    function serializeFile ( ) {
        return JSON.stringify({
            workspaceXML: serializeWorkspaceIntoXML( ),
            playgroundText: playgroundEditor.getValue( ),
        })}

//
// ─── WORKSPACE TO XML ───────────────────────────────────────────────────────────
//

    function serializeWorkspaceIntoXML ( ) {
        return Blockly.Xml.domToText( Blockly.Xml.workspaceToDom( workspace ) )
    }

//
// ─── SAVE FILE ──────────────────────────────────────────────────────────────────
//

    function saveFileWithInfo ( ) {
        // Going with the file path
        const fileJSON = serializeFile( )

        // save the file
        fs.writeFile( currentFile.path, fileJSON, err => {
            if ( err ) {
                alert(`Could not save your file at "${ currentFile.path }"`)
                currentFile = Object.assign({ }, defaultFileObject )
            } else {
                setFileDirty( false )
                new Log( "Saved!" )
            }
        })}

//
// ─── OPEN FILE ──────────────────────────────────────────────────────────────────
//

    function openFileWithPath ( filePath ) {
        // open the file
        fs.readFile( filePath, ( err, fileJSONString ) => {
            if ( err ) {
                report('Error: Could not open the file.')
                return
            }

            try {
                let fileJSON = JSON.parse( fileJSONString )
                if ( fileJSON.workspaceXML !== undefined && fileJSON.workspaceXML !== null ) {
                    updateWorkspaceWithNewXML( fileJSON.workspaceXML )
                    currentFile.path = filePath
                    setFileDirty( true )
                }

                if ( fileJSON.playgroundText !== undefined && fileJSON.playgroundText !== '' )
                    playgroundEditor.setValue( fileJSON.playgroundText )

                new Log( "Opened!" )


            } catch ( error ) {
                report( `Could not load the file because of a broken file problem.${ error }` )
            }
        })}

//
// ─── EXPORT SVG IMAGE ───────────────────────────────────────────────────────────
//

    function exportSVGImageTo ( filePath ) {
        const fileSVGString = renderWorkspaceIntoSVG( )
        fs.writeFile( filePath, fileSVGString, error => {
            if ( error )
                alert( 'File could not be saved. Please try again.' )
            new Log( "SVG got exported!" )
        })}

// ────────────────────────────────────────────────────────────────────────────────
