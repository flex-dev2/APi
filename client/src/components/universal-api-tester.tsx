import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Clock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ApiTesterProps {
  endpoint: string;
  parameterName: string;
  parameterLabel: string;
  defaultValue?: string;
  placeholder?: string;
  title: string;
}

interface ApiResponse {
  creator: string;
  data?: any;
  result?: any;
  message?: any;
  error?: string;
}

export function UniversalApiTester({ 
  endpoint, 
  parameterName, 
  parameterLabel, 
  defaultValue = "", 
  placeholder = "",
  title 
}: ApiTesterProps) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const testApiMutation = useMutation({
    mutationFn: async (value: string) => {
      const startTime = Date.now();
      const response = await apiRequest("GET", `${endpoint}?${parameterName}=${encodeURIComponent(value)}`);
      const endTime = Date.now();
      
      setResponseTime(endTime - startTime);
      setStatusCode(response.status);
      
      return response.json();
    },
    onSuccess: (data) => {
      setResponse(data);
    },
    onError: (error: any) => {
      setResponse({ 
        creator: "flex-dev", 
        error: error.message || "An error occurred while processing your request"
      });
      setStatusCode(error.status || 500);
    }
  });

  const handleTest = () => {
    if (!inputValue.trim()) return;
    testApiMutation.mutate(inputValue);
  };

  const fullUrl = `${window.location.origin}${endpoint}?${parameterName}=${encodeURIComponent(inputValue)}`;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        <Send className="inline mr-2 text-blue-600" size={20} />
        {title}
      </h3>
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Panel */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Request</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="input-value">{parameterLabel}</Label>
                  <Input
                    id="input-value"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="font-mono text-sm"
                    placeholder={placeholder}
                  />
                </div>
                
                <div>
                  <Label>Full URL</Label>
                  <div className="bg-white p-3 rounded-lg border border-gray-200 mt-1">
                    <code className="text-sm text-gray-600 break-all">
                      {fullUrl}
                    </code>
                  </div>
                </div>
                
                <Button 
                  onClick={handleTest}
                  disabled={testApiMutation.isPending || !inputValue.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {testApiMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Testing...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Request
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {/* Response Panel */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Response</h4>
              <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto min-h-[200px]">
                {response ? (
                  <pre className="text-gray-300 font-mono">
                    <code>{JSON.stringify(response, null, 2)}</code>
                  </pre>
                ) : (
                  <div className="text-gray-500 italic">
                    Click "Send Request" to see the response
                  </div>
                )}
              </div>
              
              {(statusCode || responseTime) && (
                <div className="mt-3 flex items-center space-x-4 text-sm">
                  {statusCode && (
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${statusCode >= 200 && statusCode < 300 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={statusCode >= 200 && statusCode < 300 ? 'text-green-600' : 'text-red-600'}>
                        {statusCode} {statusCode >= 200 && statusCode < 300 ? 'OK' : 'Error'}
                      </span>
                    </div>
                  )}
                  {responseTime && (
                    <div className="flex items-center space-x-1">
                      <Clock className="text-gray-400" size={14} />
                      <span className="text-gray-600">{responseTime}ms</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}