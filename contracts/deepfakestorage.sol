// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract DeepfakeStorage {

    // Struct to hold information for each image
    struct ImageInfo {
        string imageHash;
        uint8 deepfakeValue;
        uint256 timestamp; // Timestamp when the image was stored
    }

    // Mapping from image hash to image information
    mapping(string => ImageInfo) private imageStorage;

    // Event for when an image is added
    event ImageAdded(string imageHash, uint8 deepfakeValue, uint256 timestamp);

    // Function to store the image hash, deepfake value, and timestamp
    function storeImage(string memory _imageHash, uint8 _deepfakeValue) public {
        require(_deepfakeValue == 1 || _deepfakeValue == 2 || _deepfakeValue == 3, "Invalid deepfake value");

        // Store the deepfake value and timestamp in the mapping
        imageStorage[_imageHash] = ImageInfo({
            imageHash: _imageHash,
            deepfakeValue: _deepfakeValue,
            timestamp: block.timestamp // Use block timestamp for time storage
        });

        // Emit event for logging
        emit ImageAdded(_imageHash, _deepfakeValue, block.timestamp);
    }

    // Function to retrieve the deepfake value based on image hash
    function getDeepfakeValue(string memory _imageHash) public view returns (uint8) {
        return imageStorage[_imageHash].deepfakeValue;
    }

    // New function to retrieve the timestamp based on image hash
    function getImageTimeStamp(string memory _imageHash) public view returns (uint256) {
        return imageStorage[_imageHash].timestamp;
    }
}
