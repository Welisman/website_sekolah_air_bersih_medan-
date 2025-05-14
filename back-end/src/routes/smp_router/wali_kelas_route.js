const express = require('express');
const router = express.Router();
const waliKelasController = require('../controllers/wali_kelas_controller');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/wali-kelas', waliKelasController.getAllWaliKelas);
router.get('/wali-kelas/id/:id', waliKelasController.getWaliKelasById);
router.post('/wali-kelas', upload.single('image'), waliKelasController.createWaliKelas);
router.delete('/wali-kelas/:id', waliKelasController.deleteWaliKelas);
router.put('/wali-kelas/:id', upload.single('image'), waliKelasController.updateWaliKelas);
router.post('/wali-kelas/:id/upload', upload.single('image'), waliKelasController.uploadFotoWaliKelas);

module.exports = router;
