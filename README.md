# ElevenLabs Custom UI

A Next.js project configured to build custom UIs with [ElevenLabs UI components](https://github.com/elevenlabs/ui). This project is set up with TypeScript, Tailwind CSS, and shadcn/ui, ready to integrate ElevenLabs UI components for building multimodal agents and audio-centric applications.

## Features

- ⚡ **Next.js 16** - Latest version with Turbopack
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📦 **shadcn/ui** - High-quality component library
- 🎙️ **ElevenLabs UI Ready** - Configured to work with ElevenLabs UI components
- 🔧 **TypeScript** - Full type safety
- 🎯 **ESLint** - Code linting and formatting

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

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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