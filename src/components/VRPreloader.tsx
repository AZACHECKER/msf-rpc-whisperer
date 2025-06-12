
import { useEffect, useState } from 'react'

export const VRPreloader = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Инициализация системы...')

  useEffect(() => {
    const texts = [
      'Инициализация системы...',
      'Загрузка нейроинтерфейса...',
      'Подключение к матрице...',
      'Активация голограмм...',
      'Настройка 3D пространства...',
      'Готовность к работе!'
    ]

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2
        const textIndex = Math.floor(newProgress / 20)
        if (textIndex < texts.length) {
          setLoadingText(texts[textIndex])
        }
        return newProgress > 100 ? 100 : newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main loader container */}
      <div className="relative z-10 text-center">
        {/* Central hologram effect */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto border-2 border-cyan-400/50 rounded-full relative">
            <div className="absolute inset-4 border border-cyan-400/30 rounded-full animate-spin">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
            </div>
            <div className="absolute inset-8 border border-cyan-400/20 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-400/70 rounded-full transform -translate-x-1/2 -translate-y-1"></div>
            </div>
          </div>
          
          {/* Scanning line */}
          <div 
            className="absolute inset-0 border-t-2 border-cyan-400 rounded-full opacity-50"
            style={{
              animation: 'scan 2s linear infinite',
              clipPath: 'polygon(0 50%, 100% 50%, 100% 52%, 0 52%)'
            }}
          />
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-cyan-400/70">
            <span>0%</span>
            <span className="font-mono">{progress}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-cyan-400 text-lg font-medium mb-2 neon-text">
          {loadingText}
        </div>
        
        {/* System info */}
        <div className="text-cyan-400/50 text-sm font-mono">
          MSF-RPC-WHISPERER v3.0.1
        </div>
        
        {/* Holographic corners */}
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/30" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/30" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/30" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/30" />
      </div>
    </div>
  )
}
