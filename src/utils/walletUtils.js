// src/utils/walletUtils.js
const { Wallet } = require('ethers');

exports.generateNewWallet = () => {
  const wallet = Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey
  };
};