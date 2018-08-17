pragma solidity ^0.4.17;
//specifies the version of solidity that our code is written with

contract Inbox {
    //declares all the instance variables with their type
    //storage resides in blockchain different from local variable that will get rid after the contract first executed
    string public message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}