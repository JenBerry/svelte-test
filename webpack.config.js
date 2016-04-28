var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
	entry: "./src/index.jsx",
	output: {
		path: __dirname + "/build",
		filename: "app.js",
		publicPath: "/"
	},
	module: {
		loaders: [
			{
				test: /src\/.*.jsx?$/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /src\/.*.(scss|sass)$/,
				loaders:['style', 'css', 'sass']
			},
			{
				test: /.*.html$/,
				loader: ExtractTextPlugin.extract("html-loader")
			},
		]
	},
	plugins: [
		new ExtractTextPlugin("index.html")
	]
}