
//
// Copyright © 2017-presentPouya Kary. All rights reserved.
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
        overrideDevToolsClearAPI( )
        overrideDevToolsLogAPI( )
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

        originalDevToolsLogFunction(
            '\n%cOrchestra Hall %c\u2022 Copyright 2016-present by Pouya Kary. All rights reserved.\n\n',
            firstStyle, secondStyle )
    }

//
// ─── OVERRIDE DEVELOPER TOOLS API ───────────────────────────────────────────────
//

    function overrideDevToolsClearAPI ( ) {
        const orchestraClearFunction = ( ) => {
            originalDevToolsClearFunction( )
            printDeveloperToolsWelcomeMessage( )
        }
        console.clear = orchestraClearFunction
        clear = orchestraClearFunction
    }

//
// ─── OVERRIDING LOG COMMAND ─────────────────────────────────────────────────────
//

    function overrideDevToolsLogAPI ( ) {
        const newConsoleLogFunction = ( ...args ) => {
            const timeOfLog = new Date( )
            const message = `%c${ timeOfLog.getHours( ) }:${ timeOfLog.getMinutes( ) }:${ timeOfLog.getSeconds( ) }:${ timeOfLog.getMilliseconds( ) }%c`

            const messageColorCSS = `color: #AAAAAA;`
            const messageResetCSS = `color: default;`

            originalDevToolsLogFunction(
                message, messageColorCSS, messageResetCSS, ...args )
        }
        console.log = newConsoleLogFunction
        log = newConsoleLogFunction
    }

// ────────────────────────────────────────────────────────────────────────────────
