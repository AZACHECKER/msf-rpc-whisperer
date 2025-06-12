
import { useEffect, RefObject } from 'react'

interface VRNavigationControlsProps {
  containerRef: RefObject<HTMLDivElement>
  rotation: { x: number; y: number }
  setRotation: (rotation: { x: number; y: number }) => void
  position: { x: number; y: number; z: number }
  setPosition: (position: { x: number; y: number; z: number }) => void
}

export const VRNavigationControls = ({ 
  containerRef, 
  rotation, 
  setRotation, 
  position, 
  setPosition 
}: VRNavigationControlsProps) => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.buttons === 1) { // Left mouse button held
        setRotation({
          x: rotation.x + e.movementY * 0.5,
          y: rotation.y + e.movementX * 0.5
        })
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setPosition({
        ...position,
        z: Math.max(-2000, Math.min(2000, position.z + e.deltaY))
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('wheel', handleWheel)
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [containerRef, rotation, setRotation, position, setPosition])

  return null // This component only handles events
}
