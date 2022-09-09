const { dependencies: deps } = require("../package.json");

const shared = [
  {
    react: {
      singleton: true,
      requiredVersion: deps.react,
      eager: true,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
      eager: true,
    },
    "react-router-dom": {
      singleton: true,
      requiredVersion: deps["react-router-dom"],
      eager: true,
    },
    "react-query": {
      singleton: true,
      requiredVersion: deps["react-query"],
      eager: true,
    },
    "@material-ui/core": {
      singleton: true,
      requiredVersion: deps["@material-ui/core"],
      eager: true,
    },
    "@material-ui/lab": {
      singleton: true,
      requiredVersion: deps["@material-ui/lab"],
      eager: true,
    },
    "@material-ui/system": {
      singleton: true,
      requiredVersion: deps["@material-ui/system"],
      eager: true,
    },
    "@material-ui/styles": {
      singleton: true,
      requiredVersion: deps["@material-ui/styles"],
      eager: true,
    },
    notistack: {
      singleton: true,
      requiredVersion: deps["notistack"],
      eager: true,
    },
    axios: {
      singleton: true,
      requiredVersion: deps["axios"],
      eager: true,
    },
    "overmind-react": {
      singleton: true,
      requiredVersion: deps["overmind-react"],
      eager: true,
    },
    overmind: {
      singleton: true,
      requiredVersion: deps["overmind"],
      eager: true,
    },
    "crypto-js": {
      singleton: true,
      requiredVersion: deps["crypto-js"],
      eager: true,
    },
    "styled-components": {
      singleton: true,
      requiredVersion: deps["styled-components"],
      eager: true,
    },
  },
];

module.exports = shared;
