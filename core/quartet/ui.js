
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── UPDATE CODE ON CHANGE ──────────────────────────────────────────────────────
//

    function quartetOnUIChange ( event ) {

        switch ( event.type ) {
            case Blockly.Events.MOVE:
                return;
            case Blockly.Events.UI:
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
