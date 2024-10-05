export const originalityAddress = '0x109e8B75b04919Cb2838691C1a06Eed403FBc40b';
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