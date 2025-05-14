const express = require("express");
const router = express.Router();
const pengumumanController = require("../controllers/pengumuman_controller");

// 📌 Endpoint CRUD
router.get("/pengumuman", pengumumanController.getAllPengumuman); // Get semua pengumuman
router.get("/pengumuman/:id", pengumumanController.getPengumumanById); // Get satu pengumuman by ID
router.post("/pengumuman", pengumumanController.createPengumuman); // Tambah pengumuman baru
router.put("/pengumuman/:id", pengumumanController.updatePengumuman); // Update pengumuman by ID
router.delete("/pengumuman/:id", pengumumanController.deletePengumuman); // Hapus pengumuman by ID

module.exports = router;
