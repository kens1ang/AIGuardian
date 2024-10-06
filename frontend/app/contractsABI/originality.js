export const originalityAddress = '0x37333d92b348E5F63D0eC6c51dC83716829b39b5';
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