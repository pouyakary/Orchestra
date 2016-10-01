
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
        document.getElementById('window-button-close').onmouseover = onTrafficLightsHover;
        document.getElementById('window-button-minimize').onmouseover = onTrafficLightsHover;
        document.getElementById('window-button-maximize').onmouseover = onTrafficLightsHover;

        document.getElementById('window-button-close').onmouseleave = onTrafficLightsLeave;
        document.getElementById('window-button-minimize').onmouseleave = onTrafficLightsLeave;
        document.getElementById('window-button-maximize').onmouseleave = onTrafficLightsLeave;
    }

//
// ─── ON LIGHTS HOVER ────────────────────────────────────────────────────────────
//

    function onTrafficLightsHover ( ) {
        document.getElementById('window-button-close').style.backgroundSize = 'contain';
        document.getElementById('window-button-minimize').style.backgroundSize = 'contain';
        document.getElementById('window-button-maximize').style.backgroundSize = 'contain';
    }

//
// ─── ON LIGHTS LEAVE ────────────────────────────────────────────────────────────
//

    function onTrafficLightsLeave ( ) {
        document.getElementById('window-button-close').style.backgroundSize = '0 0';
        document.getElementById('window-button-minimize').style.backgroundSize = '0 0';
        document.getElementById('window-button-maximize').style.backgroundSize = '0 0';
    }

// ────────────────────────────────────────────────────────────────────────────────
