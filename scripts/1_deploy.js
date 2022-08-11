async function main() {
  console.log(`Preparing deployment...\n`)

  //fetch contract to deploy
  const Token = await ethers.getContractFactory('Token')
  const Exchange = await ethers.getContractFactory('Exchange')
  
  //fetch accounts
  const accounts = await ethers.getSigners()

  console.log(`Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`)

  

  //deploy contract
  const DAPP = await Token.deploy('Dapp Coin', 'DAPP', '1000000')
  await DAPP.deployed() 
  console.log(`DAPP deployed to: ${DAPP.address}`)

  const eETH = await Token.deploy('eETH', 'eETH', '1000000')
  await eETH.deployed() 
  console.log(`eETH deployed to: ${eETH.address}`)

  const eDAI = await Token.deploy('eDAI', 'eDAI', '1000000')
  await eDAI.deployed() 
  console.log(`eDAI deployed to: ${eDAI.address}`)

  
  const exchange = await Exchange.deploy(accounts[1].address, 10)
  await exchange.deployed()
  console.log(`Exchange deployed to: ${exchange.address}`)

}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
