
import { useState, useRef } from 'react'
import { VRModal } from './VRModal'
import { VR3DScene } from './VR3DScene'
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
    // Set initial position for new modals
    if (!modalPositions[panelType]) {
      setModalPositions(prev => ({
        ...prev,
        [panelType]: { x: 0, y: 0, z: 100 }
      }))
    }
  }

  const handleAIAssistantClick = () => {
    setActivePanel('chat')
    if (!modalPositions['chat']) {
      setModalPositions(prev => ({
        ...prev,
        chat: { x: 0, y: 0, z: 150 }
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
        perspective: '1000px',
        perspectiveOrigin: '50% 50%'
      }}
    >
      <VRNavigationControls
        containerRef={containerRef}
        rotation={rotation}
        setRotation={setRotation}
        position={position}
        setPosition={setPosition}
      />

      <VR3DScene rotation={rotation} position={position}>
        <VRPanelHub onPanelClick={handlePanelClick} />
        <VRAIAssistant onClick={handleAIAssistantClick} />
      </VR3DScene>

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
