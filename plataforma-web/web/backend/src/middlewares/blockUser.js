const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

let checkTokenUserForBlock = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token indisponível.' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
        console.error('Erro ao verificar token:', err);
        return res.status(403).json({ success: false, message: 'Token inválido.' });
    }

    if (!decoded || typeof decoded !== 'object') {
      return res.status(403).json({ success: false, message: 'Token malformado.' });
    }
    
    console.log('Token decodificado:', decoded);

    req.decoded = decoded;
    next();
    });
};

module.exports = { checkTokenUserForBlock };
