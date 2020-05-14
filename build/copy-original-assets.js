const fs = require('fs');
const path = require('path');


let excludedFiles = [
    './node_modules/bootstrap/dist/css/bootstrap.css',
    './node_modules/bootstrap/dist/css/bootstrap.css.map',
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './node_modules/bootstrap/dist/css/bootstrap.min.css.map'
];

excludedFiles = excludedFiles.map(source => path.resolve(source));


function recursiveCopy(source, destinationFolder) {
    if (excludedFiles.includes(source)) {
        return;
    }

    const baseName = path.basename(path.resolve(source));

    const isDirectory = fs.statSync(source).isDirectory();

    if (!isDirectory) {
        const destinationSource = path.resolve(destinationFolder, baseName);

        fs.copyFileSync(source, destinationSource);
        return;
    }

    const newFolder = path.resolve(destinationFolder, baseName);

    if (!fs.existsSync(newFolder)) {
        fs.mkdirSync(newFolder);
    }

    const files = fs.readdirSync(source);

    files.forEach(file => {
        const fileSource = path.resolve(source, file);

        recursiveCopy(fileSource, newFolder);
    })
}


let assetsToCopy = [
    './node_modules/bootstrap/dist',
    './node_modules/bootstrap/js',
    './node_modules/bootstrap/scss'
];

assetsToCopy = assetsToCopy.map(source => path.resolve(source));

const rootFolder = path.resolve();

assetsToCopy.forEach(asset => recursiveCopy(asset, rootFolder));

console.log('\x1b[32m' + 'Original assets are copied' + '\x1b[0m');
