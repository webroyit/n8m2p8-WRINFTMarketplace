// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// From node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// Utility for incrementing numbers
import "@openzeppelin/contracts/utils/Counters.sol";
// Security mechanism that prevents re-entry attacks
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// `is` inherit from ReentrancyGuard contract
contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;

    // Need to know the length of array because Solidity does not have dynamic length of arrarys
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    // Owner of this contract makes a commission on every item sold
    address payable owner;
    uint256 listingPrice = 0.025 ether;
    
    // Set the deployer address as owner
    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // List of items, each item can be fetch by item ID
    mapping(uint256 => MarketItem) private idToMarketItem;

    // For getting result from the contract on the front end
    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // Returns the listing price of the contract
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }
}