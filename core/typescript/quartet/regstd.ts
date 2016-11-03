
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace orchestra.quartet.regstd {

    //
    // ─── CONSTANTS ──────────────────────────────────────────────────────────────────
    //

        // ../../quartets/regex-sequence.quartet
        export const sequenceRegEx = /^(?:\(.*\)|\[.*\])$/;

        // ../../quartets/quartet-html-entities.quartet
        export const htmlSpecialEntities = /&(?:nbsp|#160|gt|lt);/g;

        // ../../quartets/html-entities.quartet
        export const selectedBlockHTMl = /\<span class\="console\-highlight\-active\-block"\>(.*)\<\/span\>/g;

    //
    // ─── TO UNICODE ─────────────────────────────────────────────────────────────────
    //

        export function quartetUnicodify ( text: string ) {
            let result = [ ];
            for ( let character of text )
                result.push( getUnicodeCharacter( character ) );
            return result.join('');
        }

    //
    // ─── GET REGEX FROM HTML ────────────────────────────────────────────────────────
    //

        export function quartetGetWildcardFromQuartetEncodedHTML ( code: string ) {
            return code.replace( selectedBlockHTMl  , ( val, matchOne ) => matchOne )
                    .replace( /&nbsp;/g          , ' '                           )
                    .replace( /&gt;/g            , '>'                           )
                    .replace( /&lt;/g            , '<'                           );
        }

    //
    // ─── GET UNICODE CHARACTER ──────────────────────────────────────────────────────
    //

        export function getUnicodeCharacter ( character: string ) {
            let num = character.charCodeAt( 0 ).toString( 16 ).toUpperCase( );
            let size = 4 - num.length;
            for ( let index = 0; index < size; index++ ) num = '0' + num;
            return '\\u' + num;
        }

    //
    // ─── SEQUENCE MAKER ─────────────────────────────────────────────────────────────
    //

        export function quartetSequence ( code: string ) {
            if ( sequenceRegEx.test( code ) ) return code;
            return ( quartetGetStringLength( code ) <= 1 )? code : '(?:' + code + ')';
        }

    //
    // ─── ENCODE TEXT ────────────────────────────────────────────────────────────────
    //

        export function quartetEncodeText ( code: string ): string {
            let result = [ ];
            for ( let character of code ) {
                switch ( character ) {
                    case '.':
                    case '\\':
                    case '+':
                    case '*':
                    case '?':
                    case '[':
                    case '^':
                    case ']':
                    case '$':
                    case '(':
                    case ')':
                    case '{':
                    case '}':
                    case '=':
                    case '!':
                    case '<':
                    case '>':
                    case '|':
                    case ':':
                    case '-':
                    case '/':
                        result.push( `\\${ character }` );
                        break;
                    case ' ':
                        result.push( '&nbsp;')
                        break;
                    default:
                        let charCode = character.charCodeAt( 0 );

                        // we add basic alphabet as basic alphabet they are safe ASCII
                        // and extended ASCII.
                        if ( 32 < charCode && charCode < 255 )
                            result.push( character );

                        // for codes that don't have a safe ASCII representation we
                        // would encode them to safe unicode escape sequences.
                        else result.push( getUnicodeCharacter( character ) );
                }
            }
            return quartetEncodeHTML( result.join('') );
        }

    //
    // ─── SPACE ENCODE ───────────────────────────────────────────────────────────────
    //

        export function quartetSpaceEncode ( text: string ) {
            return text.replace(/ /g, '&nbsp;');
        }

    //
    // ─── GET STRING LENGTH ──────────────────────────────────────────────────────────
    //

        export function quartetGetStringLength ( code: string ) {
            return code.replace( htmlSpecialEntities, ' ' ).length;
        }

    //
    // ─── SPACE DECODE ───────────────────────────────────────────────────────────────
    //

        export function quartetSpaceDecode ( text: string ) {
            return text.replace( /\\u0020/g, ' ' );
        }

    //
    // ─── MAKE ALPHABET ──────────────────────────────────────────────────────────────
    //

        export function quartetAlphabet ( sigma: string[ ] ) {
            if ( sigma.length === 0 ) return '';
            return quartetEncodeHTML(
                ( sigma.length === 1 )? sigma[ 0 ] : '[' + sigma.join('') + ']'
            );
        }

    //
    // ─── ENCODE FOR HTML ────────────────────────────────────────────────────────────
    //

        export function quartetEncodeHTML ( text: string ) {
            return text.replace( /<|>/, match => {
                switch ( match ) {
                    case '<':
                        return '&lt;';
                    case '>':
                        return '&gt;';
                    }})}

    // ────────────────────────────────────────────────────────────────────────────────

}