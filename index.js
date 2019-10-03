const yargs = require('yargs')
const chalk = require('chalk')

const argv = require('yargs')
    .alias('n', 'records')
    .alias('v', 'version')
    .help('')
    .argv

module.exports = () => {
    if (argv.help) {
        return console.log(`
        lemondrop [filename] <options>

        [filename] .............. local path to file to split including extension
        --records (n) ........... the number of records to include per split file, defaults to 10000 records (use caution, this could result in a large number of new files)

        Bug or feature request? Create an issue in GitHub - https://github.com/tfullwood/lemondrop/issues
        `)
    }

    //Yargs seems to be handling this without the need for this util
    // if (argv.version) {
    //     require('./utils/version')()
    // }

    if (!argv._[0]) {
        return console.error(`${chalk.red.bold('Enter a file as an argument or --help')}`)
    }

    //Passed the very limited validation...
    //Calling the parser to get started
    require('./cmds/parse')(argv)
}