import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";

import auth from "./routes/auth.js";
import category from "./routes/category.js";
import product from "./routes/product.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db error = ", err));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", auth);
app.use("/api/v1", category);
app.use("/api/v1", product);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`node server is running on port ${port}`);
});
