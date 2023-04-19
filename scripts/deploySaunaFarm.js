const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const SaunaContract = await ethers.getContractFactory("Sauna");
    
    /*
    /// @param _bathAddress Address of BATH token.
    /// @param _poolStartTime Emissions start time.
    /// @param _runningTime Running time of emissions (in seconds).
    /// @param _bathperblock Total amount of tokens to be emitted.
    /// @param _feeCollector Address where the deposit fees are transferred.
    */
    const wBNBAddress = "0xae13d989dac2f0debff460ac112a837c89baa7cd";
    const startTime = 1681440600;  //Friday, April 9, 2023 14:00:00 GMT+09:00
    const runningTime = 3600*24*5;  //5 days - 432,000sec
    const wBNBPerSecond = "1000000000000"; //0.000001 wBNB per sec-  0.432 wBNB will be spent for pool
    // The treasury Address for getting deposit Fee
    const feeCollector = "0xe8f082A0831ECb553023f9de03f7e8fBd8EFc15E";

    const Farm = await Farm3Contract.deploy(
        wBNBAddress,startTime,runningTime,wBNBPerSecond,feeCollector);
  
    console.log("Farm address: ", Farm.address);

    await hre.run("verify:verify", {
      address: Farm.address,
      constructorArguments: 
      [wBNBAddress,startTime,runningTime,wBNBPerSecond,feeCollector],
    });

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });