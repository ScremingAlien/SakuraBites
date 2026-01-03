import './auth.event.js'
import AuthService from './auth.service.js';
import { statusCode } from '../../utils/constants/statusCode.js';

export default class AuthController {

  signup = async (req, res, next) => {
    try {
      const data = await AuthService.signup(req.body);
      res.success('Signup successful', data, statusCode.CREATED);
    } catch (e) { next(e); }
  };

  login = async (req, res, next) => {
    try {
      const data = await AuthService.login(req.body);
      res.success('OTP sent', data);
    } catch (e) { next(e); }
  };

  verifyOtp = async (req, res, next) => {
    try {
      const data = await AuthService.verifyOtp(req.body);
      res.success('Login successful', data);
    } catch (e) { next(e); }
  };

  forgotPassword = async (req, res, next) => {
    try {
      const data = await AuthService.forgotPassword(req.body.email);
      res.success(data.message);
    } catch (e) { next(e); }
  };

  resetPassword = async (req, res, next) => {
    try {
      const data = await AuthService.resetPassword(req.body);
      res.success(data.message);
    } catch (e) { next(e); }
  };

  logout = async (req, res, next) => {
    try {
      const data = await AuthService.logout(req.user.id);
      res.success(data.message);
    } catch (e) { next(e); }
  };

  me = async (req, res) => {
    res.success('User profile', req.user);
  };
}
