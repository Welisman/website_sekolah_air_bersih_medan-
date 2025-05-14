    const express = require("express");
    const router = express.Router();
    const dataGuruTendikController = require("../../controllers/smp_controller/data_guru_tendik");
    const multer = require("multer");
    const path = require("path");
    
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/"); // folder uploads/
      },
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
      }
    });
    
    const upload = multer({ storage: storage });    

    router.get("/data-guru-tendik", dataGuruTendikController.getAllGuruTendik);
    router.get("/data-guru-tendik/:id", dataGuruTendikController.getGuruTendikById);
    router.post("/data-guru-tendik", upload.single("image"), dataGuruTendikController.createGuruTendik);
    router.put("/data-guru-tendik/:id", dataGuruTendikController.updateGuruTendik);
    router.delete("/data-guru-tendik/:id", dataGuruTendikController.deleteGuruTendik);
    router.post("/data-guru-tendik/upload/:id", upload.single("image"), dataGuruTendikController.uploadImageGuruTendik);

    module.exports = router;
