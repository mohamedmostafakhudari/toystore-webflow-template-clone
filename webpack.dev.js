const { merge } = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common.js");

module.exports = merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		static: {
			directory: path.resolve(__dirname, "/assets"),
			publicPath: "/assets",
		},
		historyApiFallback: true,
	},
});
