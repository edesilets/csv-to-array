'use strict';

const fs = require('fs');
const csv = require('csv-parser');

console.log('Current Run Dir: ', __dirname, '\n');

let fileName = 'actualfilename';
let dir = '/Users/USERNAME/Desktop/';
let files = [dir+fileName+'.csv', dir+filename+'.js'];


// Make into a singular function that takes the directory and file name and outputs a js file with an arrray of data
// let csvToArray = function (dir, saveName) {

    let writeStream = fs.createWriteStream(files[1], 'utf8')
    let csvData = [];
    var setup = csv({
        raw: false, // do not decode to utf-8 strings
        separator: ',', // specify optional cell separator
        // quote: '"',     // specify optional quote character
        // escape: '"',    // specify optional escape character (defaults to quote value)
        // newline: '\n',  // specify a newline character
        // strict: true    // require column length match headers length
        // headers: ['address', 'city', 'state', 'country', 'zip', 'phone', 'latitude', 'longitude'] // Specifing the headers
    });

    // Create File
    fs.open(files[1], "w", function(err, fd) {
        if (err) throw err
        fs.close(fd, function(err) {
            console.log('Close/Created');
        });
    });

    fs.createReadStream(files[0], 'utf8')
        .pipe(setup)
        .on('data', function(row) {
            console.log(row);
            let format = `    [${fileName},${+row.Latitude}, ${+row.Longitude}, './img/${fileName}.jpg'],\n`;
            writeStream.write(format);
        })
        .on('end', function() {
            writeStream.end();

            let fileRequireLine = `];\n\nmodule.exports = points;`;
            fs.appendFile(files[1], fileRequireLine, (err) => (console.error(err)));

            console.log('File Sealed');
        });
// };
