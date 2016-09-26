
//
// Copyright 2016 Kary Foundation, Inc.
//   Author: Pouya Kary <k@karyfoundation.org>
//

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    var gulp        = require('gulp');
    var electron    = require('gulp-electron');
    var packageJson = require('./package.json');
    var exec        = require('child_process').exec;
    var util        = require('util');
    var path        = require('path');
    var fs          = require('fs-extra');
    var ugly        = require('gulp-uglify');
    var less        = require('less');
    var mv          = require('mv');

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//

    const version = "v1.0";

//
// ─── CONSTS ─────────────────────────────────────────────────────────────────────
//

    const resultDirPath = '_compiled';

//
// ─── TOOLS ──────────────────────────────────────────────────────────────────────
//

    /** Run shell commands easy! */
    function shell ( command , callback ) {
        exec( command, err => {
            if ( err ) return callback( err );
            callback( );
        });
    }

//
// ─── COPY DIR FILES ─────────────────────────────────────────────────────────────
//

    /** Copy to binary from dir */
    function copyToBinaryFromDir ( dir ) {
        fs.readdir( dir , ( err , files ) => {
            // if error
            if ( err ) {
                console.log(`Could not get files from directory ${ dir }`);
            }
            // if right
            files.forEach( name => {
                copyFile(
                    getLocalPath( path.join( dir , name ) ),
                    getLocalPath( path.join( resultDirPath , name ) )
                );
            });
        });
    }

//
// ─── COPY SINGLE FILE ───────────────────────────────────────────────────────────
//

    /** Copy file `A` to `B` */
    function copyFile ( A, B ) {
        if ( /\.DS_Store/.test( A ) ) {
            return;
        }
        fs.copy( A, B, err => {
            if ( err ) {
                console.log(`Could not copy file ${ A }`);
            }
        });
    }

//
// ─── GET LOCAL PATH ─────────────────────────────────────────────────────────────
//

    /** Get Local Path in the current directory */
    function getLocalPath ( address ) {
        return path.join( __dirname , address );
    }

//
// ─── COPY FILES ─────────────────────────────────────────────────────────────────
//

    /** Copies static resource files into the result directory */
    gulp.task( 'copyResourceFiles', callback => {
        copyToBinaryFromDir( 'resources' );
        copyToBinaryFromDir( 'view' );
        copyToBinaryFromDir( 'core' );
        copyToBinaryFromDir( 'libs' );
        copyToBinaryFromDir( 'sounds' );
        copyToBinaryFromDir( 'help-docs' );
        copyFile(
            getLocalPath( 'package.json' ),
            getLocalPath( path.join( resultDirPath , 'package.json' ) )
        );
        callback();
    });

//
// ─── SHEETS ─────────────────────────────────────────────────────────────────────
//

    /** Compiles the Less style sheets */
    gulp.task( 'sheets', callback => {
        try {
            let lessSourceCode = fs.readFileSync(
                path.join( __dirname, 'sheets', 'ui.less' ), 'utf8' );

            less.render( lessSourceCode, ( err, output ) => {
                if ( err ) {
                    console.log(`Less failure: ${ err }`); return;
                }
                fs.writeFile(
                    path.join( __dirname, '_compiled/style.css' ),
                    output.css,
                    error => {
                        if ( error ) {
                            console.log('could not store the less file');
                        } else {
                            callback();
                        }
                    }
                );
            });
        } catch ( err ) {
            console.log('Compiling less failed ' + err );
        }
    });

//
// ─── ELECTRON PACKER ────────────────────────────────────────────────────────────
//

    gulp.task( 'electron', ['copyResourceFiles', 'sheets'], ( ) => {
        shell('electron-packager _compiled "Orchestra" --platform=darwin --arch=x64 --overwrite=true --app-copyrigh="Copyright 2016 by Kary Foundation, Inc." --app-version="Summer Builds 2016" --icon=./designs/icon/icns/electron.icns --name="Orchestra" --out=_release');
    });

//
// ─── AFTER PACK ─────────────────────────────────────────────────────────────────
//

    gulp.task( 'after-pack', [ 'electron' ], ( ) => {

    });

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    /** Where everything starts */
    gulp.task( 'default', [ 'after-pack' ]);

// ────────────────────────────────────────────────────────────────────────────────