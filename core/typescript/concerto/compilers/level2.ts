
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace concerto.compilers.level2 {

    //
    // ─── STARTING ADDER ─────────────────────────────────────────────────────────────
    //

        export function compile ( concertoAST: blueprints.block.IBlock[ ] ):
                                            blueprints.recarr.INode {

            if ( concertoAST.length === 0 ) return null;

            let firstIndex = concertoAST[ 0 ];
            let children = new Array<blueprints.recarr.IStatement> ( );

            // is there any children?
            if ( firstIndex.children !== undefined && firstIndex.children !== null )
                for ( let statement of firstIndex.children )
                    children.push({
                        name: statement.name,
                        block: compile( statement.children )
                    });

            // then it's time to return the new node
            if ( concertoAST.length === 1 )
                return {
                    type: firstIndex.type,
                    fields: firstIndex.fields,
                    statements: children
                }
            else
                return {
                    type: firstIndex.type,
                    fields: firstIndex.fields,
                    statements: children,
                    next: compile( concertoAST.splice( 1 ) )
                }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}