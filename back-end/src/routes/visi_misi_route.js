const express = require("express");
const pool = require("../database/database_connection");

const router = express.Router();

router.get("/visi-misi", async (req, res) => {
    try {
        // Ambil data visi
        const [visiRows] = await pool.execute("SELECT visi FROM visi");
        const visi = visiRows.length > 0 ? visiRows[0].visi : "Visi tidak ditemukan";

        // Ambil data misi
        const [misiRows] = await pool.execute("SELECT misi FROM misi");
        const misi = misiRows.map(row => row.misi);

        // Ambil data tujuan
        const [tujuanRows] = await pool.execute("SELECT tujuan FROM tujuan");
        const tujuan = tujuanRows.map(row => row.tujuan);

        // Kirim semua data dalam satu response
        res.json({ visi, misi, tujuan });

    } catch (error) {
        console.error("Gagal mengambil data visi-misi:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
});

module.exports = router;
