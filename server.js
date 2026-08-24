const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = ['https://kos.khepraexperts.com', 'https://api.khepraexperts.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Bloqué par la politique CORS de Khepra Experts'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Route de santé pour le maintien 24/7 Fly.io
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    system: 'KOS RegTech Enterprise',
    firm: 'Khepra Experts',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(\KOS Backend Enterprise running on port \\);
});
