const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // imports a constructor function. hence capitalize.
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;
const INITIAL_MESSAGE = 'Hi there!';

beforeEach(async()=>{
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of the accounts to deploy
  // the contracts
  inbox = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
  .send({from: accounts[0], gas: '1000000'})
});

describe('Inbox', ()=>{
  it('deploys a contract', ()=>{
    assert.ok(inbox.options.address); // checks if this is a defined value
  });

  it('has a default message', async ()=>{            // dealing with contracts is async
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_MESSAGE);
  });

  it('can change the message', async() => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] }); // send the transaction
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
