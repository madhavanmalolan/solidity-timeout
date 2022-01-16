pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";



contract Timeout {

    constructor() {

    }

    using Counters for Counters.Counter;

    enum Status{ QUEUED, RUNNING, COMPLETED }

    struct Function {
        address contractAddress;
        string signature;
        bytes parameters;
        uint blockStart;
        uint blockEnd;
        uint value;
        Status status;
    }

    event CallFunction(uint id, uint blockStart, uint blockEnd, uint value);
    event Executed(uint id);

    Counters.Counter private _id;
    mapping( uint => Function ) functions;

    function enqueue(address contractAddress, string calldata signature, bytes calldata parameters, uint blockStart, uint blockEnd) public payable returns(uint){
        _id.increment();
        functions[_id.current()] = Function({
            contractAddress: contractAddress,
            signature: signature,
            parameters: parameters, 
            blockStart: blockStart,
            blockEnd: blockEnd,
            value: msg.value,
            status: Status.QUEUED
        });
        emit CallFunction(_id.current(), blockStart, blockEnd, msg.value);
        return _id.current();
    }

    function call(uint id) public{
        Function memory f = functions[id];
        require(block.number >= f.blockStart && block.number <= f.blockEnd, "Function call not in specified range");
        require(f.status == Status.QUEUED, "Not in queue");
        f.status = Status.RUNNING;
        functions[id] = f;
        address(f.contractAddress).call( 
            abi.encodeWithSelector(
                bytes4(
                    keccak256(bytes(f.signature))
                ),
                f.parameters
            )
        );
        payable(address(msg.sender)).transfer(f.value);
        f.status = Status.COMPLETED;
        functions[id] = f;
        emit Executed(id);
    }

    function topUp(uint id) public payable {
        Function memory f = functions[id];
        f.value += msg.value;
        functions[id] = f;
    }

    function currentId() public view returns(uint){
        return _id.current();
    }
}


