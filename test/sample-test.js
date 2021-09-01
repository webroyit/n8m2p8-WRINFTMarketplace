const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function() {
    // Deploy the marketplace
    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address    // Get reference to the address from deployed contract

    // Deploy the NFT contract
    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address    // Get reference to the address from deployed contract

    // Get reference to the value of the listing price
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    // Create a value for auction price
    // 'ethers.utils.parseUnits()' work with whole units as opposed to working with wei
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    // Create two NFTs
    await nft.createToken("https://www.mytokenlocation.com")    // Token Id# 1
    await nft.createToken("https://www.mytokenlocation2.com")   // Token Id# 2

    // Put both tokens for sale
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

    // Using test account addresses from hardhat
    // '_' to skip an address
    const [_, buyerAddress] = await ethers.getSigners()

    // Execute sale of token to another user
    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    let items = await market.fetchMarketItems()
    items = await market.fetchMarketItems()
    // 'Promise.all()' for asynchronous mapping
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))

    console.log(items)
  });
});
