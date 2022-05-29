const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

const compileResult = solc.compile(source, 1)
if (compileResult.hasOwnProperty('errors')) {
    console.log('Compilation error:')
    console.log(compileResult)
    process.exit(1)
}
module.exports = compileResult.contracts[':Inbox']