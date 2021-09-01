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

    // Places an item for sale on the marketplace
    // Using nonReentrant modifier
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        // Create new market item
        idToMarketItem[itemId] =  MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),    // Setting as empty address
            price,
            false
        );
        
        // Transfer the ownership of the NFT to the contract itself
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    // Creates the sale of a marketplace item
    // Transfers ownership of the item, as well as funds between parties
    // Using nonReentrant modifier
    function createMarketSale(
        address nftContract,
        uint256 itemId
    ) public payable nonReentrant {
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].tokenId;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");    

        idToMarketItem[itemId].seller.transfer(msg.value);      // Send the money to the seller's address
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);      // Transfer NFT's ownership to the buyer
        
        // Update Market Item data
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;

        _itemsSold.increment();     // Update item sold
        payable(owner).transfer(listingPrice);      // Pay commission to the owner of the contract
    }

    // Returns all unsold market items
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _itemIds.current();        // Get the total amount of market items
        uint unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        for (uint i = 0; i < itemCount; i++) {
            // Check if this item is unsold
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        
        return items;
    }

    // Returns only items that a user has purchased
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        // Get item count purchased by the user
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;        
    }

    // Returns only items a user has created
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }
}