const Nodo = require('./Nodo');
const Bloque = require('./Bloque');
const Coinbase = require('./Coinbase');
const crypto = require('crypto');
const HashStrategy = require('./HashStrategy');
const MD5HashStrategy = require('./MD5HashStrategy');
const SHA256HashStrategy = require('./SHA256HashStrategy');
const Token = require('./Token');
const TransaccionCompuesta = require('./TransaccionCompuesta');
const TransaccionSimple = require('./TransaccionSimple');
const { error } = require('console');

const tipoHash = "SHA256"; // o "MD5"
let blockchain = [];
let nodos = [];
describe('Pruebas Blockchain', () => {
  let hashStrategy;
  beforeEach(() => {
    // Inicializar el hashStrategy según el tipoHash
    
    hashStrategy = tipoHash === "SHA256" ? new SHA256HashStrategy() : new MD5HashStrategy();
  });

  
  describe('Nodo', () => {

    test('Nodo - Cierre de bloque', () => {
      const tipoHash = "MD5";
      hashStrategy = tipoHash === "MD5" ?  new MD5HashStrategy() : new SHA256HashStrategy();
      let blockchain = [];
      let nodos = [];
      let nodo1 = new Nodo(nodos, tipoHash, blockchain);
      nodos.forEach((nodo) => { 
        nodo.agregarNodo(nodo1);
      });
      nodos.push(nodo1);
      let nodo2 = new Nodo(nodos, tipoHash, blockchain);
      nodos.forEach((nodo) => { 
        nodo.agregarNodo(nodo2);
      });
      nodos.push(nodo2);
      const coinbase = new Coinbase('id1', 'direccion1', hashStrategy);
      nodo1.agregarCoinbase(coinbase);
      const transaccion1 = new TransaccionSimple('id2', coinbase, 'direccion2', hashStrategy);
      nodo1.agregarTransaccion(transaccion1);
      const transaccion2 = new TransaccionSimple('id3', transaccion1, 'direccion3', hashStrategy);
      nodo1.agregarTransaccion(transaccion2);
      const transaccion3 = new TransaccionSimple('id4', transaccion2, 'direccion4', hashStrategy);
      nodo1.agregarTransaccion(transaccion3);
      const transaccion4 = new TransaccionSimple('id5', transaccion3, 'direccion5', hashStrategy);
      nodo1.agregarTransaccion(transaccion4);
      const transaccion5 = new TransaccionSimple('id6', transaccion4, 'direccion6', hashStrategy);
      nodo1.agregarTransaccion(transaccion5);
      const transaccion6 = new TransaccionSimple('id7', transaccion5, 'direccion7', hashStrategy);
      nodo1.agregarTransaccion(transaccion6);
      const transaccion7 = new TransaccionSimple('id8', transaccion6, 'direccion8', hashStrategy);
      nodo1.agregarTransaccion(transaccion7);
      const transaccion8 = new TransaccionSimple('id9', transaccion7, 'direccion9', hashStrategy);
      nodo1.agregarTransaccion(transaccion8);
      const transaccion9 = new TransaccionSimple('id10', transaccion8, 'direccion10', hashStrategy);
      nodo1.agregarTransaccion(transaccion9);
      blockchain.push(nodo1.devolverBloqueCerrado());
     });
    
    test('Nodo - Agregar más de 10 transacciones (forzar error)', () => {
      const tipoHash = "MD5";
      hashStrategy = tipoHash === "MD5" ?  new MD5HashStrategy() : new SHA256HashStrategy();
      let blockchain = [];
      let nodos = [];
      let nodo1 = new Nodo(nodos, tipoHash, blockchain);
      nodos.forEach((nodo) => { 
        nodo.agregarNodo(nodo1);
      });
      nodos.push(nodo1);
      let nodo2 = new Nodo(nodos, tipoHash, blockchain);
      nodos.forEach((nodo) => { 
        nodo.agregarNodo(nodo2);
      });
      nodos.push(nodo2);
      const coinbase = new Coinbase('id1', 'direccion1', hashStrategy);
      nodo1.agregarCoinbase(coinbase);
      const transaccion1 = new TransaccionSimple('id2', coinbase, 'direccion2', hashStrategy);
      nodo1.agregarTransaccion(transaccion1);
      const transaccion2 = new TransaccionSimple('id3', transaccion1, 'direccion3', hashStrategy);
      nodo1.agregarTransaccion(transaccion2);
      const transaccion3 = new TransaccionSimple('id4', transaccion2, 'direccion4', hashStrategy);
      nodo1.agregarTransaccion(transaccion3);
      const transaccion4 = new TransaccionSimple('id5', transaccion3, 'direccion5', hashStrategy);
      nodo1.agregarTransaccion(transaccion4);
      const transaccion5 = new TransaccionSimple('id6', transaccion4, 'direccion6', hashStrategy);
      nodo1.agregarTransaccion(transaccion5);
      const transaccion6 = new TransaccionSimple('id7', transaccion5, 'direccion7', hashStrategy);
      nodo1.agregarTransaccion(transaccion6);
      const transaccion7 = new TransaccionSimple('id8', transaccion6, 'direccion8', hashStrategy);
      nodo1.agregarTransaccion(transaccion7);
      const transaccion8 = new TransaccionSimple('id9', transaccion7, 'direccion9', hashStrategy);
      nodo1.agregarTransaccion(transaccion8);
      const transaccion9 = new TransaccionSimple('id10', transaccion8, 'direccion10', hashStrategy);
      nodo1.agregarTransaccion(transaccion9);
      const transaccion10 = new TransaccionSimple('id11', transaccion9, 'direccion11', hashStrategy);
      
      expect(() => nodo1.agregarTransaccion(transaccion10)).toThrow(Error);
    });
    test('Nodo - Agregar Transaccion Compuesta al bloque abierto', () => {
      var hashStrategy = tipoHash === "SHA256" ? new SHA256HashStrategy() : new MD5HashStrategy();
      let blockchain = [];
      let nodos = [];
      let nodo1 = new Nodo(nodos, tipoHash, blockchain);
      nodos.forEach((nodo) => { 
        nodo.agregarNodo(nodo1);
      });
      nodos.push(nodo1);
     var coinbase3 = new Coinbase('id3', 'direccion3', hashStrategy);
      nodo1.agregarCoinbase(coinbase3);
      const trs1 = new TransaccionSimple('id4', coinbase3, 'direccion4', hashStrategy);
      nodo1.agregarTransaccion(trs1);
      var trc1 = new TransaccionCompuesta(hashStrategy);
      const trs2 = new TransaccionSimple('id5', trs1, 'direccion5', hashStrategy);
      trc1.agregarTransaccionHija(trs2,'2');
      const trs3 = new TransaccionSimple('id6', trs2, 'direccion6', hashStrategy);
      trc1.agregarTransaccionHija(trs3,'2');
      const trs4 = new TransaccionSimple('id7', trs3, 'direccion7', hashStrategy);
      trc1.agregarTransaccionHija(trs4,'2');
      console.log (trc1.cantidadTransacciones());
      nodo1.agregarTransaccion(trc1);
   });

  });

  describe('Bloque', () => {
    test('Bloque - Agregar Coinbase', () => {
      let blockchain = [];
      let nodos = [];
      let nodo1 = new Nodo(nodos, tipoHash, blockchain);
      nodos.forEach((nodo) => { 
        nodo.agregarNodo(nodo1);
      });
      nodos.push(nodo1);
      const coinbase = new Coinbase('id1', 'direccion1', hashStrategy);
      nodo1.agregarCoinbase(coinbase);
      expect(nodo1.devolverBloque().cantTransacciones()).toBe(1);
    });
    test('Bloque - Agregar 2 Coinbase (forzar error)', () => {
      let blockchain = [];
      let nodos = [];
      let nodo1 = new Nodo(nodos, tipoHash, blockchain);
      nodos.forEach((nodo) => { 
        nodo.agregarNodo(nodo1);
      });
      nodos.push(nodo1);
      const coinbase = new Coinbase('id1', 'direccion1', hashStrategy);
      nodo1.agregarCoinbase(coinbase);
      const coinbase2 = new Coinbase('id2', 'direccion2', hashStrategy);
      
      expect(() => nodo1.agregarCoinbase(coinbase2)).toThrow(Error);
    });
    test('Bloque - Agregar Coinbase con hash erroneo (forzar error)', () => {
      const xhashStrategy = tipoHash === "SHA256" ? new SHA256HashStrategy() : new MD5HashStrategy();
      const blockchain = [];
      const nodos = [];
      const nodo1 = new Nodo(nodos, tipoHash, blockchain);
      nodos.forEach((nodo) => { 
        nodo.agregarNodo(nodo1);
      });
      nodos.push(nodo1);
      
      // Crea una instancia de Coinbase con datos válidos
      const coinbase = new Coinbase('id1', 'direccion1', xhashStrategy);
      
      // Modifica el hash de la instancia de Coinbase para que sea incorrecto
      coinbase._hash = 'hash_erroneo';
      
      expect(() => nodo1.agregarCoinbase(coinbase)).toThrow(Error);
    });
    test('Bloque - Agregar transacciones y al agregar la 9 esta es erronea(forzar error)', () => {
      const tipoHash = "MD5";
      const hashStrategy = tipoHash === "MD5" ? new MD5HashStrategy() : new SHA256HashStrategy();
      let blockchain = [];
      let nodos = [];
      let nodo1 = new Nodo(nodos, tipoHash, blockchain);
      nodos.forEach((nodo) => { 
        nodo.agregarNodo(nodo1);
      });
      nodos.push(nodo1);
      let nodo2 = new Nodo(nodos, tipoHash, blockchain);
      nodos.forEach((nodo) => { 
        nodo.agregarNodo(nodo2);
      });
      
      nodos.push(nodo2);
      const coinbase = new Coinbase('id1', 'direccion1', hashStrategy);
      nodo1.agregarCoinbase(coinbase);
      const transaccion1 = new TransaccionSimple('id2', coinbase, 'direccion2', hashStrategy);
      nodo1.agregarTransaccion(transaccion1);
      const transaccion2 = new TransaccionSimple('id3', transaccion1, 'direccion3', hashStrategy);
      nodo1.agregarTransaccion(transaccion2);
      const transaccion3 = new TransaccionSimple('id4', transaccion2, 'direccion4', hashStrategy);
      nodo1.agregarTransaccion(transaccion3);
      const transaccion4 = new TransaccionSimple('id5', transaccion3, 'direccion5', hashStrategy);
      nodo1.agregarTransaccion(transaccion4);
      const transaccion5 = new TransaccionSimple('id6', transaccion4, 'direccion6', hashStrategy);
      nodo1.agregarTransaccion(transaccion5);
      const transaccion6 = new TransaccionSimple('id7', transaccion5, 'direccion7', hashStrategy);
      nodo1.agregarTransaccion(transaccion6);
      const transaccion7 = new TransaccionSimple('id8', transaccion6, 'direccion8', hashStrategy);
      nodo1.agregarTransaccion(transaccion7);
      const transaccion8 = new TransaccionSimple('id9', transaccion7, 'direccion9', hashStrategy);
      nodo1.agregarTransaccion(transaccion8);
      const transaccion9 = new TransaccionSimple('id10', transaccion8, 'direccion10', hashStrategy);
      // Cambiamos manualmente el hash de la última transacción a un valor incorrecto
      transaccion9._hash = 'hash_erroneo';
      expect(() => nodo1.agregarTransaccion(transaccion9)).toThrow(Error);
    });
  
  });
  describe('Token', () => {
    test('Token - Obtener Token', () => {
      const tokenID = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';
      const token = new Token(tokenID);
      const tokenString = token.obtenerToken();
      expect(tokenString).toBe(`TKN-${tokenID}`);
    });
  });
  describe('Transaccion Compuesta', () => {
    test('Transaccion Compuesta completa (forzar error)', () => {
      var xhashStrategy = tipoHash === "SHA256" ? new SHA256HashStrategy() : new MD5HashStrategy();
      let blockchain = [];
      let xnodos = [];
      let xnodo1 = new Nodo(xnodos, tipoHash, blockchain);
      xnodos.forEach((nodo) => { 
        nodo.agregarNodo(xnodo1);
      });
      xnodos.push(xnodo1);
      var xcoinbase3 = new Coinbase('id3', 'direccion3', xhashStrategy);
      xnodo1.agregarCoinbase(xcoinbase3);
      const xtrs1 = new TransaccionSimple('id4', xcoinbase3, 'direccion4', xhashStrategy);
      xnodo1.agregarTransaccion(xtrs1); 
      var xtrc1 = new TransaccionCompuesta(hashStrategy);
      const xtrs2 = new TransaccionSimple('id5', xtrs1, 'direccion5', xhashStrategy);
      xtrc1.agregarTransaccionHija(xtrs2,'2');
      const xtrs3 = new TransaccionSimple('id6', xtrs2, 'direccion6', xhashStrategy);
      xtrc1.agregarTransaccionHija(xtrs3,'2');
      const xtrs4 = new TransaccionSimple('id7', xtrs3, 'direccion7', xhashStrategy);
      xtrc1.agregarTransaccionHija(xtrs4,'2');
      const xtrs5 = new TransaccionSimple('id8', xtrs4, 'direccion8', xhashStrategy);
      expect(() => xtrc1.agregarTransaccionHija(xtrs5, '2')).toThrow(Error);
    });

    test('Transaccion Compuesta completa - 2 niveles de compuesta ', () => {
      var xhashStrategy = tipoHash === "SHA256" ? new SHA256HashStrategy() : new MD5HashStrategy();
      let blockchain = [];
      let xnodos = [];
      let xnodo1 = new Nodo(xnodos, tipoHash, blockchain);
      xnodos.forEach((nodo) => { 
        nodo.agregarNodo(xnodo1);
      });
      xnodos.push(xnodo1);
      var xcoinbase3 = new Coinbase('id3', 'direccion3', xhashStrategy);
      xnodo1.agregarCoinbase(xcoinbase3);
      const xtrs1 = new TransaccionSimple('id4', xcoinbase3, 'direccion4', xhashStrategy);
      xnodo1.agregarTransaccion(xtrs1,'1');
      var xtrc1 = new TransaccionCompuesta(hashStrategy);
      const xtrs2 = new TransaccionSimple('id5', xtrs1, 'direccion5', xhashStrategy);
      xtrc1.agregarTransaccionHija(xtrs2,'2');
      var xtrc2 = new TransaccionCompuesta(hashStrategy);
      const xtrs3 = new TransaccionSimple('id6', xtrs2, 'direccion6', xhashStrategy);
      xtrc2.agregarTransaccionHija(xtrs3,'3');
      const xtrs4 = new TransaccionSimple('id7', xtrs3, 'direccion7', xhashStrategy);
      xtrc2.agregarTransaccionHija(xtrs4,'3');
      const xtrs5 = new TransaccionSimple('id8', xtrs4, 'direccion8', xhashStrategy);
      xtrc2.agregarTransaccionHija(xtrs5,'3');
      xtrc1.agregarTransaccionHija(xtrc2,'2');
      xnodo1.agregarTransaccion(xtrc1,'1');
    });
    test('Transaccion Compuesta completa - 3 niveles de altura de compuesta (Forzar error)', () => {
      var xhashStrategy = tipoHash === "SHA256" ? new SHA256HashStrategy() : new MD5HashStrategy();
      let blockchain = [];
      let xnodos = [];
      let xnodo1 = new Nodo(xnodos, tipoHash, blockchain);
      xnodos.forEach((nodo) => { 
        nodo.agregarNodo(xnodo1);
      });
      xnodos.push(xnodo1);
      var xcoinbase3 = new Coinbase('id3', 'direccion3', xhashStrategy);
      xnodo1.agregarCoinbase(xcoinbase3);
      const xtrs1 = new TransaccionSimple('id4', xcoinbase3, 'direccion4', xhashStrategy);
      xnodo1.agregarTransaccion(xtrs1,'1');
      var xtrc1 = new TransaccionCompuesta(hashStrategy);
      const xtrs2 = new TransaccionSimple('id5', xtrs1, 'direccion5', xhashStrategy);
      xtrc1.agregarTransaccionHija(xtrs2,'2');
      var xtrc2 = new TransaccionCompuesta(hashStrategy);
      const xtrs3 = new TransaccionSimple('id6', xtrs2, 'direccion6', xhashStrategy);
      xtrc2.agregarTransaccionHija(xtrs3,'3');
      const xtrs4 = new TransaccionSimple('id7', xtrs3, 'direccion7', xhashStrategy);
      xtrc2.agregarTransaccionHija(xtrs4,'3');
      var xtrc3 = new TransaccionCompuesta(hashStrategy);
      const xtrs5 = new TransaccionSimple('id8', xtrs4, 'direccion8', xhashStrategy);
      xtrc3.agregarTransaccionHija(xtrs5,'3');
      const xtrs6 = new TransaccionSimple('id9', xtrs5, 'direccion9', xhashStrategy);
      xtrc3.agregarTransaccionHija(xtrs6,'3');
      const xtrs7 = new TransaccionSimple('id7', xtrs6, 'direccion10', xhashStrategy);
      xtrc3.agregarTransaccionHija(xtrs7,'3'); 
      expect(() => xtrc2.agregarTransaccionHija(xtrc3,'3')).toThrow(Error);
    });


    test('Transaccion Compuesta- Intento agregar una Transaccion Inválida (hash inválido) a una Transaccion Compuesta (forzar error)', () => {
      var xhashStrategy = tipoHash === "SHA256" ? new SHA256HashStrategy() : new MD5HashStrategy();
      let blockchain = [];
      let xnodos = [];
      let xnodo1 = new Nodo(xnodos, tipoHash, blockchain);
      xnodos.forEach((nodo) => { 
          nodo.agregarNodo(xnodo1);
      });
      xnodos.push(xnodo1);
    
      var xcoinbase3 = new Coinbase('id3', 'direccion3', xhashStrategy);
      xnodo1.agregarCoinbase(xcoinbase3);
    
      const xtrs1 = new TransaccionSimple('id4', xcoinbase3, 'direccion4', xhashStrategy);
      xnodo1.agregarTransaccion(xtrs1);
    
      var xtrc1 = new TransaccionCompuesta(hashStrategy);
    
      const xtrs2 = new TransaccionSimple('id5', xtrs1, 'direccion5', xhashStrategy);
      // modificamos el hash de xtrs2 para que falle la validación
      xtrs2._hash = 'hash_invalido';
      
      expect(() => xtrc1.agregarTransaccionHija(xtrs2,'2')).toThrow(Error);
      const xtrs3 = new TransaccionSimple('id6', xtrs2, 'direccion6', xhashStrategy);
      xtrc1.agregarTransaccionHija(xtrs3,'2');
    
      const xtrs4 = new TransaccionSimple('id7', xtrs3, 'direccion7', xhashStrategy);
      xtrc1.agregarTransaccionHija(xtrs4,'2');
    
      const xtrs5 = new TransaccionSimple('id8', xtrs4, 'direccion8', xhashStrategy);
      xtrc1.agregarTransaccionHija(xtrs5,'2');
    });
});
describe('HashStrategy', () => {
  test('HashStrategy - Forzar error al usar clase abstracta', () => {
    const hashStrategy = new HashStrategy();
    expect(() => hashStrategy.calculateHash('data')).toThrowError('calculateHash debe ser implementado por las clases hijas');
  });
  test('MD5HashStrategy - Calcular Hash', () => {
    const data = 'data';
    const md5HashStrategy = new MD5HashStrategy();
    const hash = md5HashStrategy.calculateHash(data);
    expect(hash).toBeDefined();
  });
  test('SHA256HashStrategy - Calcular Hash', () => {
    const data = 'data';
    const sha256HashStrategy = new SHA256HashStrategy();
    const hash = sha256HashStrategy.calculateHash(data);
    expect(hash).toBeDefined();
  });
});
});