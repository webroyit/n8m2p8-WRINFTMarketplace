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