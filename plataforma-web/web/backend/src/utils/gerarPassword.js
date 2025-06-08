const crypto = require ('crypto');

function gerarPassword () {
    return crypto.randomBytes(4).toString('hex');
}

module.exports = gerarPassword;