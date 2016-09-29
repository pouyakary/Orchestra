
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    // regex-sequence.quartet
    const sequenceRegEx = /(?:^\(.*\)$|^\[.*\]$)/;

//
// ─── TO UNICODE ─────────────────────────────────────────────────────────────────
//

    function quartetUnicodify ( text ) {
        let result = [ ];
        for ( let character of text ) {
            result.push( getUnicodeCharacter( character ) );
        }
        return result.join('');
    }

//
// ─── GET UNICODE CHARACTER ──────────────────────────────────────────────────────
//

    function getUnicodeCharacter ( character ) {
        let num = character.charCodeAt( 0 ).toString( 16 ).toUpperCase( );
        let size = 4 - num.length;
        for ( let index = 0; index < size; index++ ) {
            num = '0' + num;
        }
        return '\\u' + num;
    }

//
// ─── SEQUENCE MAKER ─────────────────────────────────────────────────────────────
//

    function quartetSequence ( code ) {
        if ( sequenceRegEx.test( code ) ) return code;
        return ( quartetGetStringLength( code ) <= 1 )? code : '(?:' + code + ')';
    }

//
// ─── ENCODE TEXT ────────────────────────────────────────────────────────────────
//

    function quartetEncodeText ( code ) {
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
                    result.push( `\\${ character }` );
                    break;
                case ' ':
                    result.push( '&nbsp;');
                    break;
                default:
                    result.push( character );
            }
        }
        return quartetEncodeHTML( result.join('') );
    }

//
// ─── SPACE ENCODE ───────────────────────────────────────────────────────────────
//

    function quartetSpaceEncode ( text ) {
        return text.replace(/ /g, '&nbsp;');
    }

//
// ─── GET STRING LENGTH ──────────────────────────────────────────────────────────
//

    function quartetGetStringLength ( text ) {
        return text.replace('&nbsp;', '').length;
    }

//
// ─── SPACE DECODE ───────────────────────────────────────────────────────────────
//

    function quartetSpaceDecode ( text ) {
        return text.replace( /\\u0020/g, ' ' );
    }

//
// ─── MAKE ALPHABET ──────────────────────────────────────────────────────────────
//

    function quartetAlphabet ( text ) {
        return quartetEncodeHTML( ( text.length === 1 )? text[ 0 ] : '[' + text.join('') + ']' );
    }

//
// ─── ENCODE FOR HTML ────────────────────────────────────────────────────────────
//

    function quartetEncodeHTML ( text ) {
        return text.replace( /<|>/, match => {
            switch ( match ) {
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
            }
        });
    }

// ────────────────────────────────────────────────────────────────────────────────
