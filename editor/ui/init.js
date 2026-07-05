
//
// Copyright © 2017-present Pouya Kary. All rights reserved.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── INIT WINDOW ────────────────────────────────────────────────────────────────
//

    function initWindow ( ) {
        // Add platform class to body for CSS targeting
        if (window.electronAPI.getPlatform() === 'darwin') {
            document.body.classList.add('darwin')
        }

        initDeveloperToolsInfrastructure( )
        setupWorkspace( )
        appendTrafficLightEvents( )
        onNewFile( )
        initMainMenu( )
        handleWindowArgs( )
        disableZoomOnINIT( )
        setMenuEnableFactor( true )
    }

// ────────────────────────────────────────────────────────────────────────────────
