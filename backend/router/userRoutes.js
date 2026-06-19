import express from "express";
import { setFavorites, addToHistory, getProfile, clearFavorites, clearHistory } from "../controller/userController.js";

export const router = express.Router();

router.post("/favorite/:username", setFavorites);
router.post("/history/:username", addToHistory);
router.get("/profile/:username", getProfile);
router.delete("/dash/clearFavorites/:username", clearFavorites);
router.delete("/dash/clearHistory/:username", clearHistory);
