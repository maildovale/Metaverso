import abi from "./abi/abi.json" assert {type: "json"};

// Smart Contract Address: 0x8C83b5fd3F7065eE9e7F6793ac21eC5D2A500472

const blockchain = new Promise((res, rej) => {

    //If Metamask is not available
    if(typeof window.ethereum == "undefined") {
        rej("¡Debes instalar Metamask primero!")
    }

    //Web3 Instance
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x8C83b5fd3F7065eE9e7F6793ac21eC5D2A500472");

    //Get my Metamask Address
    web3.eth.requestAccounts().then((accounts) => {
        console.log("Mi cuenta es: ", accounts[0])
    });

    //Get the current supply of NFT Tokens
    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) => {
            console.log("Tu cantidad actual de Tokens NFT es: ", supply);
        });
        
    });

    //Get the Maximum supply of NFT Tokens
    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.maxSupply().call({from: accounts[0]}).then((maxsupply) => {
            console.log("> Tu cantidad maxima de Tokens NFT es: ", maxsupply);
        });
        
    });

    //Get your buildings made in the Metaverse
    web3.eth.requestAccounts().then((accounts) => {
        contract.methods.getOwnerBuildings().call({from: accounts[0]}).then((buildings) => {
            console.log("-> Tus Buildings: ", buildings);
        });
        
    });

      //Get all the Buildings made in the Metaverse
      web3.eth.requestAccounts().then((accounts) =>{
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) => {
            contract.methods.getBuildings().call({from: accounts[0]}).then((data) => {
                res({supply: supply, building: data});
            });
        });    
      });
});

export default blockchain;