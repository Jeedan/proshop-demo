import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const router = express.Router();

router.get(
	"/",
	asyncHandler(async (req, res) => {
		// pass in empty object to grab all products
		const products = await Product.find({});
		res.json(products);
	})
);

router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		// get id from url
		const product = await Product.findById(req.params.id);
		if (product) {
			return res.json(product);
		}
		// if no product found return a 404 error
		res.status(404);
		throw new Error("Resource not found");
	})
);

export default router;
