const express = require("express");
const router = express.Router();
const fasilitasController = require("../../controllers/smp_controller/fasilitas_controller");

// Kalo sebelumnya sudah ada uploadMiddleware, tinggal pakai ini:
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 🔹 Route CRUD Fasilitas
router.get("/fasilitas", fasilitasController.getAllFasilitas);
router.post("/fasilitas", upload.single("image"), fasilitasController.createFasilitas);
router.put("/fasilitas/:id", upload.single("image"), fasilitasController.editFasilitas);
router.delete("/fasilitas/:id", fasilitasController.deleteFasilitas);

module.exports = router;
