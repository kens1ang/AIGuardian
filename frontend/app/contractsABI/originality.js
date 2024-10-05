export const originalityAddress = '0x079CF630a623Bc12E4451ACe7cdD72F49B6977F3';
export const originalityABI = [
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
				"internalType": "bool",
				"name": "originality",
				"type": "bool"
			}
		],
		"name": "OriginalityStored",
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
		"name": "getOriginality",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
				"internalType": "bool",
				"name": "_originality",
				"type": "bool"
			}
		],
		"name": "storeOriginality",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];