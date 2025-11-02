# ElevenLabs Custom UI

A Next.js project configured to build custom UIs with [ElevenLabs UI components](https://github.com/elevenlabs/ui). This project is set up with TypeScript, Tailwind CSS, and shadcn/ui, ready to integrate ElevenLabs UI components for building multimodal agents and audio-centric applications.

## 🎯 Highlights

### 🤖 **Conversational AI Agent** (NEW!)
A fully-featured multimodal conversational AI agent with:
- 🎤 **Voice Input** - Record audio with real-time transcription
- ⌨️ **Text Input** - Traditional text-based chat
- 🔊 **Voice Output** - AI responses synthesized using ElevenLabs TTS
- 📝 **Real-time Transcription** - Live speech-to-text during recording
- 💬 **Conversation History** - Full chat history with audio playback
- 🎨 **Beautiful UI** - Modern, responsive interface

👉 **[View Conversational AI Documentation](./CONVERSATIONAL_AI.md)**

## Features

- ⚡ **Next.js 16** - Latest version with Turbopack
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📦 **shadcn/ui** - High-quality component library
- 🎙️ **ElevenLabs Integration** - Full SDK integration for voice AI
- 🔧 **TypeScript** - Full type safety
- 🎯 **ESLint** - Code linting and formatting
- 🎵 **Audio Components** - Pre-built audio player, waveforms, and visualizers
- 🗣️ **Voice Components** - Voice buttons, selectors, and input handlers

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CivAIgentics/Custom_UI_EL.git
cd Custom_UI_EL
```

2. Install dependencies:
```bash
npm install
```

3. Configure your ElevenLabs API key:

Create a `.env.local` file:
```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your API key:
```
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_api_key_here
```

Get your API key from the [ElevenLabs Dashboard](https://elevenlabs.io/app/settings/api-keys).

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Quick Start Examples

### Conversational AI Agent

Visit `/conversational-ai` to try the multimodal conversational AI:

```bash
npm run dev
# Then open http://localhost:3000/conversational-ai
```

Features:
- Voice and text input
- Real-time speech transcription
- AI-generated voice responses
- Conversation history

See the [full documentation](./CONVERSATIONAL_AI.md) for integration details.

## Adding ElevenLabs UI Components

This project is configured to work with ElevenLabs UI components. You can add components in two ways:

### Method 1: Using ElevenLabs CLI

Add specific components:
```bash
npx @elevenlabs/cli@latest components add <component-name>
```

Add all components:
```bash
npx @elevenlabs/cli@latest components add all
```

### Method 2: Using shadcn CLI

Add all components:
```bash
npx shadcn@latest add https://ui.elevenlabs.io/r/all.json
```

Add specific component (e.g., orb):
```bash
npx shadcn@latest add https://ui.elevenlabs.io/r/orb.json
```

### Available ElevenLabs UI Components

Some of the components you can add include:
- **Orb** - Animated orb visualizations for voice interactions
- **Waveform** - Audio waveform visualizations
- **Voice Agent** - Pre-built voice agent interfaces
- **Audio Player** - Custom audio playback controls
- And more...

Visit [ElevenLabs UI Documentation](https://ui.elevenlabs.io/docs/components) for the complete list.

## Project Structure

```
Custom_UI_EL/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ui/               # UI components (shadcn/ui & ElevenLabs UI)
├── lib/                  # Utility functions
│   └── utils.ts          # cn() utility for class merging
├── public/               # Static files
├── components.json       # shadcn/ui configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
└── package.json          # Project dependencies
```

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Building for Production

```bash
npm run build
npm run start
```

## Using ElevenLabs UI Components

Once you've added components, you can use them in your pages:

```tsx
import { Orb } from '@/components/ui/orb';

export default function MyPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Orb />
    </div>
  );
}
```

## Configuration

### Tailwind CSS

The project is configured with Tailwind CSS v3 and includes custom theme extensions for shadcn/ui components. The configuration supports dark mode and CSS variables.

### shadcn/ui

The `components.json` file configures shadcn/ui to use:
- TypeScript (`.tsx`)
- React Server Components
- Tailwind CSS variables
- Default style variant

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [ElevenLabs UI GitHub](https://github.com/elevenlabs/ui)
- [ElevenLabs UI Documentation](https://ui.elevenlabs.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.