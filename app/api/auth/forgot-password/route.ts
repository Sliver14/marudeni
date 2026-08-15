import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { sql, initializeDatabase } from '@/lib/db'

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const trimmedEmail = email.trim().toLowerCase()

    // Verify admin exists
    const adminCheck = await sql`
      SELECT email 
      FROM admins 
      WHERE email = ${trimmedEmail}
    `

    if (adminCheck.length === 0) {
      // Return success anyway for security / timing reasons
      return NextResponse.json({ success: true, message: 'If the email exists, a reset link will be sent.' })
    }

    // Generate token and expiry (1 hour)
    const token = crypto.randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 60 * 60 * 1000)

    // Save token to DB
    await sql`
      UPDATE admins 
      SET reset_token = ${token}, reset_token_expiry = ${expiry} 
      WHERE email = ${trimmedEmail}
    `

    const origin = request.headers.get('origin') || 'http://localhost:3000'
    const resetLink = `${origin}/admin/reset-password?token=${token}`

    const apiKey = process.env.RESEND_API_KEY

    // Fallback if API key is not configured
    if (!apiKey || apiKey.startsWith('re_your_resend')) {
      console.log('-----------------------------------------')
      console.log('RESET PASSWORD VERIFICATION LINK:')
      console.log(resetLink)
      console.log('-----------------------------------------')
      return NextResponse.json({ 
        success: true, 
        message: 'Development Mode: Verification link printed to server logs.',
        link: resetLink 
      })
    }

    // Send email via Resend HTTP API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Marudeni Foods <onboarding@resend.dev>',
        to: [trimmedEmail],
        subject: 'Reset your Marudeni Foods Admin Password',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #0B2117;">
            <h2>Marudeni Foods Administration</h2>
            <p>You requested a password reset. Click the link below to set a new password:</p>
            <p style="margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #C99A3D; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Reset Password
              </a>
            </p>
            <p>Or copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #C99A3D;">${resetLink}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #888;">This link will expire in 1 hour. If you did not request this, you can ignore this email.</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Resend API error:', errorText)
      return NextResponse.json({ error: 'Failed to send password reset email.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Password reset link sent.' })
  } catch (error: any) {
    console.error('Forgot Password Error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
