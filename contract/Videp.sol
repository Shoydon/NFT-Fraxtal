// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

// import "./TRC721.sol"; // Import the TRC721 contract

contract NFTMarketplace {
    uint public itemCount;
    uint public tokenCount;
    address payable public feeAccount;

    mapping(uint => string) public tokenURIs; // Mapping from token ID to token URI

    struct Item {
        address ogOwner;
        uint itemId;
        uint tokenId;
        uint256 price;
        address payable seller;
        bool sold;
    }

    mapping(uint => Item) public items;

    event Offered(
        uint itemId,
        uint tokenId,
        uint256 price,
        address indexed seller
    );

    event Bought(
        uint itemId,
        uint tokenId,
        uint256 price,
        address indexed seller,
        address indexed buyer
    );

    constructor() public {}

    function mint(address _to, uint256 _tokenId, string memory _tokenURI, uint _price) public {
        itemCount++;
        tokenCount++;
        items[itemCount] = Item(
            _to,
            itemCount,
            _tokenId,
            _price,
            msg.sender,
            false
        );

        tokenURIs[_tokenId] = _tokenURI; // Set the token URI for the minted token

        emit Offered(
            itemCount,
            _tokenId,
            _price,
            msg.sender
        );
    }

    function purchaseItem(uint _itemId) external payable {
        uint256 _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount, "Item doesn't exist");
        require(msg.value >= _totalPrice, "Not enough TRX to cover item price");
        require(!item.sold, "Item already sold");

        item.sold = true;

        address payable temp = item.seller;
        item.seller = msg.sender;

        temp.transfer(item.price); // Transfer the payment to the seller

        emit Bought(
            _itemId,
            item.tokenId,
            item.price,
            temp,
            msg.sender
        );
    }
    
    function seeItem(uint _itemId) external payable {
        uint256 totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];

        require(_itemId > 0 && _itemId <= itemCount, "Item doesn't exist");
        require(msg.value >= totalPrice, "Not enough ether to cover item price and market fee");
        require(!item.sold, "Item already sold");

        uint256 sellerAmount = msg.value * (100 - 2) / 100;
        uint256 feeAmount = msg.value - sellerAmount;
        
        item.seller.transfer(sellerAmount);
        feeAccount.transfer(feeAmount);
       
    }

    function getTotalPrice(uint _itemId) view public returns(uint256) {
        return ((items[_itemId].price * (100 + 2)) / 100); // Add market fee of 2%
    }

    function getOwner(uint _itemId) view public returns(address) {
        address ogOwner = items[_itemId].ogOwner;
        return ogOwner;
    }

    function getCurrentOwner(uint _itemId) view public returns(address) {
        // address currOwner = ownerOf(items[_itemId].tokenId);
                address currOwner = items[_itemId].seller;

        return currOwner;
    }

    function seeNFT(uint _itemId) external view returns(string memory) {
        string memory uri = tokenURIs[items[_itemId].tokenId]; // Retrieve URI from mapping
        return uri;
    }

    // function ownerOf(uint256 tokenId) internal view returns (address) {
    //     return address(0);
    // }
}
