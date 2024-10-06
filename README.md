# AI Guardian


# Securing Content Integrity: On-Chain Deepfake Detection & Originality Verification for Social Media 

## 📌 Problem Statement
In today's digital age, deepfake images and videos present a significant threat to both personal and public integrity. These highly sophisticated AI-generated media can depict individuals in scenarios they have never been involved in, leading to potential reputational damage, false accusations, and even legal issues. This creates a critical need for a robust, transparent, and tamper-proof solution to identify and flag deepfakes before they cause irreparable harm.

Key challenges include:

- Deepfake Threats to Integrity: Individuals’ reputations can be irreparably damaged by false media that show them doing things they have never done.

- Lack of Trust in Media: As deepfakes grow more convincing, it becomes increasingly difficult to trust visual media, raising concerns about the validity of content.

- Image Theft and Unauthorized Usage: Content creators often face issues with image theft, where their original content is reposted without permission.

- Complex Reporting Process: Existing mechanisms for reporting deepfakes and unoriginal content are slow and prone to errors, further complicating the fight against misinformation.

## ✅ Vision
Our vision is to provide a solution that protects both individuals and content creators from the dangers of deepfakes and image theft. By utilizing on-chain AI deepfake detection and originality verification, the platform aims to:

-Safeguard personal integrity by ensuring that deepfake media can be flagged and verified quickly.

-Support content creators in defending their original works from theft and reposting.

-Ensure trust in media through a transparent, decentralized verification system that guarantees content integrity.

By leveraging blockchain technology for tamper-proof verification and multichain compatibility (eg. Manta, Scroll, ICP), we aim to create a safer online environment where users can interact with verified, original content without the fear of being deceived by false media.

## 🌟 Unique Value Proposition
The unique combination of on-chain AI-powered deepfake detection and originality verification ensures that:

- Personal Integrity is Protected: Deepfake detection allows individuals to safeguard their reputation through tagging manipulated images in real-time.

- Sybil Resistance: World ID verification prevents Sybil attacks, where a user creates multiple fake identities. This ensures that a single verified individual cannot create multiple accounts to upload misleading content.
  
- Transparency is Guaranteed: Once deepfake or originality checks are performed, the results are stored immutably on the blockchain, providing an unalterable record.
  
- Cross-Chain Compatibility: The toolkit operates across and supports all EVM blockchains, making it scalable and applicable to a wide array of social media platforms.
  
- Prevention of Image Theft: Content creators can use the originality verification tool to ensure their images aren’t stolen or reposted without their permission.

## 🛠️ How It’s Made
This project uses cutting-edge blockchain and AI technology to detect deepfake images and verify the originality of visual content:

- On-Chain AI Model: An AI-powered deepfake detection model is deployed on the Internet Computer Protocol (ICP) to analyze and classify deepfake images. The deepfake score (deepfakeValue) is stored immutably on the blockchain.
  
- Originality Verification: A hash of the image is stored along with its originality status on-chain, ensuring that any reposted or stolen images can be detected and flagged immediately.
  
- Multichain Compatibility: The solution supports multiple blockchains, ensuring that media across platforms can be verified for authenticity.

## 💻 The Stack
### Frontend
- Languages: TypeScript, Javascript
- Framework: Next.js
- Styling: TailwindCSS, Google Fonts

### Web3 Development
- Smart Contracts: Solidity
- Blockchain Frameworks: Thirdweb, Web3.js, Ethers.js
- Networks: Scroll Sepolia Testnet, Manta Sepolia Testnet

### On-Chain AI & Decentralization
- AI Model: Custom-built deepfake detection algorithm, trained and deployed on the Internet Computer Protocol (ICP).
- Storage: IPFS (InterPlanetary File System) for decentralized storage of images and related metadata.

## Smart Contract Addresses:

### Scroll Sepolia Testnet:
- [originality.sol](https://sepolia.scrollscan.com/address/0x109e8B75b04919Cb2838691C1a06Eed403FBc40b): `0x109e8B75b04919Cb2838691C1a06Eed403FBc40b` Verified ✅
- [deepfakestorage.sol](https://sepolia.scrollscan.com/address/0x0521D794F9bdeEdE71D2B6EF749da7d393a9a7aB): `0x0521D794F9bdeEdE71D2B6EF749da7d393a9a7aB` Verified ✅
- [twitterpost.sol](https://sepolia.scrollscan.com/address/0x21270553C12c14E4B96138Cd31eB09176F12F2ce): `0x21270553C12c14E4B96138Cd31eB09176F12F2ce` Verified ✅


### Manta Sepolia Testnet:
- [originality.sol](https://manta-sepolia.explorer.caldera.xyz/address/0x079CF630a623Bc12E4451ACe7cdD72F49B6977F3): `0x079CF630a623Bc12E4451ACe7cdD72F49B6977F3`
- [deepfakestorage.sol](https://manta-sepolia.explorer.caldera.xyz/address/0x2a662D2Fa3553C2849151b44Ea3fe2Ec3579f1f7): `0x2a662D2Fa3553C2849151b44Ea3fe2Ec3579f1f7`
- [twitterpost.sol](https://manta-sepolia.explorer.caldera.xyz/address/0x69668FF363fFA1D0832654748158165a0cD42615): `0x69668FF363fFA1D0832654748158165a0cD42615`

### ICP Canister Address
- [Frontend canister via browser](https://cqqh4-4yaaa-aaaah-qds4a-cai.icp0.io/): `https://cqqh4-4yaaa-aaaah-qds4a-cai.icp0.io/`
- [Backend canister via Candid interface](https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=d56ds-tqaaa-aaaah-qds3q-cai): ` https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=d56ds-tqaaa-aaaah-qds3q-cai`

## Smart Contract Functions
### deepfakestorage.sol
- Stores the image hash along with a deepfake value fed from the on-chain AI model for deepfake image detection with the current timestamp for verification.
- Retrieves the deepfake value associated with a given image hash.
- Retrieves the timestamp indicating when the image was stored and verified on the blockchain.
  
### twitterpost.sol 
- Creates a new social media post with the provided IPFS hash, image hash, content, and the user's world ID. The post also records the current timestamp.
- Fetches the details of a post using its post ID. The post structure includes IPFS hash, image hash, content, user address, world ID, and timestamp.
- Returns all posts in descending order based on their timestamps.

### originality.sol
- Stores the image hash along with its originality status to verify that the image is first posted by the creator. The _originality parameter is a boolean indicating whether the image is original (true) or not (false).
- Retrieves the originality status (true or false) for a given image hash.



