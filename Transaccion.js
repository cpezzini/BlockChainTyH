class Transaccion {
    devolverTipoTransaccion(){
        return this._tipoTransaccion;
    }
    validate(){
        //throw new Error("Método debe ser implementado");
    }
}
module.exports = Transaccion;

