import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Gallery } from '../components/Gallery'
import { useEffect, useState } from 'react'
import { api } from '../lib/api'

interface LayoutVariant { id: number; label: string; image_url?: string }
interface Project { id: number; name: string; status: string; budget?: number; style?: string; variants: LayoutVariant[] }

export function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    api.get('/projects').then(({ data }) => setProjects(data))
  }, [])
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <Link to="/projects/new"><Button>New Project</Button></Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="space-y-3 text-gray-600">
                <div>No projects yet. Create your first project.</div>
                <Link to="/projects/new"><Button>New Project</Button></Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <Link key={p.id} to={`/projects/${p.id}`} className="block">
                    <div className="rounded-lg border bg-white hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{p.name}</div>
                          <span className="text-xs rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">{p.status}</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">{p.style ?? '—'} {p.budget ? `• $${p.budget}` : ''}</div>
                      </div>
                      {p.variants?.[0]?.image_url ? (
                        <img src={p.variants[0].image_url} className="w-full h-40 object-cover rounded-b" />
                      ) : (
                        <div className="h-40 bg-gray-50 rounded-b flex items-center justify-center text-gray-400 text-sm">No preview</div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Inspiration</CardTitle>
          </CardHeader>
          <CardContent>
            <Gallery />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


