
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

export const useMetasploit = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const connectMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('metasploit-rpc', {
        body: { action: 'connect' }
      })
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast({
        title: "Подключение установлено",
        description: "Успешно подключен к Metasploit Framework",
      })
      queryClient.invalidateQueries({ queryKey: ['metasploit-sessions'] })
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка подключения",
        description: error.message,
        variant: "destructive",
      })
    }
  })

  const executeCommandMutation = useMutation({
    mutationFn: async ({ command, sessionId }: { command: string, sessionId?: string }) => {
      const { data, error } = await supabase.functions.invoke('metasploit-rpc', {
        body: { action: 'execute', command, sessionId }
      })
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['console-history'] })
    }
  })

  const sessionsQuery = useQuery({
    queryKey: ['metasploit-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('metasploit-rpc', {
        body: { action: 'sessions' }
      })
      
      if (error) throw error
      return data.sessions
    },
    refetchInterval: 5000 // Обновление каждые 5 секунд
  })

  const exploitsQuery = useQuery({
    queryKey: ['available-exploits'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('metasploit-rpc', {
        body: { action: 'exploits' }
      })
      
      if (error) throw error
      return data.exploits
    }
  })

  return {
    connect: connectMutation.mutate,
    isConnecting: connectMutation.isPending,
    executeCommand: executeCommandMutation.mutate,
    isExecuting: executeCommandMutation.isPending,
    sessions: sessionsQuery.data || [],
    isLoadingSessions: sessionsQuery.isLoading,
    exploits: exploitsQuery.data || [],
    isLoadingExploits: exploitsQuery.isLoading,
  }
}
