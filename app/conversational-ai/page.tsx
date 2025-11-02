"use client"

import { useState } from 'react'
import ConversationalAIAgent from '@/components/ui/conversational-ai-agent'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Bot, Mic, MessageSquare, Settings } from 'lucide-react'

export default function ConversationalAIDemo() {
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || '')
  const [isConfigured, setIsConfigured] = useState(!!process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY)
  const [showSettings, setShowSettings] = useState(false)

  const handleConfigure = () => {
    if (apiKey) {
      setIsConfigured(true)
      setShowSettings(false)
    }
  }

  if (!isConfigured || showSettings) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Configuration
            </CardTitle>
            <CardDescription>
              Enter your ElevenLabs API key to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">ElevenLabs API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="sk_..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Get your API key from{' '}
                <a
                  href="https://elevenlabs.io/app/settings/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  ElevenLabs Dashboard
                </a>
              </p>
            </div>
            <Button onClick={handleConfigure} className="w-full" disabled={!apiKey}>
              Save Configuration
            </Button>
            {isConfigured && (
              <Button
                onClick={() => setShowSettings(false)}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Bot className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-lg font-semibold">
                Multimodal Conversational AI
              </h1>
              <p className="text-xs text-muted-foreground">
                Voice & Text Input • Real-time Transcription • AI Responses
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="hidden sm:flex">
              <Mic className="w-3 h-3 mr-1" />
              Voice Enabled
            </Badge>
            <Badge variant="secondary" className="hidden sm:flex">
              <MessageSquare className="w-3 h-3 mr-1" />
              Text Enabled
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <ConversationalAIAgent
          apiKey={apiKey}
          enableVoiceInput={true}
          enableTextInput={true}
          enableVoiceOutput={true}
          enableRealTimeTranscription={true}
          onError={(error) => {
            console.error('Conversational AI Error:', error)
          }}
          className="h-full"
        />
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/40 px-4 py-2">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Powered by ElevenLabs</span>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <span className="hidden sm:inline">Press ⌥Space to record</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/CivAIgentics/Custom_UI_EL"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              View on GitHub
            </a>
            <Separator orientation="vertical" className="h-4 hidden sm:block" />
            <a
              href="https://elevenlabs.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors hidden sm:inline"
            >
              API Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
