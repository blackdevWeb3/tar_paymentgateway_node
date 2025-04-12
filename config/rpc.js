require("dotenv").config();
const { Web3 } = require("web3");

const web3 = new Web3(process.env.BSC_RPC_URL);

module.exports = web3;
