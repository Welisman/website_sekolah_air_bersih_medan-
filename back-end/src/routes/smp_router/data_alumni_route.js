const express = require("express");
const router = express.Router();
const dataAlumniController = require("../../controllers/smp_controller/data_alumni_controller");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/data_alumni", dataAlumniController.getAllAlumni);
router.post("/data_alumni", dataAlumniController.createAlumni);
router.post("/data_alumni/upload/:id", upload.single("image"), dataAlumniController.uploadAlumniImage);
router.delete("/data_alumni/:id", dataAlumniController.deleteAlumni);

module.exports = router;
