"use client"

import { useState } from 'react'
import RealtimeConversationalAI from '@/components/ui/realtime-conversational-ai'

// Default API Key (using public agent IDs)
const DEFAULT_API_KEY = 'sk_6a41a356778973b12ea5a87dafbc43e118476b1fe0794b25'

export default function RealtimeConversationalAIDemo() {
  // Allow editing the agent ID on the page (prefill from env if available)
  const [agentId, setAgentId] = useState(process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '')

  return (
    <div className="h-screen overflow-hidden">
      <RealtimeConversationalAI
        agentId={agentId}
        apiKey={DEFAULT_API_KEY}
        onMessage={(role, message) => {
          console.log(`${role}: ${message}`)
        }}
        onError={(error) => {
          console.error('Real-time AI Error:', error)
        }}
        className="h-full"
      />
    </div>
  )
}
