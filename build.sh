
#
# Copyright 2016 Kary Foundation, Inc.
#   Author: Pouya Kary <k@karyfoundation.org>
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
#

#
# ─── CLEAN UP ───────────────────────────────────────────────────────────────────
#

    if [ -f _compiled ]
        then
            rm -rf _compiled
        fi

    mkdir _compiled

#
# ─── GULP BUILD ─────────────────────────────────────────────────────────────────
#

    gulp

#
# ─── RUNNING ────────────────────────────────────────────────────────────────────
#

    if [ "$(uname)" == 'Darwin' ]
        then
            "_release/Orchestra-darwin-x64/Orchestra.app/Contents/MacOS/Orchestra"
        fi

# ────────────────────────────────────────────────────────────────────────────────