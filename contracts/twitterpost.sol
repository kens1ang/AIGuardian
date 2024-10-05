// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract DecentralizedPost {
    // Struct to hold each post's data, including worldId, timestamp, and imageHash
    struct Post {
        uint256 postId;
        address userAddress;
        string ipfsHash;    // IPFS hash for the post
        string imageHash;   // Hash of the image content
        string content;     // Content of the post (e.g., text)
        uint256 timestamp;  // Timestamp when the post was created
        string worldId;     // World ID of the person who submitted the post
    }

    // Mapping of postId to Post
    mapping(uint256 => Post) public posts;

    // Array to store post IDs for ordered access
    uint256[] public postIds;

    // Variable to track the next post ID
    uint256 public nextPostId;

    // Event that will be emitted when a new post is created
    event PostCreated(
        uint256 postId,
        address indexed userAddress,
        string ipfsHash,
        string imageHash,
        string content,
        uint256 timestamp,
        string worldId
    );

    // Constructor initializes the nextPostId to 1
    constructor() {
        nextPostId = 1;
    }

    // Function to create a new post
    function createPost(
        string memory _ipfsHash,
        string memory _imageHash,
        string memory _content,
        string memory _worldId // Added worldId parameter
    ) public {
        uint256 currentTimestamp = block.timestamp; // Get the current timestamp

        // Store the new post details in the mapping
        posts[nextPostId] = Post(nextPostId, msg.sender, _ipfsHash, _imageHash, _content, currentTimestamp, _worldId);

        // Store the post ID in the array for ordered access
        postIds.push(nextPostId);

        // Emit the PostCreated event, including worldId
        emit PostCreated(nextPostId, msg.sender, _ipfsHash, _imageHash, _content, currentTimestamp, _worldId);

        // Increment the postId for the next post
        nextPostId++;
    }

    // Function to fetch a post by its ID
    function getPost(uint256 _postId) public view returns (Post memory) {
        return posts[_postId];
    }

    // Function to get all posts in descending order of timestamp
    function getPostsDescending() public view returns (Post[] memory) {
        uint256 totalPosts = postIds.length;
        Post[] memory result = new Post[](totalPosts);

        for (uint256 i = 0; i < totalPosts; i++) {
            // Get posts in reverse order from the postIds array
            result[i] = posts[postIds[totalPosts - 1 - i]];
        }

        return result;
    }
}
