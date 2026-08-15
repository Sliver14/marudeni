import { NextResponse } from 'next/server'
import { sql, initializeDatabase } from '@/lib/db'

export async function GET() {
  try {
    await initializeDatabase()
    
    // Calculate total orders
    const countRes = await sql`SELECT COUNT(*)::int as count FROM orders`
    const totalOrders = countRes[0]?.count || 0

    // Calculate total sales/revenue
    const salesRes = await sql`SELECT SUM(total)::int as total FROM orders`
    const totalSales = salesRes[0]?.total || 0

    // Fetch recent orders
    const recentOrders = await sql`SELECT * FROM orders ORDER BY created_at DESC LIMIT 30`

    return NextResponse.json({
      totalOrders,
      totalSales,
      recentOrders
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch order analytics' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    const { id, name, email, phone, method, address, notes, total } = await request.json()

    if (!id || !name || !email || !phone || !method || total === undefined) {
      return NextResponse.json({ error: 'Missing required order fields' }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO orders (id, name, email, phone, method, address, notes, total, status) 
      VALUES (${id}, ${name}, ${email}, ${phone}, ${method}, ${address || null}, ${notes || null}, ${total}, 'confirmed') 
      ON CONFLICT (id) DO NOTHING RETURNING *
    `

    return NextResponse.json({ success: true, order: result[0] })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to record order' }, { status: 500 })
  }
}
