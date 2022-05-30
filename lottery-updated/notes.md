1. Init the npm project:
   ```bash
   npm init
   ```

2. Install dependencies
   ```bash
   npm install --save-dev solc web3 mocha ganache-cli @truffle/hdwallet-provider
   ```

3. Update your test script in the package.json file to be `"test": "mocha"`.

4. The deployment contract addresses:
   * Rinkeby: [0xff950C10e22ad3De896b365d22400A8FE8B1aE7e](https://rinkeby.etherscan.io/address/0xff950C10e22ad3De896b365d22400A8FE8B1aE7e)