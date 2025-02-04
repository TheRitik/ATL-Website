import { Event } from "../models/events.model.js";

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getEvents };
