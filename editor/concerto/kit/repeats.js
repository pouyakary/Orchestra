
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

    const compose = require('./toxml.js');

//
// ─── APPLY REPEAT ───────────────────────────────────────────────────────────────
//

    module.exports = ( node, blockXML ) => {
        if ( node.repeat !== undefined ) {
            let min = node.repeat.min;
            let max = node.repeat.max;

            if ( min === 0 && max === 1 ) {
                return concertoStaticRepeatWithType( 'maybe', blockXML );

            } else if ( min === 1 && max === Infinity ) {
                return concertoStaticRepeatWithType( 'one_or_more', blockXML );

            } else if ( min === 0 && max === Infinity ) {
                return concertoStaticRepeatWithType( 'any_number_of', blockXML );

            } else if ( min === max ) {
                return concertoRepeatBlockWithCount( min, blockXML );

            } else if ( min !== Infinity && max === Infinity ) {
                return concertoAtLeastRepeat( min, blockXML );

            } else {
                return concertoComposeRepeatInRange( min, max, blockXML );
            }
        } else {
            return blockXML;
        }
    }

//
// ─── COMPOSE MAYBE REPEAT ───────────────────────────────────────────────────────
//

    function concertoStaticRepeatWithType ( repeatType, blockXML ) {
        return compose({
            type: repeatType,
            statements: [{
                name: 'blocks',
                blocks: [
                    blockXML
                ]
            }]
        });
    }

//
// ─── COMPOSE REPEAT TIMES ───────────────────────────────────────────────────────
//

    function concertoRepeatBlockWithCount ( count, blockXML ) {
        return compose({
            type: 'repeat',
            fields: [{
                key: 'count',
                val: count
            }],
            statements: [{
                name: 'blocks',
                blocks: [
                    blockXML
                ]
            }]
        });
    }

//
// ─── COMPOSE AT LEAST REPEAT ────────────────────────────────────────────────────
//

    function concertoAtLeastRepeat ( min, blockXML ) {
        return compose({
            type: 'repeat_at_least',
            fields: [{
                key: 'count',
                val: min
            }],
            statements: [{
                name: 'blocks',
                blocks: [
                    blockXML
                ]
            }]
        });
    }

//
// ─── COMPOSE REPEAT IN RANGE ────────────────────────────────────────────────────
//

    function concertoComposeRepeatInRange ( min, max, blockXML ) {
        return compose({
            type: 'repeat_in_range',
            fields: [
                { key: 'start', val: min },
                { key: 'end',   val: max },
            ],
            statements: [{
                name: 'blocks',
                blocks: [
                    blockXML
                ]
            }]
        });
    }

// ────────────────────────────────────────────────────────────────────────────────
