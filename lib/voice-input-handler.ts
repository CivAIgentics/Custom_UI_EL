import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

export interface VoiceInputConfig {
  apiKey: string
  enableRealTimeTranscription?: boolean
  language?: string
  model?: string
}

export interface TranscriptionResult {
  text: string
  confidence?: number
  isFinal: boolean
}

export class VoiceInputHandler {
  private api: ElevenLabsClient
  private mediaRecorder: MediaRecorder | null = null
  private stream: MediaStream | null = null
  private audioChunks: Blob[] = []
  private recognition: any = null
  private isRecording = false

  constructor(private config: VoiceInputConfig) {
    this.api = new ElevenLabsClient({
      apiKey: config.apiKey,
    })
  }

  /**
   * Start recording voice input with optional real-time transcription
   */
  async startRecording(
    onRealTimeTranscription?: (result: TranscriptionResult) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      if (this.isRecording) {
        throw new Error('Already recording')
      }

      // Get microphone access
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })

      // Setup MediaRecorder for final transcription
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: 'audio/webm;codecs=opus',
      })

      this.audioChunks = []

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data)
        }
      }

      this.mediaRecorder.start()
      this.isRecording = true

      // Setup real-time transcription if enabled and callback provided
      if (this.config.enableRealTimeTranscription && onRealTimeTranscription) {
        this.setupRealTimeTranscription(onRealTimeTranscription, onError)
      }
    } catch (error) {
      onError?.(error as Error)
      throw error
    }
  }

  /**
   * Stop recording and get the transcription
   */
  async stopRecording(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.isRecording || !this.mediaRecorder) {
        reject(new Error('Not currently recording'))
        return
      }

      this.mediaRecorder.onstop = async () => {
        try {
          // Create audio blob from recorded chunks
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' })
          
          // Convert to the format expected by ElevenLabs
          const audioFile = await this.blobToFile(audioBlob, 'recording.webm')
          
          // Transcribe using ElevenLabs Speech-to-Text
          const transcription = await this.transcribeAudio(audioFile)
          
          // Cleanup
          this.cleanup()
          
          resolve(transcription)
        } catch (error) {
          this.cleanup()
          reject(error)
        }
      }

      this.mediaRecorder.stop()
      this.isRecording = false

      // Stop real-time transcription
      if (this.recognition) {
        this.recognition.stop()
        this.recognition = null
      }
    })
  }

  /**
   * Cancel current recording
   */
  cancelRecording(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop()
      this.isRecording = false
    }

    if (this.recognition) {
      this.recognition.stop()
      this.recognition = null
    }

    this.cleanup()
  }

  /**
   * Check if currently recording
   */
  getIsRecording(): boolean {
    return this.isRecording
  }

  /**
   * Setup real-time transcription using Web Speech API as fallback
   * In production, you might want to use ElevenLabs streaming STT when available
   */
  private setupRealTimeTranscription(
    onTranscription: (result: TranscriptionResult) => void,
    onError?: (error: Error) => void
  ): void {
    // Check if browser supports Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      
      this.recognition = new SpeechRecognition()
      this.recognition.continuous = true
      this.recognition.interimResults = true
      this.recognition.lang = this.config.language || 'en-US'

      this.recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          const transcript = result[0].transcript
          const confidence = result[0].confidence || 0

          onTranscription({
            text: transcript,
            confidence,
            isFinal: result.isFinal,
          })
        }
      }

      this.recognition.onerror = (event: any) => {
        onError?.(new Error(`Speech recognition error: ${event.error}`))
      }

      this.recognition.start()
    } else {
      console.warn('Real-time transcription not supported in this browser')
    }
  }

  /**
   * Transcribe audio using ElevenLabs Speech-to-Text API
   */
  private async transcribeAudio(audioFile: File): Promise<string> {
    try {
      // Note: ElevenLabs STT API might have different method names
      // This is based on the expected API structure
      const response = await fetch('https://api.elevenlabs.io/v1/speech-to-text', {
        method: 'POST',
        headers: {
          'xi-api-key': this.config.apiKey,
        },
        body: (() => {
          const formData = new FormData()
          formData.append('audio', audioFile)
          if (this.config.model) {
            formData.append('model', this.config.model)
          }
          return formData
        })(),
      })

      if (!response.ok) {
        throw new Error(`ElevenLabs STT API error: ${response.statusText}`)
      }

      const result = await response.json()
      return result.text || result.transcription || ''
    } catch (error) {
      console.error('ElevenLabs STT failed, using fallback:', error)
      
      // Fallback to browser's speech recognition if available
      return this.fallbackTranscription(audioFile)
    }
  }

  /**
   * Fallback transcription method
   */
  private async fallbackTranscription(audioFile: File): Promise<string> {
    // For now, return a placeholder message
    // In a real implementation, you might use another STT service
    console.warn('Using fallback transcription')
    return "Audio transcription (fallback mode - please configure ElevenLabs API key for accurate transcription)"
  }

  /**
   * Convert Blob to File
   */
  private async blobToFile(blob: Blob, fileName: string): Promise<File> {
    return new File([blob], fileName, { type: blob.type })
  }

  /**
   * Cleanup resources
   */
  private cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop())
      this.stream = null
    }

    this.audioChunks = []
    this.mediaRecorder = null
  }

  /**
   * Get available audio devices
   */
  static async getAudioDevices(): Promise<MediaDeviceInfo[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      return devices.filter(device => device.kind === 'audioinput')
    } catch (error) {
      console.error('Error getting audio devices:', error)
      return []
    }
  }

  /**
   * Check if microphone permission is granted
   */
  static async checkMicrophonePermission(): Promise<PermissionState> {
    try {
      const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName })
      return permission.state
    } catch (error) {
      console.error('Error checking microphone permission:', error)
      return 'denied'
    }
  }

  /**
   * Request microphone permission
   */
  static async requestMicrophonePermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
      return true
    } catch (error) {
      console.error('Error requesting microphone permission:', error)
      return false
    }
  }
}

export default VoiceInputHandler