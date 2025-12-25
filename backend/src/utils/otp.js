import crypto from 'crypto';

const OTP_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

/**
 * In-memory OTP store
 * key = email
 */
const otpStore = new Map();

class OtpService {

  /**
   * Generate a secure 6-digit OTP
   */
  generate() {
    return crypto.randomInt(100000, 999999).toString();
  }

  /**
   * Store OTP for an email
   */
  store(email, otp) {
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + OTP_EXPIRY_MS,
      attempts: 0
    });
  }

  /**
   * Verify OTP
   */
  verify(email, otp) {
    const record = otpStore.get(email);

    if (!record) {
      throw new Error('OTP not found or expired');
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      throw new Error('OTP expired');
    }

    if (record.attempts >= MAX_ATTEMPTS) {
      otpStore.delete(email);
      throw new Error('Too many invalid attempts');
    }

    if (record.otp !== otp) {
      record.attempts += 1;
      otpStore.set(email, record);
      throw new Error('Invalid OTP');
    }

    // Success → invalidate OTP
    otpStore.delete(email);
    return true;
  }

  /**
   * Optional: clear OTP manually
   */
  clear(email) {
    otpStore.delete(email);
  }
}

export default new OtpService();
