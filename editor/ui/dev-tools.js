
//
// Copyright © 2017-present Kary Foundation, Inc. All rights reserved.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── INIT DEVELOPER TOOLS INFRASTRUCTURE ────────────────────────────────────────
//

    function initDeveloperToolsInfrastructure ( ) {
        overrideDeveloperToolsAPI( )
        printDeveloperToolsWelcomeMessage( )
    }

//
// ─── OPEN DEV TOOLS ─────────────────────────────────────────────────────────────
//

    function openDeveloperToolsWindow ( ) {
        OrchestraWindow.openDevTools({ detach: true })
    }

//
// ─── CONSOLE WELCOME MESSAGE ────────────────────────────────────────────────────
//

    function printDeveloperToolsWelcomeMessage ( ) {
        const firstStyle =
            "font-weight: bold;" +
            "font-size: 14px;" +
            "font-family: Helvetica, Arial;"
        const secondStyle =
            "font-size: 14px;" +
            "font-family: Helvetica, Arial;"

        console.log( '\n%cOrchestra Studio %c\u2022 Copyright 2016-present, Kary Foundation, Inc.\n\n', firstStyle, secondStyle )
    }

//
// ─── OVERRIDE DEVELOPER TOOLS API ───────────────────────────────────────────────
//

    function overrideDeveloperToolsAPI ( ) {
        const clearFunction = console.clear
        console.clear = ( ) => {
            clearFunction( )
            printDeveloperToolsWelcomeMessage( )
        }
    }

// ────────────────────────────────────────────────────────────────────────────────
