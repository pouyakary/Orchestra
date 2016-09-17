
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

    QuartetGenerator.init = function ( workspace ) {

    }

//
// ─── GENERATOR FINISH ───────────────────────────────────────────────────────────
//

    QuartetGenerator.finish = function ( code ) {
        return code.trim( );
    };

//
// ─── SCRUB NAKED VALUE ──────────────────────────────────────────────────────────
//

    QuartetGenerator.scrubNakedValue = function ( line ) {
        return line.trim( );
    };

//
// ─── QUOTE ──────────────────────────────────────────────────────────────────────
//

    QuartetGenerator.quote_ = function ( text ) {
        return text.trim( );
    };

//
// ─── SCRUB ──────────────────────────────────────────────────────────────────────
//

    QuartetGenerator.scrub_ = function ( block, code ) {
        if ( block.id === quartetActiveBlockId ) {
            code = `<span class="console-highlight-active-block">${ code }</span>`;
        }
        var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
        var nextCode = QuartetGenerator.blockToCode( nextBlock );
        return code.trim( ) + nextCode.trim( );
    };

// ────────────────────────────────────────────────────────────────────────────────
