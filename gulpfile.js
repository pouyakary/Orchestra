
//
// Copyright © 2016-present Kary Foundation, Inc. All Rights Reserved
//   Author: Pouya Kary <k@karyfoundation.org>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    var gulp        = require('gulp')
    var packageJson = require('./package.json')
    var exec        = require('child_process').exec
    var argv        = require('yargs').argv
    var util        = require('util')
    var path        = require('path')
    var fs          = require('fs-extra')
    var ugly        = require('gulp-uglify')
    var less        = require('less')
    var mv          = require('mv')

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const version = "v1.0"

//
// ─── CONSTS ─────────────────────────────────────────────────────────────────────
//

    const resultDirPath = '_compiled'

//
// ─── TOOLS ──────────────────────────────────────────────────────────────────────
//

    /** Run shell commands easy! */
    function shell ( command , callback ) {
        exec( command, err => {
            if ( err ) console.log( err )
        })
    }

//
// ─── COPY DIR FILES ─────────────────────────────────────────────────────────────
//

    /** Copy to binary from dir */
    function copyToBinaryFromDir ( dir, subfolder ) {
        fs.readdir( dir , ( err , files ) => {
            // if error
            if ( err )
                console.log(`Could not get files from directory ${ dir }`)

            // if right
            files.forEach( name => {
                let dest
                if ( !( subfolder === undefined || subfolder === '' || subfolder === null ) )
                    dest = path.join( resultDirPath , subfolder , name )
                else
                    dest = path.join( resultDirPath , name )

                if ( !( name.endsWith('.map') || name.endsWith('.d.ts') ) )
                    copyFile(
                        getLocalPath( path.join( dir , name ) ),
                        getLocalPath( dest )
                    )})})}

//
// ─── COPY SINGLE FILE ───────────────────────────────────────────────────────────
//

    /** Copy file `A` to `B` */
    function copyFile ( A, B ) {
        if ( /\.DS_Store/.test( A ) ) {
            return
        }
        fs.copy( A, B, err => {
            if ( err ) {
                console.log(`Could not copy file ${ A }`)
            }
        })
    }

//
// ─── GET LOCAL PATH ─────────────────────────────────────────────────────────────
//

    /** Get Local Path in the current directory */
    function getLocalPath ( address ) {
        return path.join( __dirname , address )
    }

//
// ─── COPY FILES ─────────────────────────────────────────────────────────────────
//

    /** Copies static resource files into the result directory */
    gulp.task( 'copyResourceFiles', callback => {

        function copyNodeModules ( handle ) {
            let address = path.join( 'node_modules', handle )
            copyToBinaryFromDir( address, address )
        }

        copyToBinaryFromDir( 'resources' )
        copyToBinaryFromDir( 'view' )
        copyToBinaryFromDir( 'editor' )
        copyToBinaryFromDir( 'libs' )
        copyToBinaryFromDir( 'windows' )
        copyToBinaryFromDir( 'winserver' )

        copyNodeModules('concerto-compiler')
        copyNodeModules('messenger')
        copyNodeModules('regulex')
        copyNodeModules('amdefine')

        copyFile(
            getLocalPath( 'package.json' ),
            getLocalPath( path.join( resultDirPath , 'package.json' ) )
        )

        // adding commit count
        shell(`git rev-list --all --count > ${resultDirPath}/about/commit-count.txt`)

        callback()
    })

//
// ─── SHEETS ─────────────────────────────────────────────────────────────────────
//

    /** Compiles the Less style sheets */
    gulp.task( 'sheets', callback => {
        try {
            let lessSourceCode = fs.readFileSync(
                path.join( __dirname, 'sheets', 'ui.less' ), 'utf8' )

            less.render( lessSourceCode, ( err, output ) => {
                if ( err ) {
                    console.log(`Less failure: ${ err }`); return
                }
                fs.writeFile(
                    path.join( __dirname, '_compiled/style.css' ),
                    output.css,
                    error => {
                        if ( error ) {
                            console.log('could not store the less file')
                        } else {
                            callback()
                        }
                    }
                )
            })
        } catch ( err ) {
            console.log('Compiling less failed ' + err )
        }
    })

//
// ─── ELECTRON PACKER ────────────────────────────────────────────────────────────
//

    gulp.task( 'electron', ['copyResourceFiles', 'sheets'], ( ) => {
        if ( argv.pack ) {
            console.log('packing...')
            let iconFile = ( packageJson.productName !== 'Orchestra Nightly' )?
                './designs/icon/icns/icon.icns' : './designs/icon-nightly/icns/icon.icns'

            shell(`electron-packager _compiled "${ packageJson.productName }" --platform=darwin --arch=x64 --overwrite=true --app-copyright="Copyright 2016 by Kary Foundation, Inc." --app-version="${ packageJson.version }" --icon=${ iconFile } --name="${ packageJson.productName }" --out=_release`)
        }

        if ( argv.debug ) {
            shell('npm run electron')
        }
    })

//
// ─── AFTER PACK ─────────────────────────────────────────────────────────────────
//

    gulp.task( 'after-pack', [ 'electron' ], ( ) => {

    })

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    /** Where everything starts */
    gulp.task( 'default', [ 'after-pack' ])

// ────────────────────────────────────────────────────────────────────────────────
