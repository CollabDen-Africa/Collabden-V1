const API_URL = "http://localhost:5050/api/v1/user";

export const authService = {
  /**
   * Register a new user
   * Expects: { email, password }
   */
  async signUp(data: { name: string; email: string; password: string }) {
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  /**
   * Log in a user
   * Expects: { email, password }
   */
  async login(credentials: { email: string; password: string }) {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  /**
   * Verify email via token
   * Expects: { verificationToken }
   */
  async verifyEmail(verificationToken: { email: string, code: string }) {
    const res = await fetch(`${API_URL}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ verificationToken }),
    });
    return res.json();
  },

  /**
   * Request password reset link
   * Expects: { email }
   */
  async forgotPassword(email: string) {
    const res = await fetch(`${API_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json();
  },

  /**
   * Reset password with token
   * Expects: { resetToken, newPassword }
   */
  async resetPassword(resetToken: string, newPassword: string) {
    const res = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetToken, newPassword }),
    });
    return res.json();
  }
};