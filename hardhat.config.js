/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
module.exports = {
  networks: {
    hardhat: {
      chainId: 137,
    },
    mumbia: {
      url: process.env.http,
      accounts: [process.env.secret],
    },
    mainnet: {
      url: process.env.http,
      accounts: [process.env.secret],
    },
  },
  solidity: {
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.9",
      },
      {
        version: "0.8.1",
      },
      {
        version: "0.8.8",
      },
    ],
  },
};
