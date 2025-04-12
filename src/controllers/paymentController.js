// src/controllers/paymentController.js
const Payment = require('../models/Payment');
const { generateNewWallet } = require('../utils/walletUtils');

exports.createPayment = async (req, res) => {
  const { amount, tokenAddress } = req.body;

  const { address, privateKey } = generateNewWallet();

  const payment = await Payment.create({
    amount,
    tokenAddress,
    paymentAddress: address,
    privateKey,
    status: 'pending'
  });

  res.json({
    paymentId: payment._id,
    paymentAddress: address,
    amount,
    tokenAddress
  });
};