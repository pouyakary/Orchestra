
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── SETUP WORKSPACE ────────────────────────────────────────────────────────────
//

    function setupWorkspaceWithNewFile ( ) {
        setupWorkspace( );
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
    }

//
// ─── SETUP COMPOSE BLOCK ────────────────────────────────────────────────────────
//

    function setupComposeBlock ( ) {
        ComposeBlock = workspace.getAllBlocks( )[ 0 ];
        ComposeBlock.moveBy( 40, 40 );
    }

//
// ─── SETUP EVENT LISTENERS ──────────────────────────────────────────────────────
//

    function setupEventListeners ( ) {
        workspace.addChangeListener( quartetOnUIChange );
    }

// ────────────────────────────────────────────────────────────────────────────────
