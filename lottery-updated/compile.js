const path = require('path')
const fs = require('fs')
const solc = require('solc')

const contractPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const source = fs.readFileSync(contractPath, 'utf8')

const input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            },
        },
    },
};

const compilationResult = JSON.parse(solc.compile(JSON.stringify((input))));

if (compilationResult.hasOwnProperty('errors')) {
    console.log(compilationResult);
    throw new Error('Compiled with errors.')
}
module.exports = compilationResult.contracts['Lottery.sol'].Lottery

