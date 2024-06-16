const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env, argv) => {
	const isProduction = argv.mode === "production";
	// const publicPath = isProduction ? `/${process.env.REPO_NAME}/` : "/";

	return {
		entry: "./src/index.js",
		plugins: [
			new CopyPlugin({
				patterns: [{ from: "./public/assets", to: "assets" }],
			}),
			new HtmlWebpackPlugin({
				inject: true,
				template: `./src/index.html`,
				filename: `index.html`,
			}),
			new Dotenv(),
		],
		output: {
			filename: "main.bundle.js",
			path: path.resolve(__dirname, "dist"),
			publicPath: process.env.BASE_URL || "/",
			clean: true,
		},
		resolve: {
			modules: ["node_modules"],
		},
		module: {
			rules: [
				{
					test: /\.hbs$/,
					use: "handlebars-loader",
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				},
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader", "postcss-loader"],
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					include: path.resolve(__dirname, "src"),
					type: "asset/resource",
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/inline",
				},
			],
		},
	};
};
