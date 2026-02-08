const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'https://lotterynumberfinder.vercel.app'] }));
require("dotenv").config();
const PORT = process.env.PORT || 4000;

const SHEET_ID = '1MrTOlgwMOwk_dEeiYIoREsLtTiPuoBvL';
const SHEET_NAME = 'Sheet1';
const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

async function fetchRows() {
    const response = await fetch(url);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));

    function parseDate(value) {
        if (typeof value === 'string' && value.startsWith('Date(')) {
            const [y, m, d] = value.match(/\d+/g).map(Number);
            return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        }
        return value;
    }

    const headers = json.table.cols.map(c => c.label);
    return json.table.rows.map(r =>
        headers.reduce((o, h, i) => {
            o[h] = r.c[i]?.v ? parseDate(r.c[i].v) : "";
            return o;
        }, {})
    );
}


app.get('/api/sheet', async (req, res) => {
    try {

        const data = await fetchRows();
        const slotOrder = { C: 1, B: 2, A: 3 };
        data.sort((a, b) => {
            const dateDiff = new Date(b.Date) - new Date(a.Date);
            if (dateDiff !== 0) return dateDiff;
                        
            return (slotOrder[a.Slot] || 99) - (slotOrder[b.Slot] || 99);
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/search/:prefix', async (req, res) => {
    const prefix = req.params.prefix.trim();
    const columns = ['1st', '2nd', '3rd', '4th', '5th'];

    try {
        const rows = await fetchRows();
        const countMap = {};

        rows.forEach(row => {
            columns.forEach(col => {
                if (!row[col]) return;

                row[col].split('\n').map(n => n.trim()).filter(Boolean)
                    .forEach(num => {
                        if (num.startsWith(prefix)) {
                            countMap[num] = (countMap[num] || 0) + 1;
                        }
                    });
            });
        });

        const result = Object.entries(countMap)
            .map(([Number, Count]) => ({ Number, Count }))
            .sort((a, b) => b.Count - a.Count);

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/api/details/:number', async (req, res) => {
    const target = req.params.number.trim();
    const columns = ['1st', '2nd', '3rd', '4th', '5th'];

    try {
        const rows = await fetchRows();
        const result = [];

        rows.forEach(row => {
            columns.forEach(col => {
                if (!row[col]) return;

                row[col].split('\n').map(n => n.trim()).filter(Boolean)
                    .forEach(num => {
                        if (num === target) {
                            result.push({
                                Date: row.Date,
                                Slot: row.Slot,
                                Column: col,
                                Number: num
                            });
                        }
                    });
            });
        });
        result.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get("/health", (req, res) => { res.send("OK"); });



app.listen(PORT, () =>
    console.log(`API running → http://localhost:${PORT}/api/sheet`)
);
