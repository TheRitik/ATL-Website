import { Event } from "../models/events.model.js";

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ _id: -1 });
    return res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch a single event by eventId
const getEventById = async (req, res) => {
  const { eventId } = req.params;
  console.log("Received Event ID:", eventId);
  try {
      const event = await Event.findOne({ eventId: eventId });
      if (!event) {
          return res.status(404).json({ message: "Event not found" });
      }
      res.json(event);
  } catch (error) {
      res.status(500).json({ message: "Error fetching event", error });
  }
};

export { getEvents  , getEventById};