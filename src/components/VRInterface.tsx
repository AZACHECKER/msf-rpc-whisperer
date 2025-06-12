
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
  const containerRef = useRef<HTMLDivElement>(null)

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
      <VRNavigationControls
        containerRef={containerRef}
        rotation={rotation}
        setRotation={setRotation}
        position={position}
        setPosition={setPosition}
      />

      <VR3DScene rotation={rotation} position={position}>
        <VRPanelHub onPanelClick={handlePanelClick} />
        <VRAIAssistant />
      </VR3DScene>

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
