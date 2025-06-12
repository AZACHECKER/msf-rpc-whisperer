
import { useState, useRef, useEffect } from 'react'
import { useSystemData } from '@/hooks/useSystemData'
import { VRModal } from './VRModal'

interface VRInterfaceProps {
  onConfigSaved?: (config: any) => void
}

export const VRInterface = ({ onConfigSaved }: VRInterfaceProps) => {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { activeSessions, vulnerabilities, exploitsInQueue, networkNodes } = useSystemData()

  // Mouse controls for 3D navigation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.buttons === 1) { // Left mouse button held
        setRotation(prev => ({
          x: prev.x + e.movementY * 0.5,
          y: prev.y + e.movementX * 0.5
        }))
      }
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setPosition(prev => ({
        ...prev,
        z: Math.max(-2000, Math.min(2000, prev.z + e.deltaY))
      }))
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
  }, [])

  const handlePanelClick = (panelType: string) => {
    setActivePanel(panelType)
  }

  const closeModal = () => {
    setActivePanel(null)
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        perspective: '1000px',
        perspectiveOrigin: '50% 50%'
      }}
    >
      {/* 3D Scene Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(${position.z}px)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Central Hub */}
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          
          {/* Main Console */}
          <div 
            className="absolute bg-gradient-to-br from-cyan-900/80 to-blue-900/80 backdrop-blur-sm border border-cyan-400/50 rounded-lg p-6 cursor-pointer hover:scale-105 transition-all duration-300"
            style={{
              width: '400px',
              height: '250px',
              transform: 'translateZ(0px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <h2 className="text-cyan-400 text-xl font-bold mb-4 text-center">METASPLOIT AI CONSOLE</h2>
            <div className="space-y-2 text-sm">
              <div className="text-green-400">Active Sessions: {activeSessions}</div>
              <div className="text-orange-400">Vulnerabilities: {vulnerabilities}</div>
              <div className="text-yellow-400">Network Nodes: {networkNodes}</div>
              <div className="text-red-400">Exploits in Queue: {exploitsInQueue}</div>
            </div>
          </div>

          {/* Terminal Panel */}
          <div 
            className="absolute bg-gradient-to-br from-green-900/80 to-emerald-900/80 backdrop-blur-sm border border-green-400/50 rounded-lg p-4 cursor-pointer hover:scale-105 transition-all duration-300"
            style={{
              width: '200px',
              height: '150px',
              transform: 'translateX(-300px) translateY(-100px) rotateY(-15deg) translateZ(50px)',
            }}
            onClick={() => handlePanelClick('terminal')}
          >
            <h3 className="text-green-400 font-bold mb-2">TERMINAL</h3>
            <p className="text-green-300 text-sm">Execute Commands</p>
            <div className="mt-2 text-green-300/70 text-xs">Click to open</div>
          </div>

          {/* Exploits Panel */}
          <div 
            className="absolute bg-gradient-to-br from-red-900/80 to-orange-900/80 backdrop-blur-sm border border-red-400/50 rounded-lg p-4 cursor-pointer hover:scale-105 transition-all duration-300"
            style={{
              width: '200px',
              height: '150px',
              transform: 'translateX(300px) translateY(-100px) rotateY(15deg) translateZ(50px)',
            }}
            onClick={() => handlePanelClick('exploits')}
          >
            <h3 className="text-orange-400 font-bold mb-2">EXPLOITS</h3>
            <p className="text-orange-300 text-sm">Queue: {exploitsInQueue}</p>
            <div className="mt-2 text-orange-300/70 text-xs">Click to open</div>
          </div>

          {/* Sessions Panel */}
          <div 
            className="absolute bg-gradient-to-br from-blue-900/80 to-indigo-900/80 backdrop-blur-sm border border-blue-400/50 rounded-lg p-4 cursor-pointer hover:scale-105 transition-all duration-300"
            style={{
              width: '200px',
              height: '150px',
              transform: 'translateX(-300px) translateY(100px) rotateY(-15deg) translateZ(50px)',
            }}
            onClick={() => handlePanelClick('sessions')}
          >
            <h3 className="text-blue-400 font-bold mb-2">SESSIONS</h3>
            <p className="text-blue-300 text-sm">Active: {activeSessions}</p>
            <div className="mt-2 text-blue-300/70 text-xs">Click to open</div>
          </div>

          {/* Settings Panel */}
          <div 
            className="absolute bg-gradient-to-br from-purple-900/80 to-fuchsia-900/80 backdrop-blur-sm border border-purple-400/50 rounded-lg p-4 cursor-pointer hover:scale-105 transition-all duration-300"
            style={{
              width: '200px',
              height: '150px',
              transform: 'translateX(300px) translateY(100px) rotateY(15deg) translateZ(50px)',
            }}
            onClick={() => handlePanelClick('settings')}
          >
            <h3 className="text-purple-400 font-bold mb-2">SETTINGS</h3>
            <p className="text-purple-300 text-sm">Configuration</p>
            <div className="mt-2 text-purple-300/70 text-xs">Click to open</div>
          </div>
        </div>
        
        {/* AI Assistant Hologram */}
        <div 
          className="absolute"
          style={{
            transform: 'translateY(-300px) translateZ(100px)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400 animate-pulse"
              style={{ 
                animation: 'pulse 2s infinite ease-in-out',
                boxShadow: '0 0 15px 5px rgba(6, 182, 212, 0.3)'
              }}
            />
            <div className="absolute top-full mt-2 text-center w-full">
              <span className="text-cyan-400 text-sm">AI ASSISTANT</span>
            </div>
          </div>
        </div>

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

      {/* 3D Modal Windows */}
      {activePanel && (
        <VRModal
          isOpen={true}
          onClose={closeModal}
          type={activePanel as 'settings' | 'terminal' | 'exploits' | 'sessions'}
          onConfigSaved={onConfigSaved}
          is3DMode={true}
        />
      )}
    </div>
  )
}
