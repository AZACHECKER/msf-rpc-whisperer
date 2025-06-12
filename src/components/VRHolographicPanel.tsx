
import { ReactNode, useState } from 'react'

interface VRHolographicPanelProps {
  children: ReactNode
  title: string
  color: string
  position: string
  onClick?: () => void
  isActive?: boolean
}

export const VRHolographicPanel = ({ 
  children, 
  title, 
  color, 
  position,
  onClick,
  isActive = false
}: VRHolographicPanelProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const getColorClass = (color: string) => {
    const colors = {
      cyan: 'border-cyan-400/50 bg-gradient-to-br from-cyan-900/80 to-blue-900/80 shadow-cyan-400/20',
      green: 'border-green-400/50 bg-gradient-to-br from-green-900/80 to-emerald-900/80 shadow-green-400/20',
      red: 'border-red-400/50 bg-gradient-to-br from-red-900/80 to-orange-900/80 shadow-red-400/20',
      blue: 'border-blue-400/50 bg-gradient-to-br from-blue-900/80 to-indigo-900/80 shadow-blue-400/20',
      purple: 'border-purple-400/50 bg-gradient-to-br from-purple-900/80 to-fuchsia-900/80 shadow-purple-400/20'
    }
    return colors[color as keyof typeof colors] || colors.cyan
  }

  return (
    <div 
      className={`absolute backdrop-blur-sm border rounded-lg cursor-pointer transition-all duration-300 ${getColorClass(color)}`}
      style={{
        width: '200px',
        height: '150px',
        transform: position,
        transformStyle: 'preserve-3d',
        boxShadow: isHovered || isActive 
          ? `0 0 30px 10px ${color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(255, 255, 255, 0.2)'}` 
          : `0 0 15px 5px ${color === 'cyan' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
        scale: isHovered || isActive ? '1.05' : '1'
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Holographic border effect */}
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(45deg, transparent 30%, ${color === 'cyan' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(255, 255, 255, 0.3)'} 50%, transparent 70%)`,
            animation: 'scan 3s linear infinite'
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        <h3 className={`font-bold mb-2 text-${color}-400`}>{title}</h3>
        <div className="flex-1">
          {children}
        </div>
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-current opacity-50" />
      <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-current opacity-50" />
      <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-current opacity-50" />
      <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-current opacity-50" />
    </div>
  )
}
