import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0'
    container.appendChild(renderer.domElement)

    const geometry = new THREE.IcosahedronGeometry(3, 1)
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3b82f6'),
      roughness: 0.35,
      metalness: 0.4,
      transparent: true,
      opacity: 0.9,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const wire = new THREE.WireframeGeometry(geometry)
    const line = new THREE.LineSegments(
      wire,
      new THREE.LineBasicMaterial({ color: '#93c5fd', transparent: true, opacity: 0.25 }),
    )
    scene.add(line)

    const ambient = new THREE.AmbientLight('#ffffff', 0.6)
    scene.add(ambient)

    const dir = new THREE.DirectionalLight('#60a5fa', 1.0)
    dir.position.set(5, 5, 5)
    scene.add(dir)

    const back = new THREE.DirectionalLight('#1d4ed8', 0.6)
    back.position.set(-3, -2, -5)
    scene.add(back)

    let t = 0
    const animate = () => {
      t += 0.005
      mesh.rotation.x += 0.003
      mesh.rotation.y += 0.004
      line.rotation.copy(mesh.rotation)
      mesh.position.y = Math.sin(t) * 0.2
      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', onResize)
      container.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      wire.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden" />
  )
}


