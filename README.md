# NFT Marketplace

## Setting up Tailwind CSS
- Install the Tailwind dependencies
```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```
- Create the configuration files needed for Tailwind to work with Next.js
```
npx tailwindcss init -p
```
- Delete the code in styles/globals.css and add the following code
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Setting up Hardhat
NFT Marketplace.  The template is from Nader Dabit youtube channel.

- Install the Hardhat dependencies
```
npm install hardhat @nomiclabs/hardhat-waffle ethereum-waffle @nomiclabs/hardhat-ethers 
```
- Initialize a new Hardhat development environment
```
npx hardhat
```

## Notes
- Solidity does not have dynamic length of arrarys
- `struct` is an object or map
- `event ` is for getting result from the contract on the front end
- `npx hardhat test` to run test
- `npx hardhat node` to spin up a local network
- `npx hardhat run scripts/deploy.js --network localhost` to deploy the contracts to localhost
- `npx hardhat run scripts/deploy.js --network mumbai` to deploy the contracts to Polygon mumbai network
- [MetaMask chainId issue](https://hardhat.org/metamask-issue.html)