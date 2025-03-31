const web3 = require('../config/rpc');
const ABI = require('../abi/BEP20.json')
require('dotenv').config();

const walletAddress = process.env.WALLET_ADDRESS;
const privatekey = process.env.PRIVATE_KEY;
const tokenAddress = process.env.TOKEN_ADDRESS;
const contract = new web3.eth.Contract(ABI, tokenAddress);

exports.getBalance = async (req, res) => {
    try {
        const balance = await contract.methods.balanceOf(walletAddress).call();
        const decimals = await contract.methods.decimals().call();
        const formattedBalance = balance / Math.pow(10, decimals);
        res.json({balance: formattedBalance});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

exports.sendTokens = async (req, res) => {
    try {
        const {to, amount} = req.body;

        const decimals = await contract.methods.decimals().call();
        const value = (amount * Math.pow(10, decimals)).toString();

        const tx = {
            to: tokenAddress,
            data: contract.methods.transfer(to, value).encodeABI(),
            gas:200000,
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, privatekey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        res.json({receipt});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};
