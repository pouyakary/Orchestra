
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

module blueprints.block {

    //
    // ─── STATEMENT BLUEPRINTS ───────────────────────────────────────────────────────
    //

        export interface IStatement {
            name: string;
            children: IBlock[ ];
        }

    //
    // ─── FIELDS ─────────────────────────────────────────────────────────────────────
    //

        export interface IField {
            name: string;
            value: string;
        }

    //
    // ─── BASE BLOCK ─────────────────────────────────────────────────────────────────
    //

        export interface IBlock {
            /** Indicates what __Quartet block__ is this */
            type: string;

            /** Fields */
            fields?: IField[ ];

            /** Children */
            children?: IStatement[ ];
        }

    //
    // ─── LEVEL ONE SWITCHER ─────────────────────────────────────────────────────────
    //

        export interface IIntermediateNode {
            type: string;
            node: blueprints.regulex.IBaseNode;
            value: IBlock[ ]
        }

    // ────────────────────────────────────────────────────────────────────────────────

}