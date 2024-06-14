const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

module.exports = (env, argv) => {
	const isProduction = argv.mode === "production";
	const environmentConfig = isProduction ? require("./webpack.prod.js") : require("./webpack.dev.js");

	return merge(commonConfig(env, argv), environmentConfig);
};
