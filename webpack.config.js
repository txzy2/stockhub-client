// webpack.config.js or wherever your webpack configuration is defined
module.exports = {
  // other webpack configuration options
  module: {
    rules: [
      {
        test: /dotenv/,
        use: 'ignore-loader',
      },
    ],
  },
};
