// src/app.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const paymentRoute = require('./routes/paymentRoute');

const app = express();

app.use(express.json());
app.use('/api/payment', paymentRoute);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

module.exports = app;