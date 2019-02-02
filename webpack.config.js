'use strict';

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = (process.env.NODE_ENV === 'production');

const SOURCE_PATH = path.resolve(__dirname, 'source');
const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
	watch: !isProduction,
	mode: process.env.NODE_ENV,

	entry: SOURCE_PATH + '/main.js',
	output: {
		path: BUILD_PATH,
		filename: isProduction ? 'static/scripts/squares.[hash:8].js' : 'static/scripts/squares.js',
		chunkFilename: isProduction ? 'static/scripts/[id].chunk.[chunkhash:8].js' : 'static/scripts/[id].chunk.js'
	},

	devServer: {
		contentBase: path.join(__dirname, 'build'),
		compress: true,
		host: '127.0.0.1',
		port: 1337,
		hot: true
	},

	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		runtimeChunk: true
	},

	module: {
		rules: [{
			enforce: 'pre',
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				fix: false,
				cache: true,
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
				loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
			}, {
				loader: 'css-loader',
				options: {
					sourceMap: !isProduction
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
							stage: 3
						}),
						require('css-mqpacker')
					],
					sourceMap: !isProduction
				}
			}, {
				loader: 'sass-loader',
				options: {
					sourceMap: !isProduction
				}
			}]
		}, {
			test: /\.(woff2?|ttf|eot|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: 'fonts'
			}
		}]
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: isProduction ? 'static/styles/squares.[contenthash:8].css' : 'static/styles/squares.css',
			chunkFilename: isProduction ? 'static/styles/[id].chunk.[contenthash:8].css' : 'static/styles/[id].chunk.css'
		}),
		new HtmlWebpackPlugin({
			inject: true,
			minify: isProduction ? {
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
			} : false,
			filename: './index.html',
			template: SOURCE_PATH + '/views/index_template.html'
		})
	]
};