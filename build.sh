
#
# Copyright 2016 Kary Foundation, Inc.
#   Author: Pouya Kary <k@karyfoundation.org>
#

#
# ─── GULP BUILD ─────────────────────────────────────────────────────────────────
#

    gulp

    #cd ./_compiled
    #electron main.js
    #cd ..

#
# ─── PACKING ────────────────────────────────────────────────────────────────────
#

    electron-packager _compiled "Orchestra" --platform=darwin --arch=x64 --overwrite=true --app-copyrigh="Copyright 2016 by Kary Foundation, Inc." --app-version="1" --icon=./designs/icon/icns/electron.icns --name="Orchestra" --out=_release

	#electron-packager ./binary "Comment IV" --platform=win32 --arch=x64 --app-copyrigh="Copyright 2016 by Kary Foundation, Inc." --app-version="IV.3.124" --icon=icon/ico/icon.ico --name="Comment IV" --out=release --overwrite=true

#
# ─── RUNNING ────────────────────────────────────────────────────────────────────
#

    "_release/Orchestra-darwin-x64/Orchestra.app/Contents/MacOS/Orchestra"

# ────────────────────────────────────────────────────────────────────────────────