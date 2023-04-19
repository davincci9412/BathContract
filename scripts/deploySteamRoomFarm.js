const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const SteamRoomContract = await ethers.getContractFactory("SteamRoom");
    
    const TubAddress = "0x1c34eAEfAF14b3700FB6a20cB634eB63aAf6636a";
    const startTime = 1681696800;  //Monday, April 17, 2023 11:00:00 GMT+09:00
    const runningTime = 3600*24*6;  //48 hours - 518,400sec
    const TubPerSecond = "100000000000000000"; //0.1 Tub per sec-  51,840 TUB will be spent for pool
    // The treasury Address for getting deposit Fee
    const feeCollector = "0xe8f082A0831ECb553023f9de03f7e8fBd8EFc15E";

    const Farm = await SteamRoomContract.deploy(
        TubAddress,startTime,runningTime,TubPerSecond,feeCollector);
  
    console.log("Farm address: ", Farm.address);

    await hre.run("verify:verify", {
      address: Farm.address,
      constructorArguments: 
      [TubAddress,startTime,runningTime,TubPerSecond,feeCollector],
    });

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });