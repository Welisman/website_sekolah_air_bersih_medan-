const express = require("express");
const { getTotalSiswaTahunan } = require("../controllers/total_siswa_tahunan_controller");

const router = express.Router();
router.get("/total-siswa-tahunan", getTotalSiswaTahunan);

module.exports = router;
