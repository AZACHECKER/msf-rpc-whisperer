import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Send, Terminal, Settings, Zap, Play, Shield, Target, Wifi, Bot } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MetasploitSettings } from './MetasploitSettings'
import { CommandExecutor } from './CommandExecutor'
import { ExploitManager } from './ExploitManager'
import { AutomatedCommandSystem } from './AutomatedCommandSystem'
import { useSystemData } from '@/hooks/useSystemData'

interface Message {
  id: string
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
  actions?: Array<{
    label: string
    action: string
    icon?: React.ReactNode
    target?: string
  }>
}

interface ChatInterfaceProps {
  onConfigSaved?: (config: any) => void
}

export const ChatInterface = ({ onConfigSaved }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Добро пожаловать в Metasploit AI Assistant! 🛡️\n\nЯ помогу вам с автоматизированными атаками. Просто скажите "выполни проверку и эксплойты на [цель]" для запуска автоматического процесса.',
      timestamp: new Date(),
      actions: [
        { label: 'Настроить подключение', action: 'configure', icon: <Settings className="h-4 w-4" /> },
        { label: 'Автоматическая атака', action: 'auto-attack', icon: <Bot className="h-4 w-4" /> },
        { label: 'Ручные команды', action: 'command', icon: <Terminal className="h-4 w-4" /> },
        { label: 'Менеджер эксплойтов', action: 'exploit', icon: <Zap className="h-4 w-4" /> }
      ]
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [automatedSystem, setAutomatedSystem] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { sessionList, activeSessions, vulnerabilities } = useSystemData()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleAutomatedAttack = (target: string) => {
    const systemMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: `🤖 Запуск автоматизированной атаки на цель: ${target}\n\nЭтапы:\n1. Сканирование портов\n2. Анализ уязвимостей\n3. Выбор эксплойтов\n4. Автоматическое выполнение\n5. Пост-эксплуатация`,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, systemMessage])

    if (automatedSystem) {
      automatedSystem.executeAutomatedFlow(target)
    }
  }

  const parseAutomatedCommand = (message: string): string | null => {
    const patterns = [
      /выполни проверку и эксплойты на\s+([^\s]+)/i,
      /автоматическая атака на\s+([^\s]+)/i,
      /атакуй\s+([^\s]+)/i,
      /проверь\s+([^\s]+)/i
    ]

    for (const pattern of patterns) {
      const match = message.match(pattern)
      if (match) {
        return match[1]
      }
    }

    return null
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Check for automated attack command
    const target = parseAutomatedCommand(message)
    if (target) {
      setIsTyping(false)
      handleAutomatedAttack(target)
      return
    }

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()
    
    if (input.includes('автомат') || input.includes('атак')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Для автоматизированной атаки укажите цель в формате:\n\n"выполни проверку и эксплойты на [IP или домен]"\n\nПример: "выполни проверку и эксплойты на 192.168.1.1"\n\nСистема автоматически:\n• Просканирует порты\n• Найдет уязвимости\n• Выберет подходящие эксплойты\n• Выполнит атаку\n• Проведет пост-эксплуатацию',
        timestamp: new Date(),
        actions: [
          { label: 'Пример атаки', action: 'auto-attack', icon: <Bot className="h-4 w-4" />, target: 'testphp.vulnweb.com' }
        ]
      }
    }
    
    if (input.includes('настрой') || input.includes('подключ') || input.includes('конфиг')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Для настройки подключения к Metasploit нужно указать:\n\n• Хост сервера\n• Порт подключения\n• Учетные данные\n\nНажмите кнопку ниже для открытия настроек.',
        timestamp: new Date(),
        actions: [
          { label: 'Открыть настройки', action: 'configure', icon: <Settings className="h-4 w-4" /> }
        ]
      }
    }
    
    if (input.includes('команд') || input.includes('выполн') || input.includes('консоль')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Готов выполнить команды Metasploit! Некоторые полезные команды:\n\n• `sessions -l` - список сессий\n• `db_status` - статус базы данных\n• `help` - справка\n\nОткройте консоль для интерактивного выполнения.',
        timestamp: new Date(),
        actions: [
          { label: 'Открыть консоль', action: 'command', icon: <Terminal className="h-4 w-4" /> }
        ]
      }
    }
    
    if (input.includes('эксплойт') || input.includes('атак') || input.includes('exploit')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: 'Менеджер эксплойтов позволяет:\n\n• Выбрать тип эксплойта\n• Настроить параметры\n• Указать цели (RHOSTS)\n• Запустить атаку\n\nОткройте менеджер для настройки.',
        timestamp: new Date(),
        actions: [
          { label: 'Менеджер эксплойтов', action: 'exploit', icon: <Zap className="h-4 w-4" /> }
        ]
      }
    }
    
    if (input.includes('сесси') || input.includes('sessions') || input.includes('активн')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: `Текущий статус:\n\n• Активных сессий: ${activeSessions}\n• Найдено уязвимостей: ${vulnerabilities}\n\nПроверьте детали в соответствующих разделах.`,
        timestamp: new Date(),
        actions: [
          { label: 'Показать сессии', action: 'sessions', icon: <Play className="h-4 w-4" /> }
        ]
      }
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: 'Понял! Что конкретно вы хотите сделать? Я могу помочь с:\n\n• Настройкой подключения к Metasploit\n• Выполнением команд\n• Запуском эксплойтов\n• Управлением сессиями\n\nВыберите действие или опишите задачу подробнее.',
      timestamp: new Date(),
      actions: [
        { label: 'Настройки', action: 'configure', icon: <Settings className="h-4 w-4" /> },
        { label: 'Команды', action: 'command', icon: <Terminal className="h-4 w-4" /> },
        { label: 'Эксплойты', action: 'exploit', icon: <Zap className="h-4 w-4" /> },
        { label: 'Сессии', action: 'sessions', icon: <Play className="h-4 w-4" /> }
      ]
    }
  }

  const handleAction = (action: string, target?: string) => {
    if (action === 'auto-attack' && target) {
      handleAutomatedAttack(target)
      return
    }
    setActiveModal(action)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputMessage)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm">
      {/* Header with improved transparency */}
      <div className="bg-gray-800/60 backdrop-blur-md border-b border-gray-700/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600/80 rounded-lg backdrop-blur-sm">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Metasploit AI</h1>
              <p className="text-sm text-gray-300">Автоматизированный помощник</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs bg-green-600/20 text-green-400 border-green-600/30">
              <Wifi className="h-3 w-3 mr-1" />
              Онлайн
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages with improved styling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-4 backdrop-blur-sm border ${
                message.type === 'user'
                  ? 'bg-blue-600/80 text-white border-blue-500/30 ml-4'
                  : message.type === 'system'
                  ? 'bg-orange-600/20 text-orange-200 border-orange-500/30 mr-4'
                  : 'bg-gray-700/40 text-gray-100 border-gray-600/30 mr-4'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm sm:text-base">
                {message.content}
              </div>
              
              {message.actions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.actions.map((action, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-500/30 bg-gray-800/40 hover:bg-gray-600/40 text-xs sm:text-sm backdrop-blur-sm transition-all duration-200 hover:scale-105"
                          onClick={() => handleAction(action.action, action.target)}
                        >
                          {action.icon}
                          <span className="ml-1">{action.label}</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800/95 border-gray-700/50 text-white max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {action.icon}
                            {action.label}
                          </DialogTitle>
                          <DialogDescription className="text-gray-400">
                            {action.action === 'configure' && 'Настройте подключение к Metasploit Framework'}
                            {action.action === 'command' && 'Выполняйте команды Metasploit в интерактивном режиме'}
                            {action.action === 'exploit' && 'Настройте и запустите эксплойты'}
                            {action.action === 'auto-attack' && 'Автоматизированная система атак'}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="mt-4">
                          {action.action === 'configure' && (
                            <MetasploitSettings onConfigSaved={onConfigSaved || (() => {})} />
                          )}
                          {action.action === 'command' && <CommandExecutor />}
                          {action.action === 'exploit' && <ExploitManager />}
                          {action.action === 'auto-attack' && (
                            <AutomatedCommandSystem
                              isActive={true}
                              onCommandStart={() => {}}
                              onCommandComplete={(results) => {
                                console.log('Automation completed:', results)
                              }}
                            />
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
              
              <div className="mt-2 text-xs opacity-60">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-700/40 text-gray-100 rounded-2xl p-4 mr-4 backdrop-blur-sm border border-gray-600/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-sm text-gray-400">ИИ печатает...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input with improved transparency */}
      <div className="bg-gray-800/60 backdrop-blur-md border-t border-gray-700/50 p-4">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Попробуйте: "выполни проверку и эксплойты на rabby.at"'
            className="bg-gray-700/40 border-gray-600/50 text-white placeholder-gray-400 flex-1 backdrop-blur-sm focus:bg-gray-700/60 transition-all duration-200"
            disabled={isTyping}
          />
          <Button
            onClick={() => handleSendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-blue-600/80 hover:bg-blue-700/80 p-3 backdrop-blur-sm transition-all duration-200 hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mt-2 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600/30 bg-gray-800/20 hover:bg-gray-600/40 text-xs backdrop-blur-sm"
            onClick={() => setInputMessage('выполни проверку и эксплойты на testphp.vulnweb.com')}
          >
            <Target className="h-3 w-3 mr-1" />
            Тестовая цель
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600/30 bg-gray-800/20 hover:bg-gray-600/40 text-xs backdrop-blur-sm"
            onClick={() => setInputMessage('покажи активные сессии')}
          >
            <Play className="h-3 w-3 mr-1" />
            Сессии
          </Button>
        </div>
      </div>

      <AutomatedCommandSystem
        isActive={false}
        onCommandStart={() => {}}
        onCommandComplete={() => {}}
      />
    </div>
  )
}
