const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compileResult = require('./compile')
const MNEMONIC = '<use_yours>'
const INFURA_API_URL = '<use_yours>'
const provider = new HDWalletProvider(MNEMONIC, INFURA_API_URL)
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('Attempting to deploy from account: ', accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(compileResult.interface))
        .deploy({data: compileResult.bytecode, arguments: ['Hi there!']})
        .send({gas: '1000000', from: accounts[0]})
    console.log('Contract deployed to ', result.options.address)
    provider.engine.stop()
}
deploy()
