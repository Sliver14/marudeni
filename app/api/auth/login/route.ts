import { NextResponse } from 'next/server'
import { sql, initializeDatabase } from '@/lib/db'
import { verifyPassword, signSession } from '@/lib/auth-utils'

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const trimmedEmail = email.trim().toLowerCase()
    
    // Retrieve admin record
    const rows = await sql`
      SELECT email, password_hash 
      FROM admins 
      WHERE email = ${trimmedEmail}
    `

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const admin = rows[0]
    const isValid = verifyPassword(password, admin.password_hash)

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    // Sign session token
    const token = signSession(admin.email)

    // Set secure HTTP-only cookie
    const response = NextResponse.json({ success: true, email: admin.email })
    response.cookies.set({
      name: 'marudeni-session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return response
  } catch (error: any) {
    console.error('Login Error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
