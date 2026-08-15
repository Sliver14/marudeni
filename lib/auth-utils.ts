import crypto from 'crypto'

const SESSION_SECRET = process.env.SESSION_SECRET || 'marudeni_default_very_secret_session_key_123456789'
const PBKDF2_SALT = 'marudeni_permanent_auth_salt_987654321'
const ITERATIONS = 10000
const KEYLEN = 64
const DIGEST = 'sha512'

/**
 * Hashes a plain password using PBKDF2
 */
export function hashPassword(password: string): string {
  const hash = crypto.pbkdf2Sync(password, PBKDF2_SALT, ITERATIONS, KEYLEN, DIGEST).toString('hex')
  return hash
}

/**
 * Verifies a plain password against a stored PBKDF2 hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  const computedHash = crypto.pbkdf2Sync(password, PBKDF2_SALT, ITERATIONS, KEYLEN, DIGEST).toString('hex')
  return storedHash === computedHash
}

/**
 * Signs a session containing the user's email, returning a signed token string
 */
export function signSession(email: string): string {
  const expiry = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  const payload = JSON.stringify({ email, expiry })
  const payloadBase64 = Buffer.from(payload).toString('base64')
  
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadBase64)
    .digest('hex')
    
  return `${payloadBase64}.${signature}`
}

/**
 * Verifies a signed session token, returning the user's email if valid, or null if invalid or expired
 */
export function verifySession(token: string): string | null {
  try {
    const [payloadBase64, signature] = token.split('.')
    if (!payloadBase64 || !signature) return null

    const computedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payloadBase64)
      .digest('hex')

    if (signature !== computedSignature) {
      return null
    }

    const payloadStr = Buffer.from(payloadBase64, 'base64').toString('utf-8')
    const payload = JSON.parse(payloadStr)

    if (payload.expiry < Date.now()) {
      return null // Expired session
    }

    return payload.email
  } catch (error) {
    return null
  }
}
