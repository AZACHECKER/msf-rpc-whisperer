
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Send, Terminal, Settings, Zap, Play, Shield, Target, Wifi } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MetasploitSettings } from './MetasploitSettings'
import { CommandExecutor } from './CommandExecutor'
import { ExploitManager } from './ExploitManager'
import { useMetasploit } from '@/hooks/useMetasploit'
import { useSystemData } from '@/hooks/useSystemData'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  actions?: Array<{
    label: string
    action: string
    icon?: React.ReactNode
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
      content: 'Добро пожаловать в Metasploit AI Assistant! 🛡️\n\nЯ помогу вам с настройкой и использованием Metasploit Framework. Что бы вы хотели сделать?',
      timestamp: new Date(),
      actions: [
        { label: 'Настроить подключение', action: 'configure', icon: <Settings className="h-4 w-4" /> },
        { label: 'Выполнить команду', action: 'command', icon: <Terminal className="h-4 w-4" /> },
        { label: 'Запустить эксплойт', action: 'exploit', icon: <Zap className="h-4 w-4" /> },
        { label: 'Показать сессии', action: 'sessions', icon: <Play className="h-4 w-4" /> }
      ]
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const { sessionList, activeSessions, vulnerabilities } = useSystemData()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()
    
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

  const handleAction = (action: string) => {
    setActiveModal(action)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputMessage)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Metasploit AI</h1>
              <p className="text-sm text-gray-400">Ваш помощник по безопасности</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              <Wifi className="h-3 w-3 mr-1" />
              Онлайн
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] rounded-2xl p-4 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white ml-4'
                  : 'bg-gray-700/50 text-gray-100 mr-4'
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
                          className="border-gray-600 hover:bg-gray-600 text-xs sm:text-sm"
                          onClick={() => handleAction(action.action)}
                        >
                          {action.icon}
                          <span className="ml-1">{action.label}</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {action.icon}
                            {action.label}
                          </DialogTitle>
                          <DialogDescription className="text-gray-400">
                            {action.action === 'configure' && 'Настройте подключение к Metasploit Framework'}
                            {action.action === 'command' && 'Выполняйте команды Metasploit в интерактивном режиме'}
                            {action.action === 'exploit' && 'Настройте и запустите эксплойты'}
                            {action.action === 'sessions' && 'Управляйте активными сессиями'}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="mt-4">
                          {action.action === 'configure' && (
                            <MetasploitSettings onConfigSaved={onConfigSaved || (() => {})} />
                          )}
                          {action.action === 'command' && <CommandExecutor />}
                          {action.action === 'exploit' && <ExploitManager />}
                          {action.action === 'sessions' && (
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
            <div className="bg-gray-700/50 text-gray-100 rounded-2xl p-4 mr-4">
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

      {/* Input */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 p-4">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите сообщение..."
            className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 flex-1"
            disabled={isTyping}
          />
          <Button
            onClick={() => handleSendMessage(inputMessage)}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 p-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
