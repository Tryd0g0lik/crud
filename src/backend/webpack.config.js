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
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
}

// module.exports = () => {}
// 'production';
// 'development';

