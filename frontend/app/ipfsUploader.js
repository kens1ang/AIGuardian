import axios from 'axios';

const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

// Function to upload an image file to IPFS using Pinata
export const uploadImageToIPFS = async (file) => {
    try {
        // Prepare the Pinata API endpoint for pinning
        const pinataApiUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

        // Prepare the headers with Pinata API keys
        const headers = {
            'Content-Type': 'multipart/form-data',
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey,
        };

        // Prepare the form data
        const formData = new FormData();
        formData.append('file', file);  // The image file

        // Make the request to Pinata API
        const response = await axios.post(pinataApiUrl, formData, {
            headers: headers,
        });

        // Check if the request was successful
        if (response.status === 200) {
            const ipfsHash = `https://teal-rapid-sloth-873.mypinata.cloud/ipfs/${response.data.IpfsHash}`;
            console.log('Uploaded image to IPFS via Pinata:', ipfsHash);
            return ipfsHash;
        } else {
            console.error('Failed to upload image to IPFS via Pinata. Status Code:', response.status);
            throw new Error('Failed to upload image to IPFS via Pinata');
        }
    } catch (error) {
        console.error('Error uploading image to IPFS via Pinata:', error.message);
        throw error;
    }
};
