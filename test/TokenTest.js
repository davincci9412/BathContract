const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Bath Token test", function () {
    async function deployTokenFixture() {
        const Token = await ethers.getContractFactory("BathToken");
        const [owner, addr1, addr2] = await ethers.getSigners();

        const hardhatToken = await Token.deploy();

        await hardhatToken.deployed();

        // Fixtures can return anything you consider useful for your tests
        return { Token, hardhatToken, owner, addr1, addr2 };
    }
    it("Should assign the total supply of tokens to the owner", async function () {
        const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        console.log(ownerBalance);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });

});