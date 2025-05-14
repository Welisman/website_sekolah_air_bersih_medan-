const express = require("express");
const router = express.Router();
const kegiatanController = require("../controllers/kegiatan_controller");
const multer = require("multer");

// Konfigurasi multer untuk menyimpan gambar di memory buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rute CRUD untuk kegiatan
router.get("/kegiatan", kegiatanController.getAllKegiatan);
router.post("/kegiatan", upload.single("image"), kegiatanController.createKegiatan);
router.put("/kegiatan/:id", upload.single("image"), kegiatanController.editKegiatan);
router.delete("/kegiatan/:id", kegiatanController.deleteKegiatan);

module.exports = router;
