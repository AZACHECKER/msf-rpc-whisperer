
import { useState } from 'react'
import { MainInterface } from '@/components/MainInterface'
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
      <div className="min-h-screen bg-black">
        <MainInterface onConfigSaved={handleConfigSaved} />
        <Toaster />
      </div>
    </QueryClientProvider>
  )
}

export default Index
