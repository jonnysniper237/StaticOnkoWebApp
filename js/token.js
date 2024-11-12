

import express from 'express';
import { decode } from 'jsonwebtoken';
const app = express();

app.get('/show-claims', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = decode(token);
    res.json(decoded);
});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
