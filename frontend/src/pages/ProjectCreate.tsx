import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Label } from '../components/ui/Label'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Button } from '../components/ui/Button'

export function ProjectCreatePage() {
  const [name, setName] = useState('')
  const [budget, setBudget] = useState<number | ''>('')
  const [style, setStyle] = useState('modern')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const form = new FormData()
      form.append('name', name)
      if (budget !== '') form.append('budget', String(budget))
      form.append('style', style)
      if (file) form.append('file', file)
      const { data } = await api.post('/projects', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      navigate(`/projects/${data.id}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="E.g. 2BHK layout redesign" />
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
          <div>
            <Label htmlFor="file">Floor plan (image/PDF)</Label>
            <input id="file" type="file" accept="image/*,.pdf" onChange={(e)=> setFile(e.target.files?.[0] ?? null)} />
          </div>
          <div className="pt-2">
            <Button disabled={loading} type="submit">
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}


