const express = require("express");
const db = require("../database/database_connection");

const router = express.Router();

// Endpoint untuk mengambil foto terbaru dari database
router.get("/foto", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT foto FROM foto_kepsek ORDER BY id DESC LIMIT 1");
        
        if (rows.length === 0) {
            return res.status(404).json({ error: "Foto tidak ditemukan" });
        }

        res.set("Content-Type", "image/jpeg");
        res.send(rows[0].foto);
    } catch (err) {
        console.error("Error mengambil foto:", err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
