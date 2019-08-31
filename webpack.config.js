const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: 'bundle.js',
		chunkFilename: '[name].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				resolve: { extensions: ['.js', '.jsx'] },
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin('dist', {}),
		new HtmlWebpackPlugin({
			template: path.resolve('./src/index.html'),
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin(),
		new MinifyPlugin()
	],
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})],
		splitChunks: {
			cacheGroups: {
				default: false,
				vendor: {
					filename: 'vendors.js',
					chunks: 'all',
					test: /node_modules/
				}
			}
		}
	},
	devServer: {
		port: 8080
	}
};
