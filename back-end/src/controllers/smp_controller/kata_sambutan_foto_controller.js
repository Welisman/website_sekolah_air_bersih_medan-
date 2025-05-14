const pool = require("../../database/database_connection");

// Ambil Kata Sambutan
exports.getKataSambutan = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM kata_sambutan");
        res.json(rows);
    } catch (error) {
        console.error("Gagal mengambil data kata sambutan:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
};

//  Unggah Foto Kepala Sekolah
exports.uploadFotoKepsek = async (req, res) => {
    try {
        const { nama } = req.body;
        if (!req.file) return res.status(400).json({ error: "Foto harus diunggah!" });

        const foto = req.file.buffer;

        await pool.execute("INSERT INTO foto_kepsek (nama, foto) VALUES (?, ?)", [nama, foto]);

        res.status(201).json({ message: "Foto berhasil diunggah!" });
    } catch (error) {
        console.error("Gagal mengunggah foto:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
};

// Ambil Foto Kepala Sekolah Terbaru
exports.getFotoKepsek = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT foto FROM foto_kepsek ORDER BY id DESC LIMIT 1");

        if (rows.length === 0) return res.status(404).json({ error: "Foto tidak ditemukan" });

        res.set("Content-Type", "image/jpeg");
        res.send(rows[0].foto);
    } catch (error) {
        console.error("Gagal mengambil foto:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
};

// Hapus Foto Kepala Sekolah Terbaru
exports.deleteFotoKepsek = async (req, res) => {
    try {
        await pool.execute("DELETE FROM foto_kepsek WHERE id = (SELECT id FROM foto_kepsek ORDER BY id DESC LIMIT 1)");

        res.status(200).json({ message: "Foto berhasil dihapus!" });
    } catch (error) {
        console.error("Gagal menghapus foto:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
};