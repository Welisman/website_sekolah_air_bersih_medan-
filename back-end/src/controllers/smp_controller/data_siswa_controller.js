const pool = require("../../database/database_connection");
const xlsx = require("xlsx"); 
const multer = require("multer");

// 📌 Ambil semua data siswa SMP
exports.getAllSiswa = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM siswa_smp");
    res.json(rows);
  } catch (error) {
    console.error("❌ Gagal mengambil data siswa:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// 📌 Ambil siswa berdasarkan kelas
exports.getSiswaByKelas = async (req, res) => {
  const { kelas } = req.params;
  try {
    const [rows] = await pool.execute("SELECT * FROM siswa_smp WHERE kelas = ?", [kelas]);
    res.json(rows);
  } catch (error) {
    console.error("❌ Gagal mengambil siswa berdasarkan kelas:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// 📌 Tambah siswa baru
exports.createSiswa = async (req, res) => {
  const { nis, nama, jenis_kelamin, kelas, tanggal_lahir, alamat, tahun_masuk } = req.body;

  if (!nis || !nama || !jenis_kelamin || !kelas || !tahun_masuk) {
    return res.status(400).json({
      message: "Field wajib: NIS, Nama, Jenis Kelamin, Kelas, Tahun Masuk"
    });
  }

  try {
    await pool.execute(
      `INSERT INTO siswa_smp (nis, nama, jenis_kelamin, kelas, tanggal_lahir, alamat, tahun_masuk)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        nis,
        nama,
        jenis_kelamin,
        kelas,
        tanggal_lahir || null,
        alamat || null,
        tahun_masuk
      ]
    );

    res.status(201).json({ message: "Siswa berhasil ditambahkan" });
  } catch (error) {
    console.error("❌ Gagal menambahkan siswa:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat menambahkan siswa" });
  }
};

// 📌 Update data siswa berdasarkan ID
exports.updateSiswa = async (req, res) => {
  const { id } = req.params;
  const { nis, nama, jenis_kelamin, kelas, tanggal_lahir, alamat, tahun_masuk } = req.body;

  if (!nis || !nama || !jenis_kelamin || !kelas || !tahun_masuk) {
    return res.status(400).json({
      message: "Field wajib: NIS, Nama, Jenis Kelamin, Kelas, Tahun Masuk"
    });
  }

  try {
    const [result] = await pool.execute(
      `UPDATE siswa_smp 
       SET nis = ?, nama = ?, jenis_kelamin = ?, kelas = ?, tanggal_lahir = ?, alamat = ?, tahun_masuk = ?
       WHERE id = ?`,
      [
        nis,
        nama,
        jenis_kelamin,
        kelas,
        tanggal_lahir || null,
        alamat || null,
        tahun_masuk,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Siswa tidak ditemukan" });
    }

    res.json({ message: "Data siswa berhasil diperbarui" });
  } catch (error) {
    console.error("❌ Gagal memperbarui data siswa:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat memperbarui siswa" });
  }
};

// 📌 Hapus siswa berdasarkan ID
exports.deleteSiswa = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.execute("DELETE FROM siswa_smp WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Siswa tidak ditemukan" });
    }

    res.json({ message: "Siswa berhasil dihapus" });
  } catch (error) {
    console.error("❌ Gagal menghapus siswa:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat menghapus siswa" });
  }
};

// 📌 Upload file excel siswa
exports.uploadSiswaExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File tidak ditemukan" });
    }

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const siswaData = xlsx.utils.sheet_to_json(sheet);

    if (siswaData.length === 0) {
      return res.status(400).json({ message: "Data excel kosong" });
    }

    const values = siswaData.map((item) => [
      item.nis,
      item.nama,
      item.jenis_kelamin,
      item.kelas,
      item.tanggal_lahir ? new Date(item.tanggal_lahir) : null,
      item.alamat || null,
      item.tahun_masuk
    ]);

    await pool.query(
      `INSERT INTO siswa_smp (nis, nama, jenis_kelamin, kelas, tanggal_lahir, alamat, tahun_masuk)
       VALUES ?`,
      [values]
    );

    res.status(200).json({ message: `Berhasil upload ${values.length} siswa` });
  } catch (error) {
    console.error("❌ Error upload excel:", error);
    res.status(500).json({ message: "Server error", detail: error.message });
  }
};

// 📌 Export data siswa ke Excel
exports.exportSiswaExcel = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM siswa_smp");

    const worksheet = xlsx.utils.json_to_sheet(rows);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Siswa SMP");

    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=siswa_smp.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    console.error("❌ Gagal export Excel:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat export Excel" });
  }
};

// 📌 Export data siswa ke CSV
exports.exportSiswaCSV = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM siswa_smp");

    const worksheet = xlsx.utils.json_to_sheet(rows);
    const csv = xlsx.utils.sheet_to_csv(worksheet);

    res.setHeader("Content-Disposition", "attachment; filename=siswa_smp.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (error) {
    console.error("❌ Gagal export CSV:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat export CSV" });
  }
};

