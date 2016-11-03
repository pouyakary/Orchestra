
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

namespace concerto {

    //
    // ─── MAIN ───────────────────────────────────────────────────────────────────────
    //

        export function compile ( regulexAST: blueprints.regulex.IRegExAST ) {

            // running the preprocessor on the ast
            let normalizedAST   = compilers.level0.fixLookahead( regulexAST );

            // first level compilation: Regulex AST to Concerto AST
            let concertoAST     = compilers.level1.compile( normalizedAST.tree );

            // then we compile the concerto ast to recursive array ast
            let recarrAST       = compilers.level2.compile( concertoAST );

            // at the end we compile the recursive array into the Quartet XML
            let quartetXML      = compilers.level3.compile( recarrAST );

            // done!
            return quartetXML.replace( /\\"|"|\n/g, match => {
                if ( match === '"' )
                    return '\\"';
                if ( match === '\n' )
                    return '';
            });
        }

    // ────────────────────────────────────────────────────────────────────────────────

}