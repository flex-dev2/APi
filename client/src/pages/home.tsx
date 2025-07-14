import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { ApiTester } from "@/components/api-tester";
import { UniversalApiTester } from "@/components/universal-api-tester";
import { CodeBlock } from "@/components/code-block";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FloatingToolbar, InteractiveStats, ScrollToTop } from "@/components/dynamic-interface";
import { InteractiveApiCard } from "@/components/interactive-api-card";
import { 
  MouseTracker, 
  FloatingParticles, 
  PulsingButton, 
  LiveActivityIndicator,
  RealTimeStats,
  InteractiveCardWrapper,
  TypewriterText
} from "@/components/enhanced-ui";
import { 
  Play, 
  Download, 
  Plug, 
  CheckCircle, 
  Zap, 
  Youtube, 
  Circle,
  Instagram,
  Bell,
  Image,
  Languages,
  Github,
  Twitter,
  MessageCircle,
  Brain,
  Cpu,
  Music,
  Facebook
} from "lucide-react";

interface ApiStats {
  totalRequests: number;
  successfulRequests: number;
  errorRequests: number;
  averageResponseTime: number;
  uptime: number;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredAPI, setHoveredAPI] = useState<string | null>(null);
  const [interfaceMode, setInterfaceMode] = useState<string>('default');
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const { data: stats } = useQuery<ApiStats>({
    queryKey: ["/api/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Scroll handler for show scroll to top button
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    // Intersection Observer for section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => observer.observe(section));
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const codeExamples = {
    curl: `curl -X GET "${window.location.origin}/api/download/YouTube?url=https://youtu.be/FWAdfuPpLOc?si=GZUXDv7rDQNMlVYF" \\
  -H "Accept: application/json"`,
    javascript: `const response = await fetch('${window.location.origin}/api/download/YouTube?url=https://youtu.be/FWAdfuPpLOc?si=GZUXDv7rDQNMlVYF');
const data = await response.json();
console.log(data);`,
    python: `import requests

url = "${window.location.origin}/api/download/YouTube"
params = {"url": "https://youtu.be/FWAdfuPpLOc?si=GZUXDv7rDQNMlVYF"}

response = requests.get(url, params=params)
data = response.json()
print(data)`
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Dynamic Background Elements */}
      {interfaceMode === 'interactive' && <FloatingParticles />}
      {interfaceMode === 'demo' && <MouseTracker />}
      
      <Header />
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar />
          
          {/* Main Content */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Hero Section */}
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-white"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="max-w-3xl">
                <motion.h1 
                  className="text-3xl font-bold mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <TypewriterText 
                    text="Professional API Documentation Platform" 
                    speed={80}
                  />
                </motion.h1>
                <motion.p 
                  className="text-blue-100 text-lg mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  Access powerful APIs with comprehensive documentation, interactive testing, and real-time examples. Built for developers, by developers.
                </motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <PulsingButton 
                    className="bg-white text-blue-600 hover:bg-blue-50"
                    isActive={interfaceMode === 'interactive' || interfaceMode === 'demo'}
                  >
                    <Play size={16} className="mr-2" />
                    Try Live Demo
                  </PulsingButton>
                  <PulsingButton 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                    isActive={interfaceMode === 'demo'}
                  >
                    <Download size={16} className="mr-2" />
                    Download SDK
                  </PulsingButton>
                </motion.div>
              </div>
            </motion.div>

            {/* Interactive API Statistics */}
            <InteractiveStats stats={stats} mode={interfaceMode} />

            {/* YouTube Download API Documentation */}
            <InteractiveCardWrapper className="mb-8" glowOnHover={interfaceMode === 'interactive'}>
              <Card id="media">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Youtube className="text-red-600" size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">YouTube Video Download API</h2>
                      <p className="text-sm text-gray-600">Download YouTube videos with metadata extraction</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Circle className="w-2 h-2 mr-1" />
                      Active
                    </Badge>
                    <Badge variant="secondary">v1.0</Badge>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                {/* API Overview */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
                  <p className="text-gray-600 mb-4">This API allows you to download YouTube videos by providing a YouTube URL. The API extracts video metadata and provides download links for various quality options.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Rate Limits</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• 100 requests per hour</li>
                        <li>• 1000 requests per day</li>
                        <li>• Burst limit: 10 requests per minute</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Response Time</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Average: 2-5 seconds</li>
                        <li>• Max: 30 seconds</li>
                        <li>• Timeout: 60 seconds</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* API Endpoint */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoint</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">GET</Badge>
                      <code className="text-sm font-mono text-gray-800">/api/download/YouTube</code>
                    </div>
                  </div>
                </div>
                
                {/* Parameters */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-gray-900">url</td>
                          <td className="px-4 py-3 text-sm text-gray-600">string</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="destructive">Required</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">The YouTube video URL to download</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Interactive API Tester */}
                <ApiTester />
                
                {/* Code Examples */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Examples</h3>
                  <div className="space-y-4">
                    <CodeBlock code={codeExamples.curl} language="cURL" />
                    <CodeBlock code={codeExamples.javascript} language="JavaScript (Fetch)" />
                    <CodeBlock code={codeExamples.python} language="Python (Requests)" />
                  </div>
                </div>
                
                {/* Error Handling */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Handling</h3>
                  <div className="space-y-4">
                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <h4 className="font-medium text-red-900 mb-2">400 Bad Request</h4>
                      <p className="text-sm text-red-800 mb-3">Missing or invalid YouTube URL parameter</p>
                      <CodeBlock 
                        code={`{
  "creator": "Flex-dev",
  "message": "please put a youtube link"
}`}
                        language="JSON Response"
                        className="bg-red-50"
                      />
                    </div>
                    
                    <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <h4 className="font-medium text-red-900 mb-2">500 Internal Server Error</h4>
                      <p className="text-sm text-red-800 mb-3">Server error during processing</p>
                      <CodeBlock 
                        code={`{
  "error": "حدث خطأ أثناء معالجة طلبك"
}`}
                        language="JSON Response"
                        className="bg-red-50"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </InteractiveCardWrapper>

            {/* TikTok Download API Documentation */}
            <Card className="mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                      <Music className="text-white" size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">TikTok Video Download API</h2>
                      <p className="text-sm text-gray-600">Download TikTok videos with metadata and multiple quality options</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Circle className="w-2 h-2 mr-1" />
                      Active
                    </Badge>
                    <Badge variant="secondary">v1.0</Badge>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
                  <p className="text-gray-600 mb-4">This API allows you to download TikTok videos by providing a TikTok URL. The API extracts video metadata, author information, and provides download links for various quality options including watermark-free versions.</p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoint</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">GET</Badge>
                      <code className="text-sm font-mono text-gray-800">/api/download/tiktok</code>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-gray-900">url</td>
                          <td className="px-4 py-3 text-sm text-gray-600">string</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="destructive">Required</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">The TikTok video URL to download</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <UniversalApiTester 
                  endpoint="/api/download/tiktok"
                  parameterName="url"
                  parameterLabel="TikTok URL"
                  defaultValue="https://www.tiktok.com/@example/video/1234567890"
                  placeholder="Enter TikTok URL..."
                  title="Interactive TikTok API Tester"
                />
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Examples</h3>
                  <div className="space-y-4">
                    <CodeBlock 
                      code={`curl -X GET "${window.location.origin}/api/download/tiktok?url=https://www.tiktok.com/@example/video/1234567890" \\
  -H "Accept: application/json"`}
                      language="cURL" 
                    />
                    <CodeBlock 
                      code={`const response = await fetch('${window.location.origin}/api/download/tiktok?url=https://www.tiktok.com/@example/video/1234567890');
const data = await response.json();
console.log(data);`}
                      language="JavaScript (Fetch)" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facebook Download API Documentation */}
            <Card className="mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Facebook className="text-white" size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Facebook Video Download API</h2>
                      <p className="text-sm text-gray-600">Download Facebook videos with metadata and multiple quality options</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Circle className="w-2 h-2 mr-1" />
                      Active
                    </Badge>
                    <Badge variant="secondary">v1.0</Badge>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
                  <p className="text-gray-600 mb-4">This API allows you to download Facebook videos by providing a Facebook video URL. The API extracts video metadata including title, duration, thumbnail, and provides download links for various quality options.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Supported Features</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Video title extraction</li>
                        <li>• Duration information</li>
                        <li>• Thumbnail images</li>
                        <li>• Multiple quality options</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">Response Time</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• Average: 3-8 seconds</li>
                        <li>• Max: 45 seconds</li>
                        <li>• Timeout: 60 seconds</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoint</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">GET</Badge>
                      <code className="text-sm font-mono text-gray-800">/api/download/facebook</code>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-gray-900">url</td>
                          <td className="px-4 py-3 text-sm text-gray-600">string</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="destructive">Required</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">The Facebook video URL to download</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <UniversalApiTester 
                  endpoint="/api/download/facebook"
                  parameterName="url"
                  parameterLabel="Facebook URL"
                  defaultValue="https://www.facebook.com/watch?v=123456789"
                  placeholder="Enter Facebook video URL..."
                  title="Interactive Facebook API Tester"
                />
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Examples</h3>
                  <div className="space-y-4">
                    <CodeBlock 
                      code={`curl -X GET "${window.location.origin}/api/download/facebook?url=https://www.facebook.com/watch?v=123456789" \\
  -H "Accept: application/json"`}
                      language="cURL" 
                    />
                    <CodeBlock 
                      code={`const response = await fetch('${window.location.origin}/api/download/facebook?url=https://www.facebook.com/watch?v=123456789');
const data = await response.json();
console.log(data);`}
                      language="JavaScript (Fetch)" 
                    />
                    <CodeBlock 
                      code={`import requests

url = "${window.location.origin}/api/download/facebook"
params = {"url": "https://www.facebook.com/watch?v=123456789"}

response = requests.get(url, params=params)
data = response.json()
print(data)`}
                      language="Python (Requests)" 
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Example</h3>
                  <CodeBlock 
                    code={`{
  "creator": "flex-dev",
  "result": {
    "title": "Sample Facebook Video",
    "duration": "00:02:15",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "downloadLinks": {
      "HD": "https://example.com/hd-video.mp4",
      "SD": "https://example.com/sd-video.mp4"
    }
  }
}`}
                    language="JSON Response"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Twitter/X Download API Documentation */}
            <InteractiveCardWrapper className="mb-8" glowOnHover={interfaceMode === 'interactive'}>
              <Card>
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <svg className="text-white" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">Twitter/X Video Download API</h2>
                        <p className="text-sm text-gray-600">Download Twitter/X videos with metadata and quality options</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LiveActivityIndicator isActive={true} label="Live" />
                      <Badge className="bg-green-500 hover:bg-green-600">
                        <Circle className="w-2 h-2 mr-1" />
                        Active
                      </Badge>
                      <Badge variant="secondary">v1.0</Badge>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
                    <p className="text-gray-600 mb-4">This API allows you to download Twitter/X videos by providing a Twitter/X video URL. The API extracts video metadata including title, duration, thumbnail, and provides download links for various quality options.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Supported Features</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Video title extraction</li>
                          <li>• Duration information</li>
                          <li>• Thumbnail images</li>
                          <li>• Multiple quality options</li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-900 mb-2">Response Time</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                          <li>• Average: 2-6 seconds</li>
                          <li>• Max: 30 seconds</li>
                          <li>• Timeout: 60 seconds</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoint</h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">GET</Badge>
                        <code className="text-sm font-mono text-gray-800">/api/download/twitter</code>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-4 py-3 text-sm font-mono text-gray-900">url</td>
                            <td className="px-4 py-3 text-sm text-gray-600">string</td>
                            <td className="px-4 py-3 text-sm">
                              <Badge variant="destructive">Required</Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">The Twitter/X video URL to download</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <UniversalApiTester 
                    endpoint="/api/download/twitter"
                    parameterName="url"
                    parameterLabel="Twitter/X URL"
                    defaultValue="https://twitter.com/user/status/123456789"
                    placeholder="Enter Twitter/X video URL..."
                    title="Interactive Twitter/X API Tester"
                  />
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Code Examples</h3>
                    <div className="space-y-4">
                      <CodeBlock 
                        code={`curl -X GET "${window.location.origin}/api/download/twitter?url=https://twitter.com/user/status/123456789" \\
  -H "Accept: application/json"`}
                        language="cURL" 
                      />
                      <CodeBlock 
                        code={`fetch('${window.location.origin}/api/download/twitter?url=https://twitter.com/user/status/123456789')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
                        language="JavaScript (Fetch)" 
                      />
                      <CodeBlock 
                        code={`import requests

url = "${window.location.origin}/api/download/twitter"
params = {"url": "https://twitter.com/user/status/123456789"}

response = requests.get(url, params=params)
data = response.json()
print(data)`}
                        language="Python (Requests)" 
                      />
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Response</h3>
                    <CodeBlock 
                      code={`{
  "creator": "Flex-dev",
  "result": {
    "title": "Amazing Twitter video",
    "duration": "00:02:30",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "downloadLinks": {
      "HD": "https://example.com/hd-video.mp4",
      "SD": "https://example.com/sd-video.mp4"
    }
  }
}`}
                      language="JSON Response"
                    />
                  </div>
                </CardContent>
              </Card>
            </InteractiveCardWrapper>

            {/* AI APIs Section */}
            <Card id="ai" className="mb-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <Brain className="text-white" size={20} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">AI Chat APIs</h2>
                      <p className="text-sm text-gray-600">Powerful AI chatbots and language models for various use cases</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Circle className="w-2 h-2 mr-1" />
                      Active
                    </Badge>
                    <Badge variant="secondary">v1.0</Badge>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                {/* DeepAI API */}
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Cpu className="text-blue-600" size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">DeepAI Chat API</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">Access DeepAI's powerful language model for natural conversations, content generation, and problem-solving.</p>
                  
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Endpoint</h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">GET</Badge>
                        <code className="text-sm font-mono text-gray-800">/api/ai/deepai</code>
                      </div>
                    </div>
                  </div>
                  
                  <UniversalApiTester 
                    endpoint="/api/ai/deepai"
                    parameterName="text"
                    parameterLabel="Your Message"
                    defaultValue="Hello, how can you help me today?"
                    placeholder="Type your message here..."
                    title="Interactive DeepAI Tester"
                  />
                </div>

                {/* BlackBox AI API */}
                <div className="mb-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                      <Brain className="text-white" size={16} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">BlackBox AI API</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">Leverage BlackBox AI's advanced coding and problem-solving capabilities for technical assistance and code generation.</p>
                  
                  <div className="mb-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-3">Endpoint</h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">GET</Badge>
                        <code className="text-sm font-mono text-gray-800">/api/ai/blackbox</code>
                      </div>
                    </div>
                  </div>
                  
                  <UniversalApiTester 
                    endpoint="/api/ai/blackbox"
                    parameterName="text"
                    parameterLabel="Your Question"
                    defaultValue="Write a simple Python function to calculate fibonacci numbers"
                    placeholder="Ask your coding question..."
                    title="Interactive BlackBox AI Tester"
                  />
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AI API Parameters</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-mono text-gray-900">text</td>
                          <td className="px-4 py-3 text-sm text-gray-600">string</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="destructive">Required</Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">The message or question to send to the AI</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coming Soon APIs */}
            <Card>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Coming Soon</h2>
                <p className="text-sm text-gray-600 mt-1">More APIs are being developed and will be available soon</p>
              </div>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Instagram className="text-gray-400" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Instagram Media Download</h3>
                        <p className="text-sm text-gray-500">Download Instagram posts and stories</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-yellow-100 text-yellow-800">In Development</Badge>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                        <Bell size={14} className="mr-1" />
                        Notify Me
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image className="text-gray-400" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Image Processing</h3>
                        <p className="text-sm text-gray-500">Resize, compress, and convert images</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-100 text-purple-800">Research</Badge>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                        <Bell size={14} className="mr-1" />
                        Notify Me
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Languages className="text-gray-400" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Text Translation</h3>
                        <p className="text-sm text-gray-500">Translate text between multiple languages</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-800">Testing</Badge>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                        <Bell size={14} className="mr-1" />
                        Notify Me
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Play className="text-white" size={16} />
                </div>
                <span className="text-xl font-bold">FlexDev API Hub</span>
              </div>
              <p className="text-gray-300 mb-4">Professional API documentation platform providing developers with comprehensive tools, interactive testing, and real-time examples.</p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                  <Github size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                  <Twitter size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                  <MessageCircle size={20} />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Code Examples</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SDKs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bug Reports</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2024 FlexDev API Hub. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Dynamic Interface Components */}
      <FloatingToolbar 
        onModeChange={setInterfaceMode} 
        currentMode={interfaceMode} 
      />
      <ScrollToTop isVisible={showScrollTop} />
    </motion.div>
  );
}
