
import { useEffect, useRef, useState } from 'react'
import { useSystemData } from '@/hooks/useSystemData'

interface VRInterfaceProps {
  onConfigSaved?: (config: any) => void
}

export const VRInterface = ({ onConfigSaved }: VRInterfaceProps) => {
  const sceneRef = useRef<HTMLElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { activeSessions, vulnerabilities, exploitsInQueue, networkNodes } = useSystemData()

  useEffect(() => {
    const loadAFrame = async () => {
      try {
        await import('aframe')
        setIsLoading(false)
        
        // Register custom components after A-Frame loads
        setTimeout(() => {
          if (typeof window !== 'undefined' && (window as any).AFRAME) {
            const AFRAME = (window as any).AFRAME
            
            // Custom hologram panel component
            AFRAME.registerComponent('hologram-panel', {
              init: function() {
                this.el.addEventListener('mouseenter', () => {
                  this.el.setAttribute('animation', 'property: scale; to: 1.1 1.1 1.1; dur: 200')
                })
                this.el.addEventListener('mouseleave', () => {
                  this.el.setAttribute('animation', 'property: scale; to: 1 1 1; dur: 200')
                })
              }
            })

            // Click handler component
            AFRAME.registerComponent('panel-click', {
              schema: { type: 'string' },
              init: function() {
                this.el.addEventListener('click', () => {
                  const event = new CustomEvent('panel-selected', { 
                    detail: { panel: this.data } 
                  })
                  window.dispatchEvent(event)
                })
              }
            })
          }
        }, 100)
      } catch (error) {
        console.error('Error loading A-Frame:', error)
      }
    }

    loadAFrame()
  }, [])

  const handlePanelSelect = (panelType: string) => {
    console.log('Panel selected:', panelType)
    // Handle panel selection logic here
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-cyan-400 text-xl animate-pulse">Загрузка 3D интерфейса...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen vr-container">
      <a-scene 
        ref={sceneRef}
        embedded
        style={{ height: '100vh', width: '100vw' }}
        background="color: #000011"
        fog="type: exponential; color: #000033; density: 0.1"
        vr-mode-ui="enabled: true"
      >
        {/* Assets */}
        <a-assets>
          <a-asset-item id="font" src="https://cdn.aframe.io/fonts/Roboto-msdf.json"></a-asset-item>
        </a-assets>

        {/* Lighting */}
        <a-light type="ambient" color="#004" intensity="0.5"></a-light>
        <a-light type="point" position="0 10 0" color="#00ffff" intensity="2"></a-light>
        <a-light type="point" position="-10 5 -10" color="#ff00ff" intensity="1"></a-light>

        {/* Camera with controls */}
        <a-camera
          position="0 2 8"
          look-controls="enabled: true"
          wasd-controls="enabled: true"
          cursor="rayOrigin: mouse"
        >
          <a-cursor
            geometry="primitive: ring; radiusInner: 0.01; radiusOuter: 0.02"
            material="color: cyan; shader: flat"
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150"
            animation__fusing="property: scale; startEvents: fusing; from: 1 1 1; to: 0.1 0.1 0.1; dur: 1500"
          ></a-cursor>
        </a-camera>

        {/* Central Hub */}
        <a-entity position="0 0 0">
          {/* Main Console */}
          <a-box
            position="0 1 -3"
            width="6"
            height="3"
            depth="0.1"
            material="color: #001122; transparent: true; opacity: 0.8"
            hologram-panel
          >
            <a-text
              position="0 1 0.1"
              align="center"
              value="METASPLOIT AI CONSOLE"
              color="#00ffff"
              font="msdf: #font"
              width="8"
            ></a-text>
            
            <a-text
              position="-2 0.5 0.1"
              align="left"
              value={`Active Sessions: ${activeSessions}`}
              color="#00ff00"
              font="msdf: #font"
              width="6"
            ></a-text>
            
            <a-text
              position="-2 0 0.1"
              align="left"
              value={`Vulnerabilities: ${vulnerabilities}`}
              color="#ff6600"
              font="msdf: #font"
              width="6"
            ></a-text>
            
            <a-text
              position="-2 -0.5 0.1"
              align="left"
              value={`Network Nodes: ${networkNodes}`}
              color="#ffff00"
              font="msdf: #font"
              width="6"
            ></a-text>
          </a-box>

          {/* Terminal Panel */}
          <a-plane
            position="-4 2 -2"
            width="3"
            height="2"
            material="color: #001100; transparent: true; opacity: 0.9"
            hologram-panel
            panel-click="terminal"
          >
            <a-text
              position="0 0.7 0.1"
              align="center"
              value="TERMINAL"
              color="#00ff00"
              font="msdf: #font"
              width="8"
            ></a-text>
            <a-text
              position="0 0 0.1"
              align="center"
              value="Execute Commands"
              color="#88ff88"
              font="msdf: #font"
              width="6"
            ></a-text>
          </a-plane>

          {/* Exploits Panel */}
          <a-plane
            position="4 2 -2"
            width="3"
            height="2"
            material="color: #220000; transparent: true; opacity: 0.9"
            hologram-panel
            panel-click="exploits"
          >
            <a-text
              position="0 0.7 0.1"
              align="center"
              value="EXPLOITS"
              color="#ff0000"
              font="msdf: #font"
              width="8"
            ></a-text>
            <a-text
              position="0 0 0.1"
              align="center"
              value={`Queue: ${exploitsInQueue}`}
              color="#ff8888"
              font="msdf: #font"
              width="6"
            ></a-text>
          </a-plane>

          {/* Sessions Panel */}
          <a-plane
            position="-4 -1 -2"
            width="3"
            height="2"
            material="color: #000022; transparent: true; opacity: 0.9"
            hologram-panel
            panel-click="sessions"
          >
            <a-text
              position="0 0.7 0.1"
              align="center"
              value="SESSIONS"
              color="#0088ff"
              font="msdf: #font"
              width="8"
            ></a-text>
            <a-text
              position="0 0 0.1"
              align="center"
              value={`Active: ${activeSessions}`}
              color="#88aaff"
              font="msdf: #font"
              width="6"
            ></a-text>
          </a-plane>

          {/* Settings Panel */}
          <a-plane
            position="4 -1 -2"
            width="3"
            height="2"
            material="color: #220022; transparent: true; opacity: 0.9"
            hologram-panel
            panel-click="settings"
          >
            <a-text
              position="0 0.7 0.1"
              align="center"
              value="SETTINGS"
              color="#ff00ff"
              font="msdf: #font"
              width="8"
            ></a-text>
            <a-text
              position="0 0 0.1"
              align="center"
              value="Configuration"
              color="#ff88ff"
              font="msdf: #font"
              width="6"
            ></a-text>
          </a-plane>

          {/* AI Assistant Avatar */}
          <a-entity position="0 3 -1">
            <a-box
              width="0.8"
              height="0.8"
              depth="0.8"
              material="color: #00ffff; transparent: true; opacity: 0.7"
              animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
            ></a-box>
            <a-text
              position="0 -1 0"
              align="center"
              value="AI ASSISTANT"
              color="#00ffff"
              font="msdf: #font"
              width="6"
            ></a-text>
          </a-entity>
        </a-entity>

        {/* Particle Systems */}
        <a-entity
          position="0 0 0"
          particle-system="preset: snow; particleCount: 100; color: #00ffff, #0088ff; size: 0.1"
        ></a-entity>

        {/* Grid Floor */}
        <a-plane
          position="0 -1 0"
          rotation="-90 0 0"
          width="20"
          height="20"
          material="color: #001122; transparent: true; opacity: 0.3; wireframe: true"
        ></a-plane>

        {/* Skybox */}
        <a-sky color="#000011"></a-sky>
      </a-scene>
    </div>
  )
}
