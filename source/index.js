import Web3 from 'web3';
const abi = require('../lib/abi.json');

const infuraEndpoints = {
  1: "https://mainnet.infura.io",
  'main': "https://mainnet.infura.io",
  3: "https://ropsten.infura.io",
  'ropsten': "https://ropsten.infura.io",
  4: "https://rinkeby.infura.io",
  'rinkeby': "https://rinkeby.infura.io",
  42: "https://kovan.infura.io",
  'kovan': "https://kovan.infura.io",
};

const initWeb3 = (network, web3Param) => {
  if (web3Param !== null) {
    return new Web3(web3Param.currentProvider);
  } else if (typeof web3 !== 'undefined') {
    return new Web3(web3.currentProvider);
  } else {
    return new Web3(new Web3.providers.HttpProvider(infuraEndpoints[network]));
  }
};

const SimpleERC20 = (address, network = 1, web3Param = null) => {
  const w3 = initWeb3(network, web3Param);
  if (typeof address === 'undefined') throw new Error('SimpleERC20: Address undefined');
  if (!w3.utils.isAddress(address)) throw new Error(`SimpleERC20: Invalid address: ${address}`);
  const contract = new w3.eth.Contract(abi, address);
  const methods = contract.methods;

  return {
    contract,
    name: () => methods.name().call(),
    symbol: () => methods.symbol().call(),
    totalSupply: () => methods.totalSupply().call(),
    decimals: () => methods.decimals().call(),
    balanceOf: (owner) => methods.balanceOf(owner).call(),
    allowance: (owner, spender) => methods.allowance(owner, spender).call()
    //TODO: Transactions to possibly implement
    //approve  (spender,value)
    //transferFrom (from, to, value)
    //transfer (to, value)

    //TODO: Events to expose actions for.
    // Approval
    // Transfer
  }

};

export default SimpleERC20;