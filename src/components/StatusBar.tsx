
import { Badge } from "@/components/ui/badge"
import { Shield, Wifi, Target, AlertTriangle } from "lucide-react"
import { useSystemData } from '@/hooks/useSystemData'

export const StatusBar = () => {
  const { activeSessions, vulnerabilities, networkNodes } = useSystemData()

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 p-2">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            <Shield className="h-3 w-3 mr-1" />
            MSF
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Wifi className="h-3 w-3 mr-1" />
            {networkNodes} узлов
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-xs bg-green-600">
            <Target className="h-3 w-3 mr-1" />
            {activeSessions}
          </Badge>
          <Badge variant="destructive" className="text-xs">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {vulnerabilities}
          </Badge>
        </div>
      </div>
    </div>
  )
}
