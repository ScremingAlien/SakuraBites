
import eventBus from '../../utils/eventBus.js';
import jwt from '../../utils/jwt.js';
import otpUtil from '../../utils/otp.js';
import { AUTH_EVENTS } from './auth.constants.js';
import { User } from '../user/user.model.js'
class AuthService {

  async signup({ email, name }) {
    // is user already exist
    const isUser = await User.findOne({ email });
    if (isUser) {
      throw new Error('Email already exist');
    }
    
    const username = email.split('@')[0];
    
    const user = { id: Date.now(), email, name, username };

    eventBus.emit(AUTH_EVENTS.USER_SIGNUP, { user });

    return { message: 'OTP sent to email' };
  }


  async login({ email }) {
    eventBus.emit(AUTH_EVENTS.USER_LOGIN, { email });
    return { message: 'OTP sent' };
  }

  async verifyOtp({ email, otp }) {
    otpUtil.verify(email, otp);

    const token = jwt.sign({ email });

    eventBus.emit(AUTH_EVENTS.OTP_VERIFIED, { email });

    return { token };
  }

  async forgotPassword(email) {
    const token = jwt.sign({ email }, '15m');

    eventBus.emit(AUTH_EVENTS.PASSWORD_RESET, { email });

    return { message: 'Reset link sent' };
  }

  async resetPassword({ token, password }) {
    const payload = jwt.verify(token);
    // update password

    return { message: 'Password updated' };
  }

  async logout(userId) {
    eventBus.emit(AUTH_EVENTS.LOGOUT, { userId });
    return { message: 'Logged out' };
  }

  async me(user) {
    return user;
  }
}

export default new AuthService();
