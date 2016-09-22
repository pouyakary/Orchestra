
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── SET DIRTY ──────────────────────────────────────────────────────────────────
//

    function setFileDirty ( dirt ) {
        currentFile.dirty = dirt;
        updateConsoleTitle( );
    }

//
// ─── LOAD NEW FILE ──────────────────────────────────────────────────────────────
//

    function loadFile ( fileJSONString ) {
        const fileJSON = JSON.parse( fileJSONString );
        // setupWorkspaceWithNewFile( fileJSON.workspaceXML );
        playgroundEditor.setValue( fileJSON.playgroundText );
    }

//
// ─── SERIALIZE FILE ─────────────────────────────────────────────────────────────
//

    function serializeFile ( ) {
        return JSON.stringify({
            workspaceXML: serializeWorkspaceIntoXML( ),
            playgroundText: playgroundEditor.getValue( ),
        });
    }

//
// ─── WORKSPACE TO XML ───────────────────────────────────────────────────────────
//

    function serializeWorkspaceIntoXML ( ) {
        return Blockly.Xml.domToText( Blockly.Xml.workspaceToDom( workspace ) );
    }

//
// ─── SAVE FILE ──────────────────────────────────────────────────────────────────
//

    function saveFileWithInfo ( ) {
        // Going with the file path
        const fileJSON = serializeFile( );

        // save the file
        fs.writeFile( currentFile.path, fileJSON, err => {
            if ( err ) {
                alert(`Could not save your file at "${ currentFile.path }"`);
                currentFile = defaultFileObject;
            } else {
                setFileDirty( false );
            }
        });
    }

//
// ─── OPEN FILE ──────────────────────────────────────────────────────────────────
//

    function openFileWithPath ( filePath ) {
        // open the file
        fs.readFile( filePath, ( err, fileJSONString ) => {
            if ( err ) {
                alert('Error: Could not open the file.');
                return;
            };

            try {
                let fileJSON = JSON.parse( fileJSONString );
                if ( fileJSON.workspaceXML !== undefined && fileJSON.workspaceXML !== null ) {
                    updateWorkspaceWithNewXML( fileJSON.workspaceXML );
                    currentFile.path = filePath;
                    setFileDirty( true );
                }

            } catch ( error ) {
                alert('Could not load the file because of a broken file problem.');
            }
        });
    }

//
// ─── EXPORT SVG IMAGE ───────────────────────────────────────────────────────────
//

    function exportSVGImageTo ( filePath ) {
        const fileSVGString = renderWorkspaceIntoSVG( );
        fs.writeFile( filePath, fileSVGString, error => {
            if ( error ) alert( 'File could not be saved. Please try again.' );
        });
    }

// ────────────────────────────────────────────────────────────────────────────────
