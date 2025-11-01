import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="z-10 w-full max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ElevenLabs Custom UI
          </h1>
          <p className="text-xl mb-4 text-muted-foreground">
            Build multimodal agents and audio-centric applications
          </p>
          <p className="text-lg text-muted-foreground">
            Next.js + TypeScript + Tailwind CSS + ElevenLabs UI
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <div className="border rounded-lg p-6 hover:border-primary transition-colors">
            <h3 className="text-lg font-semibold mb-2">⚡ Fast Setup</h3>
            <p className="text-sm text-muted-foreground">
              Pre-configured with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
          <div className="border rounded-lg p-6 hover:border-primary transition-colors">
            <h3 className="text-lg font-semibold mb-2">🎨 Beautiful UI</h3>
            <p className="text-sm text-muted-foreground">
              Built on shadcn/ui with full customization support
            </p>
          </div>
          <div className="border rounded-lg p-6 hover:border-primary transition-colors">
            <h3 className="text-lg font-semibold mb-2">🎙️ Voice Ready</h3>
            <p className="text-sm text-muted-foreground">
              ElevenLabs UI components for audio and voice interactions
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/examples"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            View Examples
          </Link>
          <a
            href="https://ui.elevenlabs.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-input px-8 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Read Documentation
          </a>
        </div>

        <div className="mt-16 p-8 border rounded-lg bg-muted/30">
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. Install Dependencies</h3>
              <code className="block bg-background p-3 rounded text-sm">
                npm install
              </code>
            </div>
            <div>
              <h3 className="font-medium mb-2">2. Add a Component</h3>
              <code className="block bg-background p-3 rounded text-sm">
                npx @elevenlabs/cli@latest components add orb
              </code>
            </div>
            <div>
              <h3 className="font-medium mb-2">3. Start Development Server</h3>
              <code className="block bg-background p-3 rounded text-sm">
                npm run dev
              </code>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
