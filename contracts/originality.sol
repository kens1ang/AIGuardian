// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract OriginalityStorage {

    // Struct to hold information for each image regarding originality
    struct OriginalityInfo {
        string imageHash;
        bool originality; // Boolean to indicate if the image is original (true = original, false = not original)
    }

    // Mapping from image hash to originality information
    mapping(string => OriginalityInfo) private originalityStorage;

    // Event for when an image's originality is stored
    event OriginalityStored(string imageHash, bool originality);

    // Function to store the image hash and originality status
    function storeOriginality(string memory _imageHash, bool _originality) public {
        // Store the originality status in the mapping
        originalityStorage[_imageHash] = OriginalityInfo({
            imageHash: _imageHash,
            originality: _originality
        });

        // Emit event for logging
        emit OriginalityStored(_imageHash, _originality);
    }

    // Function to retrieve the originality based on image hash
    function getOriginality(string memory _imageHash) public view returns (bool) {
        return originalityStorage[_imageHash].originality;
    }
}
