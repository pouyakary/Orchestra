
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace concerto.generators.group {

    //
    // ─── GENERATOR ──────────────────────────────────────────────────────────────────
    //

        export function generate ( node: blueprints.regulex.INodeGroup ):
                                        blueprints.block.IIntermediateNode {

            let children = compilers.level1.compile( node.sub );

            if ( node.nonCapture === true )
                return {
                    type: 'group',
                    node: node,
                    value: children
                }
            else
                return {
                    type: 'block',
                    node: node,
                    value: [{
                        type: 'match',
                        children: [ genkit.generateStatement( children ) ]
                    }]
                }
        }

    // ────────────────────────────────────────────────────────────────────────────────

}