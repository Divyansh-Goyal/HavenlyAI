import { useState } from 'react'
import { api } from '../lib/api'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Button } from '../components/ui/Button'

export function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)
    try {
      await api.post('/auth/change-password', { current_password: currentPassword, new_password: newPassword })
      setMessage('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
    } catch (err: unknown) {
      setError('Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-6 tracking-tight text-gray-900">Change password</h1>
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="current">Current password</Label>
          <Input id="current" type="password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new">New password</Label>
          <Input id="new" type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
        </div>
        {message && <div className="text-sm text-green-700">{message}</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
        <Button disabled={loading}>
          {loading ? 'Updating...' : 'Update password'}
        </Button>
      </form>
    </div>
  )
}


