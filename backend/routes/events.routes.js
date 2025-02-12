import express from "express";
import { getEvents,getEventById } from "../controllers/events.controller.js";

const router = express.Router();

// Get all events
router.get("/events", getEvents);
router.get("/events/:eventId", getEventById);

export default router;


