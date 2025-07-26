const express = require('express');
const fs = require('node:fs/promises');
const app = express();

app.use(express.json());

app.get('/characters', async (req, res) => {
    try {
        const data = await fs.readFile('characters.json', 'utf8');
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read or parse characters.json' });
    }
});

app.listen(8080);