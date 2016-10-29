
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    module.exports = startingAdder

//
// ─── STARTING ADDER ─────────────────────────────────────────────────────────────
//

    function startingAdder ( arr ) {
        return {
            statement: arr[ 0 ],
            next: ( arr.length > 1 )? recursiveAdder( arr.slice( 1 ) ) : null
        };
    }

//
// ─── RECURSIVE ADDER ────────────────────────────────────────────────────────────
//

    function recursiveAdder ( arr ) {
        if ( arr.length > 1 )
            if ( arr[ 0 ].constructor === Array )
                startingAdder( arr.slice( 1 ) )
            else
                return { next: recursiveAdder( arr.slice( 1 ) ) }
        else
            return { next: arr[ 0 ] }
    }

// ────────────────────────────────────────────────────────────────────────────────

