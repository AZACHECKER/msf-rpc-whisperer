
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Settings, TestTube, CheckCircle, XCircle, Loader } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from '@/integrations/supabase/client'

interface MetasploitConfig {
  host: string
  port: string
  username: string
  password: string
}

interface MetasploitSettingsProps {
  onConfigSaved: (config: MetasploitConfig) => void
}

export const MetasploitSettings = ({ onConfigSaved }: MetasploitSettingsProps) => {
  const [config, setConfig] = useState<MetasploitConfig>({
    host: '4.tcp.eu.ngrok.io',
    port: '17403',
    username: 'msf',
    password: 'msfpass'
  })
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null)
  const { toast } = useToast()

  const handleTestConnection = async () => {
    setTesting(true)
    setTestResult(null)

    try {
      const { data, error } = await supabase.functions.invoke('metasploit-rpc', {
        body: { 
          action: 'test_connection',
          config
        }
      })

      if (error) throw error

      if (data.success) {
        setTestResult('success')
        toast({
          title: "Соединение установлено",
          description: `Подключение к ${config.host}:${config.port} успешно`,
        })
      } else {
        setTestResult('error')
        toast({
          title: "Ошибка подключения",
          description: data.error || "Не удалось подключиться к Metasploit",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      setTestResult('error')
      toast({
        title: "Ошибка подключения",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setTesting(false)
    }
  }

  const handleSaveConfig = () => {
    if (testResult === 'success') {
      onConfigSaved(config)
      toast({
        title: "Настройки сохранены",
        description: "Конфигурация Metasploit успешно сохранена",
      })
    } else {
      toast({
        title: "Ошибка",
        description: "Сначала проверьте подключение",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Settings className="h-5 w-5 mr-2 text-purple-400" />
          Настройки Metasploit
        </CardTitle>
        <CardDescription className="text-gray-400">
          Настройте подключение к Metasploit Framework
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="host" className="text-gray-300">Хост</Label>
            <Input
              id="host"
              value={config.host}
              onChange={(e) => setConfig(prev => ({ ...prev, host: e.target.value }))}
              className="bg-gray-900/50 border-gray-600 text-gray-300"
              placeholder="4.tcp.eu.ngrok.io"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port" className="text-gray-300">Порт</Label>
            <Input
              id="port"
              value={config.port}
              onChange={(e) => setConfig(prev => ({ ...prev, port: e.target.value }))}
              className="bg-gray-900/50 border-gray-600 text-gray-300"
              placeholder="17403"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-300">Пользователь</Label>
            <Input
              id="username"
              value={config.username}
              onChange={(e) => setConfig(prev => ({ ...prev, username: e.target.value }))}
              className="bg-gray-900/50 border-gray-600 text-gray-300"
              placeholder="msf"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={config.password}
              onChange={(e) => setConfig(prev => ({ ...prev, password: e.target.value }))}
              className="bg-gray-900/50 border-gray-600 text-gray-300"
              placeholder="msfpass"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleTestConnection}
              disabled={testing}
              variant="outline"
              className="border-gray-600"
            >
              {testing ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <TestTube className="h-4 w-4 mr-2" />
                  Проверить соединение
                </>
              )}
            </Button>

            {testResult && (
              <Badge 
                variant={testResult === 'success' ? 'default' : 'destructive'}
                className={testResult === 'success' ? 'bg-green-600' : ''}
              >
                {testResult === 'success' ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Подключено
                  </>
                ) : (
                  <>
                    <XCircle className="h-3 w-3 mr-1" />
                    Ошибка
                  </>
                )}
              </Badge>
            )}
          </div>

          <Button 
            onClick={handleSaveConfig}
            disabled={testResult !== 'success'}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Сохранить настройки
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
