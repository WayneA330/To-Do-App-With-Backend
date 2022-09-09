const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const Dotenv = require("dotenv-webpack");
const deps = require("../package.json");
const shared = require("./shared");

module.exports = {
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "..", "config", "env", ".env.dev"),
    }),
    new ModuleFederationPlugin({
      name: "saas_module",
      filename: "remoteEntry.js",
      exposes: {
        // expose each component you want
        // "./routes": "./src/routes/routes.config.tsx",
      },
      remotes: {
        saasLibraries: "saasLibraries@http://localhost:3333/remoteEntry.js",
        wieldy: 'wieldy@https://rcap-repo.rcapconnect.com/remoteEntry.js',
      },
      shared,
    }),
  ],
};
