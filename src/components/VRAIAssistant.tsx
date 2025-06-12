
export const VRAIAssistant = () => {
  return (
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
  )
}
