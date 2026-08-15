'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      setStatus('error')
      setError('Verification token is missing. Please request a new reset link.')
      return
    }

    if (password.length < 5) {
      setStatus('error')
      setError('Password must be at least 5 characters long.')
      return
    }

    if (password !== confirmPassword) {
      setStatus('error')
      setError('Passwords do not match.')
      return
    }

    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
        setError(data.error || 'Failed to reset password. The link might have expired.')
      }
    } catch (err) {
      setStatus('error')
      setError('Connection error. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-left">
          <CheckCircle2 className="size-5 shrink-0" />
          <p>Your password has been reset successfully.</p>
        </div>
        <Link
          href="/admin"
          className="block w-full text-center rounded-full bg-border py-3.5 font-bold text-primary hover:bg-[#C99A3D]/90 hover:scale-[1.02] transition-all shadow-md"
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1">New Password</label>
        <input
          required
          type="password"
          placeholder="Min 5 characters"
          value={password}
          disabled={status === 'loading'}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-border font-medium disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Confirm New Password</label>
        <input
          required
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          disabled={status === 'loading'}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-border font-medium disabled:opacity-50"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
          <AlertCircle className="size-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-border py-3.5 font-bold text-primary hover:bg-[#C99A3D]/90 hover:scale-[1.02] transition-all shadow-md disabled:opacity-50 mt-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Updating password...
          </>
        ) : (
          'Update Password'
        )}
      </button>
    </form>
  )
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center px-5 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-secondary border border-border/30 p-8 shadow-xl text-center relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
          <Image src="/logo.svg" alt="watermark" width={200} height={200} />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-border">
            <Lock className="size-6" />
          </div>

          <div className="space-y-1.5">
            <h1 className="font-serif text-2xl font-black text-white uppercase tracking-wider">Choose New Password</h1>
            <p className="text-sm text-white/70">
              Please enter and confirm your new secure password.
            </p>
          </div>

          <Suspense fallback={<Loader2 className="size-8 animate-spin mx-auto text-secondary" />}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
