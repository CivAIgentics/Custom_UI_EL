# Conversational AI Agent with Multimodal Capabilities

A comprehensive ElevenLabs-powered conversational AI agent with voice and text input/output, plus real-time transcription.

## Features

### ✨ Core Capabilities

- **🎤 Voice Input**: Record audio with one-click voice button
- **⌨️ Text Input**: Type messages for text-based interaction
- **🔊 Voice Output**: AI responses synthesized using ElevenLabs TTS
- **📝 Real-time Transcription**: Live transcription of spoken words during recording
- **💬 Conversation History**: Full chat history with audio playback
- **🎨 Modern UI**: Beautiful, responsive interface built with Tailwind CSS and Radix UI

### 🎯 Multimodal Experience

- **Voice to Voice**: Speak and get audio responses
- **Text to Voice**: Type and hear AI responses
- **Voice to Text**: Speak and see transcribed messages
- **Text to Text**: Traditional chat interface

## Components

### Main Components

#### `ConversationalAIAgent`
The core component that orchestrates the entire conversational experience.

**Location**: `/components/ui/conversational-ai-agent.tsx`

**Props**:
```tsx
interface ConversationalAIAgentProps {
  apiKey?: string                      // ElevenLabs API key
  voiceId?: string                     // Voice ID for TTS
  modelId?: string                     // TTS model ID
  enableVoiceInput?: boolean           // Enable voice recording
  enableTextInput?: boolean            // Enable text input
  enableVoiceOutput?: boolean          // Enable TTS responses
  enableRealTimeTranscription?: boolean // Enable live transcription
  onMessage?: (message: ConversationMessage) => void
  onError?: (error: Error) => void
}
```

### Supporting Services

#### `VoiceInputHandler`
Manages audio recording, microphone access, and real-time transcription.

**Location**: `/lib/voice-input-handler.ts`

**Features**:
- MediaRecorder integration for audio capture
- Web Speech API for real-time transcription
- ElevenLabs Speech-to-Text integration (when configured)
- Audio device management

#### `ElevenLabsVoiceService`
Handles all ElevenLabs API interactions for text-to-speech.

**Location**: `/lib/elevenlabs-voice-service.ts`

**Features**:
- Text-to-speech conversion
- Voice selection and management
- Audio streaming
- Custom voice settings (stability, similarity boost, etc.)

## Setup Instructions

### 1. Install Dependencies

All required dependencies are already included in the project:
- `@elevenlabs/elevenlabs-js` - Official ElevenLabs SDK
- `@elevenlabs/react` - React components for ElevenLabs
- Audio and UI component libraries

### 2. Configure API Key

You have two options:

**Option A: Environment Variable (Recommended)**

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_api_key_here
```

**Option B: UI Configuration**

Enter your API key in the settings interface when you first run the app.

Get your API key from: [ElevenLabs Dashboard](https://elevenlabs.io/app/settings/api-keys)

### 3. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/conversational-ai` to see the demo.

## Usage

### Basic Example

```tsx
import ConversationalAIAgent from '@/components/ui/conversational-ai-agent'

export default function MyPage() {
  return (
    <ConversationalAIAgent
      apiKey={process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY}
      enableVoiceInput={true}
      enableTextInput={true}
      enableVoiceOutput={true}
      enableRealTimeTranscription={true}
      onMessage={(message) => {
        console.log('New message:', message)
      }}
      onError={(error) => {
        console.error('Error:', error)
      }}
    />
  )
}
```

### Keyboard Shortcuts

- **Enter**: Send text message (while in text input)
- **Alt + Space**: Toggle voice recording

## Architecture

### Data Flow

```
User Input (Voice/Text)
    ↓
VoiceInputHandler / TextInput
    ↓
ConversationalAIAgent
    ↓
AI Processing (Your AI Service)
    ↓
ElevenLabsVoiceService (TTS)
    ↓
Audio Output + UI Display
```

### State Management

The component manages several key states:

- **messages**: Array of conversation messages
- **isRecording**: Voice recording state
- **isProcessing**: AI processing state
- **realTimeTranscript**: Live transcription text
- **isMuted**: Audio output mute state

### Message Structure

```typescript
interface ConversationMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  audioUrl?: string
  timestamp: Date
  transcription?: string
}
```

## Integration Points

### AI Service Integration

The component includes placeholder functions for AI integration:

```typescript
// In ConversationalAIAgent component
const generateAIResponse = async (input: string): Promise<string> => {
  // TODO: Integrate your AI service here
  // Examples: OpenAI GPT, Claude, Gemini, etc.
  
  const response = await fetch('/api/ai', {
    method: 'POST',
    body: JSON.stringify({ message: input })
  })
  
  return await response.json()
}
```

### Recommended AI Services

1. **OpenAI GPT-4**: Best for general conversation
2. **Anthropic Claude**: Great for detailed, thoughtful responses
3. **Google Gemini**: Excellent multimodal capabilities
4. **Local LLMs**: Ollama, LM Studio for privacy

### Speech-to-Text Options

The voice input handler supports multiple STT services:

1. **Web Speech API** (Built-in): Free, real-time, browser-native
2. **ElevenLabs STT** (Coming soon): High accuracy, multiple languages
3. **OpenAI Whisper**: Excellent accuracy, self-hosted options

## Customization

### Voice Selection

```tsx
<ConversationalAIAgent
  voiceId="21m00Tcm4TlvDq8ikWAM" // Rachel (default)
  // Or choose other voices:
  // "EXAVITQu4vr4xnSDxMaL" - Bella
  // "ErXwobaYiN019PkySvjV" - Antoni
  // "VR6AewLTigWG4xSOukaG" - Arnold
/>
```

### Voice Settings

Customize the voice output in `ElevenLabsVoiceService`:

```typescript
const voiceSettings = {
  stability: 0.5,        // 0-1 (lower = more variable)
  similarityBoost: 0.75, // 0-1 (higher = more similar to original)
  style: 0,              // 0-1 (exaggeration)
  speakerBoost: true     // Boost speaker clarity
}
```

### Styling

The component uses Tailwind CSS and can be customized via className:

```tsx
<ConversationalAIAgent
  className="my-custom-styles"
/>
```

## Browser Support

### Required Features

- **MediaRecorder API**: ✅ Chrome, Firefox, Safari 14.1+
- **getUserMedia**: ✅ All modern browsers
- **Web Speech API** (optional): ✅ Chrome, Safari, Edge
- **Audio Playback**: ✅ All browsers

### Recommended Browsers

- ✅ Chrome 89+
- ✅ Firefox 88+
- ✅ Safari 14.1+
- ✅ Edge 89+

## Performance Optimization

### Audio Streaming

For faster response times, enable audio streaming:

```typescript
// In ElevenLabsVoiceService
for await (const chunk of streamSpeech(options)) {
  // Stream audio chunks as they arrive
}
```

### Message Limits

For optimal performance:
- Limit conversation history to last 50-100 messages
- Implement pagination for older messages
- Clear old audio URLs to prevent memory leaks

## Troubleshooting

### Common Issues

**1. Microphone Not Working**
- Check browser permissions
- Ensure HTTPS (required for getUserMedia)
- Try different audio input device

**2. No Audio Output**
- Verify ElevenLabs API key
- Check voice ID is valid
- Ensure browser can play audio

**3. Real-time Transcription Not Working**
- Web Speech API requires Chrome/Safari
- Check microphone permissions
- Verify language setting matches speech

**4. API Errors**
- Validate API key format
- Check API rate limits
- Review console for detailed errors

### Debug Mode

Enable detailed logging:

```tsx
<ConversationalAIAgent
  onMessage={(msg) => console.log('Message:', msg)}
  onError={(err) => console.error('Error:', err)}
/>
```

## Advanced Features

### Custom Audio Processing

```typescript
// Modify audio before sending to STT
const processAudio = (audioBlob: Blob) => {
  // Apply noise reduction, normalization, etc.
  return processedBlob
}
```

### Conversation Context

```typescript
// Maintain conversation context
const contextMessages = messages.slice(-10) // Last 10 messages
const contextString = contextMessages
  .map(m => `${m.type}: ${m.content}`)
  .join('\n')
```

### Multi-language Support

```typescript
<ConversationalAIAgent
  // Configure language for STT
  language="es-ES" // Spanish
  // Use multilingual TTS model
  modelId="eleven_multilingual_v2"
/>
```

## Examples

See the full working example at `/app/conversational-ai/page.tsx`

## API Reference

### ConversationalAIAgent Methods

| Method | Description |
|--------|-------------|
| `handleTextSubmit()` | Send text message |
| `handleVoiceToggle()` | Start/stop recording |
| `processUserMessage(content)` | Process user input |
| `addMessage(message)` | Add message to history |

### VoiceInputHandler Methods

| Method | Description |
|--------|-------------|
| `startRecording()` | Start audio recording |
| `stopRecording()` | Stop and transcribe |
| `cancelRecording()` | Cancel recording |
| `getIsRecording()` | Check recording state |

### ElevenLabsVoiceService Methods

| Method | Description |
|--------|-------------|
| `generateSpeech(options)` | Convert text to speech |
| `generateSpeechUrl(options)` | Get audio URL |
| `streamSpeech(options)` | Stream audio chunks |
| `getVoices()` | List available voices |
| `transcribeAudio(file)` | STT conversion |

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- 📖 [ElevenLabs Documentation](https://elevenlabs.io/docs)
- 💬 [GitHub Issues](https://github.com/CivAIgentics/Custom_UI_EL/issues)
- 🌐 [Project Website](https://github.com/CivAIgentics/Custom_UI_EL)

## Credits

Built with:
- [ElevenLabs](https://elevenlabs.io) - Voice AI
- [Next.js](https://nextjs.org) - React Framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Radix UI](https://radix-ui.com) - UI Components
- [Lucide](https://lucide.dev) - Icons
