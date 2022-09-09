const HtmlWebPackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");
const WorkboxPlugin = require("workbox-webpack-plugin");
var WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: "development",
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new WorkboxPlugin.GenerateSW({
      maximumFileSizeToCacheInBytes: 5000000,
      // these options encourage the ServiceWorkers to get in there fast

      // and not allow any straggling "old" SWs to hang around

      clientsClaim: true,

      skipWaiting: true,
    }),
    new WebpackPwaManifest({
      filename: "manifest.json",
      name: "CHECK (Risk & Screening)",
      short_name: "CHECK",
      description: "Risk Scoring and Screening project",
      background_color: "#ffffff",
      crossorigin: "use-credentials", //can be null, use-credentials or anonymous
      start_url: "/",
      publicPath: "/",
      theme_color: "#ffffff",
      ios: true,
      includeDirectory: true,
      prefer_related_applications: true,
      related_applications: [
        {
          platform: "play",
          id: "com.google.samples.apps.iosched",
        },
      ],
      icons: [
        {
          src: path.resolve("src/assets/checkLogo.png"),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        },
        {
          src: path.resolve("src/assets/checkLogo.png"),
          size: "1024x1024", // you can also use the specifications pattern
        },
        {
          src: path.resolve("src/assets/checkLogo.png"),
          size: "1024x1024",
          purpose: "maskable",
        },
      ],
    }),
  ],
};
