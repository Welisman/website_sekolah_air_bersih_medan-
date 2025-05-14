const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const kataSambutanController = require("../../controllers/smp_controllerkata_sambutan_controller");
const filePath = path.join(__dirname, "../kata_sambutan.json");

// **GET Kata Sambutan**
router.get("/kata-sambutan", kataSambutanController.getKataSambutan);

module.exports = router;
