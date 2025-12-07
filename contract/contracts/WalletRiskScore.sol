// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract WalletRiskScore {
    mapping(address => uint256) private scores;

    function setScore(address wallet, uint256 score) external {
        require(score <= 100, "Score must be between 0 and 100");
        scores[wallet] = score;
    }

    function getScore(address wallet) external view returns (uint256) {
        return scores[wallet];
    }
}
