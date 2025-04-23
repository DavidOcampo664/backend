const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_neko');
    req.user = decoded; // { id, rol }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};
exports.permitirRol = (rolPermitido) => {
    return (req, res, next) => {
      if (!req.user || req.user.rol !== rolPermitido) {
        return res.status(403).json({ error: 'Acceso denegado: rol insuficiente' });
      }
      next();
    };
  };
  