'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setError('')
    setMessage('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'If that email exists, we have sent a reset link.')
      } else {
        setStatus('error')
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      setError('Connection error. Please check your network and try again.')
    }
  }

  return (
    <main className="min-h-[80vh] flex flex-col justify-center items-center px-5 py-12">
      <div className="w-full max-w-md rounded-[2rem] bg-secondary border border-border/30 p-8 shadow-xl text-center relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
          <Image src="/logo.svg" alt="watermark" width={200} height={200} />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-border">
            <Mail className="size-6" />
          </div>

          <div className="space-y-1.5">
            <h1 className="font-serif text-2xl font-black text-white uppercase tracking-wider">Reset Password</h1>
            <p className="text-sm text-white/70">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {status === 'success' ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm text-left">
                <CheckCircle2 className="size-5 shrink-0" />
                <p>{message}</p>
              </div>
              <Link
                href="/admin"
                className="block w-full text-center rounded-full bg-border py-3.5 font-bold text-primary hover:bg-[#C99A3D]/90 hover:scale-[1.02] transition-all shadow-md"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="admin@marudeni.com"
                  value={email}
                  disabled={status === 'loading'}
                  onChange={(e) => setEmail(e.target.value)}
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
                    Sending link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <div className="text-center mt-4">
                <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors">
                  <ArrowLeft className="size-3.5" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
