Installation:

`npm i https://github.com/bluebear-tech/simple-erc20`

Usage: 

```javascript
  import SimpleERC20 from 'simple-erc20'
  
  const token = new SimpleERC20('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
  token.name().then(console.log);
  //Should print Wrapped Ether
```

The SimpleERC20 function can receive three parameters. 
1. A ERC20 token address
1. The network name or id Ethereum network (optional)
1. An existing web3 object to wrap (optional)