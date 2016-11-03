
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace concerto.compilers.level1 {

    //
    // ─── EXPORTS ────────────────────────────────────────────────────────────────────
    //

        /** Compiles _Regulex AST_ into _Concerto AST_ */
        export function compile ( tree: blueprints.regulex.IBaseNode[ ] ) {
            let ast = new Array<blueprints.block.IBlock> ( );
            for ( let node of tree ) {
                if ( node !== null ) {
                    let intermediateNode =  handleOneNode( node );
                    if ( intermediateNode.type === 'block' )
                        ast.push( intermediateNode.value[ 0 ] );
                    else
                        for ( let child of intermediateNode.value )
                            ast.push( child );
                        }}
            return ast;
        }

    //
    // ─── HANDLE ONE NODE ────────────────────────────────────────────────────────────
    //

        function handleOneNode ( node: blueprints.regulex.IBaseNode ):
                                    blueprints.block.IIntermediateNode {

            // firs we handle the block
            let intermediateNode;
            switch ( node.type ) {
                case 'exact':
                    intermediateNode =
                        generators.exact.generate( <blueprints.regulex.INodeExact> node );
                        break;

                case 'charset':
                    intermediateNode =
                        generators.charset.generate( <blueprints.regulex.INodeSet> node );
                        break;

                case 'group':
                    intermediateNode =
                        generators.group.generate( <blueprints.regulex.INodeGroup> node );
                        break;

                case 'choice':
                    intermediateNode =
                        generators.choice.generate( <blueprints.regulex.INodeChoice> node );
                        break;

                case 'dot':
                    intermediateNode =
                        generators.dot.generate( node );
                        break;

                case 'lookahead':
                    intermediateNode =
                        generators.lookahead.generate( <blueprints.regulex.INodeLookahead> node );
                        break;

                case 'assert':
                    intermediateNode =
                        generators.assert.generate( <blueprints.regulex.INodeAssert> node );
                        break;
                }

            // then we handle the repeat of the block
            return generators.repeats.generate( intermediateNode );
        }

    // ────────────────────────────────────────────────────────────────────────────────

}