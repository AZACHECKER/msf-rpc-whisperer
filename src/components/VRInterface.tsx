
import { useEffect, useRef, useState } from 'react'
import { useSystemData } from '@/hooks/useSystemData'
import { useToast } from '@/hooks/use-toast'

// A-Frame типы
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any
      'a-entity': any
      'a-box': any
      'a-plane': any
      'a-text': any
      'a-sphere': any
      'a-camera': any
      'a-light': any
      'a-sky': any
      'a-assets': any
      'a-mixin': any
      'a-cylinder': any
      'a-ring': any
      'a-animation': any
    }
  }
}

interface VRInterfaceProps {
  onConfigSaved?: (config: any) => void
}

export const VRInterface = ({ onConfigSaved }: VRInterfaceProps) => {
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const [isVRReady, setIsVRReady] = useState(false)
  const sceneRef = useRef<any>(null)
  const { sessionList, activeSessions, vulnerabilities } = useSystemData()
  const { toast } = useToast()

  useEffect(() => {
    // Динамическая загрузка A-Frame
    const loadAFrame = async () => {
      if (typeof window !== 'undefined' && !window.AFRAME) {
        const script = document.createElement('script')
        script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js'
        script.onload = () => {
          setIsVRReady(true)
          // Дополнительные компоненты A-Frame
          const environmentScript = document.createElement('script')
          environmentScript.src = 'https://cdn.jsdelivr.net/gh/supermedium/aframe-environment-component@master/dist/aframe-environment-component.min.js'
          document.head.appendChild(environmentScript)
        }
        document.head.appendChild(script)
      } else if (window.AFRAME) {
        setIsVRReady(true)
      }
    }

    loadAFrame()
  }, [])

  const handlePanelClick = (panelType: string) => {
    setActivePanel(activePanel === panelType ? null : panelType)
    toast({
      title: "Панель активирована",
      description: `Открыта панель: ${panelType}`,
    })
  }

  if (!isVRReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p>Загрузка 3D интерфейса...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen relative">
      <a-scene
        ref={sceneRef}
        vr-mode-ui="enabled: true"
        embedded
        style={{ width: '100%', height: '100%' }}
        background="color: #000010"
        environment="preset: starry; groundColor: #000020"
      >
        {/* Ассеты */}
        <a-assets>
          <a-mixin
            id="hologram"
            material="color: #00ffff; transparent: true; opacity: 0.8; shader: flat"
            animation__mouseenter="property: material.opacity; to: 1; startEvents: mouseenter; dur: 200"
            animation__mouseleave="property: material.opacity; to: 0.8; startEvents: mouseleave; dur: 200"
          />
          <a-mixin
            id="neon-text"
            text="color: #00ffff; font: kelsonsans; align: center"
          />
        </a-assets>

        {/* Освещение */}
        <a-light type="ambient" color="#002244" intensity="0.3"/>
        <a-light 
          type="point" 
          position="0 5 0" 
          color="#00ffff" 
          intensity="0.5"
          animation="property: intensity; to: 0.8; dir: alternate; dur: 2000; loop: true"
        />

        {/* Центральная консоль */}
        <a-entity id="main-console" position="0 1.6 -3">
          {/* Главная голографическая панель */}
          <a-plane
            mixin="hologram"
            width="4"
            height="2.5"
            position="0 0 0"
            class="clickable"
            cursor-listener
          />
          
          {/* Заголовок */}
          <a-text
            mixin="neon-text"
            value="METASPLOIT AI FRAMEWORK"
            position="0 1 0.01"
            scale="1.2 1.2 1"
            animation="property: scale; to: 1.3 1.3 1; dir: alternate; dur: 3000; loop: true"
          />

          {/* Статистика */}
          <a-text
            mixin="neon-text"
            value={`Активных сессий: ${activeSessions}`}
            position="-1.5 0.3 0.01"
            scale="0.8 0.8 1"
          />
          
          <a-text
            mixin="neon-text"
            value={`Уязвимостей: ${vulnerabilities}`}
            position="1.5 0.3 0.01"
            scale="0.8 0.8 1"
          />

          {/* Индикаторы состояния */}
          <a-sphere
            position="-1.5 -0.2 0.02"
            radius="0.1"
            color={activeSessions > 0 ? "#00ff00" : "#ff0000"}
            animation="property: rotation; to: 0 360 0; dur: 2000; loop: true"
          />
          
          <a-sphere
            position="1.5 -0.2 0.02"
            radius="0.1"
            color={vulnerabilities > 0 ? "#ff6600" : "#666666"}
            animation="property: rotation; to: 0 360 0; dur: 2000; loop: true"
          />
        </a-entity>

        {/* Панель терминала (слева) */}
        <a-entity 
          id="terminal-panel" 
          position="-4 1.6 -2"
          visible={activePanel === 'terminal' || !activePanel}
        >
          <a-plane
            mixin="hologram"
            width="3"
            height="2"
            rotation="0 20 0"
            class="clickable"
            cursor-listener
          />
          <a-text
            mixin="neon-text"
            value="TERMINAL"
            position="0 0.8 0.01"
            rotation="0 20 0"
            scale="0.8 0.8 1"
          />
          <a-text
            value="msf > sessions -l"
            position="0 0.2 0.01"
            rotation="0 20 0"
            color="#00ff00"
            scale="0.5 0.5 1"
          />
          <a-text
            value="msf > use exploit/multi/handler"
            position="0 -0.1 0.01"
            rotation="0 20 0"
            color="#00ff00"
            scale="0.5 0.5 1"
          />
        </a-entity>

        {/* Панель эксплойтов (справа) */}
        <a-entity 
          id="exploits-panel" 
          position="4 1.6 -2"
          visible={activePanel === 'exploits' || !activePanel}
        >
          <a-plane
            mixin="hologram"
            width="3"
            height="2"
            rotation="0 -20 0"
            class="clickable"
            cursor-listener
          />
          <a-text
            mixin="neon-text"
            value="EXPLOITS"
            position="0 0.8 0.01"
            rotation="0 -20 0"
            scale="0.8 0.8 1"
          />
          <a-text
            value="• Windows SMB"
            position="0 0.3 0.01"
            rotation="0 -20 0"
            color="#ff6600"
            scale="0.5 0.5 1"
          />
          <a-text
            value="• Linux SSH"
            position="0 0.0 0.01"
            rotation="0 -20 0"
            color="#ff6600"
            scale="0.5 0.5 1"
          />
          <a-text
            value="• Web PHP"
            position="0 -0.3 0.01"
            rotation="0 -20 0"
            color="#ff6600"
            scale="0.5 0.5 1"
          />
        </a-entity>

        {/* Панель сессий (внизу) */}
        <a-entity 
          id="sessions-panel" 
          position="0 0.5 -3"
          visible={activePanel === 'sessions' || !activePanel}
        >
          <a-plane
            mixin="hologram"
            width="6"
            height="1.5"
            class="clickable"
            cursor-listener
          />
          <a-text
            mixin="neon-text"
            value="ACTIVE SESSIONS"
            position="0 0.5 0.01"
            scale="0.8 0.8 1"
          />
          {sessionList.slice(0, 3).map((session: any, index: number) => (
            <a-text
              key={session.id}
              value={`Session ${session.session_id || index + 1}: ${session.target_host || 'localhost'}`}
              position={`${-2 + index * 2} 0 0.01`}
              color="#00ff00"
              scale="0.4 0.4 1"
            />
          ))}
        </a-entity>

        {/* AI Ассистент */}
        <a-entity id="ai-assistant" position="0 2.5 -1">
          <a-sphere
            radius="0.3"
            color="#4400ff"
            animation="property: rotation; to: 0 360 0; dur: 4000; loop: true"
            animation__pulse="property: scale; to: 1.2 1.2 1.2; dir: alternate; dur: 1500; loop: true"
          />
          <a-ring
            radius-inner="0.4"
            radius-outer="0.6"
            color="#00ffff"
            rotation="90 0 0"
            animation="property: rotation; to: 90 360 0; dur: 3000; loop: true"
          />
          <a-text
            value="AI ПОМОЩНИК"
            position="0 -0.8 0"
            color="#00ffff"
            align="center"
            scale="0.6 0.6 1"
          />
        </a-entity>

        {/* Частицы и эффекты */}
        <a-entity id="particles" position="0 3 -5">
          {Array.from({ length: 20 }, (_, i) => (
            <a-sphere
              key={i}
              radius="0.02"
              color="#00ffff"
              position={`${(Math.random() - 0.5) * 10} ${Math.random() * 3} ${(Math.random() - 0.5) * 10}`}
              animation={`property: position; to: ${(Math.random() - 0.5) * 10} ${Math.random() * 3} ${(Math.random() - 0.5) * 10}; dur: ${3000 + Math.random() * 2000}; loop: true; dir: alternate`}
              animation__opacity="property: material.opacity; to: 0.3; dir: alternate; dur: 2000; loop: true"
            />
          ))}
        </a-entity>

        {/* Камера с управлением */}
        <a-camera
          id="camera"
          position="0 1.6 0"
          look-controls="pointerLockEnabled: true"
          wasd-controls="acceleration: 30"
          cursor="rayOrigin: mouse"
        >
          <a-cursor
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: #00ffff; shader: flat"
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
          />
        </a-camera>

        {/* Звездное небо */}
        <a-sky
          color="#000011"
          animation="property: rotation; to: 0 360 0; dur: 120000; loop: true"
        />
      </a-scene>

      {/* UI оверлей для мобильных */}
      <div className="absolute top-4 left-4 z-50 space-y-2">
        <button
          onClick={() => handlePanelClick('terminal')}
          className="bg-gray-800/80 text-cyan-400 px-3 py-2 rounded-lg border border-cyan-400/50 text-sm"
        >
          Терминал
        </button>
        <button
          onClick={() => handlePanelClick('exploits')}
          className="bg-gray-800/80 text-orange-400 px-3 py-2 rounded-lg border border-orange-400/50 text-sm"
        >
          Эксплойты
        </button>
        <button
          onClick={() => handlePanelClick('sessions')}
          className="bg-gray-800/80 text-green-400 px-3 py-2 rounded-lg border border-green-400/50 text-sm"
        >
          Сессии
        </button>
      </div>

      {/* Информационная панель */}
      <div className="absolute bottom-4 right-4 z-50 bg-gray-900/90 text-cyan-400 p-3 rounded-lg border border-cyan-400/50">
        <div className="text-xs space-y-1">
          <div>Активных сессий: {activeSessions}</div>
          <div>Уязвимостей: {vulnerabilities}</div>
          <div className="text-gray-400">Используйте мышь для навигации</div>
        </div>
      </div>
    </div>
  )
}
