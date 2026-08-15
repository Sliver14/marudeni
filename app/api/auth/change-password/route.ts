import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sql, initializeDatabase } from '@/lib/db'
import { verifySession, verifyPassword, hashPassword } from '@/lib/auth-utils'

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    
    // Verify session
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('marudeni-session')?.value

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const email = verifySession(sessionToken)

    if (!email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 })
    }

    if (newPassword.length < 5) {
      return NextResponse.json({ error: 'New password must be at least 5 characters long' }, { status: 400 })
    }

    // Retrieve admin record from DB
    const rows = await sql`
      SELECT password_hash 
      FROM admins 
      WHERE email = ${email}
    `

    if (rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const admin = rows[0]
    
    // Verify current password
    const isCurrentValid = verifyPassword(currentPassword, admin.password_hash)

    if (!isCurrentValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 })
    }

    // Hash and update to new password
    const newHash = hashPassword(newPassword)
    
    await sql`
      UPDATE admins 
      SET password_hash = ${newHash} 
      WHERE email = ${email}
    `

    return NextResponse.json({ success: true, message: 'Password changed successfully.' })
  } catch (error: any) {
    console.error('Change Password Error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
