const SHA256 = require('crypto/sha256');

class CryptoBlock {
    constructor(index, timestamp, data, precedingHash=" "){
        //permet de suivre la position des block
        this.index = index;
        //sauvegarde en heure
        this.timestamp = timestamp;
        //infos sur les actions effectué
        this.data = data;
        //maintien la structure blockchain
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
    }
    //permet de calculer le hach du bloc
    computeHash(){
        // la methode to.String pour convertir SHA256 en chaine de caract
        return SHA256 (this.index +
             this.precedingHash +
              this.timestamp +
               JSON.stringify(this.data)
               ).toString();
    }
}

class CryptoBlockchain {
    constructor(){
        //tableau de blocks
        this.blockchain = [this.startGenesisBlock()];
    }
    //methode startgenesis block qui crée le block initial dans la chaine
    // vu qu il est seul , il n'a pas de bloc précédent vers lequel pointer. Par conséquent, un bloc de genèse est généralement codé en dur dans la blockchain
    // la creation du block s aide de l index , timestamp , ddata etc ... de la class cryptblock
    startGenesisBlock(){
        return new CryptoBlock(0, "06/08/2021" , "Block initial de la chaine", "0");
    }
    // il aide à garantir que le hachage du bloc actuel pointe vers le hachage du bloc précédent , pour conserver la chaine
    obtainLatestBlock(){
        return this.blockchain[this.blockchain.length - 1];
    }
    // ajout d'un block a la chaine , defini le precedent hachage egal au nouveau pour maintenir la secu
    addNewBlock(newBlock){
        newBlock.precedingHash = this.obtainLatestBlock().hash;
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
    }
}