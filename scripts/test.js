const hre = require("hardhat");


async function main() {
  const Timeout = await hre.ethers.getContractFactory("Timeout");
  const timeout = await Timeout.deploy();
  await timeout.deployed();

  const Tester = await hre.ethers.getContractFactory("Tester");
  const tester = await Tester.deploy();
  await tester.deployed();

  console.log(tester.address);
  console.log(timeout.address);
  await tester.register(timeout.address, { value: 1 } );
  const id = await timeout.currentId();
  console.log(id);
  await timeout.call(id);
  console.log("done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
