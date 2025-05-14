const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data sementara (simulasi database)
let dataVisiMisi = {
    visi: "Menjadi institusi unggulan dalam inovasi dan pendidikan.",
    misi: [
        "Meningkatkan kualitas pendidikan berbasis teknologi.",
        "Mendorong riset dan pengembangan yang inovatif.",
        "Menghasilkan lulusan yang berdaya saing global."
    ],
    tujuan: "Menciptakan lulusan yang kompeten dan inovatif."
};

// ✅ GET: Ambil data visi-misi
app.get("/api/visi-misi", (req, res) => {
    res.json(dataVisiMisi);
});

app.get("/api/visi", async (req, res) => {
    try {
        const visi = await VisiModel.findOne();
        if (!visi) {
            return res.status(404).json({ visi: "Visi tidak ditemukan" });
        }
        res.json(visi);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ PUT: Update visi
app.put("/api/visi", (req, res) => {
    console.log("Request diterima:", req.body); // 🛠️ Debug log

    const { visi } = req.body;
    if (!visi || visi.trim() === "") {
        console.log("❌ Visi kosong!"); // 🛠️ Log error
        return res.status(400).json({ error: "Visi tidak boleh kosong" });
    }

    dataVisiMisi.visi = visi;
    res.json({ message: "Visi berhasil diperbarui", visi: dataVisiMisi.visi });
});


// ✅ PUT: Update misi
app.put("/api/misi", (req, res) => {
    const { oldMisi, newMisi } = req.body;
    if (!newMisi) {
        return res.status(400).json({ error: "Misi baru tidak boleh kosong" });
    }
    
    const index = dataVisiMisi.misi.indexOf(oldMisi);
    if (index === -1) {
        return res.status(404).json({ error: "Misi tidak ditemukan" });
    }

    dataVisiMisi.misi[index] = newMisi;
    res.json({ message: "Misi berhasil diperbarui", misi: dataVisiMisi.misi });
});


// ✅ DELETE: Hapus visi
app.delete("/api/visi", (req, res) => {
    dataVisiMisi.visi = "";
    res.json({ message: "Visi berhasil dihapus" });
});

// ✅ DELETE: Hapus misi
app.delete("/api/misi", (req, res) => {
    dataVisiMisi.misi = [];
    res.json({ message: "Misi berhasil dihapus" });
});