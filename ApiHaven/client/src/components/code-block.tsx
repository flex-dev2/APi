import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{language}</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="text-blue-600 hover:text-blue-800"
        >
          {copied ? (
            <>
              <Check size={16} className="mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} className="mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
