const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

const wait = (seconds) => {
    const milliseconds = seconds * 1000
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function main() {
    
    //Fetch accounts from wallet - these are unlocked.
    const accounts = await ethers.getSigners()

    //Fetch deployed tokens.
    const DAPP = await ethers.getContractAt('Token', '0x5FbDB2315678afecb367f032d93F642f64180aa3')
    console.log(`Token fetched: ${DAPP.address}`)

    const eETH = await ethers.getContractAt('Token', '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512')
    console.log(`Token fetched: ${eETH.address}`)

    const eDAI = await ethers.getContractAt('Token', '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0')
    console.log(`Token fetched: ${eDAI.address}`)

    //Fetch the deployed exchange.
    const exchange = await ethers.getContractAt('Exchange', '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9')
    console.log(`Exchange fetched: ${exchange.address}`)

    //Give tokens to account[1].
    const sender = accounts[0];
    const receiver = accounts[1]
    let amount = tokens(10000)

    //User1 transfers 10,000 eETH.
    let transaction, result
    transaction = await eETH.connect(sender).transfer(receiver.address, amount)
    console.log(`Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)

    //Set up exchange users.
    const user1 = accounts[0]
    const user2 = accounts[1]
    amount = tokens(10000)

    //user1 approves 10,000 DAPP.
    transaction = await DAPP.connect(user1).approve(exchange.address, amount)
    await transaction.wait()
    console.log(`Approved ${amount} tokens from ${user1.address}`)

    //user1 deposits 10,000 DAPP.

    //*Error popping up here:  TypeError: exchange.connect(...).depositToken is not a function
    transaction = await exchange.connect(user1).depositToken(DAPP.address, amount)
    await transaction.wait()
    console.log(`Deposited ${amount} Ether from ${user1.address}\n`)

    //user2 Approves eETH.
    transaction = await eETH.connect(user2).approve(exchange.address, amount)
    await transaction.wait()
    console.log(`Approved ${amount} tokens from ${user2.address}`)

    //user2 deposits eETH.
    transaction = await exchange.connect(user2).depositToken(eETH.address, amount)
    await transaction.wait()
    console.log(`Deposited ${amount} Ether from ${user2.address}\n`)



    //Seed a canceled order.

    //user1 makes an order to get tokens.
    let orderFilled 
    transaction = await exchange.connect(user1).makeOrder(eETH.address, tokens(100), DAPP.address, tokens(5))
    result = await transaction.wait()
    console.log(`Made order from ${user1.address}`)

    //user1 cancels order.
    orderId = result.events[0].args.id
    transaction = await exchange.connect(user1).cancelOrder(orderId)
    result = await transaction.wait()
    console.log(`Canceled order from ${user1.address}\n`)

    //Wait 1 second.
    await wait(1)



    //Seed filled orders.

    //user1 makes order.
    transaction = await exchange.connect(user1).makeOrder(eETH.address, tokens(100), DAPP.address, tokens(10))
    result = await transaction.wait()
    console.log(`Made order from ${user1.address}`)

    //user2 fills order.
    orderId = result.events[0].args.id
    transaction = await exchange.connect(user2).fillOrder(orderId)
    result = await transaction.wait()
    console.log(`Filled order from ${user1.address}\n`)

    //Wait 1 second.
    await wait(1)

    //user1 makes another order.
    transaction = await exchange.connect(user1).makeOrder(eETH.address, tokens(50), DAPP.address, tokens(15))
    result = await transaction.wait()
    console.log(`Made order from ${user1.address}`)

    //user2 fills another order.
    orderId = result.events[0].args.id
    transaction = await exchange.connect(user2).fillOrder(orderId)
    result = await transaction.wait()
    console.log(`Filled order from ${user1.address}\n`)

    //Wait 1 second.
    await wait(1)

    //user1 makes final order.
    transaction = await exchange.connect(user1).makeOrder(eETH.address, tokens(200), DAPP.address, tokens(20))
    result = await transaction.wait()
    console.log(`Made order from ${user1.address}`)

    //user2 fills final order.
    orderId = result.events[0].args.id
    transaction = await exchange.connect(user2).fillOrder(orderId)
    result = await transaction.wait()
    console.log(`Filled order from ${user1.address}\n`)

    //Wait 1 second.
    await wait(1)



    //Seed open orders.

    //user1 makes 10 orders.
    for(let i =1; i <= 10; i++) {
        transaction = await exchange.connect(user1).makeOrder(eETH.address, tokens(10 * i), DAPP.address, tokens(10))
        result = await transaction.wait()

        console.log(`Made order from ${user1.address}`)

        //Wait 1 second.
        await wait(1)
    }

    //user2 makes 10 orders.
    for(let i =1; i <= 10; i++) {
        transaction = await exchange.connect(user2).makeOrder(DAPP.address, tokens(10), eETH.address, tokens(10 * i))
        result = await transaction.wait()
    
        console.log(`Made order from ${user2.address}`)
    
        //Wait 1 second.
        await wait(1)
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
});