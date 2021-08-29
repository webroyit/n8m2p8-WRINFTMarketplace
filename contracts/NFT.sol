// You must set license
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// From node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// Extension for ERC721, has a function called setTokenURI()
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// Utility for incrementing numbers
import "@openzeppelin/contracts/utils/Counters.sol";

// `is` inherit from ERC721URIStorage contract
// `ERC721URIStorage` also inherit from ERC721 contract
contract NFT is ERC721URIStorage{
    // Incrementing value for an unique identifier for each token
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Address of the marketplace that has access to functions on ERC721 contract
    address contractAddress;

    // Set the deployer address as marketplace address
    constructor(address marketplaceAddress) ERC721("WRI Tokens", "WRIT") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint) {
        _tokenIds.increment();      // Increment the value by 1
        uint256 newItemId = _tokenIds.current();

        // These functions are from ERC721URIStorage
        _mint(msg.sender, newItemId);       // Mint a token
        _setTokenURI(newItemId, tokenURI);      // Set the URL of the image
        setApprovalForAll(contractAddress, true);    // Give marketplace the approval to transact this token between users from within another contract

        return newItemId;
    }
}
