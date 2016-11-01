
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import * as compiler from '../../compilers/level1'

//
// ─── GENERATOR ──────────────────────────────────────────────────────────────────
//

    export function generate ( node: blueprints.regulex.INodeLookahead ):
                                     blueprints.block.IIntermediateNode {

        return {
            type: 'block',
            node: node,
            value: [{
                type: 'lookahead',
                children: [
                    {
                        name: 'blocks',
                        children: compiler.compile([ node.statement ])
                    },
                    {
                        name: 'lookahead',
                        children: compiler.compile( node.sub )
                    }
                ],
                fields: [{
                    name: 'status',
                    value: ( node.status )? 'positive' : 'negative'
        }]}]}}

// ────────────────────────────────────────────────────────────────────────────────
