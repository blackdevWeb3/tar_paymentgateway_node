// src/models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: Number,
  tokenAddress: String,
  paymentAddress: String,
  privateKey: String,
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);