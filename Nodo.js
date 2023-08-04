const Bloque = require('./Bloque');
const crypto = require('crypto');
const HashStrategy = require('./HashStrategy');
const MD5HashStrategy = require('./MD5HashStrategy');
const SHA256HashStrategy = require('./SHA256HashStrategy');

class Nodo {
    constructor(nodos, tipoHash, blockchain) {
        this._blck = blockchain;
        this._nodos = nodos;
        this._hashStrategy = tipoHash === "SHA256" ? new SHA256HashStrategy() : new MD5HashStrategy();
        this._bloqueAbierto = new Bloque(this._hashStrategy);
        this._hashBloquePrev = "";
        this._bloqueCerrado= "";
    }
    agregarCoinbase(coinbase){
        this._bloqueAbierto.addCoinbase(coinbase);
    }
    agregarTransaccion(transaccion){
        this._bloqueAbierto.addTransaccion(transaccion);
        this.bloqueLleno();
    }
    agregarBloque(){
        this._bloqueAbierto = new Bloque(this._hashStrategy);
    }
    validarHash(bloqueCerrado) {
        const data = JSON.stringify({
          timestamp: bloqueCerrado.devolverTimestamp(),
          hashBloquePrev: this._hashBloquePrev, 
          transaccionesHashes: bloqueCerrado._transacciones.map(transaccion => transaccion.devolverHash()) 
        });
        const calculatedHash = this._hashStrategy.calculateHash(data);
        return bloqueCerrado._hash === calculatedHash;
      }
    agregarBlockchain(bloqueCerrado,hashBloquePrev){
        this.validarHash(bloqueCerrado);
        this._blck.push(bloqueCerrado);
        this._hashBloquePrev = hashBloquePrev;
    }
    broadcast(bc,hbp) {
        this._nodos.forEach((nodo) => { 
            nodo.agregarBlockchain(this._bloqueCerrado, this._hashBloquePrev);
        //this._nodos.map(function(_nodos,bc,hbp){ 
          // if(nodo.validarHash(bc)){
           // _nodos._blck.push(bc);
           // _nodos._hashBloquePrev =  hbp;
           //}
           
        });
    }
    bloqueLleno(){
        if (this._bloqueAbierto.cantTransacciones() === 10) {
            this._hashBloquePrev = this._bloqueAbierto.cierreBlock(this._hashBloquePrev);
            this._bloqueCerrado = this._bloqueAbierto;
            this.broadcast(this._bloqueCerrado, this._hashBloquePrev);
            this.agregarBlockchain(this._bloqueCerrado, this._hashBloquePrev);
            this.agregarBloque();
          }
    }
    devolverBloque(){
        return this._bloqueAbierto;
    }
    devolverBloqueCerrado(){
        return this._bloqueCerrado;
    }
    agregarNodo(nodo){
        this._nodos.push(nodo);
    }
   
}

module.exports = Nodo;



