
//
// Copyright © 2017-present Kary Foundation, Inc. All rights reserved.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── ACTIVATE FLAGS FOR BUILD ───────────────────────────────────────────────────
//

    function updateFlagsForLatestBuild ( ) {
        const latestCompiledRegex = fetchLatestCompiledRegExp( )

        // resetting flags
        activatedFlags = Object.assign({ }, defaultActivatedFlagsValue )

        // checking for multiline flag (m)
        if ( checkIfRegExpIsMultiLine( latestCompiledRegex ) )
            activatedFlags.m = true
    }

//
// ─── CHECK IF REGEXP IS MULTILINE ───────────────────────────────────────────────
//

    function checkIfRegExpIsMultiLine ( regX ) {
        while ( true ) {
            const match = detectOrchestraWithEOL.exec( regX )
            if ( match === null )
                return false
            const capture = match[ 1 ]
            if ( checkIfEmptyExcludeSet.test( capture ) ) {
                const regexpBasedOnSet = new RegExp( capture )
                const testCase = "\n\r\v\f\u0085\u2028\u2029"
                if ( regexpBasedOnSet.test( testCase ) ) {
                    return true
                }
            } else {
                return true
            }
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
