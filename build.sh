
#
# Copyright 2016 Kary Foundation, Inc.
#   Author: Pouya Kary <k@karyfoundation.org>
#

#
# ─── CLEAN UP ───────────────────────────────────────────────────────────────────
#

    rm -rf _compiled
    mkdir _compiled

#
# ─── GULP BUILD ─────────────────────────────────────────────────────────────────
#

    gulp

#
# ─── RUNNING ────────────────────────────────────────────────────────────────────
#

    "_release/Orchestra-darwin-x64/Orchestra.app/Contents/MacOS/Orchestra"

# ────────────────────────────────────────────────────────────────────────────────