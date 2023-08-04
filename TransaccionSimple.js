const crypto = require('crypto');
const HashStrategy = require('./HashStrategy');
const Transaccion = require('./Transaccion');

class TransaccionSimple extends Transaccion {
    constructor(id, txAnt, direccion,hashStrategy) {
        super();
        this._id = id;
        this._IN = this.devolverIdAnt(txAnt);
        this._out = direccion;
        this._hash = "";
        this.agregarHash(hashStrategy);
        this._hashStrategy = hashStrategy;
        this._tipoTransaccion = "trs";
    }

    agregarHash(hashStrategy) {
        const data = JSON.stringify({
            id: this._id,
            IN: this._IN,
            out: this._out
        });

        this._hash = hashStrategy.calculateHash(data);
    }
   /* validate() {
      const data = JSON.stringify({
          id: this._id,
          IN: this._IN,
          out: this._out
      });

      let hash = this.hashStrategy.calculateHash(data);
      return hash;
  }
    */
      devolverIdAnt(txAnt) {
        return txAnt._id;
      }
      devolverId() {
        return this._id;
      }
      devolverIn() {
        return this._IN;
      }
      devolverOut() {
        return this._out;
      }
      devolverHash() {
        return this._hash;
      }
     /* devolverTipoTransaccion(){
        return this._tipoTransaccion;
      }*/
     
      validate() {
        const data = JSON.stringify({
            id: this.devolverId(),
            IN: this.devolverIn(),
            out: this.devolverOut()
        });
        if(this.devolverHash() == this._hashStrategy.calculateHash(data))
        return true;
    }
}

module.exports = TransaccionSimple;

