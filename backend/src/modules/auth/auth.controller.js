import './auth.event.js'
import AuthService from './auth.service.js';
import { statusCode } from '../../utils/constants/statusCode.js';
import { User } from '../user/user.model.js';
import { slugify } from '../../utils/slugify.js'
import otpUtil from '../../utils/otp.js'
import { MailService } from '../../middlewares/default/Nodemailer.js';
import { otpEmailTemplate } from '../../utils/templates/email-templates.js';
import JwtService from '../../utils/jwt.js'

const mailService = new MailService();

export default class AuthController {

  constructor() {
    this.authservice = AuthService;
  }

  signup = async (req, res, next) => {
    try {

      /**
       * first take email , then is any user exist
       * then create user ( unverifyed user)
       * then send opt in email , then request complete
       */

      let isuser = await User.findOne({ email: req.body.email });
      if (isuser) throw new Error('User already exist');

      const username = req.body.email.split('@')[0];

      let newUser = await User.create({
        email: req.body.email,
        name: username,
        slug: slugify(username),
      });

      const otp = otpUtil.generate();

      const { subject, html, text } = otpEmailTemplate({
        otp,
        name: newUser.name
      });
      newUser.otp = otp;
      await newUser.save();
      await mailService.sendMail({
        to: newUser.email,
        subject,
        html,
        text
      });

      this.authservice.eventBus.emit('auth.otp_sent', {})
      res.success('Otp Sent to your email', { next: true }, statusCode.CREATED);
    } catch (e) { next(e); }
  };

  login = async (req, res, next) => {
    try {
      /**
       * first take email , then is any user exist
       * if exist then send otp email
       * then request complete
       */
      let isuser = await User.findOne({ email: req.body.email });
      if (!isuser) throw new Error('User not found');

      const otp = otpUtil.generate();
      isuser.otp = otp;
      await isuser.save();

      const { subject, html, text } = otpEmailTemplate({
        otp,
        name: isuser.name
      });

      await mailService.sendMail({
        to: isuser.email,
        subject,
        html,
        text
      });

      this.authservice.eventBus.emit('auth.otp_sent', {})
      res.success('OTP sent to your email', { next: true });
    } catch (e) { next(e); }
  };


  verifyOtp = async (req, res, next) => {
    try {
      /**
       * first take email + otp, then check is any user exist
       *  then match the otp with the user's model
       *  is all good then make user verfied, and send the token
       */

      let isUser = await User.findOne({ email: req.body.email });
      if (!isUser) throw new Error('User not found');

      if (req.body.otp !== isUser.otp) throw new Error('Invalid otp');
      let data = {
        email: isUser.email,
        name: isUser.name,
        slug: isUser.slug,
        _id: isUser._id,
        avatar: isUser.avatar,
        preferences: isUser.preferences,
        time: Date.now()
      }

      if (isUser.isVerified == false) {
        // for new user
        isUser.isVerified = true;
        await isUser.save();
        data.authType = "signup";
        this.authservice.eventBus.emit('auth.signup', data);
      } else {
        // for existing user

        this.authservice.eventBus.emit('auth.login', data);
        data.authType = "login";
      }

      // generate jwt token and send to user
      let token = JwtService.sign(data, "3d");

      res.success('Otp verified',
        {
          token: token,
          data
        }, statusCode.CREATED);


    } catch (e) { next(e); }
  };



  me = async (req, res) => {
    res.success('User profile', req.user);
  };
}
