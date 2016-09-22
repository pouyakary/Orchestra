
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── INIT ───────────────────────────────────────────────────────────────────────
//

    QuartetGenerator = new Blockly.Generator('Quartet');

//
// ─── GENERATOR INIT ─────────────────────────────────────────────────────────────
//

    QuartetGenerator.init = workspace => {

    }

//
// ─── GENERATOR FINISH ───────────────────────────────────────────────────────────
//

    QuartetGenerator.finish = code => {
        return code.trim( );
    };

//
// ─── SCRUB NAKED VALUE ──────────────────────────────────────────────────────────
//

    QuartetGenerator.scrubNakedValue = line => {
        return line.trim( );
    };

//
// ─── QUOTE ──────────────────────────────────────────────────────────────────────
//

    QuartetGenerator.quote_ = text => {
        return text.trim( );
    };

//
// ─── SCRUB ──────────────────────────────────────────────────────────────────────
//

    QuartetGenerator.scrub_ = ( block, code ) => {
        if ( block.id === quartetActiveBlockId ) {
            code = `<span class="console-highlight-active-block">${ code }</span>`;
        }
        let nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        let nextCode = QuartetGenerator.blockToCode( nextBlock );
        return code.trim( ) + nextCode.trim( );
    };

// ────────────────────────────────────────────────────────────────────────────────
