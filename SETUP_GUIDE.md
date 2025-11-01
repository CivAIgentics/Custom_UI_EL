# ElevenLabs UI Setup Guide

This guide will help you get started with ElevenLabs UI components in this Next.js project.

## Quick Start

The project is already configured with:
- ✅ Next.js 16 with TypeScript
- ✅ Tailwind CSS v3
- ✅ shadcn/ui configuration
- ✅ Required dependencies

You can start adding ElevenLabs UI components immediately!

## Step 1: Add Your First Component

Let's add the Orb component as an example:

```bash
npx @elevenlabs/cli@latest components add orb
```

This will:
1. Download the orb component
2. Add it to `components/ui/orb.tsx`
3. Install any required dependencies

## Step 2: Use the Component

Create a new page or update `app/page.tsx`:

```tsx
import { Orb } from '@/components/ui/orb';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">ElevenLabs UI Demo</h1>
      <Orb />
    </main>
  );
}
```

## Step 3: Run Your App

```bash
npm run dev
```

Visit http://localhost:3000 to see your component in action!

## Adding More Components

### Using ElevenLabs CLI

Add individual components:
```bash
npx @elevenlabs/cli@latest components add waveform
npx @elevenlabs/cli@latest components add audio-player
npx @elevenlabs/cli@latest components add voice-agent
```

Add all components at once:
```bash
npx @elevenlabs/cli@latest components add all
```

### Using shadcn CLI

Add from the ElevenLabs registry:
```bash
# Add all components
npx shadcn@latest add https://ui.elevenlabs.io/r/all.json

# Add specific components
npx shadcn@latest add https://ui.elevenlabs.io/r/orb.json
npx shadcn@latest add https://ui.elevenlabs.io/r/waveform.json
```

## Component Examples

### Orb Component

Animated orb for voice interactions:

```tsx
import { Orb } from '@/components/ui/orb';

export default function OrbDemo() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Orb className="w-64 h-64" />
    </div>
  );
}
```

### Waveform Component

Audio waveform visualization:

```tsx
import { Waveform } from '@/components/ui/waveform';

export default function WaveformDemo() {
  return (
    <div className="p-8">
      <Waveform audioUrl="/path/to/audio.mp3" />
    </div>
  );
}
```

### Voice Agent Component

Pre-built voice agent interface:

```tsx
import { VoiceAgent } from '@/components/ui/voice-agent';

export default function AgentDemo() {
  return (
    <div className="container mx-auto p-8">
      <VoiceAgent 
        agentId="your-agent-id"
        apiKey={process.env.ELEVENLABS_API_KEY}
      />
    </div>
  );
}
```

## Customization

### Theming

The project uses CSS variables for theming. Customize colors in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  /* ... more variables */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark mode variables */
}
```

### Component Styling

All components support Tailwind CSS classes:

```tsx
<Orb className="w-full h-96 bg-gradient-to-r from-blue-500 to-purple-500" />
```

## Environment Variables

For components that require API keys, create a `.env.local` file:

```env
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_api_key_here
```

## Troubleshooting

### Component Not Found

If you get an import error, make sure:
1. The component was added successfully
2. The file exists in `components/ui/`
3. The import path is correct (`@/components/ui/component-name`)

### TypeScript Errors

Run TypeScript check:
```bash
npx tsc --noEmit
```

### Build Errors

Clear Next.js cache and rebuild:
```bash
rm -rf .next
npm run build
```

## Next Steps

1. Explore the [ElevenLabs UI documentation](https://ui.elevenlabs.io/docs)
2. Check out [component examples](https://ui.elevenlabs.io/docs/components)
3. Join the [ElevenLabs Discord](https://discord.gg/elevenlabs) for community support

## Additional Resources

- [ElevenLabs API Documentation](https://docs.elevenlabs.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
