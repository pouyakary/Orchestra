
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace concerto.generators.exact {

    //
    // ─── GENERATOR ──────────────────────────────────────────────────────────────────
    //

        export function generate ( node: blueprints.regulex.INodeExact ):
                                        blueprints.block.IIntermediateNode {
            return {
                type: 'block',
                node: node,
                value: [{
                    type: 'encode',
                    fields: [{
                        name: 'text',
                        value: genkit.encodeText( node.chars )
                    }]
                }]}}

    // ────────────────────────────────────────────────────────────────────────────────

}