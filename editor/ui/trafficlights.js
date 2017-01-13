
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── EVENTS ─────────────────────────────────────────────────────────────────────
//

    function appendTrafficLightEvents ( ) {
        
        //
        // ─── BUTTONS ─────────────────────────────────────────────────────
        //

            let windowTrafficButtons = [
                document.getElementById('window-button-close'),
                document.getElementById('window-button-minimize'),
                document.getElementById('window-button-maximize')
            ]

        //
        // ─── EFFECT CHANGER ──────────────────────────────────────────────
        //

            function applyTrafficLightsBackgroundSize ( backgroundSize ) {
                windowTrafficButtons.forEach ( trafficButton =>
                    trafficButton.style.backgroundSize = backgroundSize
                )
            }

        //
        // ─── EVENTS ──────────────────────────────────────────────────────
        //

            windowTrafficButtons.forEach ( trafficButton =>
                trafficButton.onmouseover = ( ) => 
                    applyTrafficLightsBackgroundSize( 'contain' )
            )

            windowTrafficButtons.forEach ( trafficButton =>
                trafficButton.onmouseleave = ( ) =>
                    applyTrafficLightsBackgroundSize( '0 0' )
            )

        // ─────────────────────────────────────────────────────────────────

    }

// ────────────────────────────────────────────────────────────────────────────────
