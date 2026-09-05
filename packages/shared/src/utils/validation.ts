/**
 * String and input validation helpers
 */

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_-]{3,30}$/.test(username);
}

export function isStrongPassword(password: string): boolean {
  // Min 8 chars, 1 uppercase, 1 lowercase, 1 digit
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
}

export function sanitizeText(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
