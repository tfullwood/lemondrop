const fs = require('fs')
const path = require('path')

const looper = require('../utils/looper').looper;

module.exports = (args) => {
    const fpath = path.join(process.cwd(), args._[0])
    const max_len = parseInt(args.records) || 10000 //Defaults to 10000 records
    var contents = JSON.parse(fs.readFileSync(fpath, 'utf8'))
    const types = Object.keys(contents)
    const exp_dir = path.join(process.cwd(), 'lemondrop_export')

    //TODO - add another parameter for the write directory
        //Allow for a full path and a local path

    //Write the export dir
    if (!fs.existsSync(exp_dir)){
        fs.mkdirSync(exp_dir)
    }

    //TODO - allow for type input, read all types and allow user to pass an arg with a comma separated list of types

    //Initiate the process
    types.map(type => {
        //Args
            //All the data from the file
            //Filename argument from user's input
            //Index offset
                //TODO - write this functionality - currently just doing everything
            //Limit to number of records per file written
            //First level of keys on the JSON object
        looper(contents, args._[0], 0, max_len, type)
    })
}