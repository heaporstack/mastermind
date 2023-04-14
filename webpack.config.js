const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    main: "./source/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /.*\.test\..*/
      }
    ]
  }
};
