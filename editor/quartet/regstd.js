
//
// Copyright © 2016-present Pouya Kary. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const sequenceRegEx =
        // ../../orchestras/regex-sequence.orchestra
        /^(?:\(.*\)|\[.*\])$/

    const htmlSpecialEntities =
        // ../../orchestras/quartet-html-entities.orchestra
        /&(?:nbsp|#160|gt|lt);/g

    const selectedBlockHTMl =
        // ../../orchestras/html-entities.orchestra
        /\<span class\="console\-highlight\-active\-block"\>(.*)\<\/span\>/g

//
// ─── HTML TEXT LENGTH COUNTER ───────────────────────────────────────────────────
//

    function countHTMLEmbeddedTextLength ( text ) {
        const element = document.createElement('div')
        element.innerHTML = text
        return element.innerText.length
    }

//
// ─── TO UNICODE ─────────────────────────────────────────────────────────────────
//

    function quartetUnicodify ( text ) {
        let result = [ ]
        for ( let character of text )
            result.push( getUnicodeCharacter( character ) )
        return result.join('')
    }

//
// ─── GET REGEX FROM HTML ────────────────────────────────────────────────────────
//

    function quartetGetWildcardFromQuartetEncodedHTML ( code ) {
        return code.replace( selectedBlockHTMl  , ( val, matchOne ) => matchOne )
                   .replace( /&nbsp;/g          , ' '                           )
                   .replace( /&gt;/g            , '>'                           )
                   .replace( /&lt;/g            , '<'                           )
    }

//
// ─── GET UNICODE CHARACTER ──────────────────────────────────────────────────────
//

    function getUnicodeCharacter ( character ) {
        let num = character.charCodeAt( 0 ).toString( 16 ).toUpperCase( )
        let size = 4 - num.length
        for ( let index = 0; index < size; index++ ) num = '0' + num
        return '\\u' + num
    }

//
// ─── SEQUENCE MAKER ─────────────────────────────────────────────────────────────
//

    function quartetSequence ( code ) {
        const length = countHTMLEmbeddedTextLength( code )
        if ( length <= 1 )
            return code
        else
            return '(?:' + code + ')'
    }

//
// ─── ENCODE TEXT ────────────────────────────────────────────────────────────────
//

    function quartetEncodeText ( code ) {
        let result = [ ]
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
                    result.push( `\\${ character }` )
                    break
                case ' ':
                    result.push( '&nbsp;')
                    break
                default:
                    result.push( character )
            }
        }
        return quartetEncodeHTML( result.join('') )
    }

//
// ─── SPACE ENCODE ───────────────────────────────────────────────────────────────
//

    function quartetSpaceEncode ( text ) {
        return text.replace(/ /g, '&nbsp;')
    }

//
// ─── SPACE DECODE ───────────────────────────────────────────────────────────────
//

    function quartetSpaceDecode ( text ) {
        return text.replace( /\\u0020/g, ' ' )
    }

//
// ─── MAKE ALPHABET ──────────────────────────────────────────────────────────────
//

    function quartetAlphabet ( sigma ) {
        if ( sigma.length === 0 )
            return ''

        return quartetEncodeHTML(
                ( sigma.length === 1 )
                    ? sigma[ 0 ]
                    : '[' + sigma.join('') + ']'
            )
    }

//
// ─── ENCODE FOR HTML ────────────────────────────────────────────────────────────
//

    function quartetEncodeHTML ( text ) {
        return text.replace( /<|>/, match => {
            switch ( match ) {
                case '<':
                    return '&lt;'
                case '>':
                    return '&gt;'
                }})}

// ────────────────────────────────────────────────────────────────────────────────
