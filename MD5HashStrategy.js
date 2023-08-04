const crypto = require('crypto');
const HashStrategy = require('./HashStrategy');

class MD5HashStrategy extends HashStrategy {
  calculateHash(data) {
      const hash = crypto.createHash('MD5').update(data).digest('hex');
      return hash;
    }
  }  
module.exports = MD5HashStrategy;