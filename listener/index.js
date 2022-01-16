var ethers = require('ethers');
var dotenv = require('dotenv');
var axios = require('axios');
dotenv.config();
var fs = require("fs");
const { loadavg } = require('os');
const APIURL = 'https://api.studio.thegraph.com/query/19206/timeout/v0.0.2'; // TODO : update to prod endpoint
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const TIMEOUT_CONTRACT_ADDRESS = process.env.TIMEOUT_CONTRACT_ADDRESS || "0xc6618ff525Dc8a054957a8650a54f107B82996F9"; //todo: update to mainnet address
const TIMEOUT_CONTRACT_ABI = require('../artifacts/contracts/Timeout.sol/Timeout.json').abi;
const provider = new ethers.providers.JsonRpcProvider(`https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`); //todo : update to mainnet
const wallet = new ethers.Wallet(process.env.VALIDATOR_PRIVATE_KEY, provider);
wallet.connect(provider);
const TimeoutContract = new ethers.Contract(TIMEOUT_CONTRACT_ADDRESS, TIMEOUT_CONTRACT_ABI, provider);
const TimeoutContractWithSigner = TimeoutContract.connect(wallet);




provider.on("block", async (blockNumber) => {
    const response = await axios.post(APIURL, {query : `
    {
        functionEntities(where: {
          blockStart_lte: ${blockNumber}
          blockEnd_gte: ${blockNumber}
          executed: false
        }) {
          id
          functionId
          blockStart
          blockEnd
          value
          executed
        }
      }      
    `});
    const entities = response.data.data.functionEntities;
    for(let i in entities) {
        const entity = entities[i];
        console.log(entity.executed, entity.functionId);
        if(!entity.executed) {
            try{
                const gas = await TimeoutContract.estimateGas.call(entity.functionId);
                const gasPrice = await provider.getGasPrice();
                const gasFees = gas * gasPrice; 
                if(entity.value > gasFees){
                    console.log("calling...");
                    const tx = await TimeoutContractWithSigner.call(entity.functionId);
                    console.log(tx);
                }
                else{
                    console.log("Too cheap, not calling");
                }
            }
            catch(e){
            }
        }
    }
})



