
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    module.exports = block => {
        let result = [ `<block type="${ block.type }" id="${ concertoGenerateRandomId( ) }">` ];

        // adding fields
        if ( block.fields !== undefined ) {
            for ( let field of block.fields ) {
                result.push( `<field name="${ field.key }">${ field.val }</field>` );
            }
        }

        // adding children
        if ( block.statements !== undefined ) {
            for ( let statement of block.statements ) {
                result.push( `<statement name="${ statement.name }">${ statement.blocks.join('') }</statement>`);
            }
        }

        // done
        result.push('</block>');
        return result.join('');
    }

//
// ─── RANDOM ID GENERATOR ────────────────────────────────────────────────────────
//

    function concertoGenerateRandomId ( ) {
        let result = '';
        function generateRandomChar ( ) {
            let n = Math.floor( Math.random( ) * 62 );
            if ( n < 10 ) return n;
            if ( n < 36 ) return String.fromCharCode( n + 55 );
            return String.fromCharCode( n + 61 );
        }
        while ( result.length < 20 ) result += generateRandomChar( );
        return result;
    }

// ────────────────────────────────────────────────────────────────────────────────
