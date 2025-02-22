require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./src/database/database_connection');
const uploadFotoRoutes = require('./src/routes/upload_foto');
const visiMisiRoutes = require('./src/routes/visi_misi_route');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', uploadFotoRoutes);
app.use('/api', visiMisiRoutes);

app.get('/api/kata-sambutan', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM kata_sambutan');
        res.json(rows);
    } catch (error) {
        console.error('Gagal mengambil data kata sambutan:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
});

app.get('/api/foto', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT foto FROM foto_kepsek ORDER BY id DESC LIMIT 1');
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Foto tidak ditemukan' });
        }
        res.set('Content-Type', 'image/jpeg');
        res.send(rows[0].foto);
    } catch (error) {
        console.error('Gagal mengambil foto kepala sekolah:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});