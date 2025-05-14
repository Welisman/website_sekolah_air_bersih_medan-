const pool = require("../../database/database_connection");
const multer = require("multer");

// Konfigurasi multer untuk menyimpan file di memori
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 🔹 Ambil semua kegiatan dengan gambar
exports.getAllKegiatan = async (req, res) => {
    try {
        // Ambil semua kegiatan
        const [kegiatan] = await pool.execute("SELECT * FROM kegiatan");

        // Ambil gambar untuk setiap kegiatan
        for (let item of kegiatan) {
            const [foto] = await pool.execute("SELECT image FROM foto_kegiatan WHERE id = ?", [item.id]);
            item.image = foto.length > 0 ? `data:image/jpeg;base64,${foto[0].image.toString("base64")}` : null;
        }

        res.json(kegiatan);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data kegiatan", details: error.message });
    }
};

// 🔹 Tambah kegiatan

exports.createKegiatan = async (req, res) => {
    try {
        const { judul, tanggal, waktu } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        // Simpan data kegiatan ke tabel "kegiatan"
        const [result] = await pool.query(
            "INSERT INTO kegiatan (judul, tanggal, waktu) VALUES (?, ?, ?)",
            [judul, tanggal, waktu]
        );

        // Simpan gambar ke tabel "foto_kegiatan" jika ada
        if (imageBuffer) {
            await pool.query("INSERT INTO foto_kegiatan (id, image) VALUES (?, ?)", [result.insertId, imageBuffer]);
        }

        res.json({ message: "Kegiatan berhasil ditambahkan!" });
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        res.status(500).json({ message: "Server Error", details: error.message });
    }
};


// 🔹 Edit kegiatan
exports.editKegiatan = async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, tanggal, waktu } = req.body;

        // Update tabel kegiatan
        await pool.execute(
            "UPDATE kegiatan SET judul = ?, tanggal = ?, waktu = ? WHERE id = ?",
            [judul, tanggal, waktu, id]
        );

        // Jika ada gambar baru, update di tabel foto_kegiatan
        if (req.file) {
            const [existingImage] = await pool.execute("SELECT * FROM foto_kegiatan WHERE id = ?", [id]);

            if (existingImage.length > 0) {
                await pool.execute("UPDATE foto_kegiatan SET image = ? WHERE id = ?", [req.file.buffer, id]);
            } else {
                await pool.execute("INSERT INTO foto_kegiatan (id, image) VALUES (?, ?)", [id, req.file.buffer]);
            }
        }

        res.json({ message: "Kegiatan berhasil diperbarui!" });
    } catch (error) {
        res.status(500).json({ error: "Gagal memperbarui kegiatan", details: error.message });
    }
};

// 🔹 Hapus kegiatan
exports.deleteKegiatan = async (req, res) => {
    try {
        const { id } = req.params;

        // Hapus kegiatan dari tabel kegiatan
        await pool.execute("DELETE FROM kegiatan WHERE id = ?", [id]);

        // Hapus gambar dari tabel foto_kegiatan
        await pool.execute("DELETE FROM foto_kegiatan WHERE id = ?", [id]);

        res.json({ message: "Kegiatan berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({ error: "Gagal menghapus kegiatan", details: error.message });
    }
};

// 🔹 Ambil gambar kegiatan berdasarkan ID
exports.getKegiatanImage = async (req, res) => {
    try {
        const { id } = req.params;
        const [foto] = await pool.execute("SELECT image FROM foto_kegiatan WHERE id = ?", [id]);

        if (foto.length === 0) {
            return res.status(404).json({ error: "Gambar tidak ditemukan" });
        }

        res.set("Content-Type", "image/jpeg");
        res.send(foto[0].image);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil gambar", details: error.message });
    }
};
