const { v1: uuidv1 } = require('uuid');
const crypto = require('crypto');
const HashStrategy = require('./HashStrategy');
const Coinbase  = require('./Coinbase');

class Bloque {
    constructor(hashStrategy) {
        this._transacciones = [];
        this._timestamp = 0;
        this._hash = "";
        this.hashBloquePrev = "";
        this._hashStrategy = hashStrategy;
    }

    cierreBlock(hashBloqueActual) {
        this.hashBloquePrev = hashBloqueActual;
        this._timestamp = Math.floor(Date.now() / 1000);
        const transaccionesHashes = this._transacciones.map(transaccion => transaccion.devolverHash());
        const data = JSON.stringify({
            timestamp: this._timestamp,
            hashBloquePrev: this.hashBloquePrev,
            transaccionesHashes: transaccionesHashes
        });
    
        this._hash = this._hashStrategy.calculateHash(data); // Utiliza el hashStrategy recibido en el constructor
        
        return this._hash;
    }

     
    addCoinbase(coinbase) {
        if (this._transacciones.length === 0) {
            if(coinbase.validate()){
                this._transacciones.push(coinbase);
            }
           else{
                throw new Error('Hash de coinbase erroneo');
            }
                
        } else {
            throw new Error('Ya cuenta con una coinbase');
        }
    }
    addTransaccion(transaccion) {
        if (this._transacciones.length === 0) throw new Error('Primero debe agregar una coinbase');
            if(transaccion.validate()){
                this._transacciones.push(transaccion);
            }
           else{
                throw new Error('El hash de la transaccion es erroneo');
            }
    }
    cantTransacciones(){
        return this._transacciones.length;
    }
    devolverTimestamp(){
        return this._timestamp;
    }
}
module.exports = Bloque;




