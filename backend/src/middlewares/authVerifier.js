import jwt from '../utils/jwt.js';

export default function authVerifier(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');

    req.user = jwt.verify(token);
    next();
  } catch {
    res.fail('Unauthorized', null, 401);
  }
}
