/**
 * Created by helga on 07.10.16.
 */
module.exports = {
	entry: './src/client.js',
	output: {
		path: './public',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.json']
	}
};