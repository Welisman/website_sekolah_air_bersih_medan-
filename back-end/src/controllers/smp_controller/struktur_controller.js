const pool = require("../../database/database_connection");

// Ambil semua data struktur organisasi (tanpa gambar untuk optimasi)
const getStrukturSekolah = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT id, nama, jabatan, parent_id FROM struktur_sekolah");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data struktur sekolah" });
    }
};

// Ambil gambar dari database berdasarkan ID
const getStrukturFoto = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute("SELECT foto FROM struktur_sekolah WHERE id = ?", [id]);

        if (rows.length === 0 || !rows[0].foto) {
            return res.status(404).json({ error: "Gambar tidak ditemukan" });
        }

        res.set("Content-Type", "image/jpeg"); // Sesuaikan dengan format gambar yang diupload
        res.send(rows[0].foto);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil gambar" });
    }
};

// Tambah data struktur organisasi dengan gambar
const addStruktur = async (req, res) => {
    try {
        const { nama, jabatan, parent_id } = req.body;
        const foto = req.file ? req.file.buffer : null; // Ambil file dari request

        await pool.execute(
            "INSERT INTO struktur_sekolah (nama, jabatan, parent_id, foto) VALUES (?, ?, ?, ?)",
            [nama, jabatan, parent_id, foto]
        );

        res.json({ message: "Struktur sekolah berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ error: "Gagal menambahkan data struktur sekolah" });
    }
};

// Hapus Data Struktur Organisasi
const deleteStruktur = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.execute("DELETE FROM struktur_sekolah WHERE id = ?", [id]);
        res.json({ message: "Struktur sekolah berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ error: "Gagal menghapus data struktur sekolah" });
    }
};

module.exports = { getStrukturSekolah, getStrukturFoto, addStruktur, deleteStruktur };


