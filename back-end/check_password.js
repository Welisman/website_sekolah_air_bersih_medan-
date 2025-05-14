const bcrypt = require("bcrypt");

const inputPassword = "admin222"; // Ganti dengan password yang digunakan untuk login
const hashedPassword = "$2a$10$7hxuZhL/3x5Jw2dOiO5GmOgAGd12hL8PcYyEdVCCI8B6Yf.mplUXW"; // Hash dari database

bcrypt.compare(inputPassword, hashedPassword, (err, result) => {
    if (result) {
        console.log("✅ Password cocok!");
    } else {
        console.log("❌ Password tidak cocok!");
    }
});
