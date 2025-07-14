import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Circle, Eye, ExternalLink, Clock, Zap } from "lucide-react";

interface InteractiveApiCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  version: string;
  children: React.ReactNode;
  mode: string;
  responseTime?: string;
  uptime?: string;
}

export function InteractiveApiCard({
  id,
  title,
  description,
  icon,
  color,
  version,
  children,
  mode,
  responseTime = "< 2s",
  uptime = "99.9%"
}: InteractiveApiCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    default: { scale: 1, rotateY: 0 },
    hover: { 
      scale: mode === 'interactive' ? 1.02 : 1.01,
      rotateY: mode === 'interactive' ? 2 : 0,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  const iconVariants = {
    default: { rotate: 0, scale: 1 },
    hover: { 
      rotate: mode === 'demo' ? 360 : 0,
      scale: isHovered ? 1.1 : 1,
      transition: { duration: mode === 'demo' ? 0.6 : 0.2 }
    }
  };

  return (
    <motion.div
      id={id}
      variants={cardVariants}
      initial="default"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="mb-8"
    >
      <Card className={`transition-all duration-500 ${
        isHovered 
          ? `shadow-xl border-2 border-${color}-200 bg-gradient-to-br from-white to-${color}-50` 
          : 'shadow-md hover:shadow-lg'
      }`}>
        <motion.div 
          className="p-6 border-b border-gray-200"
          animate={isHovered && mode === 'interactive' ? { backgroundColor: `hsl(var(--${color}-50))` } : {}}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                className={`w-10 h-10 bg-${color}-600 rounded-lg flex items-center justify-center`}
                variants={iconVariants}
                animate={isHovered ? "hover" : "default"}
              >
                {icon}
              </motion.div>
              <div>
                <motion.h2 
                  className="text-xl font-bold text-gray-900"
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {title}
                </motion.h2>
                <motion.p 
                  className="text-sm text-gray-600"
                  animate={isHovered ? { opacity: 0.8 } : { opacity: 1 }}
                >
                  {description}
                </motion.p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <motion.div
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Badge className="bg-green-500 hover:bg-green-600">
                  <Circle className="w-2 h-2 mr-1" />
                  Active
                </Badge>
              </motion.div>
              <Badge variant="secondary">{version}</Badge>
              
              {mode === 'analytics' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 text-xs"
                >
                  <div className="flex items-center space-x-1 text-green-600">
                    <Clock size={12} />
                    <span>{responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-blue-600">
                    <Zap size={12} />
                    <span>{uptime}</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {mode === 'interactive' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 flex items-center space-x-3"
            >
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs"
              >
                <Eye size={12} className="mr-1" />
                {isExpanded ? 'Collapse' : 'Expand'} Details
              </Button>
              <Button size="sm" variant="ghost" className="text-xs">
                <ExternalLink size={12} className="mr-1" />
                Quick Test
              </Button>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div
          animate={
            mode === 'demo' && isHovered 
              ? { backgroundColor: 'rgba(0,0,0,0.02)' } 
              : { backgroundColor: 'transparent' }
          }
          transition={{ duration: 0.3 }}
        >
          <CardContent className={`transition-all duration-300 ${
            isExpanded || mode === 'default' ? 'p-6' : 'p-6'
          }`}>
            <motion.div
              animate={
                isExpanded || mode === 'default' 
                  ? { opacity: 1, height: 'auto' } 
                  : mode === 'interactive' 
                    ? { opacity: 0.7, height: 'auto' }
                    : { opacity: 1, height: 'auto' }
              }
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </CardContent>
        </motion.div>
        
        {mode === 'demo' && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute top-4 right-4">
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}