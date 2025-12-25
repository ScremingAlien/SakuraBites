export function resetPasswordTemplate({ link }) {
  return {
    subject: 'Reset Your Password',
    html: `
      <p>Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>This link is valid for 15 minutes.</p>
    `,
    text: `Reset your password: ${link}`
  };
}
