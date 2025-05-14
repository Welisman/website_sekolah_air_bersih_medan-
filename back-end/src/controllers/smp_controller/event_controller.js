const pool = require("../../database/database_connection");

// 🔹 Ambil semua events dengan gambar (base64)
exports.getAllEvents = async (req, res) => {
    try {
        const [events] = await pool.execute("SELECT * FROM events");

        // Ubah image jadi base64 string (biar langsung di frontend bisa dipakai)
        const updatedEvents = events.map(event => {
            return {
                ...event,
                image: event.image
                    ? `data:image/jpeg;base64,${event.image.toString("base64")}`
                    : null
            };
        });

        res.json(updatedEvents);
    } catch (error) {
        res.status(500).json({
            error: "Gagal mengambil data events",
            details: error.message
        });
    }
};

// 🔹 Ambil satu event by ID (data lengkap + image base64)
exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute("SELECT * FROM events WHERE id = ?", [id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Event tidak ditemukan" });
        }

        const event = result[0];

        // Convert image jadi base64, kalau ada gambarnya
        const updatedEvent = {
            ...event,
            image: event.image
                ? `data:image/jpeg;base64,${event.image.toString("base64")}`
                : null
        };

        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({
            error: "Gagal mengambil data event",
            details: error.message
        });
    }
};


// 🔹 Tambah event baru
exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, time } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        // Simpan event langsung ke table events
        await pool.execute(
            "INSERT INTO events (title, description, date, time, image) VALUES (?, ?, ?, ?, ?)",
            [title, description, date, time, imageBuffer]
        );

        res.json({ message: "Event berhasil ditambahkan!" });
    } catch (error) {
        res.status(500).json({
            error: "Gagal menambahkan event",
            details: error.message
        });
    }
};

// 🔹 Edit event
exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, time } = req.body;
        const imageBuffer = req.file ? req.file.buffer : null;

        // Update data tanpa gambar dulu
        await pool.execute(
            "UPDATE events SET title = ?, description = ?, date = ?, time = ? WHERE id = ?",
            [title, description, date, time, id]
        );

        // Kalau ada gambar baru, update juga field image
        if (imageBuffer) {
            await pool.execute(
                "UPDATE events SET image = ? WHERE id = ?",
                [imageBuffer, id]
            );
        }

        res.json({ message: "Event berhasil diperbarui!" });
    } catch (error) {
        res.status(500).json({
            error: "Gagal memperbarui event",
            details: error.message
        });
    }
};

// 🔹 Hapus event
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.execute("DELETE FROM events WHERE id = ?", [id]);

        res.json({ message: "Event berhasil dihapus!" });
    } catch (error) {
        res.status(500).json({
            error: "Gagal menghapus event",
            details: error.message
        });
    }
};

// 🔹 Ambil gambar event by ID (tanpa base64, buat tag <img src="/events/:id/image">)
exports.getEventImage = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute("SELECT image FROM events WHERE id = ?", [id]);

        if (result.length === 0 || !result[0].image) {
            return res.status(404).json({ error: "Gambar tidak ditemukan" });
        }

        res.set("Content-Type", "image/jpeg");
        res.send(result[0].image);
    } catch (error) {
        res.status(500).json({
            error: "Gagal mengambil gambar event",
            details: error.message
        });
    }
};
