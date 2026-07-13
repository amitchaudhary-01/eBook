import express from "express";
import { subscribe } from "../controller/newsletter_controller.js";

const router = express.Router();

// POST /api/v1/newsletter/subscribe
router.post("/subscribe", subscribe);

export default router;