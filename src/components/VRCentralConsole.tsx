
import { useSystemData } from '@/hooks/useSystemData'

export const VRCentralConsole = () => {
  const { activeSessions, vulnerabilities, exploitsInQueue, networkNodes } = useSystemData()

  return (
    <div 
      className="absolute bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-md border border-cyan-400/60 rounded-lg overflow-hidden"
      style={{
        width: '500px',
        height: '300px',
        transform: 'translateZ(0px)',
        transformStyle: 'preserve-3d',
        boxShadow: '0 0 40px 10px rgba(6, 182, 212, 0.3), inset 0 0 40px rgba(6, 182, 212, 0.1)'
      }}
    >
      {/* Header with animated text */}
      <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 p-4 border-b border-cyan-400/30">
        <h2 className="text-cyan-400 text-xl font-bold text-center tracking-wider">
          METASPLOIT AI CONSOLE
        </h2>
        <div className="text-center text-cyan-300/70 text-xs mt-1">
          Neural Interface v3.7.2
        </div>
      </div>

      {/* Status Grid */}
      <div className="p-6 grid grid-cols-2 gap-4 h-full">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-green-900/20 rounded border border-green-400/30">
            <span className="text-green-400 text-sm">SESSIONS</span>
            <span className="text-green-300 font-mono text-lg">{activeSessions}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-orange-900/20 rounded border border-orange-400/30">
            <span className="text-orange-400 text-sm">VULNS</span>
            <span className="text-orange-300 font-mono text-lg">{vulnerabilities}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-2 bg-yellow-900/20 rounded border border-yellow-400/30">
            <span className="text-yellow-400 text-sm">NODES</span>
            <span className="text-yellow-300 font-mono text-lg">{networkNodes}</span>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-red-900/20 rounded border border-red-400/30">
            <span className="text-red-400 text-sm">QUEUE</span>
            <span className="text-red-300 font-mono text-lg">{exploitsInQueue}</span>
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 border-t border-cyan-400/30">
        <div className="flex items-center justify-between text-xs">
          <span className="text-cyan-400">STATUS: ONLINE</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">NEURAL LINK ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Animated corner brackets */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400 opacity-60" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400 opacity-60" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400 opacity-60" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400 opacity-60" />
    </div>
  )
}
