

//
// Copyright © 2016-presentPouya Kary. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── SUPPORTING FUNCTIONS ───────────────────────────────────────────────────────
//

    function getHelpURLbyID ( id ) {
        return `javascript: openHelpWindowForReference("${id}")`
    }

//
// ─── COMPOSE ────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'compose' ] = {
        helpUrl: getHelpURLbyID( 'compose' ),
        init( ) {
            this.appendDummyInput( )
                .appendField( "Composer" )
            this.appendStatementInput( "blocks" )
                .setCheck( "String" )
            this.setInputsInline( false )
            this.setColour( 120 )
            this.setTooltip( '' )
            this.setHelpUrl( 'compose' )
        }
    }

    QuartetGenerator[ 'compose' ] = block => {
        const statements_children =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim()
        return statements_children.trim()
    }

//
// ─── ALPHABET ───────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'alphabet' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Alphabet" )
                .appendField( "0-9" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "numbers" )
                .appendField( "a-z" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "lowercase" )
                .appendField( "A-Z" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "uppercase" )
                .appendField( "Other" )
                .appendField( new Blockly.FieldTextInput( "" ), "other" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 260 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'alphabet' ] = block => {
        const checkbox_numbers =
            block.getFieldValue( 'numbers' ) == 'TRUE'
        const checkbox_lowercase =
            block.getFieldValue( 'lowercase' ) == 'TRUE'
        const checkbox_uppercase =
            block.getFieldValue( 'uppercase' ) == 'TRUE'
        const text_other =
            block.getFieldValue( 'other' )

        let code = ''
        if ( checkbox_numbers )
            code += '0-9'
        if ( checkbox_lowercase )
            code += 'a-z'
        if ( checkbox_uppercase )
            code += 'A-Z'
        code += quartetEncodeText( text_other )

        return '[ ' + code + ' ]'
    }

//
// ─── ENCODE UNICODE ─────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'unicode' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Encode Unicode" )
                .appendField( new Blockly.FieldTextInput( "" ), "text" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 330 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'unicode' ] = block =>
        quartetUnicodify( block.getFieldValue( 'text' ) )

//
// ─── ENCODE ─────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'encode' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Plain Text" )
                .appendField( new Blockly.FieldTextInput( "" ), "text" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 330 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'encode' ] = block =>
        quartetEncodeText( block.getFieldValue( 'text' ) )

//
// ─── FREE FORM REGEX ────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'free_form_regex' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Unsafe Wildcard" )
                .appendField( new Blockly.FieldTextInput( "" ), "regex" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 330 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'free_form_regex' ] = block =>
        quartetSpaceEncode( block.getFieldValue( 'regex' ) )

//
// ─── MORE THAN ONE ──────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'one_or_more' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "One or more" )
            this.appendStatementInput( "blocks" )
                .setCheck( "String" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 210 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'one_or_more' ] = block => {
        const statements_regex =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim()
        return `${quartetSequence( statements_regex )}+`
    }

//
// ─── ANY NUMBER OF ──────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'any_number_of' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Any number of" )
            this.appendStatementInput( "blocks" )
                .setCheck( "String" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 210 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'any_number_of' ] = block => {
        const statements_regex =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim()
        return `${quartetSequence( statements_regex )}*`
    }

//
// ─── ANY CHARACTER ──────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'any' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Any character except of New Line" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'any' ] = block => '.'

//
// ─── MAYBE ──────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'maybe' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Maybe" )
            this.appendStatementInput( "blocks" )
                .setCheck( "String" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 210 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'maybe' ] = block => {
        const statements_name =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim()
        return quartetSequence( statements_name ) + '?'
    }

//
// ─── ONE OF ─────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'one_of' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "One of options" )
            this.appendStatementInput( "blocks" )
                .setCheck( "QuartetOption" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 210 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'one_of' ] = block => {
        function cut ( text, start, end ) {
            return text.substring( 0, start ) + text.substring( end )
        }

        const statements_items =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim( )

        if ( statements_items.startsWith( '<' ) ) {
            if ( statements_items.length === 52 )
                return ''
            else
                return quartetSequence( cut( statements_items, 45, 46 ) )
        } else {
            return quartetSequence( statements_items.substring( 1 ) )
        }
    }

//
// ─── QUARTET OPTION ──────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'option' ] = {
        init( ) {
            this.appendStatementInput( "blocks" )
                .setCheck( null )
                .appendField( "Option" )
                .setCheck( "String" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "QuartetOption" )
            this.setNextStatement( true, "QuartetOption" )
            this.setColour( 160 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'option' ] = block =>
        '|' + QuartetGenerator.statementToCode( block, 'blocks' ).trim( )

//
// ─── START OF THE LINE ──────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'line_start' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Start of the Input" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'line_start' ] = block => '^'

//
// ─── END OF THE LINE ────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'line_end' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "End of the Input" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'line_end' ] = block => '$'

//
// ─── WHITE SPACE ────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'whitespace' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Whitespace" )
                .appendField( "Space" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "space" )
                .appendField( "Tab" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "tab" )
                .appendField( "Linefeed (\\n)" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "linefeed" )
            this.setInputsInline( false )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }


    QuartetGenerator[ 'whitespace' ] = block => {
        const checkbox_space =
            block.getFieldValue( 'space' ) == 'TRUE'
        const checkbox_tab =
            block.getFieldValue( 'tab' ) == 'TRUE'
        const checkbox_linefeed =
            block.getFieldValue( 'linefeed' ) == 'TRUE'

        if ( checkbox_space || checkbox_linefeed || checkbox_tab ) {
            const chars = []
            if ( checkbox_space )
                chars.push( '&#160' )
            if ( checkbox_tab )
                chars.push( '\\t' )
            if ( checkbox_linefeed )
                chars.push( '\\n' )

            return quartetAlphabet( chars )
        } else {
            return ''
        }
    }

//
// ─── SPECIAL WHITE SPACE ────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'special_whitespace' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Special Whitespace" )
            this.appendDummyInput( )
                .appendField( "Vertical Tab (\\v)" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "vtab" )
                .appendField( "NUL (\\0)" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "nul" )
            this.appendDummyInput( )
                .appendField( "Carriage Return (\\r)" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "carrige" )
            this.appendDummyInput( )
                .appendField( "Form-feed (\\f)" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "formfeed" )
            this.setInputsInline( false )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'special_whitespace' ] = block => {
        const checkbox_vtab =
            block.getFieldValue( 'vtab' ) == 'TRUE'
        const checkbox_nul =
            block.getFieldValue( 'nul' ) == 'TRUE'
        const checkbox_carrige =
            block.getFieldValue( 'carrige' ) == 'TRUE'
        const checkbox_formfeed =
            block.getFieldValue( 'formfeed' ) == 'TRUE'

        const code = []
        if ( checkbox_vtab )
            code.push( '\\v' )
        if ( checkbox_nul )
            code.push( '\\0' )
        if ( checkbox_carrige )
            code.push( '\\r' )
        if ( checkbox_formfeed )
            code.push( '\\f' )

        return quartetAlphabet( code )
    }

//
// ─── RANGE ──────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'range' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Range from" )
                .appendField( new Blockly.FieldTextInput( "a" ), "start" )
                .appendField( "to" )
                .appendField( new Blockly.FieldTextInput( "z" ), "end" )
            this.setInputsInline( false )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 260 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'range' ] = block => {
        const text_start =
            block.getFieldValue( 'start' )
        const text_end =
            block.getFieldValue( 'end' )
        return `[${text_start}-${text_end}]`
    }

//
// ─── MATCH ──────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'match' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Remember Match" )
            this.appendStatementInput( "blocks" )
                .setCheck( "String" )
            this.setInputsInline( false )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 210 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'match' ] = block => {
        let statements_match =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim()
        if ( /^\(\?\:.*\)$/.test( statements_match ) )
            return `(${statements_match.substring( 3, statements_match.length - 1 )})`
        else
            return `(${statements_match})`
    }

//
// ─── SIGMA ──────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'sigma' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Sigma (Advanced Alphabet)" )
            this.appendStatementInput( "blocks" )
                .setCheck( "SigmaType" )
            this.setInputsInline( false )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 260 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'sigma' ] = block => {
        const statements_sequence =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim( )
        return `[${statements_sequence}]`
    }

//
// ─── EXCLUDE SET ────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'exclude' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Exclude Set (Advanced Anything But)" )
            this.appendStatementInput( "blocks" )
                .setCheck( "SigmaType" )
            this.setInputsInline( false )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 260 )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'exclude' ] = block => {
        const statements_sequence =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim( )
        return `[^${statements_sequence}]`
    }

//
// ─── SIGMA RANGE ────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'sigma_range' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Sigma Range from" )
                .appendField( new Blockly.FieldTextInput( "a" ), "start" )
                .appendField( "to" )
                .appendField( new Blockly.FieldTextInput( "z" ), "end" )
            this.setPreviousStatement( true, "SigmaType" )
            this.setNextStatement( true, "SigmaType" )
            this.setColour( 230 )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'sigma_range' ] = block =>
        `${block.getFieldValue( 'start' )}-${block.getFieldValue( 'end' )}`

//
// ─── SIGMA CHAR INPUT ───────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'sigma_chars' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Sigma Characters" )
                .appendField( new Blockly.FieldTextInput( "" ), "text" )
            this.setPreviousStatement( true, "SigmaType" )
            this.setNextStatement( true, "SigmaType" )
            this.setColour( 230 )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'sigma_chars' ] = block =>
        quartetEncodeText( block.getFieldValue( 'text' ) )

//
// ─── SIGMA WILDCARD ESCAPES ─────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'sigma_wildcard' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Sigma Wildcard Escapes" )
                .appendField( new Blockly.FieldTextInput( "" ), "escapes" )
            this.setPreviousStatement( true, "SigmaType" )
            this.setNextStatement( true, "SigmaType" )
            this.setColour( 230 )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'sigma_wildcard' ] = block =>
        block.getFieldValue( 'escapes' )

//
// ─── ANYTHING BUT ───────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'anything_but' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Anything but " )
                .appendField( "0-9" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "numbers" )
                .appendField( "a-z" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "lowercase" )
                .appendField( "A-Z" )
                .appendField( new Blockly.FieldCheckbox( "FALSE" ), "uppercase" )
                .appendField( "Other" )
                .appendField( new Blockly.FieldTextInput( "" ), "other" )
            this.setInputsInline( true )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 260 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'anything_but' ] = block => {
        const checkbox_numbers =
            block.getFieldValue( 'numbers' ) == 'TRUE'
        const checkbox_lowercase =
            block.getFieldValue( 'lowercase' ) == 'TRUE'
        const checkbox_uppercase =
            block.getFieldValue( 'uppercase' ) == 'TRUE'
        const text_other =
            block.getFieldValue( 'other' )

        let code = ''
        if ( checkbox_numbers )
            code += '0-9'
        if ( checkbox_lowercase )
            code += 'a-z'
        if ( checkbox_uppercase )
            code += 'A-Z'
        code += quartetEncodeText( text_other )

        return `[^${code}]`
    }

//
// ─── COMMENT ────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'comment' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "#" )
                .appendField( new Blockly.FieldTextInput( "Write your comment here" ), "comment" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 290 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'comment' ] = block => ''

//
// ─── REPEAT ─────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'repeat' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Repeat" )
                .appendField( new Blockly.FieldTextInput( "" ), "count" )
                .appendField( "times" )
            this.appendStatementInput( "blocks" )
                .setCheck( "String" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 210 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'repeat' ] = block => {
        const text_count =
            block.getFieldValue( 'count' )
        const statements_code =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim( )

        return `${quartetSequence( statements_code )}{${text_count}}`
    }

//
// ─── REPEAT AT LEAST ────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'repeat_at_least' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Repeat at least" )
                .appendField( new Blockly.FieldTextInput( "" ), "count" )
                .appendField( "times" )
            this.appendStatementInput( "blocks" )
                .setCheck( "String" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 210 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'repeat_at_least' ] = block => {
        const text_count =
            block.getFieldValue( 'count' )
        const statements_code =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim( )

        return `${quartetSequence( statements_code )}{${text_count},}`
    }

//
// ─── REPEAT IN RANGE ────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'repeat_in_range' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Repeat in range of" )
                .appendField( new Blockly.FieldTextInput( "" ), "start" )
                .appendField( "to" )
                .appendField( new Blockly.FieldTextInput( "" ), "end" )
            this.appendStatementInput( "blocks" )
                .setCheck( "String" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 210 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'repeat_in_range' ] = block => {
        const text_start =
            block.getFieldValue( 'start' )
        const text_end =
            block.getFieldValue( 'end' )
        const statements_code =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim( )
        const result =
            `${quartetSequence( statements_code )}{${text_start},${text_end}}`

        return result
    }

//
// ─── LOOKAHEAD ──────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'lookahead' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Accept " )
            this.appendStatementInput( "blocks" )
                .setCheck( "String" )
            this.appendDummyInput( )
                .appendField( "If it was" )
                .appendField( new Blockly.FieldDropdown( [
                    ["followed", "positive"],
                    ["not followed", "negative"]
                ] ), "status" )
                .appendField( "by" )
            this.appendStatementInput( "lookahead" )
                .setCheck( "String" )
            this.setInputsInline( false )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 210 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'lookahead' ] = block => {
        const status =
            block.getFieldValue( 'status' ) === 'negative'
        const statements_match =
            QuartetGenerator.statementToCode( block, 'blocks' ).trim( )
        const statements_lookahead =
            QuartetGenerator.statementToCode( block, 'lookahead' ).trim( )
        const reverseSign =
            ( status ) ? '!' : '='

        if ( status )
            block.setColour( 0 )
        else
            block.setColour

        return `${quartetSequence( statements_match )}(?${reverseSign}${statements_lookahead})`
    }

//
// ─── WORD CHAR ──────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'word' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Word" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'word' ] = block => '\\w'

//
// ─── ANYTHING BUT WORD ──────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'anything_but_word' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Anything but Word" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'anything_but_word' ] = block => '\\W'

//
// ─── ANYTHING BUT SPACE ─────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'anything_but_whitespace' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Anything but Whitespace" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'anything_but_whitespace' ] = block => '\\S'

//
// ─── DIGIT ──────────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'digit' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Digit" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'digit' ] = block => '\\d'

//
// ─── ANYTHING BUT DIGIT ─────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'anything_but_digit' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Anything but Digit" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'anything_but_digit' ] = block => '\\D'

//
// ─── WORD BOUNDARY ──────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'boundary' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Word Boundary" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'boundary' ] = block => '\\b'

//
// ─── ANYTHING BUT WORD BOUNDARY ─────────────────────────────────────────────────
//

    Blockly.Blocks[ 'anything_but_boundary' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Anything but Word Boundary" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'anything_but_boundary' ] = block => '\\B'

//
// ─── ALL SPACES ─────────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'all_whitespace_chars' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "All Whitespace Characters" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'all_whitespace_chars' ] = block => '\\s'

//
// ─── EVERY CHARACTER ────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'dot_all' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "Any Character" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'dot_all' ] = block => '[^]'

//
// ─── EVERY CHARACTER ────────────────────────────────────────────────────────────
//

    Blockly.Blocks[ 'eol' ] = {
        init( ) {
            this.appendDummyInput( )
                .appendField( "End Of Line" )
            this.setPreviousStatement( true, "String" )
            this.setNextStatement( true, "String" )
            this.setColour( 20 )
            this.setTooltip( '' )
            this.setHelpUrl( 'http://www.example.com/' )
        }
    }

    QuartetGenerator[ 'eol' ] = block =>
        // ../../orchestras/eol.orchestra
        '(?:\\r\\n|[\\n\\r\\v\\f\\u0085\\u2028\\u2029])'

// ────────────────────────────────────────────────────────────────────────────────

