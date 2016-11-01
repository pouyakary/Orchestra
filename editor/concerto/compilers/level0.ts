
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// This level is like a preprocessor on the regulex's AST. for handling
// the lookahead problem.
//

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    export function fixLookahead ( ast: blueprints.regulex.IRegExAST ):
                                        blueprints.regulex.IRegExAST {

        let topNode     : blueprints.regulex.IBaseNode
        let bottomNode  : blueprints.regulex.INodeLookahead

        for ( let counter = 0; counter < ast.tree.length - 1; counter++ ) {
            topNode    = ast.tree[ counter ]
            bottomNode = <blueprints.regulex.INodeLookahead> ast.tree[ counter + 1 ]

            if ( bottomNode.type === 'assert' ) {
                if ( bottomNode.assertionType === 'AssertLookahead' ||
                     bottomNode.assertionType === 'AssertNegativeLookahead' ) {

                        bottomNode.type = 'lookahead'
                        bottomNode.statement = Object.assign({ }, topNode )
                        bottomNode.status = (
                            bottomNode.assertionType === 'AssertLookahead' )

                        ast.tree[ counter ] = null
                        counter++;
                     }}}

        return ast
    }

// ────────────────────────────────────────────────────────────────────────────────
