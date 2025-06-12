
interface VRAIAssistantProps {
  onClick: () => void
}

export const VRAIAssistant = ({ onClick }: VRAIAssistantProps) => {
  return (
    <div 
      className="absolute cursor-pointer hover:scale-110 transition-transform duration-300"
      style={{
        transform: 'translateY(-300px) translateZ(100px)',
        transformStyle: 'preserve-3d'
      }}
      onClick={onClick}
    >
      <div className="relative">
        <div 
          className="w-16 h-16 rounded-full bg-cyan-400/20 border border-cyan-400 animate-pulse hover:bg-cyan-400/30 transition-colors"
          style={{ 
            animation: 'pulse 2s infinite ease-in-out',
            boxShadow: '0 0 15px 5px rgba(6, 182, 212, 0.3)'
          }}
        />
        <div className="absolute top-full mt-2 text-center w-full">
          <span className="text-cyan-400 text-sm">AI ASSISTANT</span>
          <div className="text-xs text-cyan-300/70 mt-1">Нажмите для чата</div>
        </div>
      </div>
    </div>
  )
}
