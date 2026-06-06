// ttsQueue.ts — sequential chunk playback, no overlap

export class TTSQueue {
  private queue: string[] = [];   // audio blob URLs
  private playing = false;
  private currentAudio: HTMLAudioElement | null = null;
  onEnd?: () => void;
  onError?: (err: string) => void;

  async enqueue(audioPaths: string[]): Promise<void> {
    // Fetch blobs and queue them
    for (const path of audioPaths) {
      try {
        const res = await fetch(path);
        const blob = await res.blob();
        this.queue.push(URL.createObjectURL(blob));
      } catch {
        console.warn("TTS chunk fetch failed:", path);
      }
    }
    if (!this.playing) this._playNext();
  }

  private _playNext(): void {
    if (this.queue.length === 0) {
      this.playing = false;
      this.onEnd?.();
      return;
    }
    this.playing = true;
    const url = this.queue.shift()!;
    const audio = new Audio(url);
    this.currentAudio = audio;

    audio.onended = () => {
      URL.revokeObjectURL(url);
      this.currentAudio = null;
      this._playNext();          // play next chunk after current ends
    };

    audio.onerror = () => {
      URL.revokeObjectURL(url);
      this.onError?.("Audio chunk failed");
      this._playNext();          // skip broken chunk, continue
    };

    audio.play().catch((e) => {
      this.onError?.(String(e));
      this._playNext();
    });
  }

  cancel(): void {
    this.queue = [];
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    this.playing = false;
  }

  get isPlaying(): boolean { return this.playing; }
}
