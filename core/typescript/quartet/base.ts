
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.quartet {

    //
    // ─── SETUP WORKSPACE ────────────────────────────────────────────────────────────
    //

        export function setupWorkspaceWithNewFile ( ) {
            setupWorkspace( );
        }

    //
    // ─── SETUP WORKSPACE ────────────────────────────────────────────────────────────
    //

        export function setupWorkspace ( ) {
            const toolbox = document.getElementById( 'toolbox' );

            storage.workspace = Blockly.inject( 'quartet-coding-view', {
                collapse: false,
                toolbox: toolbox,
                border: false,
                scrollbars: true,
                trashcan: true,
                media: './blockly-core/media/',
                // css: false,
            });

            Blockly.Xml.domToWorkspace(
                Blockly.Xml.textToDom( constants.defaultFileXML ), storage.workspace );
        }

    //
    // ─── SETUP COMPOSE BLOCK ────────────────────────────────────────────────────────
    //

        export function setupComposeBlock ( ) {
            storage.ComposeBlock = storage.workspace.getAllBlocks( )[ 0 ];
            storage.workspace.getCanvas( ).setAttribute( 'id', constants.composeBlockIDforSVGCanvas );
            storage.ComposeBlock.moveBy( 40, 40 );
        }

    //
    // ─── SETUP EVENT LISTENERS ──────────────────────────────────────────────────────
    //

        export function setupEventListeners ( ) {
            storage.workspace.addChangeListener( quartetOnUIChange );
        }

    // ────────────────────────────────────────────────────────────────────────────────

}