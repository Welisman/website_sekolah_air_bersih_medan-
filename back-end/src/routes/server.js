const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint untuk Visi, Misi, dan Tujuan
app.get("/api/visi-misi", (req, res) => {
    res.json({
        visi: "Menjadi institusi unggulan dalam inovasi dan pendidikan.",
        misi: [
            "Meningkatkan kualitas pendidikan berbasis teknologi.",
            "Mendorong riset dan pengembangan yang inovatif.",
            "Menghasilkan lulusan yang berdaya saing global."
        ],
        tujuan: "Menciptakan lulusan yang kompeten dan inovatif."
    });
});



// Jalankan Server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
