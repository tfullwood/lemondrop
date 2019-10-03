const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

//Reads limit number of records beginning at offset specified for data type specified. Self looping based upon max length of array specified by limit
const looper = (contents, fname, offset, limit, type) => {
    //TODO check for empty data types and skip them
        //if (contents[type].length !== 0) {
    let wpath = path.join(process.cwd(), 'lemondrop_export', fname.split(".json")[0] + `-${type}-page${(offset / limit) + 1}.json`);
    let data = []

    //Write data to data arr between offset and offset + limit
    if (offset < contents[type].length) {
        contents[type].forEach((d, i) => {
            if (i >= offset && i < offset + limit) {
                data.push(d);
            }
        })
    }

    //Prettify and write to file
    fs.writeFileSync(wpath, JSON.stringify(data, null, 4));
    console.log(`${chalk.green(type)} at page ${chalk.blue((offset / limit) + 1)} process complete, moving on...`);
    
    //Self referencing call if more data needs to be written
    if ((offset + limit) <= contents[type].length) {
        looper(contents, fname, (offset + limit), limit, type);
    }
}

module.exports = {
    looper
}