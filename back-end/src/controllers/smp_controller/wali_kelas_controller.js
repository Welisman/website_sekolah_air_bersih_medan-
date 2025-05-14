const pool = require("../../database/database_connection");

// ✅ GET all wali kelas
exports.getAllWaliKelas = async (req, res) => {
  try {
    const [results] = await pool.execute("SELECT * FROM wali_kelas");
    res.json(results);
  } catch (error) {
    console.error("Gagal mengambil semua wali kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.getWaliKelasByKelas = async (req, res) => {
  const { kelas } = req.params;
  try {
      const [rows] = await pool.execute("SELECT * FROM wali_kelas WHERE kelas = ?", [kelas]);
      res.json(rows[0] || {}); // Kalau tidak ada, kirim objek kosong
  } catch (error) {
      console.error("Gagal mengambil data wali kelas:", error);
      res.status(500).json({ message: "Gagal mengambil data wali kelas" });
  }
};

// ✅ GET by ID
exports.getWaliKelasById = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await pool.execute("SELECT * FROM wali_kelas WHERE id = ?", [id]);
    if (results.length === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

// ✅ CREATE
exports.createWaliKelas = async (req, res) => {
  const {
    nama_wali_kelas,
    nip,
    kelas,
    jenis_kelamin,
    agama,
    status,
    pendidikan,
    lulusan,
  } = req.body;

  const image = req.file ? req.file.buffer : null;

  try {
    const [result] = await pool.execute(
      `INSERT INTO wali_kelas (nama_wali_kelas, nip, kelas, jenis_kelamin, agama, status, pendidikan, lulusan, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nama_wali_kelas, nip, kelas, jenis_kelamin, agama, status, pendidikan, lulusan, image]
    );

    res.json({ message: "Berhasil menambahkan", id: result.insertId });
  } catch (error) {
    console.error("Gagal menambahkan wali kelas:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan saat menambahkan data" });
  }
};

// ✅ UPDATE
exports.updateWaliKelas = async (req, res) => {
  const id = req.params.id;
  const {
    nama_wali_kelas,
    nip,
    kelas,
    jenis_kelamin,
    agama,
    status,
    pendidikan,
    lulusan
  } = req.body;

  const imageBuffer = req.file ? req.file.buffer : null;

  try {
    let query = `
      UPDATE wali_kelas SET 
        nama_wali_kelas = ?, 
        nip = ?, 
        kelas = ?, 
        jenis_kelamin = ?, 
        agama = ?, 
        status = ?, 
        pendidikan = ?, 
        lulusan = ?
    `;

    const params = [nama_wali_kelas, nip, kelas, jenis_kelamin, agama, status, pendidikan, lulusan];

    if (imageBuffer) {
      query += `, image = ?`;
      params.push(imageBuffer);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    await pool.execute(query, params);
    res.json({ message: "Wali kelas berhasil diperbarui" });
  } catch (error) {
    console.error("Gagal update wali kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat update" });
  }
};

// ✅ DELETE
exports.deleteWaliKelas = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute("DELETE FROM wali_kelas WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.json({ message: "Berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus data" });
  }
};

// ✅ UPLOAD Foto
exports.uploadFotoWaliKelas = (req, res) => {
  const { id } = req.params;
  const image = req.file?.buffer;

  if (!image) return res.status(400).json({ message: "Tidak ada file yang diunggah" });

  const sql = "UPDATE wali_kelas SET image = ? WHERE id = ?";
  pool.query(sql, [image, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal upload gambar" });
    res.json({ message: "Upload foto berhasil" });
  });
};
