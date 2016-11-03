
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace concerto.generators.genkit {

    //
    // ─── STATEMENT GENERATOR ────────────────────────────────────────────────────────
    //

        export function generateStatement ( blocks: blueprints.block.IBlock[ ],
                                            name = 'blocks' ): blueprints.block.IStatement {
            return {
                name: name,
                children: blocks
            }
        }

    //
    // ─── TEXT ENCODER ───────────────────────────────────────────────────────────────
    //

        export function encodeText ( text: string ): string {
            let result = [ ];
            for ( let char of text ) {
                switch ( char ) {
                    case '<':
                        result.push( '&lt;' );
                        break;

                    case '>':
                        result.push( '&gt;' );
                        break;

                    case '/':
                        result.push( '\\/' );
                        break;

                    case '&':
                        result.push( '&amp;' );
                        break;

                    default:
                        result.push( char );
                }
            }
            return result.join('');
        }

    // ────────────────────────────────────────────────────────────────────────────────

}