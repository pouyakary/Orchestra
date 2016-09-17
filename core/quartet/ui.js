
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── UPDATE CODE ON CHANGE ──────────────────────────────────────────────────────
//

    function quartetOnUIChange ( event ) {
        if ( event.type === Blockly.Events.MOVE ) return;
        if ( event.type === Blockly.Events.UI ) {
            if ( event.element === 'selected' ) {
                quartetActiveBlockId = event.newValue || event.blockId;
            }
        }

        var compiledRegex = QuartetGenerator.blockToCode( ComposeBlock );
        // this is the master shared one...
        let consoleView = document.getElementById( 'ribbon-console-regexp' );
        CompiledRegEx = compiledRegex;
        consoleView.innerHTML = `/${ compiledRegex }/`;
    }

//
// ─── ON REGEXP COPY ─────────────────────────────────────────────────────────────
//

    function onCopyRegExp ( ) {
        clipboard.writeText( document.getElementById( 'ribbon-console-regexp' ).innerText );
    }

// ────────────────────────────────────────────────────────────────────────────────
