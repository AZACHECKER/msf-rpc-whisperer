import { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MetasploitSettings } from './MetasploitSettings'
import { CommandExecutor } from './CommandExecutor'
import { ExploitManager } from './ExploitManager'
import { VRChatInterface } from './VRChatInterface'
import { Card, CardContent } from "@/components/ui/card"
import { useSystemData } from '@/hooks/useSystemData'
import { Button } from "@/components/ui/button"
import { X, Move } from "lucide-react"

interface VRModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'settings' | 'terminal' | 'exploits' | 'sessions' | 'chat'
  onConfigSaved?: (config: any) => void
  is3DMode?: boolean
  position?: { x: number; y: number; z: number }
  onPositionChange?: (position: { x: number; y: number; z: number }) => void
}

export const VRModal = ({ 
  isOpen, 
  onClose, 
  type, 
  onConfigSaved, 
  is3DMode = false, 
  position = { x: 0, y: 0, z: 100 },
  onPositionChange 
}: VRModalProps) => {
  const { sessionList, activeSessions } = useSystemData()
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const modalRef = useRef<HTMLDivElement>(null)

  // Drag functionality for 3D mode
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!is3DMode || !onPositionChange) return
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !is3DMode || !onPositionChange) return
    
    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y
    
    onPositionChange({
      x: position.x + deltaX * 0.5,
      y: position.y - deltaY * 0.5,
      z: position.z
    })
    
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart, position])

  // In 3D mode, render a different styled modal
  if (is3DMode) {
    return (
      <div 
        ref={modalRef}
        className="fixed z-50 pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translateX(${position.x}px) translateY(${position.y}px) translateZ(${position.z}px)`,
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        <div 
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md border rounded-lg shadow-lg relative max-w-3xl w-full max-h-[80vh] overflow-hidden pointer-events-auto"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(5deg) translateZ(50px)',
            borderColor: getModalBorderColor(type),
            boxShadow: `0 0 30px 5px ${getModalGlowColor(type)}`,
            minWidth: type === 'chat' ? '600px' : '500px',
            minHeight: type === 'chat' ? '500px' : '400px'
          }}
        >
          {/* Title bar with drag handle */}
          <div 
            className="flex items-center justify-between p-4 border-b border-gray-700 cursor-move select-none"
            onMouseDown={handleMouseDown}
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          >
            <div className="flex items-center gap-2">
              <Move size={16} className="text-gray-400" />
              <h2 className={`text-lg font-bold ${getModalTextColor(type)}`}>
                {getModalTitle(type)}
              </h2>
            </div>
            
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white bg-black/20 rounded-full p-1 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Modal content */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
            <p className="text-gray-400 text-sm mb-4">
              {getModalDescription(type)}
            </p>
            
            {renderModalContent(type, onConfigSaved, activeSessions, sessionList, true)}
          </div>
        </div>
      </div>
    )
  }

  // Standard 2D mode using Dialog component
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900/95 border-cyan-400/50 text-white max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className={getModalTextColor(type)}>{getModalTitle(type)}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {getModalDescription(type)}
          </DialogDescription>
        </DialogHeader>
        {renderModalContent(type, onConfigSaved, activeSessions, sessionList, false)}
      </DialogContent>
    </Dialog>
  )
}

// Helper functions for modal styling and content
const getModalTitle = (type: string): string => {
  switch(type) {
    case 'settings': return 'Настройки Metasploit'
    case 'terminal': return 'Терминал Metasploit'
    case 'exploits': return 'Менеджер эксплойтов'
    case 'sessions': return 'Активные сессии'
    case 'chat': return 'AI Ассистент'
    default: return ''
  }
}

const getModalDescription = (type: string): string => {
  switch(type) {
    case 'settings': return 'Настройте подключение к Metasploit Framework'
    case 'terminal': return 'Выполняйте команды в интерактивном режиме'
    case 'exploits': return 'Настройте и запустите эксплойты'
    case 'sessions': return 'Управление сессиями Metasploit'
    case 'chat': return 'Общайтесь с AI ассистентом голосом или текстом'
    default: return ''
  }
}

const getModalTextColor = (type: string): string => {
  switch(type) {
    case 'settings': return 'text-purple-400'
    case 'terminal': return 'text-green-400'
    case 'exploits': return 'text-orange-400'
    case 'sessions': return 'text-blue-400'
    case 'chat': return 'text-cyan-400'
    default: return 'text-white'
  }
}

const getModalBorderColor = (type: string): string => {
  switch(type) {
    case 'settings': return 'rgba(168, 85, 247, 0.5)'
    case 'terminal': return 'rgba(74, 222, 128, 0.5)'
    case 'exploits': return 'rgba(249, 115, 22, 0.5)'
    case 'sessions': return 'rgba(59, 130, 246, 0.5)'
    case 'chat': return 'rgba(6, 182, 212, 0.5)'
    default: return 'rgba(255, 255, 255, 0.2)'
  }
}

const getModalGlowColor = (type: string): string => {
  switch(type) {
    case 'settings': return 'rgba(168, 85, 247, 0.2)'
    case 'terminal': return 'rgba(74, 222, 128, 0.2)'
    case 'exploits': return 'rgba(249, 115, 22, 0.2)'
    case 'sessions': return 'rgba(59, 130, 246, 0.2)'
    case 'chat': return 'rgba(6, 182, 212, 0.2)'
    default: return 'rgba(255, 255, 255, 0.1)'
  }
}

const renderModalContent = (
  type: string, 
  onConfigSaved?: (config: any) => void,
  activeSessions?: number,
  sessionList?: any[],
  is3DMode?: boolean
) => {
  switch(type) {
    case 'settings':
      return <MetasploitSettings onConfigSaved={onConfigSaved || (() => {})} />
    
    case 'terminal':
      return <CommandExecutor />
    
    case 'exploits':
      return <ExploitManager />
    
    case 'chat':
      return <VRChatInterface is3DMode={is3DMode} />
    
    case 'sessions':
      return (
        <Card className={`${is3DMode ? 'bg-gray-900/50' : 'bg-gray-800/50'} border-gray-700`}>
          <CardContent className="p-6">
            <div className="text-center text-gray-400">
              Активных сессий: {activeSessions || 0}
              {(!activeSessions || activeSessions === 0) && (
                <p className="mt-2 text-sm">
                  Пока нет активных сессий. Запустите эксплойт для создания сессии.
                </p>
              )}
              {sessionList && sessionList.length > 0 && (
                <div className="mt-4 space-y-2">
                  {sessionList.map((session: any) => (
                    <div 
                      key={session.id}
                      className="p-3 bg-gray-900/50 rounded-lg border border-gray-600 text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-white font-medium">
                            Сессия {session.session_id}
                          </span>
                          <span className="text-gray-400 ml-2">
                            ({session.session_type || 'meterpreter'})
                          </span>
                        </div>
                        <div className="text-sm text-gray-400">
                          {session.target_host || 'localhost'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )
    
    default:
      return null
  }
}
