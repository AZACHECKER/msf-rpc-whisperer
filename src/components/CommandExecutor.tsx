
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Terminal, Send, History, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from '@/integrations/supabase/client'

interface CommandHistory {
  id: string
  command: string
  output: string
  timestamp: Date
  success: boolean
}

export const CommandExecutor = () => {
  const [command, setCommand] = useState('')
  const [executing, setExecuting] = useState(false)
  const [history, setHistory] = useState<CommandHistory[]>([])
  const { toast } = useToast()

  const handleExecuteCommand = async () => {
    if (!command.trim()) return

    setExecuting(true)
    const startTime = new Date()

    try {
      const { data, error } = await supabase.functions.invoke('metasploit-rpc', {
        body: { 
          action: 'execute',
          command: command.trim()
        }
      })

      if (error) throw error

      const historyItem: CommandHistory = {
        id: Date.now().toString(),
        command: command.trim(),
        output: data.output || 'Команда выполнена успешно',
        timestamp: startTime,
        success: data.success !== false
      }

      setHistory(prev => [historyItem, ...prev.slice(0, 19)]) // Оставляем последние 20 команд
      setCommand('')

      toast({
        title: "Команда выполнена",
        description: `${command.trim()}`,
      })
    } catch (error: any) {
      const historyItem: CommandHistory = {
        id: Date.now().toString(),
        command: command.trim(),
        output: `Ошибка: ${error.message}`,
        timestamp: startTime,
        success: false
      }

      setHistory(prev => [historyItem, ...prev.slice(0, 19)])

      toast({
        title: "Ошибка выполнения",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setExecuting(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleExecuteCommand()
    }
  }

  const clearHistory = () => {
    setHistory([])
    toast({
      title: "История очищена",
      description: "История команд успешно очищена",
    })
  }

  const quickCommands = [
    'sessions -l',
    'db_status',
    'workspace',
    'hosts',
    'services',
    'vulns',
    'help'
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Terminal className="h-5 w-5 mr-2 text-blue-400" />
            Выполнение команд
          </CardTitle>
          <CardDescription className="text-gray-400">
            Интерактивная консоль Metasploit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Введите команду Metasploit (например: sessions -l, help, use exploit/...)"
              className="bg-gray-900/50 border-gray-600 text-gray-300 font-mono"
              disabled={executing}
            />
            <Button 
              onClick={handleExecuteCommand}
              disabled={!command.trim() || executing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Быстрые команды:</span>
              {history.length > 0 && (
                <Button 
                  onClick={clearHistory}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-400"
                >
                  <Trash className="h-3 w-3 mr-1" />
                  Очистить
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {quickCommands.map((cmd) => (
                <Button
                  key={cmd}
                  onClick={() => setCommand(cmd)}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  {cmd}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {history.length > 0 && (
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <History className="h-5 w-5 mr-2 text-green-400" />
              История команд
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="bg-black/30 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <code className="text-blue-400 font-mono text-sm">
                    msf6 &gt; {item.command}
                  </code>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={item.success ? 'default' : 'destructive'}
                      className={item.success ? 'bg-green-600' : ''}
                    >
                      {item.success ? 'Успех' : 'Ошибка'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {item.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <Textarea
                  value={item.output}
                  readOnly
                  className="min-h-[60px] bg-gray-900/50 border-gray-600 text-gray-300 font-mono text-xs resize-none"
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
