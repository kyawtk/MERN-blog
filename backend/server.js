import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const port = process.env.PORT || 4000;
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleWare/errorMiddleware.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//routes
app.use("/api/users/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
