// routes/bugRoutes.js
import express from "express";
import {
  createBug,
  getBugs,
  getBug,
  updateBug,
  deleteBug,
} from "../controllers/bugController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createBug);
router.get("/", auth, getBugs);
router.get("/:id", auth, getBug);
router.patch("/:id", auth, updateBug);
router.delete("/:id", auth, deleteBug);

export default router;
