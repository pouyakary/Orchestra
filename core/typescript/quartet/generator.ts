
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
    // ─── INIT ───────────────────────────────────────────────────────────────────────
    //

        storage.quartetGenerator = new Blockly.Generator('Quartet');

    //
    // ─── GENERATOR INIT ─────────────────────────────────────────────────────────────
    //

        storage.quartetGenerator.init = workspace => {

        }

    //
    // ─── GENERATOR FINISH ───────────────────────────────────────────────────────────
    //

        storage.quartetGenerator.finish = code => {
            return code.trim( );
        };

    //
    // ─── SCRUB NAKED VALUE ──────────────────────────────────────────────────────────
    //

        storage.quartetGenerator.scrubNakedValue = line => {
            return line.trim( );
        };

    //
    // ─── QUOTE ──────────────────────────────────────────────────────────────────────
    //

        storage.quartetGenerator.quote_ = text => {
            return text.trim( );
        };

    //
    // ─── SCRUB ──────────────────────────────────────────────────────────────────────
    //

        storage.quartetGenerator.scrub_ = ( block, code ) => {
            if ( block.id === storage.quartetActiveBlockId )
                code = `<span class="console-highlight-active-block">${ code }</span>`;

            let nextBlock = block.nextConnection && block.nextConnection.targetBlock( );
            let nextCode = storage.quartetGenerator.blockToCode( nextBlock );
            return code.trim( ) + nextCode.trim( );
        }

    // ────────────────────────────────────────────────────────────────────────────────

}