const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const GenesisContract = await ethers.getContractFactory("GenesisFarm");
    
    /*
        address _bath,
        uint256 _startTime,
        uint256 _bathPerBlock,
        address _treasuryAddress,
        address _rewardHolder
    */
    const BathAddress = "0x67A7812B1FF6d1040F94ddb79F983BD9E5BEA535";
    const startTime = 1681016400;  //Friday, April 9, 2023 14:00:00 GMT+09:00
    const BathPerBlock = 100000000; //1 bath per block
    // The treasury Address for getting deposit Fee
    const treasuryAddress = "0xe8f082A0831ECb553023f9de03f7e8fBd8EFc15E";

    // The address who holds BATH for reward
    const rewardHolder = "0xe8f082A0831ECb553023f9de03f7e8fBd8EFc15E";

    const Farm = await GenesisContract.deploy(
      BathAddress,startTime,BathPerBlock,treasuryAddress,rewardHolder);
  
    console.log("Farm address: ", Farm.address);

    await hre.run("verify:verify", {
      address: Farm.address,
      constructorArguments: 
      [BathAddress, startTime, BathPerBlock, treasuryAddress, rewardHolder],
    });

  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });