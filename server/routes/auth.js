import express from "express";

const router = express.Router();

import { requireSignIn, isAdmin } from "../middlewares/auth.js";

import {
  register,
  login,
  updateProfile,
  getOrders,
  allOrders,
} from "../controllers/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignIn, (req, res) => {
  res.json({ ok: true });
});
router.get("/admin-check", requireSignIn, isAdmin, (req, res) => {
  res.json({ ok: true });
});
router.put("/profile", requireSignIn, updateProfile);

router.get("/orders", requireSignIn, getOrders);
router.get("/all-orders", requireSignIn, isAdmin, allOrders);

export default router;
