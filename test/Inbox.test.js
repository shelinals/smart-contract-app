const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); //Web3 --> constructor of the web3 library
const provider = ganache.provider();
const web3 = new Web3(provider); //all web3 function is async in nature
const { interface, bytecode } = require('../compile'); //ABI and raw bytecode (spit out from compiler)

let accounts;
let inbox;
const INITIAL_STRING = 'Hi There!';
const NEW_STRING = 'Bye There!';

beforeEach(async () => { //before each executed in the beg of every test
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface)) //Contract is constructor func, teaches web3 about what methods an inbox contract has
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] }) // tells web3 that we want to deploy a new copy of this contract
        .send({ from: accounts[0], gas: '1000000' }); //instructs web3 to send out a transaction that creates this contract

    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address); //assert ok --> whatev we pass into the function is a value that exist
    });

    it('has a default message', async() => {
        //call a method
        const message = await inbox.methods.message().call(); //first () for arguments, second () used to customised transactions
        assert.equal(message, INITIAL_STRING);
    });

    it('can change the message', async() => {
        await inbox.methods.setMessage(NEW_STRING).send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, NEW_STRING);
    });
});

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// let car;

// beforeEach(() => { //executed before each it block
//     car = new Car();
// });

// describe('Car', () => {
//     it('can park', () => {
//         //const car = new Car();
//         assert.equal(car.park(), 'stopped');
//     });
//     it('can drive', () => {
//         //const car = new Car();
//         assert.equal(car.drive(), 'vroom');
//     });
// });