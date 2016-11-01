
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── STYLES ─────────────────────────────────────────────────────────────────────
//

    var blocklyAdditionalStyles = [
        {
            class: 'blocklyMainBackground',
            styles: [
                {
                    key: 'fill',
                    value: '#F7F7F7'
                },
                {
                    key: 'stroke',
                    value: 'transparent'
                }
            ]
        },
        {
            class: 'blocklyFlyoutBackground',
            styles: [
                {
                    key: 'fill',
                    value: '#EEEEEE'
                }
            ]
        },
        {
            class: 'blocklyFlyout',
            styles: [
                {
                    key: 'fill',
                    value: 'white'
                }
            ]
        }]

//
// ─── STYLER ─────────────────────────────────────────────────────────────────────
//

    function applyAdditionalStyles ( ) {
        blocklyAdditionalStyles.forEach( blockStyle => {
            let elements = document.getElementsByClassName( blockStyle.class )

            for ( let index = 0; index < elements.length; index++ ) {
                let element = elements[ index ]
                blockStyle.styles.forEach( style => {
                    element.style[ style.key ] = style.value })}})}

// ────────────────────────────────────────────────────────────────────────────────
