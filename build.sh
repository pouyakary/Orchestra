
#
# ─── GULP BUILD ─────────────────────────────────────────────────────────────────
#

    gulp

    cd ./_compiled
    electron main.js
    cd ..

#
# ─── PACKING ────────────────────────────────────────────────────────────────────
#

    #	electron-packager ./_compiled "Orchestra" --platform=darwin --arch=x64 --app-copyrigh="Copyright 2016 by Kary Foundation, Inc." --app-version="1" --icon=designs/icon/icns/icon.icns --name="Orchestra" --out=release --overwrite=true

	#electron-packager ./binary "Comment IV" --platform=win32 --arch=x64 --app-copyrigh="Copyright 2016 by Kary Foundation, Inc." --app-version="IV.3.124" --icon=icon/ico/icon.ico --name="Comment IV" --out=release --overwrite=true