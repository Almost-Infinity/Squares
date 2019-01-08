const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = (process.env.NODE_ENV === 'production');

const htmlMinifyOpts = {
	removeComments: true,
	collapseWhitespace: true,
	removeRedundantAttributes: true,
	useShortDoctype: true,
	removeEmptyAttributes: true,
	removeStyleLinkTypeAttributes: true,
	keepClosingSlash: true,
	minifyJS: true,
	minifyCSS: true,
	minifyURLs: true
};

module.exports = {
	entry: './source/main.js',
	output: {
		path: path.resolve(__dirname, 'public', 'assets'),
		filename: 'app.js'
	},
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				eslintPath: require.resolve('eslint')
			}
		}, {
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				presets: [
					'@babel/preset-env',
					'@babel/preset-react'
				]
			}
		}, {
			test: /\.(s(a|c)ss)$/,
			use: [{
				loader: production ? MiniCssExtractPlugin.loader : 'style-loader',
			}, {
				loader: 'css-loader',
				options: {
					sourceMap: !production
				}
			}, {
				loader: 'postcss-loader',
				options: {
					ident: 'postcss',
					plugins: () => [
						require('postcss-flexbugs-fixes'),
						require('postcss-preset-env')({
							autoprefixer: {
								flexbox: 'no-2009',
							},
							stage: 3,
						}),
					],
					sourceMap: !production
				}
			}, {
				loader: 'sass-loader',
				options: {
					sourceMap: !production
				}
			}]
		}]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		}),
		new HtmlWebpackPlugin({
			minify: production ? htmlMinifyOpts : false,
			filename: '../index.html',
			template: './source/views/index_template.html'
		})
	]
};