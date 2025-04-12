// server.js
const app = require('./src/app');
const { checkPayments } = require('./src/services/blockchainService');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

setInterval(async () => {
  await checkPayments();
}, 10000);
