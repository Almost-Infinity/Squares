const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const SOURCE_PATH = path.resolve(__dirname, 'source', 'server');
const BUILD_PATH = path.resolve(__dirname, 'build');

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => [ '.bin' ].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  target: 'node',
  stats: 'minimal',
  node: {
    __dirname: false
  },

  entry: SOURCE_PATH + '/index.js',
  output: {
		path: BUILD_PATH,
		filename: 'app.js'
  },
  
  externals: nodeModules,

  plugins: [
    new ProgressBarPlugin({
			format: `\t${chalk.green.italic(':msg')} [${chalk.green.bold(':bar')}] ${chalk.gray(':percent')}`,
			renderThrottle: 100,
			summary: false,
			clear: true
		})
  ]
};