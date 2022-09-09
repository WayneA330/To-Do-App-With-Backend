const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const Dotenv = require("dotenv-webpack");
const deps = require("../package.json");
const shared = require("./shared");

module.exports = {
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, "..", "config", "env", ".env.stage"),
    }),
    new ModuleFederationPlugin({
      name: "saas_module",
      filename: "remoteEntry.js",
      exposes: {
        // expose each component you want
        // "./routes": "./src/routes/routes.config.tsx",
      },
      remotes: {
        saasLibraries:
          "saasLibraries@https://saas-lib-dev.rcapconnect.com/remoteEntry.js",
        wieldy: "wieldy@https://rcap-repo.rcapconnect.com/remoteEntry.js",
      },
      shared,
    }),
  ],
};
