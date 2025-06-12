
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Terminal, Settings, Zap, Play } from "lucide-react"
import { MetasploitSettings } from './MetasploitSettings'
import { CommandExecutor } from './CommandExecutor'
import { ExploitManager } from './ExploitManager'
import { useMetasploit } from '@/hooks/useMetasploit'

interface MetasploitConfig {
  host: string
  port: string
  username: string
  password: string
}

export const MetasploitConsole = () => {
  const [config, setConfig] = useState<MetasploitConfig | null>(null)
  const { sessions, isLoadingSessions } = useMetasploit()

  const handleConfigSaved = (newConfig: MetasploitConfig) => {
    setConfig(newConfig)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Terminal className="h-5 w-5 mr-2 text-purple-400" />
            Metasploit Framework Console
          </CardTitle>
          <CardDescription className="text-gray-400">
            Полная интеграция с Metasploit Framework
            {config && (
              <span className="ml-2 text-green-400">
                - Подключено к {config.host}:{config.port}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!config ? (
            <MetasploitSettings onConfigSaved={handleConfigSaved} />
          ) : (
            <Tabs defaultValue="commands" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4 bg-gray-700">
                <TabsTrigger value="commands" className="data-[state=active]:bg-blue-600">
                  <Terminal className="h-4 w-4 mr-2" />
                  Команды
                </TabsTrigger>
                <TabsTrigger value="exploits" className="data-[state=active]:bg-orange-600">
                  <Zap className="h-4 w-4 mr-2" />
                  Эксплойты
                </TabsTrigger>
                <TabsTrigger value="sessions" className="data-[state=active]:bg-green-600">
                  <Play className="h-4 w-4 mr-2" />
                  Сессии ({sessions.length})
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
                  <Settings className="h-4 w-4 mr-2" />
                  Настройки
                </TabsTrigger>
              </TabsList>

              <TabsContent value="commands">
                <CommandExecutor />
              </TabsContent>

              <TabsContent value="exploits">
                <ExploitManager />
              </TabsContent>

              <TabsContent value="sessions">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Активные сессии</CardTitle>
                    <CardDescription className="text-gray-400">
                      Управление активными сессиями Metasploit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingSessions ? (
                      <div className="text-center py-8 text-gray-400">
                        Загрузка сессий...
                      </div>
                    ) : sessions.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        Нет активных сессий
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {sessions.map((session: any) => (
                          <div 
                            key={session.id}
                            className="p-3 bg-gray-900/50 rounded-lg border border-gray-600"
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <MetasploitSettings onConfigSaved={handleConfigSaved} />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
