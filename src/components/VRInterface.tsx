
import { useState, useRef } from 'react'
import { VRModal } from './VRModal'
import { VR3DEnvironment } from './VR3DEnvironment'
import { VRNavigationControls } from './VRNavigationControls'
import { VRPanelHub } from './VRPanelHub'
import { VRAIAssistant } from './VRAIAssistant'

interface VRInterfaceProps {
  onConfigSaved?: (config: any) => void
}

export const VRInterface = ({ onConfigSaved }: VRInterfaceProps) => {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [modalPositions, setModalPositions] = useState<Record<string, { x: number; y: number; z: number }>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePanelClick = (panelType: string) => {
    setActivePanel(panelType)
    if (!modalPositions[panelType]) {
      const positions = {
        terminal: { x: -200, y: 0, z: 150 },
        exploits: { x: 200, y: 0, z: 150 },
        sessions: { x: -200, y: 200, z: 150 },
        settings: { x: 200, y: 200, z: 150 },
        chat: { x: 0, y: 0, z: 200 }
      }
      setModalPositions(prev => ({
        ...prev,
        [panelType]: positions[panelType as keyof typeof positions] || { x: 0, y: 0, z: 150 }
      }))
    }
  }

  const handleAIAssistantClick = () => {
    setActivePanel('chat')
    if (!modalPositions['chat']) {
      setModalPositions(prev => ({
        ...prev,
        chat: { x: 0, y: 0, z: 200 }
      }))
    }
  }

  const handleModalPositionChange = (modalType: string, newPosition: { x: number; y: number; z: number }) => {
    setModalPositions(prev => ({
      ...prev,
      [modalType]: newPosition
    }))
  }

  const closeModal = () => {
    setActivePanel(null)
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        background: `
          radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #000011 0%, #000033 50%, #000011 100%)
        `
      }}
    >
      <VRNavigationControls
        containerRef={containerRef}
        rotation={rotation}
        setRotation={setRotation}
        position={position}
        setPosition={setPosition}
      />

      <VR3DEnvironment rotation={rotation} position={position}>
        <VRPanelHub onPanelClick={handlePanelClick} activePanel={activePanel} />
        <VRAIAssistant onClick={handleAIAssistantClick} />
      </VR3DEnvironment>

      {activePanel && (
        <VRModal
          isOpen={true}
          onClose={closeModal}
          type={activePanel as 'settings' | 'terminal' | 'exploits' | 'sessions' | 'chat'}
          onConfigSaved={onConfigSaved}
          is3DMode={true}
          position={modalPositions[activePanel] || { x: 0, y: 0, z: 100 }}
          onPositionChange={(newPosition) => handleModalPositionChange(activePanel, newPosition)}
        />
      )}
    </div>
  )
}
