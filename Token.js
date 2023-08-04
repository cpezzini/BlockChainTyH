class Token {
    constructor(valor) {
        this._valor = valor;
    }
    obtenerToken() {
        return `TKN-${this._valor}`;
    }
}
module.exports = Token;


