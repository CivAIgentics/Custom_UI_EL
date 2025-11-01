export default function ExamplesPage() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">ElevenLabs UI Examples</h1>
        <p className="text-muted-foreground mb-8">
          This page will showcase ElevenLabs UI components once they are installed.
        </p>

        <div className="space-y-12">
          {/* Orb Example */}
          <section className="border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Orb Component</h2>
            <p className="text-muted-foreground mb-6">
              Animated orb visualization for voice interactions and audio feedback.
            </p>
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Run: <code className="bg-background px-2 py-1 rounded">
                    npx @elevenlabs/cli@latest components add orb
                  </code>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Then import with: <code className="bg-background px-2 py-1 rounded">
                    import {"{"} Orb {"}"} from '@/components/ui/orb'
                  </code>
                </p>
              </div>
            </div>
          </section>

          {/* Waveform Example */}
          <section className="border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Waveform Component</h2>
            <p className="text-muted-foreground mb-6">
              Audio waveform visualization for audio playback and recording.
            </p>
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Run: <code className="bg-background px-2 py-1 rounded">
                    npx @elevenlabs/cli@latest components add waveform
                  </code>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Then import with: <code className="bg-background px-2 py-1 rounded">
                    import {"{"} Waveform {"}"} from '@/components/ui/waveform'
                  </code>
                </p>
              </div>
            </div>
          </section>

          {/* Voice Agent Example */}
          <section className="border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Voice Agent Component</h2>
            <p className="text-muted-foreground mb-6">
              Pre-built interface for ElevenLabs voice agents with conversation management.
            </p>
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Run: <code className="bg-background px-2 py-1 rounded">
                    npx @elevenlabs/cli@latest components add voice-agent
                  </code>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Then import with: <code className="bg-background px-2 py-1 rounded">
                    import {"{"} VoiceAgent {"}"} from '@/components/ui/voice-agent'
                  </code>
                </p>
              </div>
            </div>
          </section>

          {/* Audio Player Example */}
          <section className="border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Audio Player Component</h2>
            <p className="text-muted-foreground mb-6">
              Custom audio player with advanced controls and visualization.
            </p>
            <div className="bg-muted rounded-lg p-8 flex items-center justify-center min-h-[200px]">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Run: <code className="bg-background px-2 py-1 rounded">
                    npx @elevenlabs/cli@latest components add audio-player
                  </code>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Then import with: <code className="bg-background px-2 py-1 rounded">
                    import {"{"} AudioPlayer {"}"} from '@/components/ui/audio-player'
                  </code>
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 bg-primary/5 rounded-lg border">
          <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Install any component using the commands shown above</li>
            <li>Import the component in your page or component file</li>
            <li>Use the component with your desired props and styling</li>
            <li>Customize with Tailwind CSS classes or component props</li>
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">
            For more information, see the{" "}
            <a 
              href="https://ui.elevenlabs.io/docs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              ElevenLabs UI Documentation
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
