export function otpEmailTemplate({ otp, name }) {
  return {
    subject: `Your OTP Code is ${otp} for SukraBites`,
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


export function welcomeEmailTemplate({ name, actionUrl = 'https://sukrabites.com/dashboard' }) {
  const brandColor = '#FF5733'; // Example SukraBites primary brand color

  return {
    subject: `Welcome to SukraBites, ${name || 'Foodie'}! 🍕`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .button {
              background-color: ${brandColor};
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              display: inline-block;
              font-weight: bold;
            }
            .container {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 style="color: ${brandColor};">Welcome to the family!</h1>
            <p>Hi ${name || 'there'},</p>
            <p>We're thrilled to have you at <strong>SukraBites</strong>. Your journey to the best bites in town starts right here.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${actionUrl}" class="button">Start Exploring</a>
            </div>

            <p><strong>What’s next?</strong></p>
            <ul>
              <li>Complete your profile to get personalized recommendations.</li>
              <li>Check out our "Daily Specials" section.</li>
              <li>Refer a friend and get 20% off your next order.</li>
            </ul>

            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 12px; color: #888;">
              If you have any questions, just reply to this email. We're always here to help.
              <br>
              © 2025 SukraBites. All rights reserved.
            </p>
          </div>
        </body>
      </html>
    `,
    text: `Hi ${name || 'there'}, Welcome to SukraBites! We're thrilled to have you. Start exploring here: ${actionUrl}`
  };
}