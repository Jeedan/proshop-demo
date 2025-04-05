import express from "express";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";

// call before env variables are used
dotenv.config();

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 5000;

// connect mongoose to MongoDB
connectDB();

const app = express();

app.get("/", (req, res) => {
	res.send("API is running...");
});

// we link our routes with a router in productRoutes.js
app.use("/api/products", productRoutes);

// call middleware functions to handle errors
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
