import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Activity, 
  TrendingUp, 
  Eye,
  Mouse,
  Waves
} from "lucide-react";

export function MouseTracker() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsActive(true);
      
      const timer = setTimeout(() => setIsActive(false), 100);
      return () => clearTimeout(timer);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      animate={{
        x: mousePos.x - 10,
        y: mousePos.y - 10,
        scale: isActive ? 1.2 : 1,
        opacity: isActive ? 0.8 : 0.3,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
        <motion.div
          className="w-full h-full bg-white rounded-full"
          animate={{ scale: isActive ? [1, 1.5, 1] : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export function FloatingParticles() {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [particle.x, particle.x + Math.random() * 200 - 100],
            y: [particle.y, particle.y + Math.random() * 200 - 100],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

interface PulsingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline";
  className?: string;
  isActive?: boolean;
}

export function PulsingButton({ 
  children, 
  onClick, 
  variant = "default", 
  className = "",
  isActive = false 
}: PulsingButtonProps) {
  const controls = useAnimation();

  const handleClick = () => {
    controls.start({
      scale: [1, 0.95, 1.05, 1],
      rotate: [0, -2, 2, 0],
      transition: { duration: 0.3 }
    });
    onClick?.();
  };

  return (
    <motion.div
      animate={controls}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        onClick={handleClick}
        variant={variant}
        className={`relative overflow-hidden ${className}`}
      >
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  );
}

interface LiveActivityIndicatorProps {
  isActive: boolean;
  label: string;
}

export function LiveActivityIndicator({ isActive, label }: LiveActivityIndicatorProps) {
  return (
    <motion.div
      className="flex items-center space-x-2 text-sm"
      animate={{ opacity: isActive ? 1 : 0.7 }}
    >
      <motion.div
        className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}
        animate={isActive ? {
          scale: [1, 1.3, 1],
          opacity: [1, 0.7, 1],
        } : {}}
        transition={{
          duration: 1,
          repeat: isActive ? Infinity : 0,
        }}
      />
      <span className={isActive ? 'text-green-600' : 'text-gray-500'}>
        {label}
      </span>
    </motion.div>
  );
}

interface RealTimeStatsProps {
  value: number | string;
  label: string;
  trend?: number;
  isLive?: boolean;
}

export function RealTimeStats({ value, label, trend, isLive = false }: RealTimeStatsProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (isLive && typeof value === 'number') {
      const interval = setInterval(() => {
        setDisplayValue(prev => {
          const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          return typeof prev === 'number' ? Math.max(0, prev + change) : prev;
        });
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [value, isLive]);

  return (
    <motion.div
      className="text-center p-4 bg-white rounded-lg shadow-sm border"
      whileHover={{ scale: 1.02, y: -2 }}
      layout
    >
      <motion.div
        className="text-2xl font-bold text-gray-900"
        key={displayValue}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {displayValue.toLocaleString()}
      </motion.div>
      <div className="text-sm text-gray-600 mb-2">{label}</div>
      
      {trend !== undefined && (
        <motion.div
          className={`flex items-center justify-center space-x-1 text-xs ${
            trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TrendingUp size={12} className={trend > 0 ? 'rotate-0' : 'rotate-180'} />
          <span>{Math.abs(trend)}%</span>
        </motion.div>
      )}
      
      {isLive && (
        <LiveActivityIndicator isActive={true} label="Live" />
      )}
    </motion.div>
  );
}

interface InteractiveCardWrapperProps {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export function InteractiveCardWrapper({ 
  children, 
  className = "",
  glowOnHover = true 
}: InteractiveCardWrapperProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
    >
      {glowOnHover && isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <motion.div
        animate={isHovered ? { y: -2 } : { y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
      
      {isHovered && (
        <motion.div
          className="absolute top-2 right-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <Badge variant="secondary" className="text-xs">
            <Eye size={10} className="mr-1" />
            Active
          </Badge>
        </motion.div>
      )}
    </motion.div>
  );
}

export function TypewriterText({ 
  text, 
  speed = 50, 
  className = "" 
}: { 
  text: string; 
  speed?: number; 
  className?: string; 
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  );
}