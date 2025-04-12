// src/services/blockchainService.js
const { ethers } = require('ethers');
const Payment = require('../models/Payment');
require('dotenv').config();

const provider = new ethers.JsonRpcProvider(process.env.BSC_RPC_URL);

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

exports.checkPayments = async () => {
  const pendingPayments = await Payment.find({ status: 'pending' });

  for (const payment of pendingPayments) {
    const tokenContract = new ethers.Contract(payment.tokenAddress, ERC20_ABI, provider);

    const balance = await tokenContract.balanceOf(payment.paymentAddress);
    const decimals = await tokenContract.decimals();

    const humanBalance = Number(ethers.formatUnits(balance, decimals));

    if (humanBalance >= payment.amount) {
      await Payment.updateOne(
        { _id: payment._id },
        { status: 'paid' }
      );
      console.log(`Payment Success: ${payment._id}`);
    }
  }
};