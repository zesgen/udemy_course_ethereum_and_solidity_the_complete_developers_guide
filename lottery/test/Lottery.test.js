const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const compiledContract = require('../compile.js')

let accounts
let lotteryContract

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    lotteryContract = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
        .deploy({data: compiledContract.bytecode})
        .send({from: accounts[0], gas: 1000000});
});

describe('Contract "Lottery"', () => {
    it('Can be constructed and deployed', () => {
        assert.ok(lotteryContract.options.address)
    });

    describe('Function "enter()"', async () => {

        it('Allows one account to enter', async () => {
            await lotteryContract.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('0.01', 'ether'),
            });

            const players = await lotteryContract.methods.getPlayers().call({
                from: accounts[0]
            });

            assert.equal(players[0], accounts[0]);
            assert.equal(players.length,1);
        });

        it('Disallows one account to enter if the sent value is less than expected', async () => {
            try {
                await lotteryContract.methods.enter().send({
                    from: accounts[0],
                    value: web3.utils.toWei('0.0099', 'ether'),
                });
                assert(false, "Entering the lottery executed without reverting");
            } catch (err) {
                assert.equal(err.message, 'VM Exception while processing transaction: revert');
            }
        });

        it('Allows several account to enter', async () => {
            for (let i = 0; i < 3; ++i) {
                await lotteryContract.methods.enter().send({
                    from: accounts[i],
                    value: web3.utils.toWei('0.01', 'ether'),
                });
            }
            const players = await lotteryContract.methods.getPlayers().call({
                from: accounts[0]
            });

            assert.equal(players[0], accounts[0]);
            assert.equal(players[1], accounts[1]);
            assert.equal(players[2], accounts[2]);
            assert.equal(players.length,3);
        });
    });

    describe('Function "pickWinner()"', async () => {
        const lotteryPrize = '1';
        let manager;
        let player;

        beforeEach(async ()=> {
            manager = accounts[0];
            player = accounts[1];
            await lotteryContract.methods.enter().send({
                from: player,
                value: web3.utils.toWei(lotteryPrize, 'ether'),
            });
        })

        it('Is reverted if called not by the manager', async () => {
            try {
                await lotteryContract.methods.pickWinner().send({
                    from: player
                });
                assert(false, "The function is not reverted");
            } catch (err) {
                assert.equal(err.message, 'VM Exception while processing transaction: revert');
            }
        });

        it('Executes successfully and transfers expected amount of ether', async () => {
            const oldPlayerBalance = await web3.eth.getBalance(player);
            await lotteryContract.methods.pickWinner().send({
                from: manager
            })
            const newPlayerBalance = await web3.eth.getBalance(player);
            const actualBalanceDifference = newPlayerBalance - oldPlayerBalance;
            const minExpectedBalanceDifference =
                web3.utils.toWei(lotteryPrize, 'ether') - web3.utils.toWei('0.01', 'ether');
            assert(actualBalanceDifference > minExpectedBalanceDifference);
        })
    });
});
