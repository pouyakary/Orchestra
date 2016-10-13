
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

    const kit = require('./../kit')

//
// ─── COMPOSE XML FOR EXACT NODE ─────────────────────────────────────────────────
//

    module.exports = node => {
        return kit.compose({
            type: 'encode',
            fields: [{
                key: 'text', val: node.chars
            }]})}

// ────────────────────────────────────────────────────────────────────────────────
