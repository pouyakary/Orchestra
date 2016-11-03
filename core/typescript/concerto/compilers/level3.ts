
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace concerto.compilers.level3 {

    //
    // ─── MAIN ───────────────────────────────────────────────────────────────────────
    //

        export function compile ( block: blueprints.recarr.INode ) {
            return `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="compose" id="composer" deletable="false" x="40" y="40"><statement name="blocks">${ generateBlockXML( block ) }</statement></block></xml>`;
        }

    //
    // ─── GENERATE XML FOR BLOCK ─────────────────────────────────────────────────────
    //

        function generateBlockXML ( block: blueprints.recarr.INode ): string {
            let result = [ `<block type="${ block.type }" id="${ generateId( ) }">` ];

            // adding fields:
            if ( block.fields !== undefined && block.fields !== null )
                for ( let field of block.fields )
                    result.push( `<field name="${ field.name }">${ field.value }</field>` );

            // adding statements
            if ( block.statements !== undefined )
                for ( let statement of block.statements )
                    result.push( `<statement name="${ statement.name }">${ generateBlockXML( statement.block ) }</statement>`);

            // adding the next block
            if ( block.next !== null && block.next !== undefined )
                result.push( `<next>${ generateBlockXML( block.next ) }</next>`);

            // done
            result.push('</block>');
            return result.join('');
        }

    //
    // ─── RANDOM ID GENERATOR ────────────────────────────────────────────────────────
    //

        function generateId ( ): string {
            let result = '';
            function generateRandomChar ( ): string {
                let n = Math.floor( Math.random( ) * 62 );
                if ( n < 10 ) return n.toString( );
                if ( n < 36 ) return String.fromCharCode( n + 55 );
                return String.fromCharCode( n + 61 );
            }
            while ( result.length < 20 ) result += generateRandomChar( );
            return result;
        }

    // ────────────────────────────────────────────────────────────────────────────────

}