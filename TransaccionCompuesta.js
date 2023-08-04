const crypto = require('crypto');
const HashStrategy = require('./HashStrategy');
const Transaccion = require('./Transaccion');

    class TransaccionCompuesta extends Transaccion{
      constructor(hashStrategy, nivel) {
        super();
        this._transaccionCompuesta = [];
        this._tipoTransaccion = "trc";
        this._hashStrategy = hashStrategy;
       
      }
      consultarNivel(trs,nivel){
        if(nivel > 2 && trs.devolverTipoTransaccion() == 'trc'){
          throw new Error('No es posible agregar una transacción compuesta en este nivel');
        }
      }
      agregarTransaccionHija(trs,nivel) {
        this.consultarNivel(trs,nivel);
        if (this.cantidadTransacciones() === 3) {
          throw new Error('Transacción compuesta completa');
        }
        if(trs.validate()){
          this._transaccionCompuesta.push(trs);
        }
        else{
          throw new Error('El hash de la transaccion es erroneo');
        }
      }
      cantidadTransacciones() {
        return this._transaccionCompuesta.length;
      }
      validate(){
        this._transaccionCompuesta.forEach((transaccion) => { 
          transaccion.validate();
          
        });
        return true;
      }
    }
      module.exports = TransaccionCompuesta;
  
