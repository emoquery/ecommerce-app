import express from "express";

const router = express.Router();

import { requireSignIn, isAdmin } from "../middlewares/auth.js";

import {
  create,
  update,
  remove,
  list,
  read,
  productsByCategory,
} from "../controllers/category.js";

router.post("/category", requireSignIn, isAdmin, create);
router.put("/category/:categoryId", requireSignIn, isAdmin, update);
router.delete("/category/:categoryId", requireSignIn, isAdmin, remove);
router.get("/categories", list);
router.get("/category/:slug", read);
router.get("/products-by-category/:slug", productsByCategory);

export default router;
