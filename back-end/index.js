
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./src/database/database_connection');

const adminRoutes = require('./src/routes/admin_route');
const kataSambutanRoutes = require('./src/routes/kata_sambutan_route');
const uploadFotoRoutes = require('./src/routes/upload_foto');
const visiRoutes = require('./src/routes/visi_misi_route');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));