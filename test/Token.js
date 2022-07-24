const {expect} = require('chai');
const { ethers } = require('hardhat');

describe('Token', () => {
    //Test code goes here..
    it('Has a name', async () => {
        //Fetch Token from blockchain.
        const Token = await ethers.getContractFactory('Token')
        let token = await Token.deploy()
        //Reado Token name.
        const name = await token.name()
        //Check that name is correct.
        expect(name).to.equal('My Token')
    })
})