import dotenv from "dotenv";
import express from "express";
import connectDb from "./db/connection.js";

import router from "./routes/events.routes.js";
import { Event } from "./models/events.model.js";
import cors from "cors";
dotenv.config({
  path: "./env",
});


const app = express();
app.use(cors());

(async () => {
  const allEvents = await Event.find();
  console.log("All Events from DB:", allEvents);
})();

connectDb();

app.use(express.json());
// Routes
app.use("/api", router);


app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at Port: ${process.env.PORT}`);
  console.log(`API Base URL: http://localhost:${process.env.PORT}/api`);
});