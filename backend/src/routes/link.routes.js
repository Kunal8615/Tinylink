import express from "express";
import {
  createLink,
  listLinks,
  getLink,
  deleteLink
} from "../controllers/link.controller.js";
import { validateUrlBody } from "../controllers/validateUrl.js";

const router = express.Router();

router.post("/", validateUrlBody, createLink);
router.get("/", listLinks);
router.get("/:code", getLink);
router.delete("/:code", deleteLink);

export default router;
