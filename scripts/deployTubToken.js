async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const TubTokenContract = await ethers.getContractFactory("Tub");

    const startTime = 0;
    const communityFundAddress = "0xe5C538024188eD687a26C88390c7433c6a09F909";
    const devFundAddress = "0xe5C538024188eD687a26C88390c7433c6a09F909";

    const TubToken = await TubTokenContract.deploy(startTime,communityFundAddress,devFundAddress);
  
    console.log("Token address:", TubToken.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });