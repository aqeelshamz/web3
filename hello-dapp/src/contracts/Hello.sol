//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Hello{
    uint32 favoriteNumber;

    function store(uint32 _value) public {
        favoriteNumber = _value;
    }

    function getValue() public view returns (uint32){
        return favoriteNumber;
    }
}