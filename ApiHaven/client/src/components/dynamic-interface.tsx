import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  Eye, 
  Settings, 
  Play, 
  Activity, 
  Sparkles,
  TrendingUp,
  ArrowUp,
  Timer,
  CheckCircle2
} from "lucide-react";

interface FloatingToolbarProps {
  onModeChange: (mode: string) => void;
  currentMode: string;
}

export function FloatingToolbar({ onModeChange, currentMode }: FloatingToolbarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modes = [
    { id: 'default', label: 'Default', icon: Eye, color: 'bg-blue-500' },
    { id: 'interactive', label: 'Interactive', icon: Zap, color: 'bg-purple-500' },
    { id: 'demo', label: 'Demo Mode', icon: Play, color: 'bg-green-500' },
    { id: 'analytics', label: 'Analytics', icon: Activity, color: 'bg-orange-500' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.div
            className="bg-white rounded-full shadow-lg border p-2"
            whileHover={{ scale: 1.05 }}
          >
            {!isExpanded ? (
              <Button
                onClick={() => setIsExpanded(true)}
                className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Sparkles className="text-white" size={20} />
              </Button>
            ) : (
              <motion.div
                className="flex flex-col space-y-2 p-2"
                initial={{ width: 56, height: 56 }}
                animate={{ width: 280, height: 'auto' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Interface Mode</span>
                  <Button
                    onClick={() => setIsExpanded(false)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                  >
                    ×
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {modes.map((mode) => (
                    <motion.div
                      key={mode.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => onModeChange(mode.id)}
                        variant={currentMode === mode.id ? "default" : "outline"}
                        size="sm"
                        className={`w-full flex items-center space-x-2 ${
                          currentMode === mode.id ? mode.color : ''
                        }`}
                      >
                        <mode.icon size={14} />
                        <span className="text-xs">{mode.label}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface InteractiveStatsProps {
  stats: any;
  mode: string;
}

export function InteractiveStats({ stats, mode }: InteractiveStatsProps) {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  const statsData = [
    {
      id: 'requests',
      label: 'Total Requests',
      value: stats?.totalRequests?.toLocaleString() || '0',
      icon: Activity,
      color: 'blue',
      trend: '+12%',
      description: 'API calls in the last 24 hours'
    },
    {
      id: 'success',
      label: 'Success Rate',
      value: `${stats?.totalRequests ? Math.round((stats.successfulRequests / stats.totalRequests) * 100) : 0}%`,
      icon: CheckCircle2,
      color: 'green',
      trend: '+5%',
      description: 'Successful API responses'
    },
    {
      id: 'response',
      label: 'Avg Response',
      value: `${stats?.averageResponseTime || '0'}ms`,
      icon: Timer,
      color: 'purple',
      trend: '-8%',
      description: 'Average response time'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
      green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {statsData.map((stat, index) => {
        const colors = getColorClasses(stat.color);
        
        return (
          <motion.div
            key={stat.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ 
              y: -8, 
              scale: mode === 'interactive' ? 1.05 : 1.02,
              rotateY: mode === 'interactive' ? 5 : 0 
            }}
            onHoverStart={() => setHoveredStat(stat.id)}
            onHoverEnd={() => setHoveredStat(null)}
            className="cursor-pointer"
          >
            <Card className={`transition-all duration-500 ${
              hoveredStat === stat.id 
                ? `shadow-xl ${colors.light} border-2 border-${stat.color}-200` 
                : 'shadow-md hover:shadow-lg'
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <motion.p 
                      className={`text-3xl font-bold ${colors.text}`}
                      animate={hoveredStat === stat.id ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {stat.value}
                    </motion.p>
                    
                    <AnimatePresence>
                      {(hoveredStat === stat.id || mode === 'analytics') && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <TrendingUp size={12} className="text-green-500" />
                            <span className="text-green-600 font-medium">{stat.trend}</span>
                            <span>vs last week</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <motion.div 
                    className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center`}
                    animate={hoveredStat === stat.id ? { 
                      scale: 1.2, 
                      rotate: mode === 'interactive' ? 360 : 0 
                    } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <stat.icon className="text-white" size={24} />
                  </motion.div>
                </div>
                
                {mode === 'demo' && (
                  <motion.div
                    className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: index * 0.2, duration: 1 }}
                  >
                    <motion.div
                      className={`h-full ${colors.bg} rounded-full`}
                      initial={{ width: '0%' }}
                      animate={{ width: `${Math.random() * 80 + 20}%` }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                    />
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

interface ScrollToTopProps {
  isVisible: boolean;
}

export function ScrollToTop({ isVisible }: ScrollToTopProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-6 z-40"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}