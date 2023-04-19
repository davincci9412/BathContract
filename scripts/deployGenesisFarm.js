const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const GenesisContract = await ethers.getContractFactory("GenesisFarm");
    
    /*
    /// @param _bathAddress Address of BATH token.
    /// @param _poolStartTime Emissions start time.
    /// @param _runningTime Running time of emissions (in seconds).
    /// @param _bathperblock Total amount of tokens to be emitted.
    /// @param _feeCollector Address where the deposit fees are transferred.
    */
    const BathAddress = "0x8Bfea674bE99b86B15e1ED46C030650B34a0AA5d";
    const startTime = 1681231200;  //Friday, April 9, 2023 14:00:00 GMT+09:00
    const runningTime = 3600*72;  //48 hours - 259,200sec
    const BathPerSecond = "1000000000000000000"; //1 bath per sec-  259,200BATH will be spent for pool
    // The treasury Address for getting deposit Fee
    const feeCollector = "0xe8f082A0831ECb553023f9de03f7e8fBd8EFc15E";

    const Farm = await GenesisContract.deploy(
      BathAddress,startTime,runningTime,BathPerSecond,feeCollector);
  
    console.log("Farm address: ", Farm.address);

    await hre.run("verify:verify", {
      address: Farm.address,
      constructorArguments: 
      [BathAddress,startTime,runningTime,BathPerSecond,feeCollector],
    });

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });