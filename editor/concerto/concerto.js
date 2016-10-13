
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

    const kit       = require('./concerto/kit')
    const nodes     = require('./concerto/nodes')

//
// ─── MAIN COMPILER ──────────────────────────────────────────────────────────────
//

    /** @param {string} regX
     *  @return {string} */
    function concertoCompileRegExpToQuartetXML ( regX ) {
        let regexAST    = regulex.parse( regX )
        let childrenXML = concertoMainGenerator( regexAST )
        let finalXML    = concertoWrapMainXML( childrenXML )

        return finalXML.replace( /\"/g, '\\"' )
    }

//
// ─── MAIN GENERATOR ─────────────────────────────────────────────────────────────
//

    function concertoMainGenerator ( ast ) {
        let resultTags = [ ]
        for ( let node of ast.tree )
            resultTags.push( concertoPeakNodeCompiler( node ) )
        return resultTags.join('')
    }

//
// ─── WRAP THE THE WHOLE BLOCK ───────────────────────────────────────────────────
//

    function concertoWrapMainXML ( xml ) {
        return `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="compose" id="composer" deletable="false" x="40" y="40"><statement name="blocks">${ xml }</statement></block></xml>`
    }

//
// ─── NODE COMPILER SWITCHER ─────────────────────────────────────────────────────
//

    function concertoPeakNodeCompiler ( node ) {
        let blockXML

        // compose block
        switch ( node.type ) {
            case 'exact':
                blockXML = nodes.exact( node )
                break
            case 'charset':
                blockXML = nodes.charset( node )
                break
            }

        // apply repeat
        blockXML = kit.repeat( node, blockXML )

        // done
        return blockXML
    }

// ────────────────────────────────────────────────────────────────────────────────
