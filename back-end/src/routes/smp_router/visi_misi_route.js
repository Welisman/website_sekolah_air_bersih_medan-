const express = require("express");
const pool = require("../../database/database_connection");

const router = express.Router();

/* ========================
   📌 GET Semua Data
======================== */
router.get("/visi-misi", async (req, res) => {
    try {
        const [visiRows] = await pool.execute("SELECT visi FROM visi");
        const visi = visiRows.length > 0 ? visiRows[0].visi : "Visi tidak ditemukan";

        const [misiRows] = await pool.execute("SELECT misi FROM misi");
        const misi = misiRows.map(row => row.misi);

        const [tujuanRows] = await pool.execute("SELECT tujuan FROM tujuan");
        const tujuan = tujuanRows.map(row => row.tujuan);

        res.json({ visi, misi, tujuan });

    } catch (error) {
        console.error("Gagal mengambil data visi-misi:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server", error });
    }
});

/* ========================
   📌 GET Data per Kategori
======================== */
router.get("/visi", async (req, res) => {
    try {
        const [rows] = await pool.execute("SELECT visi FROM visi LIMIT 1");
        const visi = rows.length > 0 ? rows[0].visi : null;
        res.json({ visi });
    } catch (error) {
        console.error("❌ Gagal mengambil data visi:", error);
        res.status(500).json({ message: "Gagal mengambil data visi", error });
    }
});


router.get("/misi", async (req, res) => {
    try {
        const [misiRows] = await pool.execute("SELECT misi FROM misi");
        const misi = misiRows.map(row => row.misi);
        res.json(misi);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data misi", error });
    }
});

router.get("/tujuan", async (req, res) => {
    try {
        const [tujuanRows] = await pool.execute("SELECT tujuan FROM tujuan");
        const tujuan = tujuanRows.map(row => row.tujuan);
        res.json(tujuan);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data tujuan", error });
    }
});

/* ========================
   📌 POST (Menambah Data)
======================== */
router.post("/visi", async (req, res) => {
    const { visi } = req.body;
    if (!visi) return res.status(400).json({ message: "Visi tidak boleh kosong" });

    try {
        await pool.execute("INSERT INTO visi (visi) VALUES (?)", [visi]);
        res.json({ success: true, message: "Visi berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan visi", error });
    }
});

router.post("/misi", async (req, res) => {
    const { misi } = req.body;
    if (!misi) return res.status(400).json({ message: "Misi tidak boleh kosong" });

    try {
        await pool.execute("INSERT INTO misi (misi) VALUES (?)", [misi]);
        res.json({ success: true, message: "Misi berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan misi", error });
    }
});

router.post("/tujuan", async (req, res) => {
    const { tujuan } = req.body;
    if (!tujuan) return res.status(400).json({ message: "Tujuan tidak boleh kosong" });

    try {
        await pool.execute("INSERT INTO tujuan (tujuan) VALUES (?)", [tujuan]);
        res.json({ success: true, message: "Tujuan berhasil ditambahkan" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan tujuan", error });
    }
});

/* ========================
   📌 PUT (Mengupdate Data)
======================== */
router.put("/visi", async (req, res) => {
    const { visi } = req.body;
    if (!visi) return res.status(400).json({ message: "Visi tidak boleh kosong" });

    try {
        await pool.execute("UPDATE visi SET visi = ? LIMIT 1", [visi]);
        res.json({ success: true, message: "Visi berhasil diperbarui" });
    } catch (error) {
        console.error("❌ Gagal memperbarui visi:", error);
        res.status(500).json({ message: "Gagal memperbarui visi", error });
    }
});


router.put("/misi", async (req, res) => {
    const { oldMisi, newMisi } = req.body;
    if (!oldMisi || !newMisi) return res.status(400).json({ message: "Data tidak boleh kosong" });

    try {
        const [result] = await pool.execute("UPDATE misi SET misi = ? WHERE misi = ?", [newMisi, oldMisi]);

        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Misi berhasil diperbarui" });
        } else {
            res.status(404).json({ message: "Misi tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate misi", error });
    }
});

router.put("/tujuan", async (req, res) => {
    const { oldTujuan, newTujuan } = req.body;
    if (!oldTujuan || !newTujuan) return res.status(400).json({ message: "Data tidak boleh kosong" });

    try {
        const [result] = await pool.execute("UPDATE tujuan SET tujuan = ? WHERE tujuan = ?", [newTujuan, oldTujuan]);

        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Tujuan berhasil diperbarui" });
        } else {
            res.status(404).json({ message: "Tujuan tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate tujuan", error });
    }
});

/* ========================
   📌 DELETE (Menghapus Data)
======================== */
router.delete("/visi", async (req, res) => {
    try {
        await pool.execute("DELETE FROM visi");
        res.json({ success: true, message: "Visi berhasil dihapus" });
    } catch (error) {
        console.error("❌ Gagal menghapus visi:", error);
        res.status(500).json({ message: "Gagal menghapus visi", error });
    }
});

router.delete("/misi", async (req, res) => {
    const { misi } = req.body;
    try {
        const [result] = await pool.execute("DELETE FROM misi WHERE misi = ?", [misi]);

        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Misi berhasil dihapus" });
        } else {
            res.status(404).json({ message: "Misi tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus misi", error });
    }
});

router.delete("/tujuan", async (req, res) => {
    const { tujuan } = req.body;
    try {
        const [result] = await pool.execute("DELETE FROM tujuan WHERE tujuan = ?", [tujuan]);

        if (result.affectedRows > 0) {
            res.json({ success: true, message: "Tujuan berhasil dihapus" });
        } else {
            res.status(404).json({ message: "Tujuan tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus tujuan", error });
    }
});


module.exports = router;
