const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/send-sms', async (req, res) => {
  const { number, amount, delay } = req.query;
  const apiUrl = `https://joshweb.click/smsb?number=${number}&amount=${amount}&delay=${delay}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).send('Error sending SMS.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
