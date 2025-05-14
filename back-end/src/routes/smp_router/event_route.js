const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event_controller");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/events", eventController.getAllEvents);

router.get("/events/:id", eventController.getEventById);

router.get("/events/image/:id", eventController.getEventImage);

router.post("/events", upload.single("image"), eventController.createEvent);

router.put("/events/:id", upload.single("image"), eventController.updateEvent);

router.delete("/events/:id", eventController.deleteEvent);

module.exports = router;
