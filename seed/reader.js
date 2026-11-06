const fs = require('fs');
const path = require('path');

let read = function(name) {
    var p = `./txt/${name}.txt`;
    var contents = fs.readFileSync(path.join(__dirname, p)).toString();
    
    const lines = contents.trim().split('\r\n');
    var table = [];
    var columnline = lines[0];
    if (columnline) {
        var columns = columnline.trim().split("\t");
        for (var j = 1; j < lines.length; j++) {
            var line = lines[j];
            var data = line.trim().split("\t");
            var record = {};
            for (var i = 0; i < columns.length; i++) {
                record[columns[i]] = data[i];
            }
            table.push(record);
        }
    }
    return table
}


module.exports = { read: read }