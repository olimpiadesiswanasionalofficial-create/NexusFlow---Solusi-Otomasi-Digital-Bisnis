import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlatformService } from '../../services/platform.service';

interface VideoChapter {
  id: number;
  title: string;
  timeFormatted: string;
  seconds: number;
  description: string;
}

@Component({
  selector: 'app-video-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="video-penjelasan" class="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Video Penjelasan Lengkap</span>
            <span aria-hidden="true">·</span>
            <span>Panduan Interaktif</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Pelajari Cara Kerja NexusFlow dalam 12 Menit
          </h2>

          <p class="text-base text-zinc-400 leading-relaxed">
            Tonton demonstrasi visual bagaimana 5 modul AI dan sistem kasir otomatis saling terhubung 
            untuk membangun bisnis produk digital siap panen tanpa kerumitan teknis.
          </p>
        </div>

        <!-- Video Player Shell -->
        <div class="mt-12 max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-2xl">
          
          <!-- Screen Area -->
          <div class="relative aspect-video w-full bg-zinc-950 flex items-center justify-center overflow-hidden group">
            
            <!-- Video Poster / Simulation Frame -->
            <div class="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 flex flex-col items-center justify-center p-6 text-center">
              <div class="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(16,185,129,0.1),rgba(0,0,0,0))]"></div>
              
              <div class="relative z-10 max-w-xl space-y-4">
                <div class="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300">
                  <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Chapter {{ activeChapter().id }}: {{ activeChapter().title }}</span>
                </div>

                <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
                  {{ activeChapter().description }}
                </h3>

                <p class="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Demonstrasi alur nyata: input ide niche, validasi data pencarian, pembuatan naskah penawaran, serta integrasi QRIS bank otomatis.
                </p>

                <!-- Center Big Play Button -->
                <div class="pt-2">
                  <button
                    type="button"
                    (click)="togglePlay()"
                    aria-label="Putar video penjelasan"
                    class="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center shadow-xl shadow-emerald-500/30 transition-transform active:scale-95 mx-auto"
                  >
                    <mat-icon class="text-3xl sm:text-4xl ml-1">{{ isPlaying() ? 'pause' : 'play_arrow' }}</mat-icon>
                  </button>
                </div>
              </div>
            </div>

            <!-- Bottom Floating Player Controls -->
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/70 to-transparent p-4 sm:p-6 space-y-2 z-20">
              
              <!-- Timeline scrubber bar -->
              <button
                type="button"
                aria-label="Navigasi waktu video"
                class="relative h-2 w-full bg-zinc-800 rounded-full cursor-pointer overflow-hidden group/bar p-0 border-0"
                (click)="onTimelineClick($event)"
              >
                <span 
                  class="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full block pointer-events-none"
                  [style.width.%]="progressPercent()"
                ></span>
              </button>

              <!-- Controls bar -->
              <div class="flex items-center justify-between text-xs text-zinc-300 pt-1">
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    (click)="togglePlay()"
                    class="hover:text-emerald-400 transition-colors"
                  >
                    <mat-icon class="text-base">{{ isPlaying() ? 'pause' : 'play_arrow' }}</mat-icon>
                  </button>

                  <button
                    type="button"
                    (click)="replayVideo()"
                    title="Ulangi video"
                    class="hover:text-emerald-400 transition-colors"
                  >
                    <mat-icon class="text-base">replay</mat-icon>
                  </button>

                  <div class="flex items-center gap-1 font-mono text-[11px] text-zinc-400">
                    <span>{{ currentTimeFormatted() }}</span>
                    <span>/</span>
                    <span>12:30</span>
                  </div>

                  <div class="hidden sm:flex items-center gap-1.5 ml-2">
                    <mat-icon class="text-sm text-zinc-400">volume_up</mat-icon>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      [value]="volume()" 
                      (input)="onVolumeChange($event)"
                      class="w-16 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    >
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    (click)="openInteractiveDemo()"
                    class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-sm"
                  >
                    <mat-icon class="text-xs">play_circle</mat-icon>
                    <span>Coba Demo Langsung</span>
                  </button>

                  <button
                    type="button"
                    (click)="toggleFullscreen()"
                    title="Layar Penuh"
                    class="hover:text-white transition-colors"
                  >
                    <mat-icon class="text-base">fullscreen</mat-icon>
                  </button>
                </div>
              </div>

            </div>

          </div>

          <!-- Video Chapters List (8 Chapters per specification) -->
          <div class="p-6 border-t border-zinc-800 bg-zinc-900/40">
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Pilih Chapter Materi Video:
              </span>
              <span class="text-[11px] text-emerald-400 font-mono">8 Chapters Tersedia</span>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              @for (chap of chapters; track chap.id) {
                <button
                  type="button"
                  (click)="jumpToChapter(chap)"
                  class="p-3 rounded-xl border text-left transition-all"
                  [class.border-emerald-500]="activeChapter().id === chap.id"
                  [class.bg-emerald-500/10]="activeChapter().id === chap.id"
                  [class.border-zinc-800]="activeChapter().id !== chap.id"
                  [class.bg-zinc-950]="activeChapter().id !== chap.id"
                  [class.hover:border-zinc-700]="activeChapter().id !== chap.id"
                >
                  <div class="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span [class.text-emerald-400]="activeChapter().id === chap.id" class="text-zinc-500 font-bold">
                      0{{ chap.id }}
                    </span>
                    <span class="text-zinc-400">{{ chap.timeFormatted }}</span>
                  </div>
                  <div class="text-xs font-bold text-white truncate">{{ chap.title }}</div>
                </button>
              }
            </div>

            <!-- Custom URL Input Slot -->
            <div class="mt-5 pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span class="text-zinc-400">Gunakan video kustom Anda sendiri:</span>
              <div class="flex w-full sm:w-auto items-center gap-2">
                <input
                  type="text"
                  placeholder="Masukkan link video (YouTube / MP4 / Cloud)..."
                  class="rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 w-full sm:w-72"
                >
                <button
                  type="button"
                  class="rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-colors shrink-0"
                >
                  Ganti
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
})
export class VideoPlayerComponent {
  platformService = inject(PlatformService);

  readonly isPlaying = signal<boolean>(false);
  readonly currentSeconds = signal<number>(0);
  readonly volume = signal<number>(80);

  readonly chapters: VideoChapter[] = [
    { id: 1, title: 'Pengenalan Sistem', timeFormatted: '00:00', seconds: 0, description: 'Gambaran Menyeluruh Ekosistem AI NexusFlow' },
    { id: 2, title: 'Riset Produk', timeFormatted: '01:45', seconds: 105, description: 'Cara AI Menemukan Niche Laris di Indonesia' },
    { id: 3, title: 'Tim 5 AI Worker', timeFormatted: '03:15', seconds: 195, description: 'Alur Kerja Otomatis 5 Karyawan AI Terpadu' },
    { id: 4, title: 'Pembuatan Konten', timeFormatted: '05:00', seconds: 300, description: 'Menghasilkan Naskah Iklan & Storyboard Video UGC' },
    { id: 5, title: 'Pembuatan Produk', timeFormatted: '06:30', seconds: 390, description: 'Merancang Mini Web-App & Template Siap Jual' },
    { id: 6, title: 'Landing Page', timeFormatted: '08:10', seconds: 490, description: 'Mempersiapkan Halaman Penjualan 1-Detik' },
    { id: 7, title: 'AI Mentor', timeFormatted: '09:40', seconds: 580, description: 'Konsultasi Strategi Bisnis Real-Time dengan AI' },
    { id: 8, title: 'Digital Academy', timeFormatted: '11:00', seconds: 660, description: 'Materi Lengkap dari Riset sampai Scaling Omset' },
  ];

  readonly activeChapter = signal<VideoChapter>(this.chapters[0]);

  readonly progressPercent = signal<number>(0);
  readonly currentTimeFormatted = signal<string>('00:00');

  togglePlay() {
    this.isPlaying.update((v) => !v);
  }

  jumpToChapter(chap: VideoChapter) {
    this.activeChapter.set(chap);
    this.currentSeconds.set(chap.seconds);
    this.currentTimeFormatted.set(chap.timeFormatted);
    this.progressPercent.set(Math.round((chap.seconds / 750) * 100));
    this.isPlaying.set(true);
  }

  replayVideo() {
    this.jumpToChapter(this.chapters[0]);
  }

  onTimelineClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    this.progressPercent.set(Math.round(percent));
    const seconds = Math.round((percent / 100) * 750);
    this.currentSeconds.set(seconds);
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    this.currentTimeFormatted.set(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
  }

  onVolumeChange(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.volume.set(val);
  }

  openInteractiveDemo() {
    this.platformService.setView('demo');
  }

  toggleFullscreen() {
    if (typeof document !== 'undefined') {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.warn('Fullscreen unavailable:', err);
        });
      } else {
        document.exitFullscreen().catch((err) => {
          console.warn('Exit fullscreen failed:', err);
        });
      }
    }
  }
}
