const config = {
  entry: './client/main.js',
  output: {
    path: '/public',
    filename: 'index.js',
  },
  devServer: {
    inline: true,
    port: 5555,
    contentBase: "./public",
  },
  module: {
    loaders: [
      { test: /\.svg$/, loaders: ['raw-loader']},
      { test: /\.less$/, loader: 'style!css!autoprefixer?browsers=last 2 version!less' },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'babel-preset-es2015',
            'babel-preset-react',
            'babel-preset-stage-0'
          ].map(require.resolve),
        },
      },
    ],
  },
};

module.exports = config;
