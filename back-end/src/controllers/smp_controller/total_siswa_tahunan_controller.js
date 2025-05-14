const pool = require("../../database/database_connection");

// 📌 Ambil data pertumbuhan siswa per tahun dari tahun_masuk
exports.getTotalSiswaTahunan = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT 
                tahun_masuk AS tahun,
                SUM(jenis_kelamin = 'Laki-Laki') AS laki_laki,
                SUM(jenis_kelamin = 'Perempuan') AS perempuan
            FROM siswa_smp
            WHERE tahun_masuk IS NOT NULL
            GROUP BY tahun_masuk
            ORDER BY tahun_masuk ASC
        `);

        res.json(rows);
    } catch (error) {
        console.error("Gagal mengambil data grafik siswa:", error);
        res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
};
