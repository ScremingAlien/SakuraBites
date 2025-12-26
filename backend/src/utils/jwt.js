import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

class JwtService {

  /**
   * Sign a JWT
   * @param {Object} payload - data to encode
   * @param {String} expiresIn - optional expiry (e.g. "15m", "7d")
   */


  sign(payload, expiresIn = DEFAULT_EXPIRES_IN) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn,
      algorithm: 'HS256'
    });
  }

  /**
   * Verify a JWT
   * @param {String} token
   */
  verify(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

export default new JwtService();
