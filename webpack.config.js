var path = require('path')

var postcss = require('postcss'),
	autoprefixer = require('autoprefixer'),
	postcssCalc = require('postcss-calc'),
	postcssCustomProperties = require('postcss-custom-properties'),
	postcssImport = require('postcss-import'),
	postcssMixins = require('postcss-mixins'),
	postcssNested = require('postcss-nested')

var webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin')

var nodeEnv = process.env.NODE_ENV
var isProd = nodeEnv === 'production'

module.exports = {
	devtool: isProd ? 'source-map' : 'eval-source-map',
	bail: isProd,
	stats: {
		colors: true
	},
	entry: {
		pillar: ['./index.css','./index.js'],
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	},
	output: {
		library: 'Pillar',
		libraryTarget: 'umd',
		filename: '[name].js',
		path: path.resolve('./lib'),
		pathinfo: isProd ? false : true
	},
	resolve: {
		modules: [
			path.resolve('./src'),
			'node_modules',
		],
		extensions: ['.js', '.css']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: isProd ? {} : {
					cacheDirectory: './node_modules/.cache/react-scripts',
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: [
						'css-loader',
						'postcss-loader'
					]
				})
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
				loader: 'file',
				query: {
					name: '/assets/[name].[hash:8].[ext]'
				}
			}
		]
	},
	plugins:
	[
		new webpack.LoaderOptionsPlugin({
			options: {
				css: {
					importLoaders: 1,
					autoprefixer: false
				},
				postcss: function(webpack) {
					return [
						postcssImport({
							addDependencyTo: webpack
						}),
						postcssNested(),
						postcssCustomProperties(),
						postcssCalc(),
						autoprefixer({
							browsers: [
								'> 1%',
								'last 2 versions',
								'IE 8'
							]
						})
					];
				},
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(nodeEnv)
			}
		}),
		new ExtractTextPlugin("[name].css")
	].concat(isProd ? [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				comments: false,
				screw_ie8: true
			},
			sourceMap: true
		})
	] : [])
}
