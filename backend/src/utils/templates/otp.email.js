export function otpEmailTemplate({ otp, name }) {
  return {
    subject: 'Your OTP Code',
    html: `
      <div style="font-family:Arial,sans-serif">
        <h2>Hello ${name || 'User'},</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="letter-spacing:4px">${otp}</h1>
        <p>This OTP is valid for <b>5 minutes</b>.</p>
        <p>If you did not request this, please ignore this email.</p>
      </div>
    `,
    text: `Your OTP is ${otp}. Valid for 5 minutes.`
  };
}
