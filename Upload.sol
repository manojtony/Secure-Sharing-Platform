// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Upload {
    struct FileData {
        string fileName;
        string url;
    }

    struct Access {
        address user;
        bool access;
    }

    // Mapping from address to array of FileData (filename and URL)
    mapping(address => FileData[]) public value;

    // Mapping for ownership access
    mapping(address => mapping(address => bool)) public ownership;

    // Mapping for access list
    mapping(address => Access[]) public accessList;

    // Mapping to track previously given access
    mapping(address => mapping(address => bool)) public previousData;

    // Function to add a file with a filename and URL
    function add(
        address _user,
        string memory fileName,
        string memory url
    ) external {
        value[_user].push(FileData(fileName, url));
    }

    // Function to grant access to another address
    function allow(address user) external {
        ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    // Function to revoke access from another address
    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
            }
        }
    }

    // Function to display files (return filename and URL)
    function display(address user) external view returns (FileData[] memory) {
        require(
            user == msg.sender || ownership[user][msg.sender],
            "You don't have access"
        );
        return value[user];
    }

    // Function to share access list
    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
