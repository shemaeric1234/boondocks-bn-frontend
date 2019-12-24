module.exports = [
  {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
          loader: 'babel-loader'
      }
  },
  {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /node_modules/,
      loader: 'file-loader'
  },
  {
      test: /\.(woff|woff2)$/,
      exclude: /node_modules/,
      loader: 'file-loader'
  },
  {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /node_modules/,
      loader: 'file-loader'
  },
  {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 30000
        }
      }]
  },
  {
      test: /\.css$/,
      use: [
          {
              loader: 'style-loader',
          },
          {
              loader: 'css-loader',
          },
      ]
  },
  {
      test: /\.s(a|c)ss$/,
      use: ['style-loader', 'css-loader', {
        loader: 'sass-loader',
        options: {
          implementation: require('sass')
        }
      }]
  }
];
