
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

    const kit = require('./../kit');

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//

    module.exports = node => {
        // if range is simple 'Alphabet' / 'Anything But' block
        let simpleSet = true;
        if ( node.ranges !== undefined ) {
            for ( let range of node.ranges ) {
                if ( !( range === 'az' || range === 'AZ' || range === '09' ) ) {
                    simpleSet = false;

        // Range Block
        if ( node.chars === '' && node.ranges.length === 1 && node.exclude === undefined )
            return composeRangeBlock( node );

        // Alphabet Block
        if ( simpleSet )
            return composeForSimpleAlphabetOrAnythingBut( node );
    }

//
// ─── COMPOSE RANGE BLOCK ────────────────────────────────────────────────────────
//

    function composeRangeBlock ( node ) {
        return kit.compose({
            type: 'range',
            fields: [
                { key: 'start', val: node.ranges[ 0 ][ 0 ] },
                { key: 'end', val: node.ranges[ 0 ][ 1 ] }
            ]
        });
    }

//
// ─── COMPOSE FOR SIMPLE ALPHABET ────────────────────────────────────────────────
//

    function composeForSimpleAlphabetOrAnythingBut ( node ) {
        // fill ranges fields
        let sets = {
            numbers: 'FALSE',
            lowercase: 'FALSE',
            uppercase: 'FALSE',
        }
        if ( node.ranges !== undefined )
            for ( let range of node.ranges )
                switch ( range ) {
                    case '09':
                        sets.numbers = 'TRUE';
                        break;
                    case 'az':
                        sets.lowercase = 'TRUE';
                        break;
                    case 'AZ':
                        sets.uppercase = 'TRUE';
                        break;
                }

        // composing final stuff:
        return kit.compose({
            type: ( node.exclude )? 'anything_but': 'alphabet',
            fields:[
                { key: 'numbers'    , val: sets.numbers     },
                { key: 'lowercase'  , val: sets.lowercase   },
                { key: 'uppercase'  , val: sets.uppercase   },
                { key: 'other'      , val: node.chars       },
            ]
        })
    }

// ────────────────────────────────────────────────────────────────────────────────

