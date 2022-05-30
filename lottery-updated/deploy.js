const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compileResult = require('./compile')


const mnemonic = process.env.MNEMONIC; // Like 'test test test test test test test test test test test junk'
const providerUrl = process.env.PROVIDER_URL; // Like: 'https://rinkeby.infura.io/v3/12345678901234567890123456790123'

if(!mnemonic || !providerUrl) {
    throw Error('There is no "MNEMONIC" or/and "PROVIDER_URL" environment variables');
}

const provider = new HDWalletProvider(mnemonic, providerUrl);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account:', accounts[0]);
    const result = await new web3.eth.Contract(compileResult.abi)
        .deploy({data: compileResult.evm.bytecode.object})
        .send({gas: '1000000', from: accounts[0]});
    console.log('Contract deployed to', result.options.address);
    console.log('The interface is:');
    console.log(compileResult.abi);
    provider.engine.stop()
}

deploy()
