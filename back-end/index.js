require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Database
const pool = require("./src/database/database_connection");

// Import semua routes
const fotoKepsekController = require("./src/routes/smp_router/smp_route")
const visiMisiRoutes = require("./src/routes/smp_router/visi_misi_route")
const adminRoutes = require("./src/routes/smp_router/smp_route")
const fasilitasRoute = require("./src/routes/smp_router/smp_route")
const strukturRoutes = require("./src/routes/smp_router/smp_route")
const pengumumanRoutes = require("./src/routes/smp_router/smp_route")
const eventRoutes = require("./src/routes/smp_router/smp_route")
const kegiatanRoutes = require("./src/routes/smp_router/smp_route")
const siswaRoutes = require("./src/routes/smp_router/smp_route")
const totalSiswaTahunanRoutes = require("./src/routes/smp_router/smp_route")
const waliKelasRoutes = require("./src/routes/smp_router/smp_route")
const dataGuruTendikRoutes = require("./src/routes/smp_router/smp_route")
const kataSambutanRoutes = require("./src/routes/smp_router/smp_route")

// Middleware
app.use(cors({
    origin: process.env.API_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register semua routes
app.use("/api/admin", adminRoutes);
app.use("/api", fotoKepsekController);
app.use("/api", kataSambutanRoutes);
app.use("/api", visiMisiRoutes);
app.use("/api", strukturRoutes);
app.use("/api", pengumumanRoutes);
app.use("/api", eventRoutes);
app.use("/api", kegiatanRoutes);
app.use("/api", siswaRoutes);
app.use("/api", totalSiswaTahunanRoutes);
app.use("/api", fasilitasRoute);
app.use("/api", waliKelasRoutes);
app.use("/api", dataGuruTendikRoutes);

// Jalankan server
app.listen(PORT, () => {
    console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
