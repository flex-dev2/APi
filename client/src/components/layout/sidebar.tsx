import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Video, Share2, Wrench, Brain, Database, Rocket, Shield, Gauge, HelpCircle } from "lucide-react";

export function Sidebar() {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search APIs..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          </div>
        </div>
        
        <nav className="space-y-2">
          <div className="pb-2 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">API Categories</h3>
          </div>
          
          <a href="#media" className="flex items-center space-x-3 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg font-medium">
            <Video className="text-blue-500" size={16} />
            <span>Media Download</span>
            <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-800">4</Badge>
          </a>
          
          <a href="#ai" className="flex items-center space-x-3 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg font-medium">
            <Brain className="text-green-500" size={16} />
            <span>AI & ML</span>
            <Badge variant="secondary" className="ml-auto bg-green-100 text-green-800">2</Badge>
          </a>
          
          <a href="#social" className="flex items-center space-x-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <Share2 className="text-gray-400" size={16} />
            <span>Social Media</span>
            <Badge variant="secondary" className="ml-auto bg-gray-100 text-gray-600">0</Badge>
          </a>
          
          <a href="#utilities" className="flex items-center space-x-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <Wrench className="text-gray-400" size={16} />
            <span>Utilities</span>
            <Badge variant="secondary" className="ml-auto bg-gray-100 text-gray-600">0</Badge>
          </a>
          
          <a href="#data" className="flex items-center space-x-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
            <Database className="text-gray-400" size={16} />
            <span>Data Processing</span>
            <Badge variant="secondary" className="ml-auto bg-gray-100 text-gray-600">0</Badge>
          </a>
        </nav>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h4>
          <div className="space-y-2">
            <a href="#getting-started" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <Rocket className="mr-2" size={16} />
              Getting Started
            </a>
            <a href="#authentication" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <Shield className="mr-2" size={16} />
              Authentication
            </a>
            <a href="#rate-limits" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <Gauge className="mr-2" size={16} />
              Rate Limits
            </a>
            <a href="#support" className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <HelpCircle className="mr-2" size={16} />
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
