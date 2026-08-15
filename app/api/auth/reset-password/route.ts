import { NextResponse } from 'next/server'
import { sql, initializeDatabase } from '@/lib/db'
import { hashPassword } from '@/lib/auth-utils'

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 })
    }

    if (password.length < 5) {
      return NextResponse.json({ error: 'Password must be at least 5 characters long' }, { status: 400 })
    }

    // Find the admin with the matching token that is not expired
    const rows = await sql`
      SELECT email, reset_token_expiry 
      FROM admins 
      WHERE reset_token = ${token}
    `

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 })
    }

    const admin = rows[0]
    const expiry = new Date(admin.reset_token_expiry)

    if (expiry.getTime() < Date.now()) {
      return NextResponse.json({ error: 'Reset token has expired' }, { status: 400 })
    }

    // Hash and update the password
    const newHash = hashPassword(password)
    
    await sql`
      UPDATE admins 
      SET password_hash = ${newHash}, reset_token = NULL, reset_token_expiry = NULL 
      WHERE email = ${admin.email}
    `

    return NextResponse.json({ success: true, message: 'Password has been reset successfully.' })
  } catch (error: any) {
    console.error('Reset Password Error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
