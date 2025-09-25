import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Label } from '../components/ui/Label'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Button } from '../components/ui/Button'

interface ProjectDetail {
  id: string
  name: string
  status: 'processing' | 'ready' | 'failed'
  budget?: number
  style?: string
}

export function ProjectEditPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [name, setName] = useState('')
  const [budget, setBudget] = useState<number | ''>('')
  const [style, setStyle] = useState('modern')

  useEffect(() => {
    if (!projectId) return
    api.get(`/projects/${projectId}`).then(({ data }) => {
      setProject(data)
      setName(data.name)
      setBudget(typeof data.budget === 'number' ? data.budget : '')
      setStyle(data.style || 'modern')
    })
  }, [projectId])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectId) return
    setLoading(true)
    try {
      await api.put(`/projects/${projectId}`, {
        name,
        budget: budget === '' ? null : budget,
        style,
      })
      navigate(`/projects/${projectId}`)
    } finally {
      setLoading(false)
    }
  }

  if (!project) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="budget">Budget ($)</Label>
            <Input id="budget" type="number" value={budget} onChange={(e)=>setBudget(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Optional" />
          </div>
          <div>
            <Label htmlFor="style">Style</Label>
            <Select id="style" value={style} onChange={(e)=>setStyle(e.target.value)}>
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
              <option value="industrial">Industrial</option>
              <option value="boho">Boho</option>
            </Select>
          </div>
          <div className="pt-2 flex gap-3">
            <Button disabled={loading} type="submit">{loading ? 'Saving...' : 'Save changes'}</Button>
            <Button variant="ghost" type="button" onClick={()=>navigate(-1)}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}


