## Smart Contract Addresses:

### Manta Sepolia Testnet:
- [originality.sol](https://sepolia.etherscan.io/address/0x05c1D57282642379b2cc0349846285A248984196): `0x05c1D57282642379b2cc0349846285A248984196`
- [deepfakestorage.sol](https://sepolia.etherscan.io/address/0x385815Ca79ed0A954c0277d2651CcED5f2Fb40C6): `0x385815Ca79ed0A954c0277d2651CcED5f2Fb40C6`
- [twitterpost.sol](https://sepolia.etherscan.io/address/0x89Ac93592b0A9E98F7F297B7960314d92b50FbA6): `0x89Ac93592b0A9E98F7F297B7960314d92b50FbA6`

### Scroll Sepolia Testnet:
- [originality.sol](https://sepolia.etherscan.io/address/0x079CF630a623Bc12E4451ACe7cdD72F49B6977F3): `0x079CF630a623Bc12E4451ACe7cdD72F49B6977F3`
- [deepfakestorage.sol](https://sepolia.etherscan.io/address/0x2a662D2Fa3553C2849151b44Ea3fe2Ec3579f1f7): `0x2a662D2Fa3553C2849151b44Ea3fe2Ec3579f1f7`
- [twitterpost.sol](https://sepolia.etherscan.io/address/0x69668FF363fFA1D0832654748158165a0cD42615): `0x69668FF363fFA1D0832654748158165a0cD42615`

## Smart Contract Functions
### originality.sol
- Stores the image hash along with its originality status. The _originality parameter is a boolean indicating whether the image is original (true) or not (false).
- Retrieves the originality status (true or false) for a given image hash.

### twitterpost.sol
- Creates a new post with the provided IPFS hash, image hash, content, and the user's world ID. The post also records the current timestamp.
- Fetches the details of a post using its post ID. The post structure includes IPFS hash, image hash, content, user address, world ID, and timestamp.
- Returns all posts in descending order based on their timestamps.

### deepfakestorage.sol
- Stores the image hash along with a deepfake value (1, 2, or 3, indicating different levels of deepfake detection) and the current timestamp.
- Retrieves the deepfake value associated with a given image hash.
- Retrieves the timestamp indicating when the image was stored on the blockchain.


