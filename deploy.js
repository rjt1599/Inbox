const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile')

const provider = new HDWalletProvider(
  'now mom weasel beauty surprise boring future initial fame talk erosion right',
  'https://rinkeby.infura.io/v3/ddf3290d98c84b0db705b12888b5c474'
);
const web3 = new Web3(provider);

const deploy = async()=>
{
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from the account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: bytecode, arguments: ['Hi there!']})
  .send({gas: '1000000', from : accounts[0]});

  console.log('Contract deployed to', result.options.address);
};
deploy();
