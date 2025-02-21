
// const fs = require('fs');
// const xlsx = require('xlsx');
// const adminRoutes = require("./routes/admin_route.js");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const adminRoutes = require("./src/routes/admin_route");
require('dotenv').config();
const PORT = process.env.PORT;

const kataSambutanRoutes = require("./src/routes/kata_sambutan_route");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
}))

app.use('/admin', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`)
})

app.use(cors());
app.use(express.json());

// Rute CRUD Kata Sambutan
app.use("/api/kata-sambutan", kataSambutanRoutes);

app.listen(3001, () => {
    console.log("Server berjalan di http://localhost:3001");
});
