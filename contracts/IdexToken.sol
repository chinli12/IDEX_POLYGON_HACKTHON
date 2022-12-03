// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
error unmonitize();

contract IdexToken is ERC20, Ownable {
    address idexcontact;
    modifier onlyidex() {
        if (msg.sender != idexcontact) {
            revert unmonitize();
        }
        _;
    }

    constructor(address _idex) ERC20("IdexToken", "IDEX") {
        idexcontact = _idex;
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
