const path = require('path');

module.exports = {
  entry: './scripts/games.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Обрабатывает все файлы .css
        use: ['style-loader', 'css-loader'], // Лоадеры для CSS
      },
    ],
  },
  mode: 'development',
};