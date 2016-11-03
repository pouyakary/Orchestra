
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.filesystem {

    //
    // ─── SET DIRTY ──────────────────────────────────────────────────────────────────
    //

        export function setFileDirty ( dirt: boolean ) {
            orchestra.storage.currentFile.dirty = dirt;
            orchestra.externals.orchestraWindow.setDocumentEdited( dirt );
            orchestra.consoleView.updateConsoleTitle( );
        }

    //
    // ─── GET FILE DIRT STATUS ───────────────────────────────────────────────────────
    //

        export function getFileDirtStatus ( ) {
            return ( orchestra.storage.currentFile.emptyNewFile )?
                false : orchestra.storage.currentFile.dirty;
        }

    //
    // ─── GET FILE NAME ──────────────────────────────────────────────────────────────
    //

        export function getFileName ( ) {
            return ( orchestra.storage.currentFile.path === orchestra.constants.defaultEmptyPath )?
                'Untitled.quartet' : orchestra.externals.path.basename( orchestra.storage.currentFile.path );
        }

    //
    // ─── LOAD NEW FILE ──────────────────────────────────────────────────────────────
    //

        export function loadFile ( fileJSONString: string ) {
            const fileJSON = JSON.parse( fileJSONString );
            // setupWorkspaceWithNewFile( fileJSON.workspaceXML );
            orchestra.storage.playgroundEditor.setValue( fileJSON.playgroundText );
        }

    //
    // ─── SERIALIZE FILE ─────────────────────────────────────────────────────────────
    //

        export function serializeFile ( ) {
            return JSON.stringify({
                workspaceXML: serializeWorkspaceIntoXML( ),
                playgroundText: orchestra.storage.playgroundEditor.getValue( ),
            })}

    //
    // ─── WORKSPACE TO XML ───────────────────────────────────────────────────────────
    //

        export function serializeWorkspaceIntoXML ( ) {
            return Blockly.Xml.domToText( Blockly.Xml.workspaceToDom( storage.workspace ) );
        }

    //
    // ─── SAVE FILE ──────────────────────────────────────────────────────────────────
    //

        export function saveFileWithInfo ( ) {
            // Going with the file path
            const fileJSON = serializeFile( );

            // save the file
            orchestra.externals.fs.writeFile( orchestra.storage.currentFile.path, fileJSON, err => {
                if ( err ) {
                    alert(`Could not save your file at "${ orchestra.storage.currentFile.path }"`);
                    orchestra.storage.currentFile = orchestra.constants.defaultFileObject;
                }

                else setFileDirty( false );
            })}

    //
    // ─── OPEN FILE ──────────────────────────────────────────────────────────────────
    //

        export function openFileWithPath ( filePath: string ) {
            // open the file
            orchestra.externals.fs.readFile( filePath, ( err, fileJSONString ) => {
                if ( err ) {
                    report('Error: Could not open the file.');
                    return;
                }

                try {
                    let fileJSON = JSON.parse( fileJSONString );
                    if ( fileJSON.workspaceXML !== undefined && fileJSON.workspaceXML !== null ) {
                        quartet.updateWorkspaceWithNewXML( fileJSON.workspaceXML );
                        orchestra.storage.currentFile.path = filePath;
                        setFileDirty( true );
                    }

                    if ( fileJSON.playgroundText !== undefined && fileJSON.playgroundText !== '' )
                        orchestra.storage.playgroundEditor.setValue( fileJSON.playgroundText );


                } catch ( error ) {
                    orchestra.report( `Could not load the file because of a broken file problem.${ error }` );
                }
            })}

    //
    // ─── EXPORT SVG IMAGE ───────────────────────────────────────────────────────────
    //

        export function exportSVGImageTo ( filePath ) {
            const fileSVGString = renderWorkspaceIntoSVG( );
            orchestra.externals.fs.writeFile( filePath, fileSVGString, error => {
                if ( error ) alert( 'File could not be saved. Please try again.' );
            })}

    // ────────────────────────────────────────────────────────────────────────────────

}