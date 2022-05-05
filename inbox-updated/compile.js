const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
}

const compilationResult = JSON.parse(solc.compile(JSON.stringify((input))))
if (compilationResult.hasOwnProperty('errors')) {
    console.log(compilationResult)
    throw new Error('Compiled with errors.')
}
module.exports = compilationResult.contracts['Inbox.sol'].Inbox
