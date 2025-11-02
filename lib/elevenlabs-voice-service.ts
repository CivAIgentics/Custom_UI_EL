import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

export interface TTSConfig {
  apiKey: string
  voiceId?: string
  modelId?: string
  stability?: number
  similarityBoost?: number
  style?: number
  speakerBoost?: boolean
}

export interface AudioGenerationOptions {
  text: string
  voiceId?: string
  modelId?: string
  voiceSettings?: {
    stability?: number
    similarityBoost?: number
    style?: number
    speakerBoost?: boolean
  }
}

export class ElevenLabsVoiceService {
  private client: ElevenLabsClient
  private defaultVoiceId: string
  private defaultModelId: string
  private defaultVoiceSettings: TTSConfig

  constructor(config: TTSConfig) {
    this.client = new ElevenLabsClient({
      apiKey: config.apiKey,
    })

    this.defaultVoiceId = config.voiceId || '21m00Tcm4TlvDq8ikWAM'
    this.defaultModelId = config.modelId || 'eleven_monolingual_v1'
    this.defaultVoiceSettings = config
  }

  /**
   * Generate speech from text using ElevenLabs TTS
   */
  async generateSpeech(options: AudioGenerationOptions): Promise<Blob> {
    try {
      const voiceId = options.voiceId || this.defaultVoiceId
      const modelId = options.modelId || this.defaultModelId
      
      const voiceSettings = {
        stability: options.voiceSettings?.stability ?? this.defaultVoiceSettings.stability ?? 0.5,
        similarityBoost: options.voiceSettings?.similarityBoost ?? this.defaultVoiceSettings.similarityBoost ?? 0.75,
        style: options.voiceSettings?.style ?? this.defaultVoiceSettings.style,
        speakerBoost: options.voiceSettings?.speakerBoost ?? this.defaultVoiceSettings.speakerBoost ?? true,
      }

      const audio = await this.client.textToSpeech.convert(voiceId, {
        text: options.text,
        modelId: modelId,
        voiceSettings: voiceSettings,
      })

      // Convert the audio response to a Blob
      const audioBlob = await this.streamToBlob(audio)
      return audioBlob
    } catch (error) {
      console.error('Error generating speech:', error)
      throw new Error(`Failed to generate speech: ${error}`)
    }
  }

  /**
   * Generate speech and return as audio URL
   */
  async generateSpeechUrl(options: AudioGenerationOptions): Promise<string> {
    const audioBlob = await this.generateSpeech(options)
    return URL.createObjectURL(audioBlob)
  }

  /**
   * Stream text-to-speech audio
   */
  async *streamSpeech(options: AudioGenerationOptions): AsyncGenerator<Uint8Array> {
    try {
      const voiceId = options.voiceId || this.defaultVoiceId
      const modelId = options.modelId || this.defaultModelId
      
      const voiceSettings = {
        stability: options.voiceSettings?.stability ?? this.defaultVoiceSettings.stability ?? 0.5,
        similarityBoost: options.voiceSettings?.similarityBoost ?? this.defaultVoiceSettings.similarityBoost ?? 0.75,
        style: options.voiceSettings?.style ?? this.defaultVoiceSettings.style,
        speakerBoost: options.voiceSettings?.speakerBoost ?? this.defaultVoiceSettings.speakerBoost ?? true,
      }

      const audioStream = await this.client.textToSpeech.convert(voiceId, {
        text: options.text,
        modelId: modelId,
        voiceSettings: voiceSettings,
      })

      // Stream the audio data
      const reader = audioStream.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        yield value
      }
    } catch (error) {
      console.error('Error streaming speech:', error)
      throw new Error(`Failed to stream speech: ${error}`)
    }
  }

  /**
   * Get available voices from ElevenLabs
   */
  async getVoices() {
    try {
      const voices = await this.client.voices.getAll()
      return voices.voices || []
    } catch (error) {
      console.error('Error fetching voices:', error)
      throw new Error(`Failed to fetch voices: ${error}`)
    }
  }

  /**
   * Get voice details by ID
   */
  async getVoice(voiceId: string) {
    try {
      return await this.client.voices.get(voiceId)
    } catch (error) {
      console.error('Error fetching voice:', error)
      throw new Error(`Failed to fetch voice: ${error}`)
    }
  }

  /**
   * Transcribe audio using ElevenLabs Speech-to-Text
   * Note: You'll need to implement this based on your ElevenLabs API version
   * or use a different STT service like OpenAI Whisper
   */
  async transcribeAudio(audioFile: File): Promise<string> {
    try {
      // TODO: Implement with actual ElevenLabs STT API when available
      // For now, this is a placeholder
      console.warn('ElevenLabs STT not fully implemented. Use Web Speech API or OpenAI Whisper instead.')
      return ''
    } catch (error) {
      console.error('Error transcribing audio:', error)
      throw new Error(`Failed to transcribe audio: ${error}`)
    }
  }

  /**
   * Helper to convert stream to Blob
   */
  private async streamToBlob(stream: ReadableStream<Uint8Array>): Promise<Blob> {
    const chunks: BlobPart[] = []
    const reader = stream.getReader()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value as BlobPart)
    }

    return new Blob(chunks, { type: 'audio/mpeg' })
  }

  /**
   * Create an audio element from blob
   */
  createAudioElement(audioBlob: Blob): HTMLAudioElement {
    const audio = new Audio()
    audio.src = URL.createObjectURL(audioBlob)
    return audio
  }

  /**
   * Play audio directly
   */
  async playAudio(audioBlob: Blob): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = this.createAudioElement(audioBlob)
      
      audio.onended = () => resolve()
      audio.onerror = (error) => reject(error)
      
      audio.play().catch(reject)
    })
  }
}

export default ElevenLabsVoiceService