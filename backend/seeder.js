import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

// call this first
dotenv.config();

// connect to the database
connectDB();

// import Data
const importData = async () => {
	try {
		// delete everything before we import
		// delete multiple records, no passed params deletes everything
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();

		// create new users and save them to the database
		const createdUsers = await User.insertMany(users);
		// get the admin user who will be first in the array
		// we get the admin user so that we can create OTHER users
		const adminUser = createdUsers[0]._id;
		// map through the products and add the user to each product
		//insert products into the database
		// return all products as well as the admin user
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser };
		});

		await Product.insertMany(sampleProducts);
		console.log("Data Imported!".green.inverse);

		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

// destroy data
const destroyData = async () => {
	try {
		await Order.deleteMany();
		await Product.deleteMany();
		await User.deleteMany();
		console.log("Data Destroyed!".red.inverse);
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
