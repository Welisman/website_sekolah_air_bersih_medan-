const express = require("express");
const multer = require("multer");
const pool = require("../../database/database_connection");
const fotoKepsekController = require("../../controllers/smp_controller/kata_sambutan_foto_controller");

const router = express.Router();

// Konfigurasi multer untuk menyimpan file di memori
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post("/upload-foto", upload.single("foto"), fotoKepsekController.uploadFotoKepsek);
router.get("/foto", fotoKepsekController.getFotoKepsek);
router.delete("/hapus-foto", fotoKepsekController.deleteFotoKepsek);

module.exports = router;