const { ipcMain } = require( 'electron' );
const path = require( 'path' );
const fs = require( 'fs-extra' );
const os = require( 'os' );
const open = require( 'open' );
//const chokidar = require( 'chokidar' );

// local dependencies
const notification = require( './notification' );

// get application directory
const appDir = path.resolve( os.homedir(), 'electron-app-files' );

/****************************/
const ignored = ['e2e','node_modules','tsconfig.json','tslint.json','package.json','package-lock.json','README.md'];
// get the list of files
exports.getFolder = (folder) => {

    const files = fs.readdirSync( folder[0] );
    let rtnAr = [];
    files.forEach( filename => {
      if(filename.startsWith(".")) return;
      if((ignored.indexOf(filename) > -1) || filename.match(/.spec.ts$/g)) return;
      const filePath = path.resolve( folder[0]+'/'+filename );
      let cont = '';
      try{
        cont = fs.readFileSync(filePath, {encoding: 'utf-8'});
      }catch(e){
        cont = this.getFolder([filePath]);
      }
      let rtnObj = {name: filename, path: filePath};
      if(Array.isArray(cont)){
        rtnObj['dirContents'] = cont;
      }else{
        rtnObj['fileContents'] = cont;
      }
      rtnAr.push(rtnObj);
    });
    return rtnAr;
};

/****************************/


// delete a file
exports.deleteFile = ( filename ) => {
    const filePath = path.resolve( appDir, filename );

    // remove file from the file system
    if( fs.existsSync( filePath ) ) {
        fs.removeSync( filePath );
    }
};

// open a file
exports.openFile = ( filename ) => {
    const filePath = path.resolve( appDir, filename );

    // open a file using default application
    if( fs.existsSync( filePath ) ) {
        open( filePath );
    }
};
exports.getDirectory = ( dir = [] ) => {
    // ensure `appDir` exists
    fs.ensureDirSync( dir );
    files.forEach( file => {
        const filePath = path.resolve( appDir, file.name );
    } );

    // display notification
    notification.filesAdded( files.length );
};

