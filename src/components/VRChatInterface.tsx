
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, MicOff, Send } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface VRChatInterfaceProps {
  is3DMode?: boolean
}

export const VRChatInterface = ({ is3DMode = false }: VRChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isListening, setIsListening] = useState(false)

  const sendMessage = () => {
    if (!inputValue.trim()) return
    
    const newMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: `Получил ваше сообщение: "${inputValue}". Как я могу помочь с Metasploit?`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
    
    setInputValue('')
  }

  const toggleVoice = () => {
    setIsListening(!isListening)
    // Voice functionality would be implemented here
    console.log('Voice toggle:', !isListening)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className={`${is3DMode ? 'bg-gray-900/20' : 'bg-gray-800/50'} border-gray-700 rounded-lg h-96 flex flex-col`}>
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 border border-gray-600 rounded-t-lg bg-black/20">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-400/30' 
                    : 'bg-gray-700/50 text-gray-300 border border-gray-600'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-8">
            <div className="text-lg mb-2">🤖</div>
            <div>Привет! Я AI ассистент Metasploit.</div>
            <div className="text-sm mt-1">Задайте мне любой вопрос или начните голосовое общение.</div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-gray-600 bg-gray-800/30 rounded-b-lg">
        <div className="flex gap-2">
          <button
            onClick={toggleVoice}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500/20 text-red-400 border border-red-400/50' 
                : 'bg-gray-700/50 text-gray-400 hover:text-white border border-gray-600'
            }`}
            title={isListening ? 'Остановить запись' : 'Начать голосовую запись'}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите сообщение или используйте голос..."
            className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
          
          <Button 
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
          </Button>
        </div>
        
        {isListening && (
          <div className="mt-2 text-center text-red-400 text-sm animate-pulse">
            🎤 Слушаю...
          </div>
        )}
      </div>
    </div>
  )
}
