# Quick Start Guide: Conversational AI Agent

This guide will help you get the Conversational AI Agent up and running in minutes.

## Prerequisites

- Node.js 18+ installed
- An ElevenLabs API key ([Get one here](https://elevenlabs.io/app/settings/api-keys))
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd /workspaces/Custom_UI_EL
npm install
```

### 2. Configure API Key

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your ElevenLabs API key:

```env
NEXT_PUBLIC_ELEVENLABS_API_KEY=sk_your_api_key_here
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Open the Demo

Navigate to: **http://localhost:3000/conversational-ai**

## First Time Usage

### Allow Microphone Access

When you first try to use voice input, your browser will ask for microphone permission. Click "Allow" to enable voice features.

### Test Voice Input

1. Click the "Start Recording" button or press `Alt + Space`
2. Speak into your microphone
3. Watch the real-time transcription appear
4. Click "Stop Recording" to end
5. Your message will be processed and you'll receive an AI response

### Test Text Input

1. Type a message in the text input box
2. Press `Enter` or click the send button
3. Receive an AI-generated response

## Features Available

✅ **Voice Input** - Click to record or use Alt+Space  
✅ **Text Input** - Type and press Enter  
✅ **Real-time Transcription** - See your words as you speak  
✅ **Voice Output** - AI responses with text-to-speech  
✅ **Conversation History** - All messages saved with playback  

## Customization

### Change Voice

In `/app/conversational-ai/page.tsx`, modify the `voiceId` prop:

```tsx
<ConversationalAIAgent
  voiceId="EXAVITQu4vr4xnSDxMaL" // Bella
  // Or other voice IDs
/>
```

### Integrate Your AI Service

Edit `/components/ui/conversational-ai-agent.tsx` and update the `generateAIResponse` function:

```tsx
const generateAIResponse = async (input: string): Promise<string> => {
  // Replace with your AI service
  const response = await fetch('/api/openai', {
    method: 'POST',
    body: JSON.stringify({ message: input })
  })
  return await response.json()
}
```

### Adjust Voice Settings

Modify voice parameters in the component:

```tsx
<ConversationalAIAgent
  apiKey={apiKey}
  voiceId="21m00Tcm4TlvDq8ikWAM"
  // Add custom settings here
/>
```

## Troubleshooting

### "Microphone not working"

- Ensure you granted microphone permissions
- Check your browser's site settings
- Verify your microphone is connected and working

### "No API key configured"

- Make sure you created `.env.local`
- Verify the API key starts with `sk_`
- Restart the development server after adding the key

### "Audio not playing"

- Check your browser's autoplay settings
- Ensure you're using HTTPS (required for some features)
- Try clicking the audio player controls manually

## Next Steps

1. **Integrate AI Service**: Connect OpenAI, Claude, or another AI service
2. **Customize UI**: Modify colors, layout, and styling
3. **Add Features**: Implement conversation export, search, or analytics
4. **Deploy**: Build and deploy to production

## Resources

- 📖 [Full Documentation](./CONVERSATIONAL_AI.md)
- 🎙️ [ElevenLabs API Docs](https://elevenlabs.io/docs)
- 💬 [GitHub Issues](https://github.com/CivAIgentics/Custom_UI_EL/issues)

## Getting Help

If you encounter issues:

1. Check the browser console for errors
2. Review the [Troubleshooting](./CONVERSATIONAL_AI.md#troubleshooting) section
3. Open an issue on GitHub with details about your problem

---

**Ready to build?** Start customizing the agent to fit your needs! 🚀
