
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── SETUP WORKSPACE ────────────────────────────────────────────────────────────
//

    function setupWorkspaceWithNewFile ( xml ) {
        if ( xml === undefined ) {
            setupWorkspace( defaultFileXML );
        } else {
            setupWorkspace( xml );
        }
        setupComposer( );
        setupEventListeners( );
    }

//
// ─── SETUP WORKSPACE ────────────────────────────────────────────────────────────
//

    function setupWorkspace ( fileXML ) {
        var toolbox = document.getElementById( 'toolbox' );

        workspace = Blockly.inject( 'quartet-coding-view', {
            collapse: true,
            toolbox: toolbox,
            border: false,
            scrollbars: true,
        });

        Blockly.Xml.domToWorkspace( Blockly.Xml.textToDom( fileXML ), workspace );

        ComposeBlock = workspace.getAllBlocks( )[ 0 ];
    }

//
// ─── SETUP COMPOSER ─────────────────────────────────────────────────────────────
//

    function setupComposer ( ) {
        var composer = Blockly.getMainWorkspace().getTopBlocks( )[ 0 ];
        composer.moveBy( 40, 40 );
        //composer.movable_ = false;
    }

//
// ─── SETUP EVENT LISTENERS ──────────────────────────────────────────────────────
//

    function setupEventListeners ( ) {
        workspace.addChangeListener( quartetOnUIChange );
    }

// ────────────────────────────────────────────────────────────────────────────────
