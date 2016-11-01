
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── SETUP WORKSPACE ────────────────────────────────────────────────────────────
//

    function setupWorkspaceWithNewFile ( ) {
        setupWorkspace( )
    }

//
// ─── SETUP WORKSPACE ────────────────────────────────────────────────────────────
//

    function setupWorkspace ( ) {
        const toolbox = document.getElementById( 'toolbox' )

        workspace = Blockly.inject( 'quartet-coding-view', {
            collapse: false,
            toolbox: toolbox,
            border: false,
            scrollbars: true,
            trashcan: true,
            media: './blockly-core/media/',
            // css: false,
        })

        Blockly.Xml.domToWorkspace( Blockly.Xml.textToDom( defaultFileXML ), workspace )
    }

//
// ─── SETUP COMPOSE BLOCK ────────────────────────────────────────────────────────
//

    function setupComposeBlock ( ) {
        ComposeBlock = workspace.getAllBlocks( )[ 0 ]
        workspace.getCanvas( ).setAttribute( 'id', composeBlockIDforSVGCanvas )
        ComposeBlock.moveBy( 40, 40 )
    }

//
// ─── SETUP EVENT LISTENERS ──────────────────────────────────────────────────────
//

    function setupEventListeners ( ) {
        workspace.addChangeListener( quartetOnUIChange )
    }

// ────────────────────────────────────────────────────────────────────────────────
