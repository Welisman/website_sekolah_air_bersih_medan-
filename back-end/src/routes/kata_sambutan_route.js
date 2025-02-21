const express = require("express");
const fs = require("fs");
const router = express.Router();

const filePath = "../kata_sambutan.json";

// **GET Kata Sambutan**
router.get("/", (req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Gagal membaca file" });
        res.json(JSON.parse(data));
    });
});

// **UPDATE Kata Sambutan**
router.put("/", (req, res) => {
    const newData = req.body;
    fs.writeFile(filePath, JSON.stringify(newData, null, 2), "utf8", (err) => {
        if (err) return res.status(500).json({ error: "Gagal menyimpan data" });
        res.json({ message: "Kata sambutan diperbarui" });
    });
});

module.exports = router;
