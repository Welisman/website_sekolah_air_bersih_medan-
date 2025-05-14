const express = require("express");
const adminControllers = require("../controllers/admin_controller");
const VisiMisiTujuan = require("../controllers/visi_misi_tujuan_controller");
const { getTotalSiswaTahunan } = require("../controllers/total_siswa_tahunan_controller");
const UserAdmin = require("../controllers/user_admin_controller");

const router = express.Router();

// **Admin Routes**
router.post("/login", adminControllers.loginAdmin);
router.post("/register", adminControllers.register);
router.get("/user-admin", adminControllers.getAllAdmins);

// **Visi, Misi, Tujuan Routes**
router.get("/visi", VisiMisiTujuan.getVisi);
router.put("/visi-update", VisiMisiTujuan.updateVisi);
router.get("/misi", VisiMisiTujuan.getMisi);
router.get("/misi/:id", VisiMisiTujuan.getMisiById);
router.put("/update-misi/:id", VisiMisiTujuan.updateMisiById);
router.get("/tujuan", VisiMisiTujuan.getTujuan);
router.get("/tujuan/:id", VisiMisiTujuan.getTujuanById);
router.put("/update-tujuan/:id", VisiMisiTujuan.updateTujuanById);

// **Data Siswa Routes**
router.get("/total-siswa-tahunan", getTotalSiswaTahunan);

module.exports = router;
