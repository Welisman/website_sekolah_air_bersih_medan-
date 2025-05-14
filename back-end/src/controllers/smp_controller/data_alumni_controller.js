const pool = require("../../database/database_connection");
const multer = require("multer");

// Konfigurasi Multer untuk menyimpan gambar dalam buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 📌 Ambil semua data alumni
exports.getAllAlumni = async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT id, text, description, position, image FROM data_alumni");
        // Ubah format gambar ke Base64 agar bisa ditampilkan di frontend
        const alumniData = rows.map(alumni => ({
            ...alumni,
            image: alumni.image ? `data:image/jpeg;base64,${alumni.image.toString("base64")}` : null
        }));
        res.json(alumniData);
    } catch (error) {
        console.error("Gagal mengambil data alumni:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

// 📌 Tambah alumni baru (tanpa gambar)
exports.createAlumni = async (req, res) => {
    const { text, description, position } = req.body;
    if (!description || !position) {
        return res.status(400).json({ message: "Semua field harus diisi" });
    }
    try {
        await pool.execute("INSERT INTO data_alumni (text, description, position) VALUES (?, ?, ?)", [text, description, position]);
        res.status(201).json({ message: "Alumni berhasil ditambahkan" });
    } catch (error) {
        console.error("Gagal menambahkan alumni:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};

// 📌 Upload Gambar Alumni
exports.uploadAlumniImage = (req, res) => {
    const { id } = req.params;
    const image = req.file ? req.file.buffer : null;

    if (!image) {
        return res.status(400).json({ message: "Gambar harus diunggah!" });
    }

    pool.execute("UPDATE data_alumni SET image = ? WHERE id = ?", [image, id])
        .then(() => res.json({ message: "Gambar berhasil diunggah" }))
        .catch(error => {
            console.error("Gagal mengunggah gambar:", error);
            res.status(500).json({ message: "Terjadi kesalahan pada server" });
        });
};

// 📌 Hapus Alumni
exports.deleteAlumni = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.execute("DELETE FROM data_alumni WHERE id = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Alumni tidak ditemukan" });
        res.json({ message: "Alumni berhasil dihapus" });
    } catch (error) {
        console.error("Gagal menghapus alumni:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};
