import { NextResponse } from 'next/server'
import { sql, initializeDatabase } from '@/lib/db'

export async function GET() {
  try {
    await initializeDatabase()
    const rows = await sql`SELECT * FROM menu_items ORDER BY created_at DESC`
    
    // Parse tags JSON if they return as a string or keep as object
    const items = rows.map((row) => ({
      ...row,
      tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags,
    }))
    
    return NextResponse.json(items)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch menu items' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    const { id, name, category, description, price, image, tags } = await request.json()

    if (!id || !name || !category || !description || !price || !image) {
      return NextResponse.json({ error: 'Missing required menu fields' }, { status: 400 })
    }

    const tagsJson = JSON.stringify(tags || [])

    const result = await sql`
      INSERT INTO menu_items (id, name, category, description, price, image, tags) 
      VALUES (${id}, ${name}, ${category}, ${description}, ${price}, ${image}, ${tagsJson}) 
      RETURNING *
    `

    return NextResponse.json({ success: true, item: result[0] })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create menu item' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    await initializeDatabase()
    const { id, name, category, description, price, image, tags } = await request.json()

    if (!id || !name || !category || !description || !price || !image) {
      return NextResponse.json({ error: 'Missing required menu fields' }, { status: 400 })
    }

    const tagsJson = JSON.stringify(tags || [])

    const result = await sql`
      UPDATE menu_items 
      SET name = ${name}, category = ${category}, description = ${description}, price = ${price}, image = ${image}, tags = ${tagsJson} 
      WHERE id = ${id} 
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: 'Menu item not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, item: result[0] })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update menu item' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    await initializeDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Menu item ID is required' }, { status: 400 })
    }

    await sql`DELETE FROM menu_items WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete menu item' }, { status: 500 })
  }
}
