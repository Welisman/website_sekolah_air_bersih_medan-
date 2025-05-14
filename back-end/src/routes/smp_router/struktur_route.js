const express = require("express");
const { upload, getStrukturSekolah, getStrukturFoto, addStruktur, deleteStruktur } = require("../../controllers/smp_controller/struktur_controller");

const router = express.Router();
router.get("/struktur", getStrukturSekolah);
router.get("/struktur/foto/:id", getStrukturFoto);
router.post("/struktur", upload.single("foto"), addStruktur);
router.delete("/struktur/:id", deleteStruktur);

module.exports = router;
