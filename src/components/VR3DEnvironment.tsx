
import { ReactNode } from 'react'

interface VR3DEnvironmentProps {
  rotation: { x: number; y: number }
  position: { x: number; y: number; z: number }
  children: ReactNode
}

export const VR3DEnvironment = ({ rotation, position, children }: VR3DEnvironmentProps) => {
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
      
      {/* Enhanced Grid Floor with texture */}
      <div 
        className="absolute"
        style={{
          width: '2000px',
          height: '2000px',
          transform: 'rotateX(90deg) translateZ(-200px)',
          background: `
            radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 1px, transparent 2px),
            linear-gradient(0deg, rgba(0, 255, 255, 0.05) 50%, transparent 50%),
            linear-gradient(90deg, rgba(0, 255, 255, 0.05) 50%, transparent 50%)
          `,
          backgroundSize: '40px 40px, 200px 200px, 200px 200px',
          opacity: 0.3
        }}
      />
      
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateZ(${Math.random() * 1000 - 500}px)`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Holographic horizon lines */}
      <div 
        className="absolute"
        style={{
          width: '3000px',
          height: '3000px',
          transform: 'rotateX(90deg) translateZ(-400px)',
          background: `
            repeating-conic-gradient(
              from 0deg at center,
              transparent 0deg,
              rgba(0, 255, 255, 0.1) 1deg,
              transparent 2deg,
              transparent 88deg,
              rgba(0, 255, 255, 0.1) 90deg,
              transparent 92deg
            )
          `,
          opacity: 0.2
        }}
      />
    </div>
  )
}
