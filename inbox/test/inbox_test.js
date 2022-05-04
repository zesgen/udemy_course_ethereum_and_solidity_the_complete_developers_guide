const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const {contractInterface, bytecode} = require('../compile')
const DEFAULT_MESSAGE = 'Hello World!'

let accounts
let inboxContract

beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    //Use one of those accounts to deploy the contract
    inboxContract = await new web3.eth.Contract(JSON.parse(contractInterface))
        .deploy({data: bytecode, arguments: [DEFAULT_MESSAGE]})
        .send({from: accounts[0], gas: '1000000'})
})

describe('Inbox', async () => {
    it('Can be constructed and deployed', () => {
        assert.ok(inboxContract.options.address)
    })

    it('Has a default message after the deployment', async () => {
        const message = await inboxContract.methods.message().call()
        assert.strictEqual(message, DEFAULT_MESSAGE)
    })

    it('can change the message', async () => {
        const newExpectedMessage = 'Hi again!'
        const tx = await inboxContract.methods.setMessage(newExpectedMessage).send({from: accounts[0]})
        console.log(tx)
        const actualMessage = await inboxContract.methods.message().call()
        assert.strictEqual(actualMessage, newExpectedMessage)
    })
})