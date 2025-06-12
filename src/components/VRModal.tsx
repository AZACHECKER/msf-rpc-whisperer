
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MetasploitSettings } from './MetasploitSettings'
import { CommandExecutor } from './CommandExecutor'
import { ExploitManager } from './ExploitManager'
import { Card, CardContent } from "@/components/ui/card"
import { useSystemData } from '@/hooks/useSystemData'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface VRModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'settings' | 'terminal' | 'exploits' | 'sessions'
  onConfigSaved?: (config: any) => void
  is3DMode?: boolean
}

export const VRModal = ({ isOpen, onClose, type, onConfigSaved, is3DMode = false }: VRModalProps) => {
  const { sessionList, activeSessions } = useSystemData()
  const [inputValue, setInputValue] = useState('')

  // In 3D mode, render a different styled modal
  if (is3DMode) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ perspective: '1000px' }}
      >
        <div 
          className="bg-black/50 backdrop-blur-md absolute inset-0"
          onClick={onClose}
        />
        
        <div 
          className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md border rounded-lg shadow-lg p-6 relative z-10 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(5deg) translateZ(50px)',
            borderColor: getModalBorderColor(type),
            boxShadow: `0 0 30px 5px ${getModalGlowColor(type)}`
          }}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white bg-black/20 rounded-full p-1"
          >
            <X size={18} />
          </button>
          
          <div className="mb-6">
            <h2 className={`text-xl font-bold ${getModalTextColor(type)}`}>
              {getModalTitle(type)}
            </h2>
            <p className="text-gray-400 text-sm">
              {getModalDescription(type)}
            </p>
          </div>
          
          {/* Modal content */}
          {renderModalContent(type, inputValue, setInputValue, onConfigSaved, activeSessions, sessionList, true)}
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
        {renderModalContent(type, inputValue, setInputValue, onConfigSaved, activeSessions, sessionList, false)}
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
    default: return ''
  }
}

const getModalDescription = (type: string): string => {
  switch(type) {
    case 'settings': return 'Настройте подключение к Metasploit Framework'
    case 'terminal': return 'Выполняйте команды в интерактивном режиме'
    case 'exploits': return 'Настройте и запустите эксплойты'
    case 'sessions': return 'Управление сессиями Metasploit'
    default: return ''
  }
}

const getModalTextColor = (type: string): string => {
  switch(type) {
    case 'settings': return 'text-purple-400'
    case 'terminal': return 'text-green-400'
    case 'exploits': return 'text-orange-400'
    case 'sessions': return 'text-blue-400'
    default: return 'text-white'
  }
}

const getModalBorderColor = (type: string): string => {
  switch(type) {
    case 'settings': return 'rgba(168, 85, 247, 0.5)'
    case 'terminal': return 'rgba(74, 222, 128, 0.5)'
    case 'exploits': return 'rgba(249, 115, 22, 0.5)'
    case 'sessions': return 'rgba(59, 130, 246, 0.5)'
    default: return 'rgba(255, 255, 255, 0.2)'
  }
}

const getModalGlowColor = (type: string): string => {
  switch(type) {
    case 'settings': return 'rgba(168, 85, 247, 0.2)'
    case 'terminal': return 'rgba(74, 222, 128, 0.2)'
    case 'exploits': return 'rgba(249, 115, 22, 0.2)'
    case 'sessions': return 'rgba(59, 130, 246, 0.2)'
    default: return 'rgba(255, 255, 255, 0.1)'
  }
}

const renderModalContent = (
  type: string, 
  inputValue: string, 
  setInputValue: (value: string) => void, 
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
