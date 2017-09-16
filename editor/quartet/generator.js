
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── INIT ───────────────────────────────────────────────────────────────────────
//

    QuartetGenerator = new Blockly.Generator('Quartet')

//
// ─── GENERATOR INIT ─────────────────────────────────────────────────────────────
//

    QuartetGenerator.init = workspace => {

    }

//
// ─── GENERATOR FINISH ───────────────────────────────────────────────────────────
//

    QuartetGenerator.finish = code => {
        return code.trim( )
    }

//
// ─── SCRUB NAKED VALUE ──────────────────────────────────────────────────────────
//

    QuartetGenerator.scrubNakedValue = line => {
        return line.trim( )
    }

//
// ─── QUOTE ──────────────────────────────────────────────────────────────────────
//

    QuartetGenerator.quote_ = text => {
        return text.trim( )
    }

//
// ─── SCRUB ──────────────────────────────────────────────────────────────────────
//

    QuartetGenerator.scrub_ = ( block, code ) => {
        if ( block.id === quartetActiveBlockId )
            code = `<span class="console-highlight-active-block">${ code }</span>`

        let nextBlock = block.nextConnection && block.nextConnection.targetBlock( )
        let nextCode = QuartetGenerator.blockToCode( nextBlock )
        return code.trim( ) + nextCode.trim( )
    }

// ────────────────────────────────────────────────────────────────────────────────
