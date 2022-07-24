const {expect} = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Token', () => {
    let token

    beforeEach(async () => {
        const Token = await ethers.getContractFactory('Token')
        token = await Token.deploy('Dapp Coin', 'DAPP', 1000000)
    })

    describe('Deployment', () => {
        const name = 'Dapp Coin'
        const symbol = 'DAPP'
        const decimal = '18'
        const totalSupply = tokens("1000000")


        it('Has correct name', async () => {
            expect(await token.name()).to.equal(name)
        })
    
        it('Has correct symbol', async () => {
            expect(await token.symbol()).to.equal(symbol)
        })
    
        it('Has correct decimal', async () => {
            expect(await token.decimal()).to.equal(decimal)
        })
    
        it('Has correct total supply', async () => {
            expect(await token.totalSupply()).to.equal(totalSupply)
        })
    })
    

})