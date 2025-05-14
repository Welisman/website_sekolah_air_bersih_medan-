const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const path = require("path");


const {
    addAdmin,
    getAdmins,
    updateAdmin,
    deleteAdmin,
    toggleStatusAdmin,
    loginAdmin
} = require("../../controllers/smp_controller/admin_smp_controller");
const { verifyToken, isMasterAdmin } = require("../../middleware/authMiddleware");
const siswaController = require("../../controllers/smp_controller/data_siswa_controller");
const waliKelasController = require("../../controllers/smp_controller/wali_kelas_controller")
const dataGuruTendikController = require("../../controllers/smp_controller/data_guru_tendik");
const fotoKepsekController = require("../../controllers/smp_controller/kata_sambutan_foto_controller");
const kataSambutanController = require("../../controllers/smp_controller/kata_sambutan_foto_controller");
const eventController = require("../../controllers/smp_controller/event_controller");
const fasilitasController = require("../../controllers/smp_controller/fasilitas_controller");
const kegiatanController = require("../../controllers/smp_controller/kegiatan_controller");
const pengumumanController = require("../../controllers/smp_controller/pengumuman_controller");
const {getStrukturSekolah, getStrukturFoto, addStruktur, deleteStruktur } = require("../../controllers/smp_controller/struktur_controller");
const { getTotalSiswaTahunan } = require("../../controllers/smp_controller/total_siswa_tahunan_controller");

//Router admin SMP
router.post("/login", loginAdmin);
router.get("/admin-smp", verifyToken, getAdmins);
router.post("/add-admin-smp", verifyToken, isMasterAdmin, addAdmin);
router.put("/update-admin-smp/:id", verifyToken, isMasterAdmin, updateAdmin);
router.delete("/delete-admin-smp/:id", verifyToken, isMasterAdmin, deleteAdmin);
router.put("/toggle-status-admin-smp/:id", verifyToken, isMasterAdmin, toggleStatusAdmin);


//data siswa
router.get("/siswa", siswaController.getAllSiswa);
router.get("/siswa/:kelas", siswaController.getSiswaByKelas);
router.get("/wali-kelas/kelas/:kelas", waliKelasController.getWaliKelasByKelas);
router.post("/siswa", siswaController.createSiswa);
router.put("/siswa/:id", siswaController.updateSiswa);
router.delete("/siswa/:id", siswaController.deleteSiswa);
router.post("/siswa/upload", upload.single("file"), siswaController.uploadSiswaExcel);
router.get("/siswa/export/excel", siswaController.exportSiswaExcel);
router.get("/siswa/export/csv", siswaController.exportSiswaCSV);


//data guru dan tendik
router.get("/data-guru-tendik", dataGuruTendikController.getAllGuruTendik);
router.get("/data-guru-tendik/:id", dataGuruTendikController.getGuruTendikById);
router.post("/data-guru-tendik", upload.single("image"), dataGuruTendikController.createGuruTendik);
router.put("/data-guru-tendik/:id", dataGuruTendikController.updateGuruTendik);
router.delete("/data-guru-tendik/:id", dataGuruTendikController.deleteGuruTendik);
router.post("/data-guru-tendik/upload/:id", upload.single("image"), dataGuruTendikController.uploadImageGuruTendik);

//kepala sekolah (upload foto dan kata sambutan)
router.post("/upload-foto", upload.single("foto"), fotoKepsekController.uploadFotoKepsek);
router.get("/foto", fotoKepsekController.getFotoKepsek);
router.delete("/hapus-foto", fotoKepsekController.deleteFotoKepsek);

router.get("/kata-sambutan", kataSambutanController.getKataSambutan);

//event
router.get("/events", eventController.getAllEvents);
router.get("/events/:id", eventController.getEventById);
router.get("/events/image/:id", eventController.getEventImage);
router.post("/events", upload.single("image"), eventController.createEvent);
router.put("/events/:id", upload.single("image"), eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);

//fasilitas
router.get("/fasilitas", fasilitasController.getAllFasilitas);
router.post("/fasilitas", upload.single("image"), fasilitasController.createFasilitas);
router.put("/fasilitas/:id", upload.single("image"), fasilitasController.editFasilitas);
router.delete("/fasilitas/:id", fasilitasController.deleteFasilitas);

//kegiatan
router.get("/kegiatan", kegiatanController.getAllKegiatan);
router.post("/kegiatan", upload.single("image"), kegiatanController.createKegiatan);
router.put("/kegiatan/:id", upload.single("image"), kegiatanController.editKegiatan);
router.delete("/kegiatan/:id", kegiatanController.deleteKegiatan);

//pengumuman
router.get("/pengumuman", pengumumanController.getAllPengumuman);
router.get("/pengumuman/:id", pengumumanController.getPengumumanById);
router.post("/pengumuman", pengumumanController.createPengumuman);
router.put("/pengumuman/:id", pengumumanController.updatePengumuman);
router.delete("/pengumuman/:id", pengumumanController.deletePengumuman);

//strukttur organisasi
router.get("/struktur", getStrukturSekolah);
router.get("/struktur/foto/:id", getStrukturFoto);
router.post("/struktur", upload.single("foto"), addStruktur);
router.delete("/struktur/:id", deleteStruktur);

//total-siswa-tahunan
router.get("/total-siswa-tahunan", getTotalSiswaTahunan);


//wali kelas
router.get('/wali-kelas', waliKelasController.getAllWaliKelas);
router.get('/wali-kelas/id/:id', waliKelasController.getWaliKelasById);
router.post('/wali-kelas', upload.single('image'), waliKelasController.createWaliKelas);
router.delete('/wali-kelas/:id', waliKelasController.deleteWaliKelas);
router.put('/wali-kelas/:id', upload.single('image'), waliKelasController.updateWaliKelas);
router.post('/wali-kelas/:id/upload', upload.single('image'), waliKelasController.uploadFotoWaliKelas);



module.exports = router;