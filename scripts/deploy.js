const fs = require("fs");
const hre = require("hardhat");
async function main() {
  const idx = await hre.ethers.getContractFactory("Idex");
  // We get the contract factory to deploy
  const IdexFactory = await idx.deploy();
  // Deploy contract
  await IdexFactory.deployed();
  console.log("idex deploy to:", IdexFactory.address);

  const idxtoken = await hre.ethers.getContractFactory("IdexToken");
  // We get the contract factory to deploy
  const IdextokenFactory = await idxtoken.deploy(IdexFactory.address);
  // Deploy contract
  await IdextokenFactory.deployed();
  console.log("IdextokenFactory deploy to:", IdextokenFactory.address);

  // Save contract address file in project
  const contractsDir = __dirname + "/../src/contractsData";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/IdexFactory-address.json`,
    JSON.stringify({ address: IdexFactory.address }, undefined, 2)
  );
  fs.writeFileSync(
    contractsDir + `/IdextokenFactory-address.json`,
    JSON.stringify({ address: IdextokenFactory.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync("IdexToken");
  const contractArtifact2 = artifacts.readArtifactSync("Idex");

  fs.writeFileSync(
    contractsDir + `/IdextokenFactory.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
  fs.writeFileSync(
    contractsDir + `/IdexFactory.json`,
    JSON.stringify(contractArtifact2, null, 2)
  );
  console.log("Idex deployed to:", IdexFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
