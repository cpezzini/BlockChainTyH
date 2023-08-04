class HashStrategy {
  calculateHash(data) {
    throw new Error('calculateHash debe ser implementado por las clases hijas');
  }
}
module.exports = HashStrategy;
