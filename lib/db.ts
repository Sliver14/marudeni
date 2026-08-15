import { neon } from '@neondatabase/serverless'
import { menuItems } from './marudeni-data'
import { hashPassword } from './auth-utils'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.warn('Warning: DATABASE_URL is not set. Database operations will fail.')
}

export const sql = neon(databaseUrl || '')

export async function initializeDatabase() {
  if (!databaseUrl) return

  try {
    // 1. Create categories table
    await sql`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `

    // 2. Create menu_items table
    await sql`
      CREATE TABLE IF NOT EXISTS menu_items (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL REFERENCES categories(name) ON UPDATE CASCADE,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        image TEXT NOT NULL,
        tags JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `

    // 3. Create orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        method VARCHAR(20) NOT NULL,
        address TEXT,
        notes TEXT,
        total INTEGER NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `

    // 4. Create admins table
    await sql`
      CREATE TABLE IF NOT EXISTS admins (
        email VARCHAR(255) PRIMARY KEY,
        password_hash TEXT NOT NULL,
        reset_token VARCHAR(255) NULL,
        reset_token_expiry TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `

    // Seed default categories if none exist
    const categoryCheck = await sql`SELECT COUNT(*)::int as count FROM categories`
    if (categoryCheck[0].count === 0) {
      const defaultCategories = ['Rice Dishes', 'Soups & Stews', 'Sides & Small Plates', 'Sweet Things']
      for (const cat of defaultCategories) {
        const id = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        await sql`INSERT INTO categories (id, name) VALUES (${id}, ${cat}) ON CONFLICT DO NOTHING`
      }
      console.log('Database seeded with default categories.')
    }

    // Seed default menu items if none exist
    const menuCheck = await sql`SELECT COUNT(*)::int as count FROM menu_items`
    if (menuCheck[0].count === 0) {
      for (const item of menuItems) {
        // Ensure standard string tags are stored as JSON array
        const tagsJson = JSON.stringify(item.tags)
        await sql`
          INSERT INTO menu_items (id, name, category, description, price, image, tags) 
          VALUES (${item.id}, ${item.name}, ${item.category}, ${item.description}, ${item.price}, ${item.image}, ${tagsJson}) 
          ON CONFLICT DO NOTHING
        `
      }
      console.log('Database seeded with default menu items.')
    }

    // Seed default admin account if none exists
    const adminCheck = await sql`SELECT COUNT(*)::int as count FROM admins`
    if (adminCheck[0].count === 0) {
      const email = process.env.ADMIN_EMAIL || 'admin@marudeni.com'
      const hash = hashPassword('admin')
      await sql`
        INSERT INTO admins (email, password_hash) 
        VALUES (${email}, ${hash}) 
        ON CONFLICT DO NOTHING
      `
      console.log('Database seeded with default admin account:', email)
    }
  } catch (error) {
    console.error('Failed to initialize database tables:', error)
  }
}
