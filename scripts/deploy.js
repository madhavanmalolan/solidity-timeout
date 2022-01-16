const hre = require("hardhat");

async function main() {
  const Timeout = await hre.ethers.getContractFactory("Timeout");
  const timeout = await Timeout.deploy();
  await timeout.deployed();
  console.log("Deployed", timeout.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
