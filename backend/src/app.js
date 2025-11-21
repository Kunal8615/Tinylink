import express from "express";
import cors from "cors";
import connectDB from "./database/index.js";
import linkRoutes from "./routes/link.routes.js";
import healthRoutes from "./routes/health.routes.js";

import Link from "./models/link.model.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/links", linkRoutes);
app.use("/healthz", healthRoutes);

app.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const link = await Link.findOne({ code });
    if (!link) return res.status(404).send("Not found");

    link.clicks = (link.clicks || 0) + 1;
    link.last_clicked = new Date();
    await link.save();

    return res.redirect(302, link.url);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

export default app;
