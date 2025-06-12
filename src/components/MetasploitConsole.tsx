
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Terminal, Play, Power, Wifi, WifiOff } from "lucide-react"
import { useMetasploit } from '@/hooks/useMetasploit'

export const MetasploitConsole = () => {
  const [command, setCommand] = useState('')
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const { 
    connect, 
    isConnecting, 
    executeCommand, 
    isExecuting, 
    sessions, 
    isLoadingSessions 
  } = useMetasploit()

  const handleConnect = () => {
    connect()
  }

  const handleExecuteCommand = () => {
    if (command.trim()) {
      executeCommand({ command, sessionId: selectedSession || undefined })
      setCommand('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExecuteCommand()
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Terminal className="h-5 w-5 mr-2 text-purple-400" />
          Metasploit Console
        </CardTitle>
        <CardDescription className="text-gray-400">
          Управление Metasploit Framework - tcp://4.tcp.eu.ngrok.io:17403
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={handleConnect}
            disabled={isConnecting}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isConnecting ? (
              <>
                <WifiOff className="h-4 w-4 mr-2" />
                Подключение...
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4 mr-2" />
                Подключиться
              </>
            )}
          </Button>
          
          <Badge variant="outline" className="border-purple-500 text-purple-400">
            {sessions.length > 0 ? 'Подключен' : 'Не подключен'}
          </Badge>
        </div>

        {sessions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Активные сессии:</h4>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
              {sessions.map((session: any) => (
                <div 
                  key={session.id}
                  className={`p-2 rounded border cursor-pointer transition-colors ${
                    selectedSession === session.session_id 
                      ? 'border-purple-500 bg-purple-900/20' 
                      : 'border-gray-600 bg-gray-900/20 hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedSession(session.session_id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">
                      Сессия {session.session_id}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {session.session_type || 'meterpreter'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {session.target_host || 'localhost'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите команду Metasploit..."
            className="bg-gray-900/50 border-gray-600 text-gray-300"
            disabled={isExecuting}
          />
          <Button 
            onClick={handleExecuteCommand}
            disabled={!command.trim() || isExecuting}
            variant="outline"
            className="border-gray-600"
          >
            <Play className="h-4 w-4" />
          </Button>
        </div>

        {selectedSession && (
          <div className="text-xs text-gray-400">
            Команда будет выполнена в сессии: {selectedSession}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
