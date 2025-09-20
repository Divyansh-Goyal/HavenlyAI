import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Skeleton } from '../components/ui/Skeleton'

interface LayoutVariant {
  id: string
  label: string
  image_url?: string
}

interface ProjectDetail {
  id: string
  name: string
  status: 'processing' | 'ready' | 'failed'
  variants: LayoutVariant[]
}

export function ProjectDetailPage() {
  const { projectId } = useParams()
  const [project, setProject] = useState<ProjectDetail | null>(null)

  useEffect(() => {
    if (!projectId) return
    api.get(`/projects/${projectId}`).then((res) => setProject(res.data))
  }, [projectId])

  if (!project) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
        <span className="text-sm rounded-full bg-gray-100 px-2 py-1 text-gray-700">{project.status}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {project.variants?.length ? (
          project.variants.map((v) => (
            <Card key={v.id}>
              <CardHeader>
                <CardTitle>{v.label}</CardTitle>
              </CardHeader>
              <CardContent>
                {v.image_url ? (
                  <img src={v.image_url} className="w-full h-48 object-cover rounded" />
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-500 bg-gray-100 rounded">
                    Pending render
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-gray-600">No variants yet.</div>
        )}
      </div>
    </div>
  )
}


