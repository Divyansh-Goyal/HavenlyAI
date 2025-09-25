import { Card, CardContent } from './ui/Card'

const PRESETS = [
  {
    title: 'Modern Bed Room',
    url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Minimal Kitchen',
    url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Industrial Loft',
    url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
  },
]

const FALLBACK = 'https://source.unsplash.com/featured/1200x800?interior,design'

export function Gallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {PRESETS.map((p) => (
        <Card key={p.title} className="group">
          <CardContent className="p-0">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
              <img
                src={p.url}
                alt={p.title}
                loading="lazy"
                decoding="async"
                onError={(e)=>{ (e.currentTarget as HTMLImageElement).src = FALLBACK; (e.currentTarget as HTMLImageElement).onerror = null }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="px-6 py-3">
              <div className="text-sm text-gray-700">{p.title}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


