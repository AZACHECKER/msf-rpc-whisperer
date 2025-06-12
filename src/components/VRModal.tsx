
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MetasploitSettings } from './MetasploitSettings'
import { CommandExecutor } from './CommandExecutor'
import { ExploitManager } from './ExploitManager'
import { Card, CardContent } from "@/components/ui/card"
import { useSystemData } from '@/hooks/useSystemData'

interface VRModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'settings' | 'terminal' | 'exploits' | 'sessions'
  onConfigSaved?: (config: any) => void
}

export const VRModal = ({ isOpen, onClose, type, onConfigSaved }: VRModalProps) => {
  const { sessionList, activeSessions } = useSystemData()

  const getModalContent = () => {
    switch (type) {
      case 'settings':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-cyan-400">Настройки Metasploit</DialogTitle>
              <DialogDescription className="text-gray-400">
                Настройте подключение к Metasploit Framework
              </DialogDescription>
            </DialogHeader>
            <MetasploitSettings onConfigSaved={onConfigSaved || (() => {})} />
          </>
        )

      case 'terminal':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-green-400">Терминал Metasploit</DialogTitle>
              <DialogDescription className="text-gray-400">
                Выполняйте команды в интерактивном режиме
              </DialogDescription>
            </DialogHeader>
            <CommandExecutor />
          </>
        )

      case 'exploits':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-orange-400">Менеджер эксплойтов</DialogTitle>
              <DialogDescription className="text-gray-400">
                Настройте и запустите эксплойты
              </DialogDescription>
            </DialogHeader>
            <ExploitManager />
          </>
        )

      case 'sessions':
        return (
          <>
            <DialogHeader>
              <DialogTitle className="text-blue-400">Активные сессии</DialogTitle>
              <DialogDescription className="text-gray-400">
                Управление сессиями Metasploit
              </DialogDescription>
            </DialogHeader>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="text-center text-gray-400">
                  Активных сессий: {activeSessions}
                  {activeSessions === 0 && (
                    <p className="mt-2 text-sm">
                      Пока нет активных сессий. Запустите эксплойт для создания сессии.
                    </p>
                  )}
                  {sessionList.length > 0 && (
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
          </>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900/95 border-cyan-400/50 text-white max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-sm">
        {getModalContent()}
      </DialogContent>
    </Dialog>
  )
}
