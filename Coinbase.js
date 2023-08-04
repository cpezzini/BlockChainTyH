const { v1: uuidv1 } = require('uuid');
const Token = require('./Token');
const crypto = require('crypto');
const HashStrategy = require('./HashStrategy');
const SHA256HashStrategy = require('./SHA256HashStrategy');
const MD5HashStrategy = require('./MD5HashStrategy');

class Coinbase {
    constructor(id, direccion, hashStrategy) {
        this._id = id;
        this._out = direccion;
        this._hash = "";
        const tokenID = uuidv1();
        const token = new Token(tokenID);
        this.incorporarToken(token.obtenerToken());
        this._hashStrategy = hashStrategy; // Asignar el parámetro hashStrategy a la propiedad _hashStrategy
        this.agregarHash();
    }
    incorporarToken(token) {
        this._tkn = token;
    }

    agregarHash() {
        const data = JSON.stringify({
            id: this._id,
            tkn: this._tkn,
            out: this._out
        });

        this._hash = this._hashStrategy.calculateHash(data); // Utilizamos el hashStrategy recibido en el constructor
    }
    devolverTkn() {
        return this._tkn;
    }
    devolverId() {
        return this._id;
    }
    devolverOut() {
        return this._out;
    }
    devolverHash() {
        return this._hash;
    }
    validate(){
        const data = JSON.stringify({
            id: this.devolverId(),
            tkn: this.devolverTkn(),
            out: this.devolverOut()
        });
        if(this.devolverHash() == this._hashStrategy.calculateHash(data)) 
            return true;
    }
}

module.exports = Coinbase;
