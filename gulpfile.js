
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

    const argv                  = require('yargs').argv
    const darwinInfoPlistBase   = require('./build/darwin-info-base.json')
    const exec                  = require('child_process').exec
    const fs                    = require('fs-extra')
    const gulp                  = require('gulp')
    const less                  = require('less')
    const mv                    = require('mv')
    const packageJson           = require('./package.json')
    const path                  = require('path')
    const plist                 = require('plist')
    const request               = require('request')
    const ugly                  = require('gulp-uglify')
    const util                  = require('util')

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
    async function shell ( command , callback ) {
        return new Promise(( resolve, reject ) => {
            exec( command, err => {
                if ( err )
                    reject( err )
                else
                    resolve( )
            })
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

        // codes
        copyToBinaryFromDir( 'view' )
        copyToBinaryFromDir( 'editor' )
        copyToBinaryFromDir( 'libs' )
        copyToBinaryFromDir( 'windows' )
        copyToBinaryFromDir( 'winserver' )

        // design files
        copyToBinaryFromDir( 'resources' )
        copyToBinaryFromDir( 'designs/icon/file-icon-darwin/icns' )

        // node modules
        copyNodeModules('concerto-compiler')
        copyNodeModules('messenger')
        copyNodeModules('regulex')
        copyNodeModules('amdefine')
        copyNodeModules('monaco-editor/min/vs')
        copyNodeModules('regexpu-core')
        copyNodeModules('regexpu')
        copyNodeModules('regjsgen')
        copyNodeModules('regjsparser')
        copyNodeModules('regenerate')
        copyNodeModules('unicode-match-property-ecmascript')
        copyNodeModules('unicode-canonical-property-names-ecmascript')
        copyNodeModules('unicode-property-aliases-ecmascript')
        copyNodeModules('jsesc')
        copyNodeModules('recast')
        copyNodeModules('unicode-match-property-value-ecmascript')
        copyNodeModules('ast-types')
        copyNodeModules('source-map')
        copyNodeModules('esprima')
        copyNodeModules('private')

        // package
        copyFile(
            getLocalPath( 'package.json' ),
            getLocalPath( path.join( resultDirPath , 'package.json' ) )
        )

        callback()
    })

//
// ─── GETTING COMMIT COUNT ───────────────────────────────────────────────────────
//

    gulp.task( 'get-commit-counts', callback => {
        const commitCountFilePath = `./${resultDirPath}/about/commit-count.txt`
        const githubOrchestraRepositoryAPI =
            'https://api.github.com/repos/karyfoundation/orchestra/stats/contributors'

        try {
            new Promise (( resolve, reject ) => {
                const rejectHandler = ( ) =>
                    reject('Could not connect to GitHub')

                const options = {
                    url: githubOrchestraRepositoryAPI,
                    method: 'GET',
                    headers: {
                        'User-Agent':   'Super Agent/0.0.1',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }

                request( options, ( error, response, body ) => {
                    if ( !error && response.statusCode == 200 ) {
                        try {
                            const data = JSON.parse( body )[ 0 ].total.toString( )
                            resolve( data )
                        } catch ( parseError ) {
                            rejectHandler( )
                        }
                    } else {
                        rejectHandler( )
                    }
                })
            })
            .then( GitHubCommitCount => {
                fs.writeFileSync( commitCountFilePath, GitHubCommitCount )
                callback( )
            })
            .catch( e => {
                throw e
            })

        } catch ( error ) {
            try {
                shell( 'git rev-list --all --count > ' + commitCountFilePath )
                callback( )

            } catch ( error2 ) {
                callback('Could not save latest commits count')
            }
        }
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

    async function packOrchestraForMac ( ) {
        return new Promise(( resolve, reject ) => {
            try {
                // assets
                const iconFile = (( packageJson.productName !== 'Orchestra Nightly' )
                    ? './designs/icon/icns/icon.icns'
                    : './designs/icon-nightly/icns/icon.icns'
                )

                // build script
                const packBashScript = (
                    'electron-packager' +
                        ' _compiled "' + packageJson.productName + '"' +
                        ' --platform=darwin --arch=x64' +
                        ' --overwrite=true' +
                        ' --app-copyright="Copyright 2016-present, Kary Foundation, Inc. All rights reserved."' +
                        ' --app-version="' + packageJson.version + '"' +
                        ' --icon=' + iconFile +
                        ' --name="' + packageJson.productName + '"'+
                        ' --out=_release'
                )

                // building
                const execPromise = shell( packBashScript )

                // after mac build
                execPromise.then(( ) => {
                    updateDarwinInfoPlistFile( )
                    resolve( )
                })


                execPromise.catch( error => {
                    reject( error )
                })
            } catch ( buildError ) {
                reject( buildError )
            }
        })
    }

    function updateDarwinInfoPlistFile ( ) {
        // data
        const plistFilePath = (( packageJson.productName !== 'Orchestra Nightly' )
            ? '_release/Orchestra-darwin-x64/Orchestra.app/Contents/Info.plist'
            : '_release/Orchestra Nightly-darwin-x64/Orchestra.app/Contents/Info.plist'
        )

        // loading the info file
        const plistFileString =
            fs.readFileSync( plistFilePath, 'utf8' )
        const infoJSON =
            plist.parse( plistFileString )

        // adding stuff to the plist data
        const newInfoJSON =
            Object.assign( infoJSON, darwinInfoPlistBase )

        // making new plist info
        const newPlistFileString =
            plist.build( newInfoJSON )

        // done, now saving it back
        fs.writeFileSync( plistFilePath, newPlistFileString )
    }

//
// ─── PACK ───────────────────────────────────────────────────────────────────────
//

    gulp.task( 'pack-orchestra',
        [ 'copyResourceFiles', 'get-commit-counts', 'sheets' ], callback => {

        if ( argv.pack ) {
            packOrchestraForMac( )
        }

        else if ( argv.debug ) {
            shell('npm run electron')
        }
    })

//
// ─── AFTER PACK ─────────────────────────────────────────────────────────────────
//

    gulp.task( 'build-orchestra', [ 'pack-orchestra' ], ( ) => {

    })

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    /** Where everything starts */
    gulp.task( 'default', [ 'build-orchestra' ])

// ────────────────────────────────────────────────────────────────────────────────
