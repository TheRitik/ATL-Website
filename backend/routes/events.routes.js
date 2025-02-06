import express from "express";
import { getEvents } from "../controllers/events.controller.js";

const router = express.Router();

// Get all events
router.get("/", getEvents);

export default router;


