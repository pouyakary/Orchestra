
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

    const argv                      = require('yargs').argv
    const darwinInfoPlistBase       = require('./build/darwin-info-base.json')
    const exec                      = require('child_process').exec
    const fs                        = require('fs-extra')
    const gulp                      = require('gulp')
    const less                      = require('less')
    const mv                        = require('mv')
    const packageJsonFirstLoad      = require('./package.json')
    const path                      = require('path')
    const plist                     = require('plist')
    const request                   = require('request')
    const ugly                      = require('gulp-uglify')
    const util                      = require('util')

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const orchestraVersion   = "v1.0"
    const pathToResultDir    = '_compiled'
    const nightlyReleaseName = 'Orchestra Nightly'
    const stableReleaseName  = 'Orchestra'

    const isProductionBuild  =
        ( argv.productionBuild? true : false )

    const OrchestraNodeModules = [
        'concerto-compiler', 'messenger', 'regulex', 'monaco-editor/min/vs',
        'amdefine', 'regexpu-core', 'regexpu', 'regjsgen', 'regjsparser',
        'regenerate', 'unicode-match-property-ecmascript', 'jsesc', 'recast',
        'unicode-canonical-property-names-ecmascript', 'ast-types', 'esprima',
        'unicode-property-aliases-ecmascript', 'source-map', 'private',
        'unicode-match-property-value-ecmascript',
    ]

    const CopyrightNotice =
        'Copyright 2016-present, Pouya KAry. All rights reserved.'

//
// ─── UPDATING PACKAGE JSON ──────────────────────────────────────────────────────
//

    const packageJson = Object.assign( packageJsonFirstLoad, {
        productName: ( isProductionBuild? stableReleaseName : nightlyReleaseName ),
    })

//
// ─── ASYNCIFY ───────────────────────────────────────────────────────────────────
//

    const asyncify = ( func, ...args ) =>
        new Promise( ( resolve, reject ) =>
            func( ...args, ( err, output ) =>
                err ? reject( err )
                    : resolve( output? output : undefined ) ) )

//
// ─── TOOLS ──────────────────────────────────────────────────────────────────────
//

    /** Run shell commands easy! */
    const shell = ( ...commands ) => asyncify( exec, commands.join(' ') )

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
                const dest =
                    ( !( subfolder === undefined || subfolder === '' || subfolder === null )
                        ? path.join( pathToResultDir , subfolder , name )
                        : path.join( pathToResultDir , name ))

                if ( !( name.endsWith('.map') || name.endsWith('.d.ts') ) )
                    copyFile(
                        getLocalPath( path.join( dir , name ) ),
                        getLocalPath( dest )
                    )})})}

//
// ─── COPY SINGLE FILE ───────────────────────────────────────────────────────────
//

    /** Copies a file from `origin` to `destination` */
    async function copyFile ( origin, destination ) {
        if ( /\.DS_Store/.test( origin ) ) { return }

        // await new Promise( ( resolve, reject ) => {
        //     fs.copy( origin, destination, err =>
        //         err ? reject(`Could not copy file ${ origin }`)
        //             : resolve( ) ) })

        //         // ==

        await asyncify( fs.copy, origin, destination )
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
            const address = path.join( 'node_modules', handle )
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
        OrchestraNodeModules.forEach( x => copyNodeModules( x ) )

        // package
        copyFile(
            getLocalPath( 'package.json' ),
            getLocalPath( path.join( pathToResultDir , 'package.json' ) )
        )

        callback()
    })

//
// ─── GETTING COMMIT COUNT ───────────────────────────────────────────────────────
//

    gulp.task( 'get-commit-counts', callback => {
        const commitCountFilePath =
            `./${pathToResultDir}/about/commit-count.txt`
        const githubOrchestraRepositoryAPI =
            'https://api.github.com/repos/pmkary/orchestra/stats/contributors'

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
                    if ( !error && response.statusCode == 200 )
                        try {
                            const data = JSON.parse( body )[ 0 ].total.toString( )
                            resolve( data )
                        } catch ( parseError ) {
                            rejectHandler( )
                        }
                    else
                        rejectHandler( )
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
                shell( 'git', 'rev-list', '--all', '--count',
                        '>', commitCountFilePath )
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
    gulp.task( 'sheets', async callback => {
        try {
            let lessSourceCode = fs.readFileSync(
                path.join( __dirname, 'sheets', 'ui.less' ), 'utf8' )

            const renderedLess =
                await asyncify( less.render, lessSourceCode )

            asyncify( fs.writeFile,
                path.join( __dirname, '_compiled/style.css' ),
                output.css
            )

            // less.render( lessSourceCode, ( err, output ) => {
            //     if ( err )
            //         console.log(`Less failure: ${ err }`); return

            //     asyncify( fs.writeFile,
            //         path.join( __dirname, '_compiled/style.css' ),
            //         output.css
            //     )

            //     // fs.writeFile(
            //     //     path.join( __dirname, '_compiled/style.css' ),
            //     //     output.css,
            //     //     error => {
            //     //         if ( error )
            //     //             console.log('could not store the less file')
            //     //         else
            //     //             callback( )
            //     //     }
            //     // )
            // })
        } catch ( err ) {
            console.log('Compiling less failed ' + err )
        }
    })

//
// ─── ELECTRON PACKER ────────────────────────────────────────────────────────────
//

    async function packOrchestraForDarwin ( ) {
        const iconFile =
            ( isProductionBuild ? './designs/icon/icns/icon.icns'
                                : './designs/icon-nightly/icns/icon.icns'
                                )

        // build script
        const packBashScript = [
            'electron-packager',
            ' _compiled',
            '"' + packageJson.productName + '"',
            '--platform=darwin',
            '--arch=x64',
            '--overwrite=true',
            '--app-bundle-id="us.kary.orchestra"',
            '--app-copyright="' + CopyrightNotice + '"',
            '--app-version="' + packageJson.version + '"',
            '--icon=' + iconFile,
            '--name="' + packageJson.productName + '"',
            '--out=_release',
            '--protocol="orchestra"',
            '--protocol-name="Orchestra"',
        ]

        // building
        await shell( ...packBashScript )
        updateDarwinInfoPlistFile( )
    }


    function updateDarwinInfoPlistFile ( ) {
        // data
        const plistFilePath =
            ( isProductionBuild ? '_release/Orchestra-darwin-x64/Orchestra.app/Contents/Info.plist'
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


    async function createMacDMGImage ( ) {
        const orchestraMacAppAddress =
            "_release/Orchestra-darwin-x64/Orchestra.app"

        fs.mkdirpSync('./_installers/macOS')

        await shell(
            'electron-installer-dmg',
            orchestraMacAppAddress,
            'Orchestra',
            '--out="./_installers/macOS"',
            '--icon-size=152',
            '--icon="./designs/icon/icns/icon.icns"',
            '--background="./build/dmg-back.png"',
            '--overwrite'
        )
    }

//
// ─── PACK FOR LINUX ─────────────────────────────────────────────────────────────
//

    async function packOrchestraForLinux ( ) {
        const iconFile =
            ( isProductionBuild ? './designs/icon/icon.png'
                                : './designs/icon-nightly/icns/icon.icns'
                                )

        // build script
        const packBashScript = [
            'electron-packager',
            ' _compiled',
            '"' + packageJson.productName + '"',
            '--platform=linux',
            '--arch=x64',
            '--overwrite=true',
            '--app-bundle-id="us.kary.orchestra"',
            '--app-copyright="' + CopyrightNotice + '"',
            '--app-version="' + packageJson.version + '"',
            '--icon=' + iconFile,
            '--name="' + packageJson.productName + '"',
            '--out=_release',
            '--protocol="orchestra"',
            '--protocol-name="Orchestra"',
        ]

        // building
        await shell( ...packBashScript )
    }


    async function createDebianDEBInstaller ( ) {
        await shell(
            'electron-installer-debian',
            '--src _release/Orchestra-linux-x64',
            '--arch amd64',
            '--config build/debian-config.json',
        )
    }

//
// ─── PACK FOR WINDOWS ───────────────────────────────────────────────────────────
//

    async function packOrchestraForWindows ( ) {
        // to be continued...
    }

//
// ─── PACK ───────────────────────────────────────────────────────────────────────
//

    gulp.task( 'pack-orchestra', [ 'copyResourceFiles', 'sheets' ], callback => {
        async function packFunctionBody ( ) {
            if ( argv.debug )
                return await shell( 'npm', 'run', 'electron' )

            if ( argv.pack )
                await buildAllPlatforms( )

            if ( argv.installers )
                await createInstallersForAllPlatforms( )
        }

        packFunctionBody( )
            .then( callback )
            .catch( callback )
    })

//
// ─── BUILD FOR ALL PLATFORMS ────────────────────────────────────────────────────
//

    async function buildAllPlatforms ( ) {
        const platformFunctions = [ ]

        if ( argv.mac )
            platformFunctions.push( packOrchestraForDarwin )

        if ( argv.win )
            platformFunctions.push( packOrchestraForWindows )

        if ( argv.linux )
            platformFunctions.push( packOrchestraForLinux )

        await runAsyncFunctions( platformFunctions )
    }

//
// ─── CREATE INSTALLERS FOR ALL PLATFORMS ────────────────────────────────────────
//

    async function createInstallersForAllPlatforms ( ) {
        const platformFunctions = [ ]

        if ( argv.mac )
            platformFunctions.push( createMacDMGImage )

        if ( argv.linux )
            platformFunctions.push( createDebianDEBInstaller )

        await runAsyncFunctions(platformFunctions)
    }

//
// ─── RUN MANY ASYNC FUNCTIONS ───────────────────────────────────────────────────
//

    async function runAsyncFunctions ( functions ) {
        await Promise.all( functions.map( func => func( ) ) )
    }

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
