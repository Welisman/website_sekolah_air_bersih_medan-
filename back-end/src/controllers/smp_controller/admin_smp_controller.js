const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";
const pool = require("../../database/database_connection");

// ✅ Login Admin
const loginAdmin = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      console.log("📥 Request body:", req.body);
  
      // Validasi input
      if (!username || !password) {
        return res.status(400).json({ message: "Username dan password harus diisi" });
      }
  
      const [rows] = await pool.execute("SELECT * FROM admin_smp WHERE username = ?", [username]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }
  
      const user = rows[0];
  
      if (user.status !== "active") {
        return res.status(403).json({ message: "Akun tidak aktif" });
      }
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Password salah" });
      }
  
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({
        token,
        userId: user.id,
        role: user.role,
        username: user.username
      });
    } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({
        message: "Server error",
        detail: error.message,
      });
    }
  };

// ✅ Tambah Admin
const addAdmin = async (req, res) => {
  const { username, password, confirmPassword, role = "admin", status = "active" } = req.body;

  if (req.user.role !== "master") {
    return res.status(403).json({ message: "Akses ditolak. Hanya master admin yang dapat menambahkan admin." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Password tidak cocok" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      "INSERT INTO admin_smp (username, password, role, status) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, role, status]
    );

    res.status(201).json({ message: "Admin berhasil ditambahkan", userId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan admin", error: error.message });
  }
};

// ✅ Ambil Semua Admin
const getAdmins = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT id, username, role, status FROM admin_smp");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Admin
const updateAdmin = async (req, res) => {
  if (req.user.role !== "master") {
    return res.status(403).json({ message: "Akses ditolak. Hanya master admin yang dapat mengubah data admin." });
  }

  const { id } = req.params;
  const { username, password, role, status } = req.body;

  try {
    let query = "UPDATE admin_smp SET username = ?, role = ?, status = ? WHERE id = ?";
    let values = [username, role, status, id];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = "UPDATE admin_smp SET username = ?, password = ?, role = ?, status = ? WHERE id = ?";
      values = [username, hashedPassword, role, status, id];
    }

    await pool.execute(query, values);
    res.status(200).json({ message: "Admin berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: "Gagal update admin", error: error.message });
  }
};

// ✅ Hapus Admin
const deleteAdmin = async (req, res) => {
  if (req.user.role !== "master") {
    return res.status(403).json({ message: "Akses ditolak. Hanya master admin yang dapat menghapus admin." });
  }

  const { id } = req.params;

  try {
    await pool.execute("DELETE FROM admin_smp WHERE id = ?", [id]);
    res.status(200).json({ message: "Admin berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus admin", error: error.message });
  }
};

// ✅ Toggle Status Active/Inactive
const toggleStatusAdmin = async (req, res) => {
  if (req.user.role !== "master") {
    return res.status(403).json({ message: "Akses ditolak. Hanya master admin yang dapat mengubah status." });
  }

  const { id } = req.params;
  try {
    const [rows] = await pool.execute("SELECT status FROM admin_smp WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Admin tidak ditemukan" });

    const newStatus = rows[0].status === "active" ? "inactive" : "active";
    await pool.execute("UPDATE admin_smp SET status = ? WHERE id = ?", [newStatus, id]);

    res.json({ message: `Status berhasil diubah menjadi ${newStatus}` });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengubah status", error: error.message });
  }
};

// 📌 Export data Admin ke Excel
exports.exportAdminExcel = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM admin_smp");

    const worksheet = xlsx.utils.json_to_sheet(rows);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Admin");

    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=Admin.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    console.error("❌ Gagal export Excel:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat export Excel" });
  }
};

// 📌 Export data Admin ke CSV
exports.exportAdminCSV = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM admin_smp");

    const worksheet = xlsx.utils.json_to_sheet(rows);
    const csv = xlsx.utils.sheet_to_csv(worksheet);

    res.setHeader("Content-Disposition", "attachment; filename=Admin.csv");
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (error) {
    console.error("❌ Gagal export CSV:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat export CSV" });
  }
};



module.exports = {
  loginAdmin,
  addAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  toggleStatusAdmin,
};
