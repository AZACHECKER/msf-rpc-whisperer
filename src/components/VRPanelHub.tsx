
import { useSystemData } from '@/hooks/useSystemData'
import { VRHolographicPanel } from './VRHolographicPanel'
import { VRCentralConsole } from './VRCentralConsole'

interface VRPanelHubProps {
  onPanelClick: (panelType: string) => void
  activePanel?: string | null
}

export const VRPanelHub = ({ onPanelClick, activePanel }: VRPanelHubProps) => {
  const { activeSessions, exploitsInQueue } = useSystemData()

  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      {/* Central Console */}
      <VRCentralConsole />

      {/* Terminal Panel */}
      <VRHolographicPanel
        title="TERMINAL"
        color="green"
        position="translateX(-300px) translateY(-100px) rotateY(-15deg) translateZ(50px)"
        onClick={() => onPanelClick('terminal')}
        isActive={activePanel === 'terminal'}
      >
        <p className="text-green-300 text-sm">Execute Commands</p>
        <div className="mt-2 text-green-300/70 text-xs">
          Neural Command Interface
        </div>
        <div className="absolute bottom-2 right-2 text-green-400/50 text-xs">
          msfconsole&gt;
        </div>
      </VRHolographicPanel>

      {/* Exploits Panel */}
      <VRHolographicPanel
        title="EXPLOITS"
        color="red"
        position="translateX(300px) translateY(-100px) rotateY(15deg) translateZ(50px)"
        onClick={() => onPanelClick('exploits')}
        isActive={activePanel === 'exploits'}
      >
        <p className="text-orange-300 text-sm">Queue: {exploitsInQueue}</p>
        <div className="mt-2 text-orange-300/70 text-xs">
          Payload Arsenal
        </div>
        <div className="absolute bottom-2 right-2">
          <div className="w-6 h-6 border border-red-400/50 rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-red-400 rounded animate-pulse" />
          </div>
        </div>
      </VRHolographicPanel>

      {/* Sessions Panel */}
      <VRHolographicPanel
        title="SESSIONS"
        color="blue"
        position="translateX(-300px) translateY(100px) rotateY(-15deg) translateZ(50px)"
        onClick={() => onPanelClick('sessions')}
        isActive={activePanel === 'sessions'}
      >
        <p className="text-blue-300 text-sm">Active: {activeSessions}</p>
        <div className="mt-2 text-blue-300/70 text-xs">
          Remote Connections
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1">
          {Array.from({ length: Math.min(activeSessions, 3) }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
          ))}
        </div>
      </VRHolographicPanel>

      {/* Settings Panel */}
      <VRHolographicPanel
        title="SETTINGS"
        color="purple"
        position="translateX(300px) translateY(100px) rotateY(15deg) translateZ(50px)"
        onClick={() => onPanelClick('settings')}
        isActive={activePanel === 'settings'}
      >
        <p className="text-purple-300 text-sm">Configuration</p>
        <div className="mt-2 text-purple-300/70 text-xs">
          System Parameters
        </div>
        <div className="absolute bottom-2 right-2">
          <div className="w-4 h-4 border border-purple-400/50 rounded-full animate-spin">
            <div className="w-1 h-1 bg-purple-400 rounded-full" />
          </div>
        </div>
      </VRHolographicPanel>
    </div>
  )
}
