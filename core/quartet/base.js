
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── SETUP WORKSPACE ────────────────────────────────────────────────────────────
//

    function setupWorkspaceWithNewFile ( ) {
        setupWorkspace( );
        setupComposer( );
        setupEventListeners( );
    }

//
// ─── SETUP WORKSPACE ────────────────────────────────────────────────────────────
//

    function setupWorkspace ( ) {
        var toolbox = document.getElementById( 'toolbox' );

        workspace = Blockly.inject( 'quartet-coding-view', {
            collapse: true,
            toolbox: toolbox,
            border: false,
            scrollbars: true,
        });

        Blockly.Xml.domToWorkspace( Blockly.Xml.textToDom( defaultFileXML ), workspace );

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
