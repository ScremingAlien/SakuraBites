import eventBus from '../../utils/eventBus.js';
import { MailService } from '../../middlewares/default/Nodemailer.js';
import { welcomeEmailTemplate } from '../../utils/templates/email-templates.js';
import { NotificationPreference, Notification } from '../user/user.model.js'
const mailService = new MailService();

eventBus.on("auth.signup", async ({ name, email, _id }) => {
  /**
   * Send welcome email
   * Create Notification Preference model
   */
  await Notification.create({
    userId: _id,
    from: 'SukraBites',
    type: 'SYSTEM',
    title: 'Welcome to Cookbook',
    message: `Hi ${name}, welcome to Cookbook! Explore our delicious recipes and get cooking!`,
    isRead: false
  })
  const { subject, html, text } = welcomeEmailTemplate({ name });
  await mailService.sendMail({ to: email, subject, html, text });

  await NotificationPreference.create({ userId: _id });

  console.log(' auth.signup fired');
});


eventBus.on("auth.login", async ({ name, _id, time }) => {
  /**
   * Triggers:  SYSTEM notification → Login alert (optional)
   */
  await Notification.create({
    userId: _id,
    from: 'SukraBites',
    type: 'SYSTEM',
    title: `Login Alert at ${new Date(time).toLocaleString()}`,
    message: `Hi ${name}, you just logged in at ${new Date(time).toLocaleString()}`,
    isRead: false
  })
  console.log(' auth.login fired');
});
