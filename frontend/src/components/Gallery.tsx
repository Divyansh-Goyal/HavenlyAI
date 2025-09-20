import { Card, CardContent } from './ui/Card'

const PRESETS = [
  {
    title: 'Modern Living Room',
    url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Minimal Kitchen',
    url: 'https://images.unsplash.com/photo-1505797149-35ebcb05a36f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Industrial Loft',
    url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
  },
]

export function Gallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {PRESETS.map((p) => (
        <Card key={p.title}>
          <CardContent>
            <img src={p.url} alt={p.title} className="w-full h-56 object-cover rounded-md" />
            <div className="mt-2 text-sm text-gray-700">{p.title}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


