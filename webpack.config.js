module.exports = {
  module: {
    rules: [
      {
        test: /dotenv/,
        use: 'ignore-loader',
      },
    ],
  },
};
