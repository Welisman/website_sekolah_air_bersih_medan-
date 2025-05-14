const pool = require("../../database/database_connection");

// 📌 Get semua pengumuman
exports.getAllPengumuman = async (req, res) => {
    try {
        const [results] = await pool.query("SELECT * FROM pengumuman ORDER BY tanggal DESC");
        res.json(results);
    } catch (error) {
        console.error("❌ Gagal mengambil pengumuman:", error);
        res.status(500).json({ message: "Gagal mengambil data", error });
    }
};

// 📌 Get satu pengumuman berdasarkan ID
exports.getPengumumanById = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await pool.query("SELECT * FROM pengumuman WHERE id = ?", [id]);

        if (results.length === 0) return res.status(404).json({ message: "Pengumuman tidak ditemukan" });

        res.json(results[0]);
    } catch (error) {
        console.error("❌ Gagal mengambil pengumuman:", error);
        res.status(500).json({ message: "Gagal mengambil data", error });
    }
};

// 📌 Tambah pengumuman baru
exports.createPengumuman = async (req, res) => {
    try {
        const { judul, isi, tanggal } = req.body;

        if (!judul || !isi || !tanggal) {
            return res.status(400).json({ message: "Semua field harus diisi" });
        }

        const [result] = await pool.query(
            "INSERT INTO pengumuman (judul, isi, tanggal) VALUES (?, ?, ?)",
            [judul, isi, tanggal]
        );

        res.status(201).json({ message: "✅ Pengumuman berhasil ditambahkan", id: result.insertId });
    } catch (error) {
        console.error("❌ Gagal menambahkan pengumuman:", error);
        res.status(500).json({ message: "Gagal menambahkan pengumuman", error });
    }
};

// 📌 Update pengumuman
exports.updatePengumuman = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, isi, tanggal } = req.body;

        const [result] = await pool.query(
            "UPDATE pengumuman SET judul = ?, isi = ?, tanggal = ? WHERE id = ?",
            [judul, isi, tanggal, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Pengumuman tidak ditemukan" });

        res.json({ message: "✅ Pengumuman berhasil diperbarui" });
    } catch (error) {
        console.error("❌ Gagal mengupdate pengumuman:", error);
        res.status(500).json({ message: "Gagal mengupdate pengumuman", error });
    }
};

// 📌 Hapus pengumuman
exports.deletePengumuman = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query("DELETE FROM pengumuman WHERE id = ?", [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Pengumuman tidak ditemukan" });

        res.json({ message: "✅ Pengumuman berhasil dihapus" });
    } catch (error) {
        console.error("❌ Gagal menghapus pengumuman:", error);
        res.status(500).json({ message: "Gagal menghapus pengumuman", error });
    }
};
