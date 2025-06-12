
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Network, 
  Brain, 
  Terminal, 
  Radio,
  MessageSquare,
  Activity,
  Search,
  Zap,
  Eye,
  Database
} from "lucide-react";

const Index = () => {
  const [activeScans, setActiveScans] = useState(3);
  const [vulnerabilities, setVulnerabilities] = useState(15);
  const [activeSessions, setActiveSessions] = useState(2);

  const systemModules = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Сканирование",
      description: "Автоматическое сканирование уязвимостей и анализ безопасности",
      count: activeScans,
      color: "bg-blue-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Уязвимости",
      description: "Обнаруженные уязвимости и рекомендации по устранению",
      count: vulnerabilities,
      color: "bg-red-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Эксплойты",
      description: "Управление и запуск эксплойтов",
      count: 47,
      color: "bg-orange-500"
    },
    {
      icon: <Network className="h-8 w-8" />,
      title: "Сетевая топология",
      description: "Карта сети и обнаруженные узлы",
      count: 12,
      color: "bg-green-500"
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: "Metasploit",
      description: "Активные сессии и консоль управления",
      count: activeSessions,
      color: "bg-purple-500"
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Анализ",
      description: "Искусственный интеллект для анализа безопасности",
      count: 8,
      color: "bg-cyan-500"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Telegram",
      description: "Мониторинг и управление через Telegram",
      count: 5,
      color: "bg-blue-600"
    },
    {
      icon: <Radio className="h-8 w-8" />,
      title: "Радио",
      description: "Радиостанция и чат",
      count: 1,
      color: "bg-pink-500"
    }
  ];

  const recentActivity = [
    { type: "scan", message: "Завершено сканирование 192.168.1.0/24", time: "2 мин назад" },
    { type: "vuln", message: "Обнаружена критическая уязвимость CVE-2023-1234", time: "5 мин назад" },
    { type: "exploit", message: "Успешно выполнен эксплойт ms17_010_eternalblue", time: "10 мин назад" },
    { type: "session", message: "Новая meterpreter сессия от 192.168.1.15", time: "15 мин назад" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            MultiChecker Security Platform
          </h1>
          <p className="text-gray-400 text-lg">
            Комплексная платформа для анализа безопасности и пентестинга
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
              <Activity className="h-4 w-4 mr-2" />
              Панель управления
            </TabsTrigger>
            <TabsTrigger value="scans" className="data-[state=active]:bg-blue-600">
              <Search className="h-4 w-4 mr-2" />
              Сканирование
            </TabsTrigger>
            <TabsTrigger value="exploits" className="data-[state=active]:bg-blue-600">
              <Zap className="h-4 w-4 mr-2" />
              Эксплойты
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="data-[state=active]:bg-blue-600">
              <Eye className="h-4 w-4 mr-2" />
              Мониторинг
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemModules.map((module, index) => (
                <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${module.color} text-white`}>
                        {module.icon}
                      </div>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                        {module.count}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-1 text-white">{module.title}</CardTitle>
                    <CardDescription className="text-gray-400 text-sm">
                      {module.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-400" />
                    Последняя активность
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${activity.type === 'scan' ? 'border-blue-500 text-blue-400' : ''}
                          ${activity.type === 'vuln' ? 'border-red-500 text-red-400' : ''}
                          ${activity.type === 'exploit' ? 'border-orange-500 text-orange-400' : ''}
                          ${activity.type === 'session' ? 'border-green-500 text-green-400' : ''}
                        `}
                      >
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Database className="h-5 w-5 mr-2 text-purple-400" />
                    Статистика системы
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">{activeScans}</div>
                      <div className="text-xs text-gray-400">Активных сканов</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-2xl font-bold text-red-400">{vulnerabilities}</div>
                      <div className="text-xs text-gray-400">Уязвимостей</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">{activeSessions}</div>
                      <div className="text-xs text-gray-400">Активных сессий</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">47</div>
                      <div className="text-xs text-gray-400">Доступных эксплойтов</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scans" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Управление сканированием</CardTitle>
                <CardDescription className="text-gray-400">
                  Запуск и мониторинг сканирования безопасности
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Новое сканирование
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    Авто-сканирование
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exploits" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Управление эксплойтами</CardTitle>
                <CardDescription className="text-gray-400">
                  Доступные эксплойты и очередь выполнения
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Запустить эксплойт
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    Просмотреть очередь
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Системный мониторинг</CardTitle>
                <CardDescription className="text-gray-400">
                  Мониторинг сетевой активности и системных метрик
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Сетевая топология
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300">
                    Системные метрики
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
