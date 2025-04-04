import mongoose from "mongoose";

// make sure to turn off ProtonVPN before running the server
// proton blocks 27107 port
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
