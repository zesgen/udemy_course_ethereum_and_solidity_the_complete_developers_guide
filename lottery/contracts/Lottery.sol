pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() public {
        manager = tx.origin;
    }

    function enter() public payable {
        require(
            msg.value >= 0.01 ether
            //,"Lottery: The value to enter should be no less than 0.1 ETH"
        );
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    modifier onlyManager() {
        require(
            tx.origin == manager
            //,"Lottery: It can be executed only by the manager"
        );
        _;
    }

    function pickWinner() public onlyManager {
        uint winnerIndex = random() % players.length;
        players[winnerIndex].transfer(address(this).balance);
        players = new address[](0);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
