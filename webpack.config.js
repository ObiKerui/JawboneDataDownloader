const path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const DIST_DIR = path.resolve(__dirname, 'public')
const SRC_DIR = path.resolve(__dirname, 'client')

const config = {
	entry: SRC_DIR + '/app/index-app.js',
	output: {
		path: DIST_DIR,
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js?/,
				include: SRC_DIR,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-2'],
					plugins: ['transform-decorators-legacy']
				}
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader',
	    		options: { limit: 10000 } // Convert images < 10k to base64 strings
			}
		]
	}
}

module.exports = config;