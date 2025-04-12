// src/routes/paymentRoute.js
const express = require('express');
const router = express.Router();
const { createPayment } = require('../controllers/paymentController');

router.post('/create', createPayment);

module.exports = router;