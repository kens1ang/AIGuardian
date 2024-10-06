export const deepfakestorageAddress = '0xF8b3aa7C61dfA1B4B2476a305c9A76c9e5Eb240C';
export const deepfakestorageABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "imageHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "deepfakeValue",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "ImageAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_imageHash",
				"type": "string"
			}
		],
		"name": "getDeepfakeValue",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_imageHash",
				"type": "string"
			}
		],
		"name": "getImageTimeStamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_imageHash",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_deepfakeValue",
				"type": "uint8"
			}
		],
		"name": "storeImage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];