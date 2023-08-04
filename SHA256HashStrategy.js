const crypto = require('crypto');
const HashStrategy = require('./HashStrategy');

class SHA256HashStrategy extends HashStrategy {
  calculateHash(data) {
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return hash;
  }
}
module.exports = SHA256HashStrategy;



