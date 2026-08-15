import { NextResponse } from 'next/server'
import { sql, initializeDatabase } from '@/lib/db'

export async function GET() {
  try {
    await initializeDatabase()
    const rows = await sql`SELECT * FROM categories ORDER BY created_at ASC`
    return NextResponse.json(rows)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    const { name } = await request.json()

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
    }

    const trimmedName = name.trim()
    const id = trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    // Add to DB
    await sql`
      INSERT INTO categories (id, name) VALUES (${id}, ${trimmedName}) 
      ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING *
    `

    return NextResponse.json({ success: true, category: { id, name: trimmedName } })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create category' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    await initializeDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 })
    }

    // First check if any menu items are currently in this category
    const catRow = await sql`SELECT name FROM categories WHERE id = ${id}`
    if (catRow.length > 0) {
      const catName = catRow[0].name
      const itemsCount = await sql`SELECT COUNT(*)::int as count FROM menu_items WHERE category = ${catName}`
      if (itemsCount[0].count > 0) {
        return NextResponse.json(
          { error: `Cannot delete category "${catName}" because it has ${itemsCount[0].count} menu items. Reassign or delete the items first.` },
          { status: 400 }
        )
      }
    }

    await sql`DELETE FROM categories WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete category' }, { status: 500 })
  }
}
