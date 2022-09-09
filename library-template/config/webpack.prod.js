const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')
const Dotenv = require('dotenv-webpack')
const deps = require('../package.json')

module.exports = {
	plugins: [
		new Dotenv({
			path: path.resolve(__dirname, '..', 'config', 'env', '.env.prod'),
		}),
		new ModuleFederationPlugin({
      name: "saasLibraries",
      // library: { type: 'var', name: 'libraries' },
      filename: "remoteEntry.js",
      remotes: {
				wieldy: 'wieldy@https://rcap-repo.rcapconnect.com/remoteEntry.js',
			},
      exposes: {
        // expose each component you want
        "./Overmind": "./src/overmind",
        "./Encryption": "./src/utils/BodyEncryption",
        "./AxiosIntercept": "./src/utils/AxiosInterceptor",
        "./PublicLayoutRoutes": "./src/routes/PublicRoutes.tsx",
        "./PrivateLayout": "./src/layout/privateLayout.tsx",
        "./LoadingPage": "./src/pages/loadingPage.tsx",
      },
      shared: [
        {
          react: {
            singleton: true,
            requiredVersion: deps.dependencies.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps.dependencies["react-dom"],
          },
          "react-router-dom": {
            singleton: true,
            requiredVersion: deps.dependencies["react-router-dom"],
          },
          "react-query": {
            singleton: true,
            requiredVersion: deps.dependencies["react-query"],
          },
          "overmind-react": {
            singleton: true,
            requiredVersion: deps.dependencies["overmind-react"],
          },
          overmind: {
            singleton: true,
            requiredVersion: deps.dependencies["overmind"],
          },
          "crypto-js": {
            singleton: true,
            requiredVersion: deps.dependencies["crypto-js"],
          },
          "@material-ui/core": {
            singleton: true,
            requiredVersion: deps.dependencies["@material-ui/core"],
          },
          "@material-ui/lab": {
            singleton: true,
            requiredVersion: deps.dependencies["@material-ui/lab"],
          },
          "@material-ui/system": {
            singleton: true,
            requiredVersion: deps.dependencies["@material-ui/system"],
          },
          "@material-ui/styles": {
            singleton: true,
            requiredVersion: deps.dependencies["@material-ui/styles"],
          },
          "styled-components": {
            singleton: true,
            requiredVersion: deps.dependencies["styled-components"],
          },
          notistack: {
            singleton: true,
            requiredVersion: deps.dependencies["notistack"],
          },
          antd: {
            singleton: true,
            requiredVersion: deps.dependencies["antd"],
          },
        },
      ],
    }),
	],
}
