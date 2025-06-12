
import { useState } from 'react'
import { ChatInterface } from './ChatInterface'
import { VRInterface } from './VRInterface'
import { VRModal } from './VRModal'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Box, Settings, Terminal, Zap, Play } from "lucide-react"

interface MainInterfaceProps {
  onConfigSaved?: (config: any) => void
}

export const MainInterface = ({ onConfigSaved }: MainInterfaceProps) => {
  const [is3DMode, setIs3DMode] = useState(true)
  const [modalType, setModalType] = useState<'settings' | 'terminal' | 'exploits' | 'sessions' | null>(null)

  const toggleMode = () => {
    setIs3DMode(!is3DMode)
  }

  const openModal = (type: 'settings' | 'terminal' | 'exploits' | 'sessions') => {
    setModalType(type)
  }

  const closeModal = () => {
    setModalType(null)
  }

  return (
    <div className="w-full h-screen relative">
      {/* Переключатель режимов */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <Badge variant={is3DMode ? 'default' : 'secondary'} className="text-xs">
          {is3DMode ? '3D Режим' : '2D Режим'}
        </Badge>
        <Button
          onClick={toggleMode}
          variant="outline"
          size="sm"
          className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10"
        >
          {is3DMode ? <Monitor className="h-4 w-4" /> : <Box className="h-4 w-4" />}
        </Button>
      </div>

      {/* Быстрые действия в 3D режиме */}
      {is3DMode && (
        <div className="absolute top-4 left-4 z-50 space-y-2">
          <Button
            onClick={() => openModal('settings')}
            variant="outline"
            size="sm"
            className="border-purple-400/50 text-purple-400 hover:bg-purple-400/10 w-full justify-start"
          >
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </Button>
          <Button
            onClick={() => openModal('terminal')}
            variant="outline"
            size="sm"
            className="border-green-400/50 text-green-400 hover:bg-green-400/10 w-full justify-start"
          >
            <Terminal className="h-4 w-4 mr-2" />
            Терминал
          </Button>
          <Button
            onClick={() => openModal('exploits')}
            variant="outline"
            size="sm"
            className="border-orange-400/50 text-orange-400 hover:bg-orange-400/10 w-full justify-start"
          >
            <Zap className="h-4 w-4 mr-2" />
            Эксплойты
          </Button>
          <Button
            onClick={() => openModal('sessions')}
            variant="outline"
            size="sm"
            className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10 w-full justify-start"
          >
            <Play className="h-4 w-4 mr-2" />
            Сессии
          </Button>
        </div>
      )}

      {/* Основной интерфейс */}
      {is3DMode ? (
        <VRInterface onConfigSaved={onConfigSaved} />
      ) : (
        <ChatInterface onConfigSaved={onConfigSaved} />
      )}

      {/* Модальные окна для 3D режима */}
      {modalType && (
        <VRModal
          isOpen={true}
          onClose={closeModal}
          type={modalType}
          onConfigSaved={onConfigSaved}
        />
      )}
    </div>
  )
}
