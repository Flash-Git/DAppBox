const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_partnerNonce",
				"type": "uint256"
			}
		],
		"name": "acceptTrade",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_erc20Address",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "addOfferErc20",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_erc721Address",
				"type": "address"
			},
			{
				"name": "_id",
				"type": "uint256"
			},
			{
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "addOfferErc721",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_erc20Address",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "pushOfferErc20",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_erc721Address",
				"type": "address"
			},
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "pushOfferErc721",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "removeOfferErc20",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "removeOfferErc721",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_count",
				"type": "uint8"
			}
		],
		"name": "setCountErc20",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_count",
				"type": "uint8"
			}
		],
		"name": "setCountErc721",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tradePartner",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			}
		],
		"name": "unacceptTrade",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "partner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "boxNum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "partnerNonce",
				"type": "uint256"
			}
		],
		"name": "TradeAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "partner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "boxNum",
				"type": "uint256"
			}
		],
		"name": "TradeUnaccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "partner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "boxNum",
				"type": "uint256"
			}
		],
		"name": "TradeExecuted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "partner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "boxNum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "contractAdd",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "nonce",
				"type": "uint256"
			}
		],
		"name": "OfferModifiedERC20",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "partner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "boxNum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "contractAdd",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "nonce",
				"type": "uint256"
			}
		],
		"name": "OfferModifiedERC721",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "partner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "boxNum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "nonce",
				"type": "uint256"
			}
		],
		"name": "OfferRemovedERC20",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "partner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "boxNum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "nonce",
				"type": "uint256"
			}
		],
		"name": "OfferRemovedERC721",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "partner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "boxNum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "count",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "nonce",
				"type": "uint256"
			}
		],
		"name": "BoxCountModifiedERC20",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "partner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "boxNum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "count",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "nonce",
				"type": "uint256"
			}
		],
		"name": "BoxCountModifiedERC721",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			}
		],
		"name": "getErc20Count",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			}
		],
		"name": "getErc721Count",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			}
		],
		"name": "getNonce",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "getOfferErc20",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			},
			{
				"name": "_index",
				"type": "uint8"
			}
		],
		"name": "getOfferErc721",
		"outputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_add1",
				"type": "address"
			},
			{
				"name": "_add2",
				"type": "address"
			},
			{
				"name": "_boxNum",
				"type": "uint256"
			}
		],
		"name": "getPartnerNonce",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

export default abi;