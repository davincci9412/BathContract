const { expect } = require("chai");

describe("GenesisFarm", function() {
    let genesisFarm;
    let rewardToken;
    let lpToken;

    const owner = ethers.provider.getSigner(0);
    const user = ethers.provider.getSigner(1);
    const stakeAmount = ethers.utils.parseEther("100");

    const startTime = 1682047800;  //Friday, April 21, 2023 12:30:00 GMT+09:00
    const runningTime = 3600*24*365*10;  //1 years - 315,360,00sec
    const BathPerSecond = "1"; 
    const feeCollector = "0xe8f082A0831ECb553023f9de03f7e8fBd8EFc15E";

    beforeEach(async function() {
        const rToken = await ethers.getContractFactory("BathToken");
        rewardToken = await rToken.deploy(
            0,"0xe8f082A0831ECb553023f9de03f7e8fBd8EFc15E");
        await rewardToken.deployed();
 
        const lToken = await ethers.getContractFactory("lpToken");
        lpToken = await lToken.deploy();
        await lpToken.deployed();

/*
        const GenesisFarm = await ethers.getContractFactory("GenesisFarm");
        genesisFarm = await GenesisFarm.connect(owner).deploy(
            rewardToken.address,
            startTime,
            runningTime,
            BathPerSecond,
            feeCollector
        );
        await genesisFarm.deployed();
*/
        //transfer 100 lp token to user for staking
        await lpToken.transfer(user.address, 100);
        
    });
    // Test the initial state of the Pool contract
    
    describe("Checking initial state of Pool", function() {
/*
        it("Should check reward address is correct", async function() {
            expect(await genesisFarm.bath()).to.equal(rewardToken.address);
        });
        it("Should check pool start time is correct", async function() {
            expect(await genesisFarm.poolStartTime()).to.equal(startTime);
        });
        it("should allow owner to update emission rate", async function() {
            await genesisFarm.connect(owner).updateEmissionRate(2);
        });
        */
        it("Check user is ready to deposit", async function(){
            expect(await lpToken.balanceOf(user.address)).to.equal(100);
        });
    });

    describe("Checking Pool functions", function(){

        it("should allow owner to add a new pool", async function() {
            const poolAddress = ethers.utils.getAddress("0x1234567890123456789012345678901234567890");
            const allocPoint = 1;
            const depositFee = 5;
            const withdrawFee = 0;
            const lastRewardTime = 0;
            /*
            await genesisFarm.connect(owner).add(
                allocPoint,
                lpToken.address, 
                depositFee,
                withdrawFee, 
                true, 
                lastRewardTime);
    */
        //    const poolInfo = await genesisFarm.poolInfo(0);
    
        //    expect(poolInfo.token).to.equal(lpTokenAddress);
            //expect(poolInfo.rewardPerBlock).to.equal(ethers.utils.parseEther("1"));
        });
    });

    describe("Checking user functions", function(){
        it("should allow user to deposit lp token", async function() {

        });
        it("should allow user to withdraw reward", async function() {

        });
/*
    it("should allow users to deposit tokens and earn rewards", async function() {
        const poolAddress = ethers.utils.getAddress("0x1234567890123456789012345678901234567890");
        const rewardPerBlock = ethers.utils.parseEther("1");

        await genesisFarm.connect(owner).addPool(poolAddress, rewardPerBlock, 0);

        await token.connect(user).approve(genesisFarm.address, stakeAmount);
        await genesisFarm.connect(user).deposit(poolAddress, stakeAmount);

        const userStakedBalance = await genesisFarm.stakedBalanceOf(user.address, poolAddress);
        expect(userStakedBalance).to.equal(stakeAmount);

        // wait for 1 block to be mined
        await ethers.provider.send("evm_mine");

        const userEarnedRewards = await genesisFarm.earned(user.address, poolAddress);
        expect(userEarnedRewards).to.equal(rewardPerBlock);

        await genesisFarm.connect(user).withdraw(poolAddress, stakeAmount);

        const userFinalStakedBalance = await genesisFarm.stakedBalanceOf(user.address, poolAddress);
        expect(userFinalStakedBalance).to.equal(0);

        const userFinalBalance = await token.balanceOf(user.address);
        expect(userFinalBalance).to.equal(stakeAmount);
    });
    */
    });
    

});
