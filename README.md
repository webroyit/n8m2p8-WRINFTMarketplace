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