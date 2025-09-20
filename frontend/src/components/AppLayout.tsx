import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { Button } from './ui/Button'

export function AppLayout() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight">HavenlyAI</Link>
          <nav className="flex items-center gap-6 text-sm text-gray-700">
            <Link to="/" className="hover:text-gray-900">Dashboard</Link>
            <Link to="/projects/new" className="hover:text-gray-900">New Project</Link>
            <Link to="/account/password" className="hover:text-gray-900">Change password</Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}


