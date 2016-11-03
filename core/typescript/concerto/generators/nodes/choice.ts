
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace concerto.generators.choice {

    //
    // ─── GENERATOR ──────────────────────────────────────────────────────────────────
    //

        export function generate ( node: blueprints.regulex.INodeChoice ):
                                        blueprints.block.IIntermediateNode {

            let children = new Array<blueprints.block.IBlock> ( );
            for ( let branch of node.branches )
                children.push( composeOptionBlock( branch ) );

            return {
                type: 'block',
                node: node,
                value: [{
                    type: 'one_of',
                    children: [
                        genkit.generateStatement( children )
                        ]}]}};

    //
    // ─── COMPOS CHOICE ──────────────────────────────────────────────────────────────
    //

        function composeOptionBlock ( branch: blueprints.regulex.IBaseNode[ ] ):
                                            blueprints.block.IBlock {
            return {
                type: 'option',
                children: [
                    genkit.generateStatement(
                        compilers.level1.compile( branch )
                    )]}};

    // ────────────────────────────────────────────────────────────────────────────────

}