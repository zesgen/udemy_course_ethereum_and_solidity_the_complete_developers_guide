//SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract Lottery {
    address public manager;
    address payable[] public players;

    constructor() {
        manager = tx.origin;
    }

    function enter() public payable {
        require(
            msg.value >= 0.01 ether,
            "Lottery: The value to enter should be no less than 0.1 ETH"
        );
        players.push(payable(msg.sender));
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    modifier onlyManager() {
        require(
            tx.origin == manager,
            "Lottery: It can be executed only by the manager"
        );
        _;
    }

    function pickWinner() public onlyManager {
        uint winnerIndex = random() % players.length;
        players[winnerIndex].transfer(address(this).balance);
        players = new address payable[](0);
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
