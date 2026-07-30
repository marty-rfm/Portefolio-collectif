const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// 1. Servir les fichiers statiques générés par le build React
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// 2. Rediriger toutes les requêtes web vers l'application React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// 3. Port dynamique pour Railway
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur prêt sur le port ${PORT}`);
});