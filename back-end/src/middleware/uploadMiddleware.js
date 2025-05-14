const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads")); // Simpan di folder "uploads"
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Format nama unik
    }
});

// Filter hanya menerima gambar (jpeg, png, jpg)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("File harus berupa gambar!"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
