
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export const useSystemData = () => {
  const scanSessionsQuery = useQuery({
    queryKey: ['scan-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('scan_sessions')
        .select('*')
        .eq('status', 'running')
      
      if (error) throw error
      return data
    },
    refetchInterval: 10000
  })

  const vulnerabilitiesQuery = useQuery({
    queryKey: ['vulnerabilities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vulnerabilities')
        .select('*')
        .order('discovered_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    refetchInterval: 10000
  })

  const activeSessionsQuery = useQuery({
    queryKey: ['active-sessions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('active_sessions')
        .select('*')
        .eq('status', 'active')
      
      if (error) throw error
      return data
    },
    refetchInterval: 5000
  })

  const exploitQueueQuery = useQuery({
    queryKey: ['exploit-queue'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exploit_queue')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    refetchInterval: 5000
  })

  const networkNodesQuery = useQuery({
    queryKey: ['network-nodes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('network_nodes')
        .select('*')
        .order('discovered_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    refetchInterval: 15000
  })

  return {
    activeScans: scanSessionsQuery.data?.length || 0,
    isLoadingScans: scanSessionsQuery.isLoading,
    
    vulnerabilities: vulnerabilitiesQuery.data?.length || 0,
    vulnerabilityList: vulnerabilitiesQuery.data || [],
    isLoadingVulnerabilities: vulnerabilitiesQuery.isLoading,
    
    activeSessions: activeSessionsQuery.data?.length || 0,
    sessionList: activeSessionsQuery.data || [],
    isLoadingSessions: activeSessionsQuery.isLoading,
    
    exploitsInQueue: exploitQueueQuery.data?.length || 0,
    exploitList: exploitQueueQuery.data || [],
    isLoadingExploits: exploitQueueQuery.isLoading,
    
    networkNodes: networkNodesQuery.data?.length || 0,
    nodeList: networkNodesQuery.data || [],
    isLoadingNodes: networkNodesQuery.isLoading,
  }
}
