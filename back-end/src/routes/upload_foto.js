const express = require('express');
const multer = require('multer');
const pool = require('../database/database_connection'); // Pastikan path ini benar
const router = express.Router();

// Konfigurasi multer untuk menyimpan file di memori
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint untuk mengunggah foto kepala sekolah
router.post('/upload-foto', upload.single('foto'), async (req, res) => {
    try {
        const { nama } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: 'Foto harus diunggah!' });
        }

        const foto = req.file.buffer;

        await pool.execute('INSERT INTO foto_kepsek (nama, foto) VALUES (?, ?)', [nama, foto]);

        res.status(201).json({ message: 'Foto berhasil diunggah!' });
    } catch (error) {
        console.error('Gagal mengunggah foto:', error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server' });
    }
});

module.exports = router;
