const express = require("express");
const siswaController = require("../controllers/data_siswa_controller");
const waliKelasController = require("../controllers/wali_kelas_controller")
const router = express.Router();

router.get("/siswa", siswaController.getAllSiswa);
router.get("/siswa/:kelas", siswaController.getSiswaByKelas);
router.get("/wali-kelas/kelas/:kelas", waliKelasController.getWaliKelasByKelas);
router.post("/siswa", siswaController.createSiswa); 
router.put("/siswa/:id", siswaController.updateSiswa); 
router.delete("/siswa/:id", siswaController.deleteSiswa); 
router.post("/siswa/upload", upload.single("file"), siswaController.uploadSiswaExcel);

module.exports = router;
