
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

    /** @type {string} */
    const parseRegEx = require('regulex').parse;

//
// ─── MAIN COMPILER ──────────────────────────────────────────────────────────────
//

    /** @param {string} regX
     *  @return {string} */
    function concertoCompileRegExpToQuartetXML ( regX ) {
        let regexAST = parseRegEx( regX );
        let childrenXML = concertoMainGenerator( regexAST );
        let finalXML = concertoWrapMainXML( childrenXML );
        return finalXML.replace( /\"/g, '\\"' );
    }

//
// ─── MAIN GENERATOR ─────────────────────────────────────────────────────────────
//

    function concertoMainGenerator ( ast ) {
        let resultTags = [ ];
        for ( let node of ast.tree ) {
            resultTags.push( concertoPeakNodeCompiler( node ) );
        }
        return resultTags.join('');
    }

//
// ─── WRAP THE THE WHOLE BLOCK ───────────────────────────────────────────────────
//

    function concertoWrapMainXML ( xml ) {
        return `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="compose" id="composer" deletable="false" x="40" y="40"><statement name="blocks">${ xml }</statement></block></xml>`;
    }

//
// ─── NODE COMPILER SWITCHER ─────────────────────────────────────────────────────
//

    function concertoPeakNodeCompiler ( node ) {
        let blockXML;

        // compose block
        switch ( node.type ) {
            case 'exact':
                blockXML = concertoComposeXMLforExactNode( node );
                break;
        }

        // apply repeat
        blockXML = concertoApplyRepeatForNode( node, blockXML );

        // done
        return blockXML;
    }

//
// ─── COMPOSE XML FOR EXACT NODE ─────────────────────────────────────────────────
//

    function concertoComposeXMLforExactNode ( node ) {
        return concertoGenerateBlockXMl({
            type: 'encode',
            fields: [
                { key: 'text', val: node.chars }
            ]
        });
    }

//
// ─── APPLY REPEAT ───────────────────────────────────────────────────────────────
//

    function concertoApplyRepeatForNode ( node , blockXML ) {
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
        return concertoGenerateBlockXMl({
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
        return concertoGenerateBlockXMl({
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
        return concertoGenerateBlockXMl({
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
        return concertoGenerateBlockXMl({
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

//
// ─── GENERATE XML FOR BLOCKS ────────────────────────────────────────────────────
//

    function concertoGenerateBlockXMl ( block ) {
        let result = [ `<block type="${ block.type }" id="${ concertoGenerateRandomId( ) }">` ];

        // adding fields
        if ( block.fields !== undefined ) {
            for ( let field of block.fields ) {
                result.push( `<field name="${ field.key }">${ field.val }</field>` );
            }
        }

        // adding children
        if ( block.statements !== undefined ) {
            for ( let statement of block.statements ) {
                result.push( `<statement name="${ statement.name }">${ statement.blocks.join('') }</statement>`);
            }
        }

        // done
        result.push('</block>');
        return result.join('');
    }

//
// ─── RANDOM ID GENERATOR ────────────────────────────────────────────────────────
//

    function concertoGenerateRandomId ( ) {
        let result = '';
        function generateRandomChar ( ) {
            let n = Math.floor( Math.random( ) * 62 );
            if ( n < 10 ) return n;
            if ( n < 36 ) return String.fromCharCode( n + 55 );
            return String.fromCharCode( n + 61 );
        }
        while ( result.length < 20 ) result += generateRandomChar( );
        return result;
    }

// ────────────────────────────────────────────────────────────────────────────────
