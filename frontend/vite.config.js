import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// import the eslint plugin
import eslintPlugin from "vite-plugin-eslint";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		eslintPlugin({
			// setup the plugin
			cache: false,
			include: ["./src/**/*.js", "./src/**/*.jsx"],
			exclude: [],
		}),
	],
	server: {
		proxy: {
			"/api": "http://localhost:5000",
			"/uploads": "http://localhost:5000",
		},
	},
});
