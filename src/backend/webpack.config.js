// Generated using webpack-cli http://github.com/webpack/webpack-cli

const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'none',
  target: 'node19.9',

  entry: path.resolve(__dirname, './src/index.ts'),

  output: {
    path: path.resolve(__dirname, '../../dist')
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/server/db', to: './server/db', }
      ],
    }),
  ],


  module: {
    rules: [],
    exprContextCritical: false
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', 'json', '...'],
    alias: { // https://webpack.js.org/configuration/resolve/#resolvealias
      // "@socket": path.resolve(__dirname, "src/server/web-socket/index.ts"),
      // "@Id": path.resolve(__dirname, "src/server/getId.ts"),
      // "@dbase": path.resolve(__dirname, "src/server/db/dbase.json")
    }
  },
}

// module.exports = () => {}
// 'production';
// 'development';

