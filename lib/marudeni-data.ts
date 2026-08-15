export type MenuItem = { id: string; name: string; category: string; description: string; price: number; image: string; tags: string[] }

export const menuItems: MenuItem[] = [
  { id: 'jollof', name: 'Premium Jollof Rice', category: 'Rice Dishes', description: 'Rich, smoky party Jollof rice cooked in a deep spiced tomato-pepper base, served with sweet plantain and tender beef.', price: 9500, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85', tags: ['Signature', 'Popular'] },
  { id: 'ofada', name: 'Ofada Rice & Ayamase', category: 'Rice Dishes', description: 'Local unpolished brown rice served with a spicy green pepper, locust bean, and palm oil sauce containing assorted meats.', price: 12000, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=85', tags: ['Popular'] },
  { id: 'suya', name: 'Spicy Beef Suya Skewers', category: 'Sides & Small Plates', description: 'Thin strips of spiced beef coated in yaji (ground peanut chili spice blend) and grilled over an open flame.', price: 6000, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85', tags: ['Popular', 'Spicy'] },
  { id: 'eforiro', name: 'Efo Riro (Spinach Stew)', category: 'Soups & Stews', description: 'Rich spinach stew cooked with locust beans, red bell peppers, palm oil, and beef tripe, served with white rice.', price: 11000, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', tags: ['Healthy'] },
  { id: 'egusi', name: 'Egusi Soup & Poundo Yam', category: 'Soups & Stews', description: 'Ground melon seed soup cooked with spinach, palm oil, stockfish, and cow skin, served with soft pounded yam.', price: 14500, image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=900&q=85', tags: ['Signature'] },
  { id: 'meatpie', name: 'Golden Beef Meat Pie', category: 'Sides & Small Plates', description: 'Buttery shortcrust pastry filled with seasoned minced beef, potatoes, and carrots.', price: 4000, image: 'https://images.unsplash.com/photo-1589119908995-c6800faecf39?auto=format&fit=crop&w=900&q=85', tags: ['Popular'] },
  { id: 'puffpuff', name: 'Sweet Nigerian Puff Puff', category: 'Sweet Things', description: 'Deep-fried sweet dough balls, soft, golden and pillowy with a hint of nutmeg.', price: 3500, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85', tags: ['Vegetarian'] },
]

export const getStoredMenu = (): MenuItem[] => {
  if (typeof window === 'undefined') return menuItems
  const stored = window.localStorage.getItem('marudeni-menu')
  if (!stored) {
    window.localStorage.setItem('marudeni-menu', JSON.stringify(menuItems))
    return menuItems
  }
  return JSON.parse(stored)
}

export const saveStoredMenu = (items: MenuItem[]) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('marudeni-menu', JSON.stringify(items))
    window.dispatchEvent(new Event('menu-updated'))
  }
}

export const categories = ['All', 'Rice Dishes', 'Soups & Stews', 'Sides & Small Plates', 'Sweet Things']
export const money = (value: number) => `₦${value.toLocaleString('en-NG')}`
export const findItem = (id: string) => {
  const items = getStoredMenu()
  return items.find((item) => item.id === id)
}
export type CartLine = { id: string; quantity: number }
export const cartTotal = (cart: CartLine[]) => cart.reduce((sum, line) => sum + (findItem(line.id)?.price ?? 0) * line.quantity, 0)
export const cartCount = (cart: CartLine[]) => cart.reduce((sum, line) => sum + line.quantity, 0)

export const navItems = [
  { href: '/menu', label: 'Menu' },
  { href: '/catering', label: 'Catering' },
  { href: '/about', label: 'Our story' },
  { href: '/contact', label: 'Contact' }
]
