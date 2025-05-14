const pool = require("../../database/database_connection");

// 🔹 Ambil semua fasilitas dengan gambar
exports.getAllFasilitas = async (req, res) => {
    try {
        const [fasilitas] = await pool.execute("SELECT * FROM fasilitas");

        for (let item of fasilitas) {
            const [foto] = await pool.execute("SELECT image FROM foto_fasilitas WHERE id = ?", [item.id]);
            item.image = foto.length > 0 ? `data:image/jpeg;base64,${foto[0].image.toString("base64")}` : null;
        }

        res.json(fasilitas);
    } catch (error) {
        res.status(500).json({
            error: "Gagal mengambil data fasilitas",
            details: error.message
        });
    }
};

// 🔹 Tambah fasilitas baru
exports.createFasilitas = async (req, res) => {
    try {
        const { nama } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;
        console.log("Uploaded file: ", req.file);


        // Simpan data fasilitas
        const [result] = await pool.execute(
            "INSERT INTO fasilitas (nama) VALUES (?)",
            [nama]
        );

        // Simpan gambar ke tabel foto_fasilitas jika ada gambar
        if (imageBuffer) {
            await pool.execute(
                "INSERT INTO foto_fasilitas (id, image) VALUES (?, ?)",
                [result.insertId, imageBuffer]
            );  
        }

        res.json({ message: "Fasilitas berhasil ditambahkan!" });
    } catch (error) {
        res.status(500).json({
            error: "Gagal menambahkan fasilitas",
            details: error.message
        });
    }
};

// 🔹 Edit fasilitas
exports.editFasilitas = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama } = req.body;

        // Update data fasilitas
        await pool.execute(
            "UPDATE fasilitas SET nama = ? WHERE id = ?",
            [nama, id]
        );

        // Jika ada gambar baru, update foto_fasilitas
        if (req.file) {
            const [existingImage] = await pool.execute("SELECT * FROM foto_fasilitas WHERE id = ?", [id]);

            if (existingImage.length > 0) {
                await pool.execute(
                    "UPDATE foto_fasilitas SET image = ? WHERE id = ?",
                    [req.file.buffer, id]
                );
            } else {
                await pool.execute(
                    "INSERT INTO foto_fasilitas (id, image) VALUES (?, ?)",
                    [id, req.file.buffer]
                );
            }
        }

        res.json({ message: "Fasilitas berhasil diperbarui!" });
    } catch (error) {
        res.status(500).json({
            error: "Gagal memperbarui fasilitas",
            details: error.message
        });
    }
};

// 🔹 Hapus fasilitas
exports.deleteFasilitas = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.execute("DELETE FROM fasilitas WHERE id = ?", [id]);
        await pool.execute("DELETE FROM foto_fasilitas WHERE id = ?", [id]);

        res.json({ message: "Fasilitas berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({
            error: "Gagal menghapus fasilitas",
            details: error.message
        });
    }
};

// 🔹 Ambil gambar fasilitas by ID (optional, sama kayak kegiatan)
exports.getFasilitasImage = async (req, res) => {
    try {
        const { id } = req.params;

        const [foto] = await pool.execute("SELECT image FROM foto_fasilitas WHERE id = ?", [id]);

        if (foto.length === 0) {
            return res.status(404).json({ error: "Gambar tidak ditemukan" });
        }

        res.set("Content-Type", "image/jpeg");
        res.send(foto[0].image);
    } catch (error) {
        res.status(500).json({
            error: "Gagal mengambil gambar fasilitas",
            details: error.message
        });
    }
};
