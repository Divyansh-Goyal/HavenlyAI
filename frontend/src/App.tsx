import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/Login'
import { DashboardPage } from './pages/Dashboard'
import { AppLayout } from './components/AppLayout'
import { useAuthStore } from './store/auth'
import { ProjectCreatePage } from './pages/ProjectCreate'
import { ProjectDetailPage } from './pages/ProjectDetail'
import { Gallery } from './components/Gallery'
import type { ReactElement } from 'react'

function PrivateRoute({ children }: { children: ReactElement }) {
  const isAuthenticated = useAuthStore((s) => Boolean(s.token))
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="projects/new" element={<ProjectCreatePage />} />
        <Route path="projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
