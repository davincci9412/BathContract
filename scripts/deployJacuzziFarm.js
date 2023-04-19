const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const JacuzziContract = await ethers.getContractFactory("Jacuzzi");
    
    /*
    /// @param _bathAddress Address of BATH token.
    /// @param _poolStartTime Emissions start time.
    /// @param _runningTime Running time of emissions (in seconds).
    /// @param _bathperblock Total amount of tokens to be emitted.
    /// @param _feeCollector Address where the deposit fees are transferred.
    */
    const BathTokenAddress = "0x8Bfea674bE99b86B15e1ED46C030650B34a0AA5d";
    const startTime = 1681704000;  //Monday, April 17, 2023 13:00:00 GMT+09:00
    const runningTime = 3600*24*6;  //6 days - 518,400sec
    const BathPerSecond = "100000000000000000"; //0.1 bath per sec-  518,400BATH will be spent for pool
    // The treasury Address for getting deposit Fee
    const feeCollector = "0xe8f082A0831ECb553023f9de03f7e8fBd8EFc15E";

    const Farm = await JacuzziContract.deploy(
      BathTokenAddress,startTime,runningTime,BathPerSecond,feeCollector);
  
    console.log("Farm address: ", Farm.address);

    await hre.run("verify:verify", {
      address: Farm.address,
      constructorArguments: 
      [BathTokenAddress,startTime,runningTime,BathPerSecond,feeCollector],
    });

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });