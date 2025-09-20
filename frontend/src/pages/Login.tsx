import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuthStore } from '../store/auth'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Button } from '../components/ui/Button'
import { ThreeBackground } from '../components/ThreeBackground'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      // TODO: replace with real auth endpoint
      const { data } = await api.post('/auth/login', { email, password })
      login({ token: data.token, user: data.user })
      navigate('/')
    } catch (err: unknown) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white">
      <ThreeBackground />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(29,78,216,0.08),transparent_40%)]" />
      <form onSubmit={onSubmit} className="w-full max-w-sm backdrop-blur-lg bg-white/70 border border-white/60 shadow-[0_10px_40px_-10px_rgba(59,130,246,0.25)] p-6 rounded-2xl relative">
        <h1 className="text-2xl font-semibold mb-6 tracking-tight text-gray-900">Welcome back</h1>
        <div className="space-y-2 mb-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="space-y-2 mb-6">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
        <Button disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        <p className="text-xs text-gray-500 mt-4">
          Use admin@example.com / admin
        </p>
      </form>
    </div>
  )
}


