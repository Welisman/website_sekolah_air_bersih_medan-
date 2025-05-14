const pool = require("../../database/database_connection");

// Get all guru tendik
exports.getAllGuruTendik = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM data_guru_tendik");
    res.json(rows);
  } catch (error) {
    console.error("❌ Gagal mengambil data guru:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};



// Get guru tendik by ID
exports.getGuruTendikById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute("SELECT * FROM data_guru_tendik WHERE id = ?", [id]);
    if (rows.length > 0) {
      res.json(rows[0]); // <<< ambil hanya data pertama
    } else {
      res.status(404).json({ message: "Guru/Tendik tidak ditemukan" });
    }
  } catch (error) {
    console.error("❌ Gagal mengambil siswa berdasarkan id:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};


// Create new guru tendik
exports.createGuruTendik = (req, res) => {
  const { nama, email, alamat, no_hp, mata_pelajaran } = req.body;
  const image = req.file ? req.file.filename : null;

  pool.query(
    'INSERT INTO data_guru_tendik (nama, email, alamat, no_hp, mata_pelajaran, image) VALUES (?, ?, ?, ?, ?, ?)',
    [nama, email, alamat, no_hp, mata_pelajaran, image],
    (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        return res.status(500).json({ message: "Gagal menambahkan data guru tendik." });
      }
      res.status(201).json({ message: "Data guru tendik berhasil ditambahkan.", id: results.insertId });
    }
  );
};


// Update guru tendik
exports.updateGuruTendik = (req, res) => {
  const { id } = req.params;
  const { nama, email, alamat, no_hp, mata_pelajaran } = req.body;

  pool.query(
    'UPDATE data_guru_tendik SET nama = ?, email = ?, alamat = ?, no_hp = ?, mata_pelajaran = ? WHERE id = ?',
    [nama, email, alamat, no_hp, mata_pelajaran, id],
    (error, results) => {
      if (error) {
        console.error('Error updating data:', error);
        return res.status(500).json({ message: "Gagal mengupdate data guru tendik." });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Data guru tendik tidak ditemukan." });
      }
      res.json({ message: "Data guru tendik berhasil diperbarui." });
    }
  );
};

// Delete guru tendik
exports.deleteGuruTendik = (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM data_guru_tendik WHERE id = ?', [id], (error, results) => {
    if (error) {
      console.error('Error deleting data:', error);
      return res.status(500).json({ message: "Gagal menghapus data guru tendik." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Data guru tendik tidak ditemukan." });
    }
    res.json({ message: "Data guru tendik berhasil dihapus." });
  });
};

// Upload/Update Image
exports.uploadImageGuruTendik = (req, res) => {
  const { id } = req.params;
  const image = req.file?.filename; // sekarang ambil nama file

  if (!image) return res.status(400).json({ message: "Tidak ada file yang diunggah" });

  const sql = "UPDATE data_guru_tendik SET image = ? WHERE id = ?";
  pool.query(sql, [image, id], (err, result) => {
    if (err) {
      console.error('Error updating image:', err);
      return res.status(500).json({ message: "Gagal upload gambar" });
    }
    res.json({ message: "Upload foto berhasil" });
  });
};

