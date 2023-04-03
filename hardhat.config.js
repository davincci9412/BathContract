
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


const accounts = {
  mnemonic: process.env.MNEMONIC,
};


module.exports = {
  solidity: "0.8.10",
  etherscan: {
    apiKey: {
      ftmTestnet: 'WDHFZFMJKTS82UXC9R1G52UY278AMFWQ9V'
    }
  },
  networks: {
    fantom: {
      url: "https://rpcapi.fantom.network",
      accounts,
      chainId: 250,
      live: false,
      saveDeployments: true,
      gasMultiplier: 2,
    },
    fantomtest: {
      url: "https://rpc.testnet.fantom.network",
      accounts,
      chainId: 4002,
      live: true,
      saveDeployments: true,
      gasMultiplier: 2,
    },
  },
};