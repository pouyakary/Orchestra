
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── UPDATE CODE ON CHANGE ──────────────────────────────────────────────────────
//

    function quartetOnUIChange ( event ) {

        switch ( event.type ) {
            case Blockly.Events.MOVE:
                return;
            case Blockly.Events.UI:
                currentFile.emptyNewFile = false;
                break;
            default:
                setFileDirty( true );
        }

        if ( event.type === Blockly.Events.UI && event.element === 'selected' ) {
            quartetActiveBlockId = event.newValue || event.blockId;
        }

        let compiledRegex = QuartetGenerator.blockToCode( ComposeBlock );

        CompiledRegEx = compiledRegex;
        setConsoleRegEx( `/${ compiledRegex }/` );
    }

//
// ─── ON REGEXP COPY ─────────────────────────────────────────────────────────────
//

    function onCopyRegExp ( ) {
        clipboard.writeText( document.getElementById( 'ribbon-console-regexp' ).innerText );
    }

// ────────────────────────────────────────────────────────────────────────────────
