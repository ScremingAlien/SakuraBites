import eventBus from '../../utils/eventBus.js';
import { MailService } from '../../middlewares/default/Nodemailer.js';
import otpUtil from '../../utils/otp.js';
import { AUTH_EVENTS } from './auth.constants.js';
import { otpEmailTemplate } from '../../utils/templates/email-templates.js';
 
const mailService = new MailService();

/**
 * Signup OTP
 */
eventBus.on(AUTH_EVENTS.USER_SIGNUP, async ({ user }) => {
  
  const otp = otpUtil.generate();
  otpUtil.store(user.email, otp);

  const { subject, html, text } = otpEmailTemplate({
    otp,
    name: user.name
  });

  await mailService.sendMail({
    to: user.email,
    subject,
    html,
    text
  });

  console.log('📩 Signup OTP sent to', user.email);
});

/**
 * Login OTP
 */
 
eventBus.on("auth.login", async ({ name, _id, time }) => {
  /**
   * Triggers:  SYSTEM notification → Login alert (optional)
   */
  let d = await NotificationPreference.findOne({ userId: _id }).lean();

  if (d.preferences.SYSTEM) {
    await Notification.create({
      userId: _id,
      from: 'SukraBites',
      type: 'SYSTEM',
      title: `Login Alert at ${new Date(time).toLocaleString()}`,
      message: `Hi ${name}, you just logged in at ${new Date(time).toLocaleString()}`,
      isRead: false
    })
  }

  console.log(' auth.login fired');
});
