import express from 'express';
import { error } from 'node:console';
import fs from 'node:fs/promises';
const app = express();

app.use(express.json());
const data = await fs.readFile('characters.json', 'utf8');
const jsonData = JSON.parse(data);

app.get('/characters', async (req, res) => {
    try {
        res.status(200).json(jsonData);
    } catch (error) {
        console.error(`GET /characters/${req.params.id} error: ${error.message}`);
        res.status(500).json({ error: 'Failed to read or parse characters.json' });
    }
});

app.get('/characters/:id', async (req, res) => {
    try {
        const character = jsonData.characters.find(char => char.id === parseInt(req.params.id));
        if (character) {
            res.status(200).json(character);
        } else {
            res.status(404).json({ error: 'Character not found' });
        }
    } catch (error) {
        console.error(`GET /characters/${req.params.id} error: ${error.message}`);
        res.status(500).json({ error: 'Failed to read or parse characters.json' });
    }
});

app.post('/characters', async (req, res) => {
    const { id, name, realName, universe } = req.body;
    const IndexCh = jsonData.characters.findIndex(char => char.id === id);
        
    try {
        if (IndexCh !== -1) {
            jsonData.characters[IndexCh] = { id, name, realName, universe };
    
            await fs.writeFile('characters.json', JSON.stringify(jsonData, null, 2));
            res.status(200).json({ message: "Updated" });
        } else {
            jsonData.characters.push({ id, name, realName, universe });
    
            await fs.writeFile('characters.json', JSON.stringify(jsonData, null, 2));
            res.status(201).json({ message: "Created whith succes" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(404).json({error: "Not Found"});
    }
})

app.put('/characters/:id', async (req, res) => {
    let { id, name, realName, universe } = req.body;
    const IndexCh = jsonData.characters.findIndex(char => char.id === parseInt(req.params.id));
    try {
        if (IndexCh !== -1) {
            if ((id === undefined) || (name === undefined) || (realName === undefined) || (universe === undefined)) {
                res.status(404).json({ error: "Bad Request"});
            }
            jsonData.characters[IndexCh] = { id, name, realName, universe };

            await fs.writeFile('characters.json', JSON.stringify(jsonData, null, 2));
            res.status(200).json({ message: "UPDATED SUCCESFUL"})
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(404).json({ error: "Missing Id"})
    }
})

app.patch('/characters/:id', async (req, res) => {
    let { id, name, realName, universe } = req.body;
    const IndexCh = jsonData.characters.findIndex(char => char.id === parseInt(req.params.id));
    try {
        if (IndexCh !== -1) {
            if (id === undefined) id = jsonData.characters[IndexCh].id
            if (name === undefined) name = jsonData.characters[IndexCh].name
            if (realName === undefined) realName = jsonData.characters[IndexCh].realName
            if (universe === undefined) universe = jsonData.characters[IndexCh].universe
            
            jsonData.characters[IndexCh] = { id, name, realName, universe };

            await fs.writeFile('characters.json', JSON.stringify(jsonData, null, 2));
            res.status(200).json({ message: "UPDATED SUCCESFUL"})
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(404).json({ error: "Missing Id"})
    }
})

app.delete('/characters/:id', async (req, res) => {
    const IndexCh = jsonData.characters.findIndex(char => char.id === parseInt(req.params.id));
    try {
        if (IndexCh !== -1) {
            if (IndexCh === 0) {
                jsonData.characters.shift();
            }
            else if (IndexCh === (jsonData.characters.length - 1)) {
                jsonData.characters.pop();
            }
            else {
                jsonData.characters = [
                    ...jsonData.characters.slice(0, IndexCh),
                    ...jsonData.characters.slice((IndexCh+1), (jsonData.characters.length))
                ]
            }
            
            await fs.writeFile('characters.json', JSON.stringify(jsonData, null, 2));
            res.status(204).send();
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: "Missing Id"})
    }
})

app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
