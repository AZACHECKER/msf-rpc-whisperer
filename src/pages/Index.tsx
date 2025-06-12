
import { useState } from 'react'
import { ChatInterface } from '@/components/ChatInterface'
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 10 * 1000, // 10 seconds
    },
  },
})

const Index = () => {
  const [config, setConfig] = useState(null)

  const handleConfigSaved = (newConfig: any) => {
    setConfig(newConfig)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-900">
        <ChatInterface onConfigSaved={handleConfigSaved} />
        <Toaster />
      </div>
    </QueryClientProvider>
  )
}

export default Index
