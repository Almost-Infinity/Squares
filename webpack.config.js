const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isProduction = (process.env.NODE_ENV === 'production');

const SOURCE_PATH = path.resolve(__dirname, 'source');
const BUILD_PATH = path.resolve(__dirname, 'build');

module.exports = {
	watch: !isProduction,
	mode: process.env.NODE_ENV,
	devtool: isProduction ? 'source-map' : 'inline-source-map',
	stats: 'minimal',

	entry: SOURCE_PATH + '/App.js',
	output: {
		path: BUILD_PATH,
		filename: isProduction ? 'static/scripts/squares.[hash:8].js' : 'static/scripts/squares.js',
		chunkFilename: isProduction ? 'static/scripts/[name].[chunkhash:8].js' : 'static/scripts/[name].chunk.js'
	},

	devServer: {
		contentBase: path.join(__dirname, 'build'),
		stats: 'minimal',
		overlay: false,
		clientLogLevel: 'none',
		compress: true,
		port: 1337,
		hot: true
	},

	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		runtimeChunk: true,
		minimizer: [
			new TerserWebpackPlugin({
				parallel: true,
				sourceMap: isProduction,
				extractComments: 'some',
				terserOptions: {
					compress: { inline: 1 },
					mangle: { safari10: true },
					output: { safari10: true }
				}
			})
		]
	},

	module: {
		rules: [{
			test: /\.js?$/,
			enforce: 'pre',
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				fix: false,
				cache: false,
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
					sourceMap: isProduction
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
						require('css-mqpacker'),
						require('cssnano')({
							autoprefixer: false,
							zindex: false,
							cssDeclarationSorter: isProduction
						})
					],
					sourceMap: isProduction
				}
			}, {
				loader: 'sass-loader',
				options: {
					sourceMap: isProduction,
					includePaths: [ path.join(__dirname, 'node_modules') ]
				}
			}]
		}, {
			test: /\.(png|jpe?g|gif|svg)$/,
			use: [{
				loader: isProduction ? 'file-loader' : 'url-loader',
				options: {
					outputPath: '/static/images/'
				}
			}, {
				loader: 'image-webpack-loader',
				options: {
					mozjpeg: { progressive: true, quality: 65 },
					optipng: { enabled: false },
					pngquant: { quality: '65-90', speed: 4 },
					gifsicle: { interlaced: false }
				}
			}]
		}]
	},

	plugins: [
		new ProgressBarPlugin({
			format: '\t' + chalk.green.italic(':msg') + '\n\t[' + chalk.green.bold(':bar') + '] ' + chalk.gray(':percent') + ' (:elapsed seconds)',
			renderThrottle: 100,
			summary: false,
			clear: true
		}),
		isProduction && new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [ 'static', '**/*.html' ],
			verbose: false
		}),
		!isProduction && new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			minify: isProduction && {
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
			},
			filename: './index.html',
			template: SOURCE_PATH + '/views/index_template.html'
		}),
		isProduction && new MiniCssExtractPlugin({
			filename: isProduction ? 'static/styles/squares.[contenthash:8].css' : 'static/styles/squares.css',
			chunkFilename: isProduction ? 'static/styles/[name].[contenthash:8].css' : 'static/styles/[name].chunk.css'
		}),
		isProduction && new BundleAnalyzerPlugin({ // report.html
			analyzerMode: 'static',
			defaultSizes: 'gzip',
			openAnalyzer: false
		})
	].filter(Boolean)
};