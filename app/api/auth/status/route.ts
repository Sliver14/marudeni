import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySession } from '@/lib/auth-utils'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('marudeni-session')?.value

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false })
    }

    const email = verifySession(sessionToken)

    if (!email) {
      return NextResponse.json({ authenticated: false })
    }

    return NextResponse.json({ authenticated: true, email })
  } catch (error: any) {
    return NextResponse.json({ authenticated: false, error: error.message })
  }
}
