
import { useSystemData } from '@/hooks/useSystemData'

interface VRPanelHubProps {
  onPanelClick: (panelType: string) => void
}

export const VRPanelHub = ({ onPanelClick }: VRPanelHubProps) => {
  const { activeSessions, vulnerabilities, exploitsInQueue, networkNodes } = useSystemData()

  return (
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
        onClick={() => onPanelClick('terminal')}
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
        onClick={() => onPanelClick('exploits')}
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
        onClick={() => onPanelClick('sessions')}
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
        onClick={() => onPanelClick('settings')}
      >
        <h3 className="text-purple-400 font-bold mb-2">SETTINGS</h3>
        <p className="text-purple-300 text-sm">Configuration</p>
        <div className="mt-2 text-purple-300/70 text-xs">Click to open</div>
      </div>
    </div>
  )
}
