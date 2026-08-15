'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Plus, Trash2, Edit2, RotateCcw, Save, Lock, ArrowLeft } from 'lucide-react'
import { MenuItem, getStoredMenu, saveStoredMenu, categories, money, menuItems } from '@/lib/marudeni-data'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [items, setItems] = useState<MenuItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form fields
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Rice Dishes')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [tagsInput, setTagsInput] = useState('')

  useEffect(() => {
    setItems(getStoredMenu())
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toLowerCase() === 'admin' || password.toLowerCase() === 'marudeni') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid password. Hint: admin')
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setId('')
    setName('')
    setCategory('Rice Dishes')
    setDescription('')
    setPrice(0)
    setImage('')
    setTagsInput('')
  }

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id)
    setId(item.id)
    setName(item.name)
    setCategory(item.category)
    setDescription(item.description)
    setPrice(item.price)
    setImage(item.image)
    setTagsInput(item.tags.join(', '))
  }

  const handleDelete = (itemId: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      const next = items.filter((item) => item.id !== itemId)
      setItems(next)
      saveStoredMenu(next)
      if (editingId === itemId) resetForm()
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !name || !description || price <= 0 || !image) {
      alert('Please fill out all required fields with valid values.')
      return
    }

    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
    const newItem: MenuItem = { id, name, category, description, price, image, tags }

    let next: MenuItem[]
    if (editingId) {
      // Editing existing item
      next = items.map((item) => (item.id === editingId ? newItem : item))
    } else {
      // Adding new item
      if (items.some((item) => item.id === id)) {
        alert('An item with this ID already exists. Please choose a unique ID.')
        return
      }
      next = [...items, newItem]
    }

    setItems(next)
    saveStoredMenu(next)
    resetForm()
  }

  const handleResetDefaults = () => {
    if (confirm('Reset menu back to default Nigerian delicacies? Any customizations will be lost.')) {
      setItems(menuItems)
      saveStoredMenu(menuItems)
      resetForm()
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-[70vh] flex flex-col justify-center items-center px-5 py-12">
        <div className="w-full max-w-md rounded-[2rem] bg-secondary border border-border/30 p-8 shadow-xl text-center relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
            <Image src="/logo.svg" alt="watermark" width={200} height={200} />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-border">
              <Lock className="size-6" />
            </div>

            <div className="space-y-1.5">
              <h1 className="font-serif text-2xl font-black text-white uppercase tracking-wider">Chef Access Only</h1>
              <p className="text-sm text-white/70">Please enter password to access kitchen administration.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                required
                type="password"
                placeholder="Enter password (hint: admin)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-border font-medium"
              />
              {error && <p className="text-xs font-semibold text-red-400">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-full bg-border py-3.5 font-bold text-primary hover:bg-[#C99A3D]/90 hover:scale-[1.02] transition-all shadow-md"
              >
                Unlock Dashboard
              </button>
            </form>

            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="size-3.5" /> Back to Storefront
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      {/* Header Banner Card */}
      <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-secondary border border-border/30 p-6 sm:p-8 md:p-10 relative overflow-hidden mb-8 shadow-md">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 opacity-[0.03] pointer-events-none">
          <Image src="/logo.svg" alt="watermark" width={200} height={200} />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-border border border-white/10 mb-3">
            <Sparkles className="size-3" />
            Control Center
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                Menu Administration
              </h1>
              <p className="mt-2.5 max-w-2xl text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
                Manage your digital kitchen. Add, edit, or remove Nigerian delicacies displayed in your storefront.
              </p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="sm:self-end rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-all shrink-0"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        {/* Left Column: List of items */}
        <div className="rounded-3xl border border-border/30 bg-card p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-border/20 pb-4">
            <h2 className="font-serif text-2xl font-bold text-primary">Store Delicacies</h2>
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold text-primary hover:bg-secondary hover:text-white transition-all shadow-sm"
            >
              <RotateCcw className="size-3.5" /> Reset Defaults
            </button>
          </div>

          <div className="divide-y divide-border/20">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0 items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-border/20 bg-background">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-md font-bold text-primary leading-tight">{item.name}</h3>
                    <p className="text-xs text-primary/60 mt-1">{item.category} • <span className="font-bold text-border">{money(item.price)}</span></p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-1.5 py-0.5 rounded-md bg-secondary/15 text-primary text-[8px] font-bold uppercase tracking-wider border border-border/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex size-9 items-center justify-center rounded-full border border-border/40 hover:bg-secondary text-primary hover:text-white transition-all"
                    title="Edit Item"
                  >
                    <Edit2 className="size-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex size-9 items-center justify-center rounded-full border border-red-200/50 hover:bg-red-500 text-primary hover:text-white transition-all"
                    title="Delete Item"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Add / Edit Form */}
        <div className="rounded-3xl border border-border/30 bg-card p-6 md:p-8 shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-4">
            {editingId ? 'Edit Delicacy' : 'Add New Delicacy'}
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Item ID / Slug (Unique)</label>
              <input
                required
                type="text"
                disabled={!!editingId}
                placeholder="e.g. jollof-chicken"
                value={id}
                onChange={(e) => setId(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-medium disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Delicacy Name</label>
              <input
                required
                type="text"
                placeholder="e.g. Party Fried Rice"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-semibold"
              >
                {categories.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Price (₦)</label>
              <input
                required
                type="number"
                placeholder="e.g. 9500"
                value={price || ''}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Delicacy Image</label>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-xs text-primary/70 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-secondary/15 file:text-primary hover:file:bg-secondary/20 file:cursor-pointer"
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <span className="text-[10px] font-bold text-primary/50 uppercase">Or URL:</span>
                  <input
                    type="text"
                    placeholder="Unsplash or custom image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="flex-1 rounded-xl border border-border/40 bg-background px-3 py-1.5 text-xs focus:outline-none focus:border-border text-primary font-medium"
                  />
                </div>
                {image && (
                  <div className="relative h-20 w-32 rounded-xl overflow-hidden border border-border/20">
                    <img src={image} alt="Preview" className="object-cover h-full w-full" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                placeholder="e.g. Signature, Spicy, Popular"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Description</label>
              <textarea
                required
                placeholder="Describe the dish ingredients, spice level, servings, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-24 rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-medium"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-border px-5 py-3 font-bold text-primary hover:bg-[#C99A3D]/90 hover:scale-[1.02] transition-all shadow-md"
              >
                <Save className="size-4" /> Save Delicacy
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-border/40 px-5 py-3 text-sm font-bold text-primary hover:bg-secondary/10 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
