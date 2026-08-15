'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Plus, Trash2, Edit2, RotateCcw, Save, Lock, ArrowLeft, Loader2, Upload, X, Folder, Search, User } from 'lucide-react'
import { MenuItem, money } from '@/lib/marudeni-data'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAuthLoading, setIsAuthLoading] = useState(true)
  const [adminEmail, setAdminEmail] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const [items, setItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState('')
  
  // Stats and orders
  const [orders, setOrders] = useState<any[]>([])
  const [totalOrders, setTotalOrders] = useState(0)
  const [totalSales, setTotalSales] = useState(0)
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isLoadingMenu, setIsLoadingMenu] = useState(true)
  
  // Modal states
  const [isDelicacyModalOpen, setIsDelicacyModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  
  // Search query
  const [delicacySearch, setDelicacySearch] = useState('')

  // Form fields
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [tagsInput, setTagsInput] = useState('')

  // Change password form fields
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [profileSuccess, setProfileSuccess] = useState('')
  const [profileError, setProfileError] = useState('')
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/menu')
      if (res.ok) {
        const data = await res.json()
        setItems(data)
      }
    } catch (e) {
      console.error('Failed to load menu items:', e)
    } finally {
      setIsLoadingMenu(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      if (res.ok) {
        const data = await res.json()
        const catNames = data.map((c: any) => c.name)
        setCategories(catNames)
        if (catNames.length > 0 && !category) {
          setCategory(catNames[0])
        }
      }
    } catch (e) {
      console.error('Failed to load categories:', e)
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data.recentOrders || [])
        setTotalOrders(data.totalOrders || 0)
        setTotalSales(data.totalSales || 0)
      }
    } catch (e) {
      console.error('Failed to load order analytics:', e)
    }
  }

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/status')
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) {
            setIsAuthenticated(true)
            setAdminEmail(data.email)
          }
        }
      } catch (e) {
        console.error('Session check error:', e)
      } finally {
        setIsAuthLoading(false)
      }
    }
    checkSession()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchMenu()
      fetchCategories()
      fetchOrders()
    }
  }, [isAuthenticated])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const data = await res.json()
        setImage(data.url)
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Image upload failed:', error)
      alert('Error uploading image to Cloudinary.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggingIn(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        const data = await res.json()
        setIsAuthenticated(true)
        setAdminEmail(data.email)
      } else {
        const err = await res.json()
        setError(err.error || 'Invalid email or password')
      }
    } catch (error) {
      setError('Connection error. Please try again.')
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', { method: 'POST' })
      if (res.ok) {
        setIsAuthenticated(false)
        setAdminEmail('')
        resetForm()
      }
    } catch (e) {
      console.error('Logout error:', e)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setId('')
    setName('')
    if (categories.length > 0) setCategory(categories[0])
    setDescription('')
    setPrice(0)
    setImage('')
    setTagsInput('')
    setIsDelicacyModalOpen(false)
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
    setIsDelicacyModalOpen(true)
  }

  const handleDelete = async (itemId: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      try {
        const res = await fetch(`/api/menu?id=${itemId}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          fetchMenu()
          if (editingId === itemId) resetForm()
        } else {
          const err = await res.json()
          alert(err.error || 'Failed to delete menu item.')
        }
      } catch (error) {
        console.error(error)
        alert('Error communicating with database.')
      }
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !name || !description || price <= 0 || !image) {
      alert('Please fill out all required fields with valid values.')
      return
    }

    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
    const newItem = { id, name, category, description, price, image, tags }

    try {
      const url = '/api/menu'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      })

      if (res.ok) {
        fetchMenu()
        resetForm()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to save delicacy.')
      }
    } catch (error) {
      console.error(error)
      alert('Error updating database.')
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      })

      if (res.ok) {
        setNewCategory('')
        fetchCategories()
      } else {
        const err = await res.json()
        alert(err.error || 'Failed to create category')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleDeleteCategory = async (catName: string) => {
    if (items.some((item) => item.category === catName)) {
      alert(`Cannot delete category "${catName}" because it is currently assigned to menu items. Reassign or delete those items first.`)
      return
    }

    if (confirm(`Are you sure you want to delete the category "${catName}"?`)) {
      try {
        const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        const res = await fetch(`/api/categories?id=${catSlug}`, {
          method: 'DELETE',
        })

        if (res.ok) {
          fetchCategories()
        } else {
          const err = await res.json()
          alert(err.error || 'Failed to delete category')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileError('')
    setProfileSuccess('')

    if (newPassword.length < 5) {
      setProfileError('New password must be at least 5 characters long')
      return
    }

    if (newPassword !== confirmNewPassword) {
      setProfileError('New passwords do not match')
      return
    }

    setIsUpdatingPassword(true)

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()

      if (res.ok) {
        setProfileSuccess('Password updated successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmNewPassword('')
      } else {
        setProfileError(data.error || 'Failed to change password.')
      }
    } catch (err) {
      setProfileError('Network error. Please try again.')
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  // Filter delicacies
  const filteredItems = items.filter((item) => 
    item.name.toLowerCase().includes(delicacySearch.toLowerCase()) ||
    item.category.toLowerCase().includes(delicacySearch.toLowerCase())
  )

  if (isAuthLoading) {
    return (
      <main className="min-h-[70vh] flex flex-col justify-center items-center px-5 py-12">
        <Loader2 className="size-10 animate-spin text-secondary" />
      </main>
    )
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
              <p className="text-sm text-white/70">Please enter credentials to access kitchen administration.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="admin@marudeni.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-border font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Password</label>
                <input
                  required
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-border font-medium"
                />
              </div>

              {error && <p className="text-xs font-semibold text-red-400 text-center">{error}</p>}
              
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-border py-3.5 font-bold text-primary hover:bg-[#C99A3D]/90 hover:scale-[1.02] transition-all shadow-md mt-2 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Unlocking...
                  </>
                ) : (
                  'Unlock Dashboard'
                )}
              </button>
            </form>

            <div className="flex justify-between items-center text-xs mt-4">
              <Link href="/admin/forgot-password" style={{ color: '#C99A3D' }} className="hover:underline font-bold">
                Forgot password?
              </Link>
              <Link href="/" className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors">
                <ArrowLeft className="size-3.5" /> Back to Storefront
              </Link>
            </div>
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
                Manage your digital kitchen catalog. Add, edit, or remove categories and delicacies.
              </p>
              <div className="flex items-center gap-1 text-xs text-white/60 mt-3 font-semibold">
                <User className="size-3.5 text-border" /> Logged in as: <span className="text-white">{adminEmail}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="sm:self-end rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-all shrink-0"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Panel */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="rounded-3xl border border-border/30 bg-card p-6 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-primary/60 uppercase tracking-wider">Total Orders</span>
          <span className="text-3xl font-black text-primary mt-2">{totalOrders}</span>
        </div>
        <div className="rounded-3xl border border-border/30 bg-card p-6 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-primary/60 uppercase tracking-wider">Total Revenue</span>
          <span className="text-3xl font-black text-border mt-2">{money(totalSales)}</span>
        </div>
        <div className="rounded-3xl border border-border/30 bg-card p-6 shadow-sm flex flex-col justify-between sm:col-span-2">
          <span className="text-xs font-bold text-primary/60 uppercase tracking-wider">Database Status</span>
          <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 mt-2 self-start inline-flex items-center gap-1.5">
            ● Connected to Neon DB
          </span>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => { resetForm(); setIsDelicacyModalOpen(true); }}
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:scale-105 transition-all shadow-md"
        >
          <Plus className="size-4" /> Add Delicacy
        </button>
        <button
          onClick={() => setIsCategoryModalOpen(true)}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-bold text-primary hover:bg-secondary hover:text-white transition-all shadow-sm"
        >
          <Folder className="size-4" /> Manage Categories
        </button>
        <button
          onClick={() => { setProfileError(''); setProfileSuccess(''); setIsProfileModalOpen(true); }}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-bold text-primary hover:bg-secondary hover:text-white transition-all shadow-sm"
        >
          <User className="size-4" /> Profile Settings
        </button>
        <button
          onClick={() => { fetchMenu(); fetchCategories(); fetchOrders() }}
          className="flex items-center gap-1.5 rounded-full border border-border/40 bg-card px-5 py-3 text-sm font-bold text-primary/70 hover:text-primary transition-all ml-auto"
        >
          <RotateCcw className="size-3.5" /> Refresh
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-1">
        {/* Delicacies List */}
        <div className="rounded-3xl border border-border/30 bg-card p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/20 pb-4">
            <h2 className="font-serif text-2xl font-bold text-primary">Store Delicacies</h2>
            
            {/* Search Input */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40 size-4" />
              <input
                type="text"
                placeholder="Search delicacies..."
                value={delicacySearch}
                onChange={(e) => setDelicacySearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border/40 bg-background text-primary placeholder-primary/45 text-xs focus:outline-none focus:border-border font-medium shadow-sm transition-all"
              />
            </div>
          </div>

          {isLoadingMenu ? (
            <div className="flex justify-center py-12">
              <Loader2 className="size-8 animate-spin text-secondary" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 text-primary/60">
              No delicacies matching your filter.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item) => (
                <div key={item.id} className="group relative flex flex-col justify-between rounded-2xl border border-border/30 bg-background/50 p-4 shadow-sm hover:shadow-md hover:border-border/60 transition-all">
                  <div className="space-y-3">
                    <div className="relative h-40 w-full overflow-hidden rounded-xl border border-border/20 bg-background">
                      <Image src={item.image} alt={item.name} fill className="object-cover transition duration-300 group-hover:scale-102" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{item.category}</span>
                      <h3 className="font-serif text-base font-bold text-primary leading-tight mt-0.5">{item.name}</h3>
                      <p className="text-xs text-primary/70 line-clamp-2 mt-1">{item.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/20 pt-3 mt-4">
                    <span className="text-sm font-bold text-border">{money(item.price)}</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex size-8 items-center justify-center rounded-full border border-border/40 hover:bg-secondary text-primary hover:text-white transition-all"
                        title="Edit Item"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex size-8 items-center justify-center rounded-full border border-red-200/50 hover:bg-red-500 text-primary hover:text-white transition-all"
                        title="Delete Item"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders Section */}
        {orders.length > 0 && (
          <div className="rounded-3xl border border-border/30 bg-card p-6 md:p-8 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-4">Recent Store Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border/20 text-primary/60 text-xs uppercase font-bold">
                    <th className="pb-3">Ref Code</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Method</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/10">
                  {orders.map((order) => (
                    <tr key={order.id} className="text-primary hover:bg-secondary/5 transition-colors">
                      <td className="py-4 font-mono font-bold text-border text-xs">{order.id}</td>
                      <td className="py-4">
                        <div className="font-semibold">{order.name}</div>
                        <div className="text-xs text-primary/60 max-w-[250px] truncate">{order.notes || 'No notes'}</div>
                      </td>
                      <td className="py-4 text-xs">
                        <div>{order.phone}</div>
                        <div className="text-primary/60">{order.email}</div>
                      </td>
                      <td className="py-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.method === 'delivery' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {order.method}
                        </span>
                      </td>
                      <td className="py-4 font-bold text-primary">{money(order.total)}</td>
                      <td className="py-4 text-xs text-primary/60">{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: Add/Edit Delicacy */}
      {isDelicacyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-card border border-border/30 rounded-[2rem] shadow-2xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-fade-in">
            <button
              onClick={() => setIsDelicacyModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border border-border/40 hover:bg-secondary text-primary hover:text-white transition-all"
            >
              <X className="size-4" />
            </button>
            
            <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-4 mb-6">
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
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-semibold"
                >
                  {categories.map((cat) => (
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
                    <label className="cursor-pointer flex items-center gap-2 rounded-full bg-secondary/15 hover:bg-secondary/25 px-4 py-2 text-xs font-bold text-primary border border-border/20 transition-all">
                      <Upload className="size-3.5" />
                      {isUploading ? 'Uploading...' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {isUploading && <Loader2 className="size-4 animate-spin text-secondary" />}
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
                  className="w-full min-h-24 rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-medium resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isUploading}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-border px-5 py-3 font-bold text-primary hover:bg-[#C99A3D]/90 hover:scale-[1.02] transition-all shadow-md disabled:opacity-50"
                >
                  <Save className="size-4" /> Save Delicacy
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-border/40 px-5 py-3 text-sm font-bold text-primary hover:bg-secondary/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Manage Categories */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-card border border-border/30 rounded-[2rem] shadow-2xl p-6 sm:p-8 max-w-md w-full max-h-[80vh] overflow-y-auto relative animate-fade-in">
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border border-border/40 hover:bg-secondary text-primary hover:text-white transition-all"
            >
              <X className="size-4" />
            </button>
            
            <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-4 mb-6">
              Manage Categories
            </h2>
            
            <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
              <input
                required
                type="text"
                placeholder="New Category Name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 rounded-xl border border-border/40 bg-background px-4 py-2 text-sm focus:outline-none focus:border-border text-primary font-medium"
              />
              <button type="submit" className="rounded-xl bg-primary px-4 py-2 font-bold text-primary-foreground hover:scale-105 transition-all text-xs">
                Add
              </button>
            </form>

            <div className="divide-y divide-border/20 max-h-60 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center justify-between py-2.5">
                  <span className="text-sm font-semibold text-primary">{cat}</span>
                  {cat !== 'Rice Dishes' && cat !== 'Soups & Stews' && cat !== 'Sides & Small Plates' && cat !== 'Sweet Things' && (
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      className="text-red-500 hover:text-red-700 p-1 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Profile Settings (Change Password) */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-card border border-border/30 rounded-[2rem] shadow-2xl p-6 sm:p-8 max-w-md w-full max-h-[85vh] overflow-y-auto relative animate-fade-in">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full border border-border/40 hover:bg-secondary text-primary hover:text-white transition-all"
            >
              <X className="size-4" />
            </button>
            
            <h2 className="font-serif text-2xl font-bold text-primary border-b border-border/20 pb-4 mb-6">
              Profile Settings
            </h2>

            <div className="space-y-6">
              {/* Account details */}
              <div className="p-4 rounded-2xl bg-secondary/5 border border-border/20 space-y-2">
                <span className="text-[10px] font-bold text-primary/50 uppercase tracking-wider">Account Information</span>
                <div className="text-sm text-primary font-medium flex items-center gap-1.5">
                  <User className="size-4 text-border" />
                  <span>{adminEmail}</span>
                </div>
                <div className="text-[11px] text-primary/60">Administrator account with full permissions.</div>
              </div>

              {/* Password update form */}
              <form onSubmit={handleChangePassword} className="space-y-4 text-left">
                <h3 className="font-serif text-base font-bold text-primary border-t border-border/10 pt-4">Change Password</h3>
                
                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Current Password</label>
                  <input
                    required
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">New Password</label>
                  <input
                    required
                    type="password"
                    placeholder="Min 5 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Confirm New Password</label>
                  <input
                    required
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm focus:outline-none focus:border-border text-primary font-medium"
                  />
                </div>

                {profileError && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                    <span>● {profileError}</span>
                  </div>
                )}

                {profileSuccess && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                    <span>● {profileSuccess}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-border py-3 font-bold text-primary hover:bg-[#C99A3D]/90 hover:scale-[1.01] transition-all shadow-md disabled:opacity-50 mt-2"
                >
                  {isUpdatingPassword ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
