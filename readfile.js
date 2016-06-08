'use strict';

const fs = require('fs');
const csv = require('csv-parser');

console.log('Current Run Dir: ', __dirname, '\n');

let files = ['/Users/ethan.desilets/Desktop/pf.csv', '/Users/ethan.desilets/Desktop/numbers.csv', '/Users/ethan.desilets/Desktop/newtest.csv', '/Users/ethan.desilets/Desktop/test.js'];
let csvData = [];

var setup = csv({
    raw: false, // do not decode to utf-8 strings
    separator: ',', // specify optional cell separator
    // quote: '"',     // specify optional quote character
    // escape: '"',    // specify optional escape character (defaults to quote value)
    // newline: '\n',  // specify a newline character
    // strict: true    // require column length match headers length
    headers: ['address', 'city', 'state', 'country', 'zip', 'phone', 'latitude', 'longitude'] // Specifing the headers
});

// Create File
fs.open(files[3], "w", function(err, fd) {
    // handle error
    if (err) throw err
    fs.close(fd, function(err) {
        // handle error
        console.log('Close/Created');
    });
});

let writeStream = fs.createWriteStream(files[3], 'utf8')

fs.createReadStream(files[2], 'utf8')
    .pipe(setup)
    .on('data', function(row) {
        let format = `    ['${row.address},${row.city},${row.state},${row.country}',${+row.latitude}, ${+row.longitude}],\n`;
        writeStream.write(format);
    })
    .on('end', function() {
        writeStream.end();

        let fileRequireLine = `];\n\nmodule.exports = points;`;
        fs.appendFile(files[3], fileRequireLine, (err) => (console.error(err)));
        console.log('hello end of file');
    });
