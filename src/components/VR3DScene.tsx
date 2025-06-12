
import { ReactNode } from 'react'

interface VR3DSceneProps {
  rotation: { x: number; y: number }
  position: { x: number; y: number; z: number }
  children: ReactNode
}

export const VR3DScene = ({ rotation, position, children }: VR3DSceneProps) => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${position.z}px)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
      
      {/* Grid Floor */}
      <div 
        className="absolute"
        style={{
          width: '1000px',
          height: '1000px',
          transform: 'rotateX(90deg) translateZ(150px)',
          background: 'radial-gradient(circle, rgba(8, 47, 73, 0.3) 1px, transparent 1px) 0 0 / 40px 40px'
        }}
      />
    </div>
  )
}
