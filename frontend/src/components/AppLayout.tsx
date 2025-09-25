import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth'
import { Button } from './ui/Button'

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path: string) => location.pathname === path

  const userInitial = (user?.email || 'U').slice(0, 1).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-white text-xs">HA</span>
            <span>HavenlyAI</span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link to="/" className={`px-3 py-2 rounded-md hover:bg-gray-100 ${isActive('/') ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>Dashboard</Link>
            <Link to="/projects/new" className={`px-3 py-2 rounded-md hover:bg-gray-100 ${isActive('/projects/new') ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>New Project</Link>
            <Link to="/gallery" className={`px-3 py-2 rounded-md hover:bg-gray-100 ${isActive('/gallery') ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>Gallery</Link>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-700">{userInitial}</div>
              <div className="hidden sm:block text-sm text-gray-700">{user?.email}</div>
            </div>
            <Link to="/account/password" className="hidden sm:block text-sm text-gray-700 hover:text-gray-900">Change password</Link>
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


