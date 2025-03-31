require('dotenv').config();
const express = require('express');
const walletRoutes = require('./routes/walletRoutes');

const app = express();
app.use(express.json());
app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));