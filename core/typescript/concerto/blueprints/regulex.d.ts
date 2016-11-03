
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

declare module 'regulex' {

    //
    // ─── EXPORTS ────────────────────────────────────────────────────────────────────
    //

        function parse ( regex: string ): blueprints.regulex.IRegExAST;

    // ────────────────────────────────────────────────────────────────────────────────

}



declare module blueprints.regulex {

    //
    // ─── MAIN TREE ──────────────────────────────────────────────────────────────────
    //


        interface IRegExAST {
            raw: string;
            tree: IBaseNode[ ];
            groupCount: number;
        }

    //
    // ─── NODE ───────────────────────────────────────────────────────────────────────
    //

        //
        // I M P O R T A N T   N O T E
        // This definition only provides for the very small portion of the regulex
        // that we use for our compilations. Not the whole package.
        //

        interface IBaseNode {
            type: string;
            raw: string;
            repeat?: {
                min: number,
                max: number
            }
        }

    //
    // ─── EXACT NODE ─────────────────────────────────────────────────────────────────
    //

        interface INodeExact extends IBaseNode {
            chars: string;
        }

    //
    // ─── SET NODE ───────────────────────────────────────────────────────────────────
    //

        interface INodeSet extends IBaseNode {
            classes: any[ ];
            ranges: string[ ];
            chars: string;
            exclude?: boolean;
        }

    //
    // ─── CHOICE NODE ────────────────────────────────────────────────────────────────
    //

        interface INodeChoice extends IBaseNode {
            branches: IBaseNode[ ][ ];
        }

    //
    // ─── GROUP NODE ─────────────────────────────────────────────────────────────────
    //

        interface INodeGroup extends IBaseNode {
            sub: IBaseNode[ ];
            nonCapture?: boolean;
        }

    //
    // ─── ASSERT BLOCK ───────────────────────────────────────────────────────────────
    //

        interface INodeAssert extends IBaseNode {
            assertionType: string;
            sub: IBaseNode[ ];
        }

    //
    // ─── ASSERT LOOKAHEAD ───────────────────────────────────────────────────────────
    //

        interface INodeLookahead extends INodeAssert {
            statement: IBaseNode;
            status: boolean; 
        }

    // ────────────────────────────────────────────────────────────────────────────────

}