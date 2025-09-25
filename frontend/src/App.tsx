import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/Login'
import { DashboardPage } from './pages/Dashboard'
import { SignupPage } from './pages/Signup'
import { ChangePasswordPage } from './pages/ChangePassword'
import { AppLayout } from './components/AppLayout'
import { useAuthStore } from './store/auth'
import { ProjectCreatePage } from './pages/ProjectCreate'
import { ProjectDetailPage } from './pages/ProjectDetail'
import { ProjectEditPage } from './pages/ProjectEdit'
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
      <Route path="/signup" element={<SignupPage />} />
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
        <Route path="account/password" element={<ChangePasswordPage />} />
        <Route path="projects/:projectId" element={<ProjectDetailPage />} />
        <Route path="projects/:projectId/edit" element={<ProjectEditPage />} />
        <Route path="gallery" element={<Gallery />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
