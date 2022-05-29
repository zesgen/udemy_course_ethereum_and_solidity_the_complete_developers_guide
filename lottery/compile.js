const path = require('path')
const fs = require('fs')
const solc = require('solc')

const contractPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const source = fs.readFileSync(contractPath, 'utf8')

const compileResult = solc.compile(source, 1)
if (compileResult.hasOwnProperty('errors')) {
    console.log('Compilation error:')
    console.log(compileResult)
    process.exit(1)
}
module.exports = compileResult.contracts[':Lottery']
