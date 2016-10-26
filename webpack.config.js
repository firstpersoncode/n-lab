var output_obj = require('./output.json');
var appConfig = require('./appConfig.json');

var SmartBannerPlugin = require('smart-banner-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin(output_obj.output.css_path.toString()+"/"+output_obj.output.css_file.toString());
let banner = new SmartBannerPlugin(	`=========================================================================
	${appConfig.project.toString()} ${appConfig.version.toString()}
	[filename] ${new Date().toLocaleString()}

	${appConfig.description.toString()}

	${appConfig.author.name.toString()}
	${appConfig.author.email.toString()}
	${appConfig.author.website.toString()}
	${appConfig.author.company.toString()}
	=========================================================================`,{ raw: false, entryOnly: true });

module.exports = {
	entry: "./dependency.js",
	output: {
		path: output_obj.output.js_path.toString(),
		filename: output_obj.output.js_file.toString()
	},
	devtool: "source-map",
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader',
				query : {
					presets: ['es2015']
				}
			},
			{
				test: /\.css$/,
	            loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap"),
				exclude: /(node_modules)/
			},
			{
				test: /\.scss$/,
	            loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?sourceMap"),
				exclude: /(node_modules)/
			}
		]
	},
	plugins: [
        extractCSS,
        banner
    ]
};