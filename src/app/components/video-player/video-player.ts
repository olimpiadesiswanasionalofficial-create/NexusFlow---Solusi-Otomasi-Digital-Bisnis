import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PlatformService } from '../../services/platform.service';

export interface VideoChapter {
  id: number;
  title: string;
  badge: string;
  durationSeconds: number;
  subtitle: string;
  narrationScript: string;
  keyPoints: string[];
  visualType: 'problem_vs_solution' | 'team_5_ai' | 'workflow_demo' | 'cashier_qris' | 'client_portal' | 'pricing_offer';
}

@Component({
  selector: 'app-video-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="video-penjelasan" class="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <!-- Header Section -->
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 shadow-sm">
            <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Video Presentasi Resmi NexusFlow</span>
            <span aria-hidden="true">·</span>
            <span>PT. CAHAYA ARSYA GEMILANG</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Miliki Karyawan AI Anda Sekarang
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Hanya 99 Ribu Saja Perbulan
            </span>
          </h2>

          <p class="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Saksikan demonstrasi bagaimana 5 Karyawan AI NexusFlow bekerja otomatis 24 jam nonstop untuk meriset pasar, menulis copy, mendesain brand, dan menerima pembayaran QRIS langsung ke rekening Anda.
          </p>
        </div>

        <!-- Video Player Shell (High-Fidelity Interactive Presentation) -->
        <div class="mt-10 max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-2xl shadow-emerald-950/20">
          
          <!-- Top Window Bar -->
          <div class="px-4 py-3 bg-zinc-950 border-b border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <div class="flex items-center gap-2">
              <span class="h-3 w-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span class="h-3 w-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span class="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span class="ml-2 font-mono text-zinc-300 font-medium hidden sm:inline">
                NexusFlow_Presentation_Master_2026.mp4
              </span>
            </div>

            <div class="flex items-center gap-3">
              <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>HD 1080p · Interactive Deck</span>
              </span>

              <!-- Narration Voice Toggle -->
              <button
                type="button"
                (click)="toggleVoiceNarration()"
                [class.text-emerald-400]="voiceEnabled()"
                [class.text-zinc-500]="!voiceEnabled()"
                class="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                title="Aktifkan/Nonaktifkan Suara Narasi AI"
              >
                <mat-icon class="text-sm">{{ voiceEnabled() ? 'volume_up' : 'volume_off' }}</mat-icon>
                <span class="hidden md:inline">{{ voiceEnabled() ? 'Suara AI: Nyala' : 'Suara AI: Senyap' }}</span>
              </button>
            </div>
          </div>

          <!-- Screen Area (CSS Selector 1 Target) -->
          <div class="relative aspect-video w-full bg-zinc-950 overflow-hidden flex flex-col justify-between group select-none">
            
            <!-- Dynamic Visual Presentation Slide Canvas -->
            <div class="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col justify-between p-6 sm:p-10 overflow-hidden">
              
              <!-- Subtle Background Tech Grid & Glow -->
              <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(0,0,0,0))] pointer-events-none"></div>
              <div class="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

              <!-- Top Slide Badge & Chapter Tracker -->
              <div class="relative z-10 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                    CHAPTER 0{{ currentChapter().id }} / 06
                  </span>
                  <span class="text-xs text-zinc-400 font-medium hidden sm:inline">
                    {{ currentChapter().badge }}
                  </span>
                </div>

                <!-- Live Presentation Status / Audio Equalizer Indicator -->
                <div class="flex items-center gap-2">
                  @if (isPlaying()) {
                    <div class="flex items-end gap-1 h-4 px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800">
                      <span class="w-1 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite] h-2"></span>
                      <span class="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite] h-4"></span>
                      <span class="w-1 bg-teal-400 rounded-full animate-[bounce_1s_infinite] h-3"></span>
                      <span class="w-1 bg-emerald-400 rounded-full animate-[bounce_0.7s_infinite] h-2.5"></span>
                    </div>
                  }
                  <span class="text-xs font-mono text-zinc-400">
                    {{ playbackTimeFormatted() }}
                  </span>
                </div>
              </div>

              <!-- Main Slide Content Area Based on Chapter -->
              <div class="relative z-10 my-auto max-w-4xl mx-auto w-full">
                
                <!-- Slide 1: Problem vs Solution (Karyawan Konvensional vs AI 99rb) -->
                @if (currentChapter().visualType === 'problem_vs_solution') {
                  <div class="space-y-6 animate-fade-in">
                    <div class="text-center space-y-2">
                      <h3 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                        Mengapa Harus Bayar Gaji Belasan Juta?
                      </h3>
                      <p class="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto">
                        Bandingkan beban operasional staf konvensional dengan 5 Karyawan AI NexusFlow siap kerja detik ini.
                      </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <!-- Traditional Staf Card -->
                      <div class="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 sm:p-5 relative overflow-hidden">
                        <div class="flex items-center justify-between text-xs font-bold text-rose-400 mb-2">
                          <span class="flex items-center gap-1.5">
                            <mat-icon class="text-sm">close</mat-icon> Rekrut Staf Konvensional
                          </span>
                          <span class="font-mono text-rose-300">Rp 15 - 25 Juta/Bln</span>
                        </div>
                        <ul class="space-y-1.5 text-xs text-zinc-300">
                          <li class="flex items-center gap-1.5">
                            <span class="text-rose-400">✕</span> Gaji bulanan, tunjangan, THR & BPJS
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="text-rose-400">✕</span> Jam kerja terbatas (8 jam sehari & libur)
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="text-rose-400">✕</span> Risiko burnout, mood drop, dan resign
                          </li>
                        </ul>
                      </div>

                      <!-- NexusFlow AI Card -->
                      <div class="rounded-xl border border-emerald-500/50 bg-emerald-950/30 p-4 sm:p-5 relative overflow-hidden shadow-lg shadow-emerald-500/10">
                        <div class="absolute -top-3 -right-3 h-16 w-16 bg-emerald-500/20 rounded-full blur-xl"></div>
                        <div class="flex items-center justify-between text-xs font-bold text-emerald-400 mb-2">
                          <span class="flex items-center gap-1.5">
                            <mat-icon class="text-sm">check_circle</mat-icon> 5 Karyawan AI NexusFlow
                          </span>
                          <span class="font-mono text-white bg-emerald-600 px-2 py-0.5 rounded text-[11px]">
                            99 Ribu Saja / Bln
                          </span>
                        </div>
                        <ul class="space-y-1.5 text-xs text-zinc-200">
                          <li class="flex items-center gap-1.5">
                            <span class="text-emerald-400">✓</span> Bekerja otomatis 24 jam nonstop tanpa lelah
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="text-emerald-400">✓</span> 5 Peran: Riset, Copy, Desain, Video & Kasir
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="text-emerald-400">✓</span> Tanpa kontrak mengikat, garansi kepuasan
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                }

                <!-- Slide 2: 5 AI Employees Structure -->
                @if (currentChapter().visualType === 'team_5_ai') {
                  <div class="space-y-5 animate-fade-in">
                    <div class="text-center space-y-1">
                      <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
                        Struktur 5 Karyawan AI Spesialis Anda
                      </h3>
                      <p class="text-xs sm:text-sm text-zinc-400">
                        Setiap divisi memiliki kecerdasan spesifik untuk menjamin bisnis produk digital Anda beroperasi sempurna.
                      </p>
                    </div>

                    <div class="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
                      <div class="p-3 rounded-xl border border-zinc-800 bg-zinc-900/80 text-center space-y-1.5 hover:border-emerald-500/50 transition-colors">
                        <div class="h-10 w-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                          01
                        </div>
                        <div class="text-xs font-bold text-white">AI Riset Niche</div>
                        <div class="text-[10px] text-zinc-400">Cari celah pasar viral di Indonesia</div>
                      </div>

                      <div class="p-3 rounded-xl border border-zinc-800 bg-zinc-900/80 text-center space-y-1.5 hover:border-emerald-500/50 transition-colors">
                        <div class="h-10 w-10 mx-auto rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                          02
                        </div>
                        <div class="text-xs font-bold text-white">AI Copywriter</div>
                        <div class="text-[10px] text-zinc-400">Tulis naskah penjualan menghipnotis</div>
                      </div>

                      <div class="p-3 rounded-xl border border-zinc-800 bg-zinc-900/80 text-center space-y-1.5 hover:border-emerald-500/50 transition-colors">
                        <div class="h-10 w-10 mx-auto rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-xs">
                          03
                        </div>
                        <div class="text-xs font-bold text-white">AI Visual Desain</div>
                        <div class="text-[10px] text-zinc-400">Buat banner 3D & aset promosi</div>
                      </div>

                      <div class="p-3 rounded-xl border border-zinc-800 bg-zinc-900/80 text-center space-y-1.5 hover:border-emerald-500/50 transition-colors">
                        <div class="h-10 w-10 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                          04
                        </div>
                        <div class="text-xs font-bold text-white">AI Video UGC</div>
                        <div class="text-[10px] text-zinc-400">Storyboard TikTok 9:16 siap iklan</div>
                      </div>

                      <div class="col-span-2 sm:col-span-1 p-3 rounded-xl border border-emerald-500/60 bg-emerald-950/40 text-center space-y-1.5 shadow-md shadow-emerald-500/10">
                        <div class="h-10 w-10 mx-auto rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold text-xs">
                          05
                        </div>
                        <div class="text-xs font-bold text-white">AI Kasir & CS</div>
                        <div class="text-[10px] text-emerald-300">QRIS otomatis & mutasi bank 24 jam</div>
                      </div>
                    </div>
                  </div>
                }

                <!-- Slide 3: Workflow Automation -->
                @if (currentChapter().visualType === 'workflow_demo') {
                  <div class="space-y-5 animate-fade-in">
                    <div class="text-center space-y-1">
                      <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
                        Alur Eksekusi Otomatis: Dari Ide Menjadi Rupiah
                      </h3>
                      <p class="text-xs sm:text-sm text-zinc-400">
                        Bagaimana sistem terintegrasi mengeksekusi produk Anda hanya dalam beberapa menit.
                      </p>
                    </div>

                    <div class="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 max-w-3xl mx-auto">
                      <div class="w-full sm:w-1/4 p-3 rounded-xl border border-zinc-800 bg-zinc-900/90 text-center">
                        <span class="text-[10px] font-mono text-emerald-400 uppercase">Tahap 1</span>
                        <div class="text-xs font-bold text-white mt-1">Input Topik / Ide</div>
                        <div class="text-[10px] text-zinc-400 mt-0.5">Misal: "Kalkulator Profit Seller"</div>
                      </div>

                      <mat-icon class="text-zinc-600 rotate-90 sm:rotate-0 text-sm">arrow_forward</mat-icon>

                      <div class="w-full sm:w-1/4 p-3 rounded-xl border border-emerald-500/40 bg-zinc-900/90 text-center">
                        <span class="text-[10px] font-mono text-cyan-400 uppercase">Tahap 2</span>
                        <div class="text-xs font-bold text-white mt-1">AI Bekerja Paralel</div>
                        <div class="text-[10px] text-zinc-400 mt-0.5">Copywriter & Desainer berproses</div>
                      </div>

                      <mat-icon class="text-zinc-600 rotate-90 sm:rotate-0 text-sm">arrow_forward</mat-icon>

                      <div class="w-full sm:w-1/4 p-3 rounded-xl border border-zinc-800 bg-zinc-900/90 text-center">
                        <span class="text-[10px] font-mono text-amber-400 uppercase">Tahap 3</span>
                        <div class="text-xs font-bold text-white mt-1">Landing Page Siap</div>
                        <div class="text-[10px] text-zinc-400 mt-0.5">Loading 0.8s, responsive mobile</div>
                      </div>

                      <mat-icon class="text-zinc-600 rotate-90 sm:rotate-0 text-sm">arrow_forward</mat-icon>

                      <div class="w-full sm:w-1/4 p-3 rounded-xl border border-emerald-500 bg-emerald-950/40 text-center shadow-lg shadow-emerald-500/20">
                        <span class="text-[10px] font-mono text-emerald-400 uppercase">Tahap 4</span>
                        <div class="text-xs font-bold text-white mt-1">Mesin QRIS Aktif</div>
                        <div class="text-[10px] text-emerald-300 mt-0.5">Uang langsung masuk rekening</div>
                      </div>
                    </div>
                  </div>
                }

                <!-- Slide 4: Real-time Cashier & QRIS -->
                @if (currentChapter().visualType === 'cashier_qris') {
                  <div class="space-y-4 animate-fade-in">
                    <div class="text-center space-y-1">
                      <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
                        Mesin Kasir Otomatis: QRIS & Mutasi Bank Instan
                      </h3>
                      <p class="text-xs sm:text-sm text-zinc-400">
                        Tidak perlu lagi menunggu Anda bangun untuk verifikasi struk transfer pembeli.
                      </p>
                    </div>

                    <div class="max-w-md mx-auto p-4 rounded-xl border border-zinc-800 bg-zinc-900/90 flex items-center gap-4 shadow-xl">
                      <div class="h-24 w-24 shrink-0 rounded-lg bg-white p-1.5 flex items-center justify-center">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NEXUSFLOW_DEMO_QRIS_PAYMENT" 
                          alt="QRIS Demo"
                          referrerpolicy="no-referrer"
                          class="h-full w-full object-contain"
                        />
                      </div>
                      <div class="space-y-1 text-left">
                        <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold">
                          <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                          <span>Webhook Otomatis Aktif</span>
                        </div>
                        <div class="text-xs font-bold text-white">Mendukung Seluruh Bank & E-Wallet</div>
                        <div class="text-[11px] text-zinc-400">BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay.</div>
                        <div class="text-[11px] text-emerald-400 font-mono font-bold">Verifikasi 2.1 detik · 100% Milik Anda</div>
                      </div>
                    </div>
                  </div>
                }

                <!-- Slide 5: Real-time Client Portal -->
                @if (currentChapter().visualType === 'client_portal') {
                  <div class="space-y-4 animate-fade-in">
                    <div class="text-center space-y-1">
                      <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
                        Dashboard Klien: Pantau Progres Real-Time
                      </h3>
                      <p class="text-xs sm:text-sm text-zinc-400">
                        Lihat status pekerjaan 5 Karyawan AI, unduh deliverable, dan kelola order dalam satu portal terpadu.
                      </p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div class="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/90 space-y-1 text-left">
                        <div class="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                          <mat-icon class="text-sm">dashboard</mat-icon> Live Progress Task
                        </div>
                        <div class="text-[11px] text-zinc-300">Setiap AI memberikan update status secara live (Completed / In Progress).</div>
                      </div>

                      <div class="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/90 space-y-1 text-left">
                        <div class="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                          <mat-icon class="text-sm">cloud_download</mat-icon> Unduh Aset Instan
                        </div>
                        <div class="text-[11px] text-zinc-300">File naskah copywriting, gambar banner 3D, dan source code landing page.</div>
                      </div>

                      <div class="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/90 space-y-1 text-left">
                        <div class="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                          <mat-icon class="text-sm">point_of_sale</mat-icon> Laporan Kasir Penjualan
                        </div>
                        <div class="text-[11px] text-zinc-300">Grafik omset harian, mutasi masuk, dan riwayat pesanan pelanggan Anda.</div>
                      </div>
                    </div>
                  </div>
                }

                <!-- Slide 6: Pricing & Offer -->
                @if (currentChapter().visualType === 'pricing_offer') {
                  <div class="space-y-4 text-center animate-fade-in">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                      🔥 KESEPAKATAN TERBAIK TAHUN 2026
                    </div>

                    <h3 class="text-3xl sm:text-4xl font-extrabold text-white">
                      Miliki 5 Karyawan AI Sekarang
                    </h3>

                    <div class="flex items-baseline justify-center gap-2">
                      <span class="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 font-mono">
                        Rp 99.000
                      </span>
                      <span class="text-zinc-400 text-sm">/ bulan saja</span>
                    </div>

                    <p class="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                      Dikelola resmi oleh <strong class="text-white">PT. CAHAYA ARSYA GEMILANG</strong>. Akses langsung seluruh modul AI, landing page generator, dan sistem kasir QRIS otomatis.
                    </p>

                    <div class="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        (click)="openDirectCheckout()"
                        class="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2 active:scale-95"
                      >
                        <mat-icon class="text-sm">shopping_bag</mat-icon>
                        <span>Langganan Sekarang (99 Ribu/Bulan)</span>
                      </button>

                      <button
                        type="button"
                        (click)="openInteractiveDemo()"
                        class="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border border-zinc-700"
                      >
                        <mat-icon class="text-sm">laptop</mat-icon>
                        <span>Coba Demo Interaktif</span>
                      </button>
                    </div>
                  </div>
                }

              </div>

              <!-- Teleprompter / Live Indonesian Subtitle Bar -->
              <div class="relative z-10 w-full pt-3">
                <div class="rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-4 py-2.5 flex items-center gap-3 shadow-lg">
                  <div class="h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <mat-icon class="text-base">{{ isPlaying() ? 'record_voice_over' : 'hearing' }}</mat-icon>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
                      Narasi Video Penjelasan (Bahasa Indonesia):
                    </div>
                    <p class="text-xs sm:text-sm text-zinc-200 font-medium truncate sm:whitespace-normal leading-snug">
                      "{{ currentChapter().narrationScript }}"
                    </p>
                  </div>
                  <div class="shrink-0 hidden md:block">
                    <span class="text-[11px] font-mono text-zinc-500">Speed: {{ playbackSpeed() }}x</span>
                  </div>
                </div>
              </div>

            </div>

            <!-- Center Big Play Button Overlay (when paused) -->
            @if (!isPlaying()) {
              <div class="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center p-4">
                <button
                  type="button"
                  (click)="togglePlay()"
                  aria-label="Putar video presentasi"
                  class="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center shadow-2xl shadow-emerald-500/50 transition-all hover:scale-105 active:scale-95 group/btn"
                >
                  <mat-icon class="text-4xl sm:text-5xl ml-1 text-zinc-950 group-hover/btn:scale-110 transition-transform">play_arrow</mat-icon>
                </button>
                <div class="mt-4 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-xs text-zinc-200 font-medium shadow-md">
                  Klik untuk Memulai Presentasi Interaktif
                </div>
              </div>
            }

            <!-- Bottom Floating Player Controls -->
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent p-4 sm:p-5 space-y-2 z-30">
              
              <!-- Timeline scrubber bar -->
              <div
                role="slider"
                tabindex="0"
                aria-label="Navigasi waktu presentasi video"
                [attr.aria-valuenow]="currentSeconds()"
                aria-valuemin="0"
                [attr.aria-valuemax]="totalSeconds"
                class="relative h-2.5 w-full bg-zinc-800/90 rounded-full cursor-pointer overflow-hidden group/bar p-0 border-0"
                (click)="onTimelineClick($event)"
                (keydown.arrowright)="seekRelative(5)"
                (keydown.arrowleft)="seekRelative(-5)"
              >
                <!-- Buffered progress -->
                <span class="absolute inset-y-0 left-0 bg-zinc-700 rounded-full w-full opacity-30"></span>
                <!-- Active played progress -->
                <span 
                  class="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full block transition-[width] duration-150"
                  [style.width.%]="progressPercent()"
                ></span>
              </div>

              <!-- Controls Bar -->
              <div class="flex items-center justify-between text-xs text-zinc-300 pt-1">
                
                <!-- Left controls: Play/Pause, Rewind, Forward, Replay, Timestamp -->
                <div class="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    (click)="togglePlay()"
                    [title]="isPlaying() ? 'Pause' : 'Play'"
                    class="h-8 w-8 rounded-lg bg-zinc-800/80 hover:bg-emerald-500 hover:text-zinc-950 text-white flex items-center justify-center transition-all"
                  >
                    <mat-icon class="text-base">{{ isPlaying() ? 'pause' : 'play_arrow' }}</mat-icon>
                  </button>

                  <button
                    type="button"
                    (click)="seekRelative(-10)"
                    title="Mundur 10 Detik"
                    class="hover:text-emerald-400 transition-colors hidden xs:inline-flex p-1"
                  >
                    <mat-icon class="text-base">replay_10</mat-icon>
                  </button>

                  <button
                    type="button"
                    (click)="seekRelative(10)"
                    title="Maju 10 Detik"
                    class="hover:text-emerald-400 transition-colors hidden xs:inline-flex p-1"
                  >
                    <mat-icon class="text-base">forward_10</mat-icon>
                  </button>

                  <button
                    type="button"
                    (click)="replayVideo()"
                    title="Ulangi dari Awal"
                    class="hover:text-emerald-400 transition-colors p-1"
                  >
                    <mat-icon class="text-base">replay</mat-icon>
                  </button>

                  <div class="flex items-center gap-1 font-mono text-[11px] text-zinc-400 ml-1">
                    <span class="text-white font-bold">{{ playbackTimeFormatted() }}</span>
                    <span>/</span>
                    <span>04:30</span>
                  </div>

                  <!-- Volume Controls -->
                  <div class="hidden sm:flex items-center gap-1.5 ml-2">
                    <button 
                      type="button" 
                      (click)="toggleMute()" 
                      class="hover:text-emerald-400 transition-colors"
                      title="Mute / Unmute"
                    >
                      <mat-icon class="text-sm text-zinc-400">
                        {{ volume() === 0 ? 'volume_off' : 'volume_up' }}
                      </mat-icon>
                    </button>
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

                <!-- Right controls: Speed toggle, Interactive Demo CTA, Fullscreen -->
                <div class="flex items-center gap-2 sm:gap-3">
                  <!-- Playback Speed Picker -->
                  <button
                    type="button"
                    (click)="cycleSpeed()"
                    class="px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[11px] font-mono text-zinc-300 transition-colors"
                    title="Atur Kecepatan Putar"
                  >
                    {{ playbackSpeed() }}x
                  </button>

                  <button
                    type="button"
                    (click)="openDirectCheckout()"
                    class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-sm active:scale-95"
                  >
                    <mat-icon class="text-xs">shopping_cart</mat-icon>
                    <span class="hidden sm:inline">Langganan 99rb</span>
                    <span class="sm:hidden">99rb</span>
                  </button>

                  <button
                    type="button"
                    (click)="toggleFullscreen()"
                    title="Layar Penuh"
                    class="hover:text-white transition-colors p-1"
                  >
                    <mat-icon class="text-base">fullscreen</mat-icon>
                  </button>
                </div>
              </div>

            </div>

          </div>

          <!-- Video Chapters List (CSS Selector 2 Target) -->
          <div class="p-5 sm:p-6 border-t border-zinc-800 bg-zinc-900/60">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-white">
                  Daftar Chapter Presentasi:
                </span>
                <span class="text-xs text-zinc-400 block sm:inline sm:ml-2">
                  Klik chapter untuk langsung lompat ke materi yang ingin Anda pelajari
                </span>
              </div>
              <span class="text-[11px] text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                6 Topik Materi Presentasi
              </span>
            </div>

            <!-- 6 Grid Chapter Selectors -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              @for (chap of chapters; track chap.id) {
                <button
                  type="button"
                  (click)="jumpToChapter(chap)"
                  class="p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer"
                  [class.border-emerald-500]="currentChapter().id === chap.id"
                  [class.bg-emerald-500/10]="currentChapter().id === chap.id"
                  [class.border-zinc-800]="currentChapter().id !== chap.id"
                  [class.bg-zinc-950/70]="currentChapter().id !== chap.id"
                  [class.hover:border-zinc-700]="currentChapter().id !== chap.id"
                  [class.hover:bg-zinc-900]="currentChapter().id !== chap.id"
                >
                  <!-- Active Indicator Bar -->
                  @if (currentChapter().id === chap.id) {
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"></div>
                  }

                  <div class="flex items-center justify-between text-[11px] font-mono mb-1.5">
                    <span 
                      class="font-bold flex items-center gap-1"
                      [class.text-emerald-400]="currentChapter().id === chap.id"
                      [class.text-zinc-500]="currentChapter().id !== chap.id"
                    >
                      <mat-icon class="text-xs">
                        {{ currentChapter().id === chap.id && isPlaying() ? 'play_arrow' : 'bookmark' }}
                      </mat-icon>
                      Chapter 0{{ chap.id }}
                    </span>
                    <span class="text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded text-[10px]">
                      {{ formatTime(chap.durationSeconds) }}
                    </span>
                  </div>

                  <div class="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {{ chap.title }}
                  </div>

                  <div class="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                    {{ chap.subtitle }}
                  </div>
                </button>
              }
            </div>

            <!-- Footer Callouts inside Chapter Container -->
            <div class="mt-5 pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div class="flex items-center gap-2 text-zinc-400">
                <mat-icon class="text-emerald-400 text-sm">verified_user</mat-icon>
                <span>Legalitas Terdaftar: <strong>PT. CAHAYA ARSYA GEMILANG</strong></span>
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  (click)="openInteractiveDemo()"
                  class="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-4 flex items-center gap-1"
                >
                  <span>Coba Langsung di Workspace Demo</span>
                  <mat-icon class="text-xs">arrow_forward</mat-icon>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
})
export class VideoPlayerComponent implements OnDestroy {
  platformService = inject(PlatformService);
  private platformId = inject(PLATFORM_ID);

  readonly isPlaying = signal<boolean>(false);
  readonly currentSeconds = signal<number>(0);
  readonly totalSeconds = 270; // 4 minutes 30 seconds presentation total
  readonly volume = signal<number>(80);
  readonly playbackSpeed = signal<number>(1);
  readonly voiceEnabled = signal<boolean>(true);

  private playbackInterval: ReturnType<typeof setInterval> | null = null;
  private previousVolume = 80;

  readonly chapters: VideoChapter[] = [
    {
      id: 1,
      title: 'Dilema Biaya Gaji Staf vs Solusi AI',
      badge: 'Analisis Finansial UMKM',
      durationSeconds: 0,
      subtitle: 'Mengapa rekrut staf konvensional membebani cashflow hingga belasan juta rupiah per bulan.',
      narrationScript: 'Merekrut 5 karyawan konvensional butuh biaya 15 hingga 25 juta perbulan. Dengan NexusFlow, Anda memiliki 5 Karyawan AI aktif 24 jam hanya 99 ribu saja perbulan.',
      keyPoints: ['Hemat biaya operasional >98%', 'Tidak ada drama cuti atau burnout', 'Bekerja nonstop setiap hari'],
      visualType: 'problem_vs_solution',
    },
    {
      id: 2,
      title: 'Struktur 5 Karyawan AI Spesialis',
      badge: '5 Modul Kecerdasan Buatan',
      durationSeconds: 45,
      subtitle: 'Dr. Arya, Karin, Sonia, Rizky, dan Fandi siap mengeksekusi semua divisi bisnis digital.',
      narrationScript: 'Inilah 5 Karyawan AI Anda: Riset Niche viral, Penulis Copywriting menghipnotis, Desainer visual 3D, Generator Video TikTok UGC, dan Kasir otomatis QRIS.',
      keyPoints: ['AI Riset Celah Pasar', 'AI Copywriter Konversi Tinggi', 'AI Visual & Video UGC', 'AI Kasir QRIS & CS'],
      visualType: 'team_5_ai',
    },
    {
      id: 3,
      title: 'Alur Kerja Otomatis 24 Jam Nonstop',
      badge: 'Workflow Eksekusi Kilat',
      durationSeconds: 90,
      subtitle: 'Input ide niche, validasi data pencarian, generate konten, dan online landing page.',
      narrationScript: 'Cukup masukkan 1 ide produk, 5 Karyawan AI akan bekerja serentak membuat sales letter, banner iklan, dan website siap jual dalam hitungan menit.',
      keyPoints: ['Input ide mudah dipahami orang awam', 'Karyawan AI berkoordinasi paralel', 'Halaman landing page 1-detik'],
      visualType: 'workflow_demo',
    },
    {
      id: 4,
      title: 'Mesin Kasir Otomatis & QRIS Real-Time',
      badge: 'Integrasi Pembayaran Otomatis',
      durationSeconds: 135,
      subtitle: 'Scan QRIS dari semua bank dan e-wallet dengan notifikasi konfirmasi 2 detik.',
      narrationScript: 'Mesin pembayaran otomatis NexusFlow menerima transfer QRIS dan Virtual Account dari semua bank. Uang langsung masuk rekening Anda tanpa potongan omset.',
      keyPoints: ['QRIS Dinamis semua bank & e-wallet', 'Deteksi mutasi 2.1 detik', 'Struk & akses produk terkirim otomatis'],
      visualType: 'cashier_qris',
    },
    {
      id: 5,
      title: 'Dashboard Klien & Tracking Progres',
      badge: 'Portal Pemantauan Terpadu',
      durationSeconds: 180,
      subtitle: 'Pantau status pengerjaan tugas secara live, unduh file, dan tinjau omset harian.',
      narrationScript: 'Melalui dashboard klien yang intuitif, Anda dapat memantau progres tugas karyawan AI secara real-time, mengunduh aset promosi, dan melihat grafik penjualan.',
      keyPoints: ['Progress pengerjaan live', 'Unduh deliverable seketika', 'Laporan transaksi real-time'],
      visualType: 'client_portal',
    },
    {
      id: 6,
      title: 'Miliki Sekarang: 99 Ribu Saja Perbulan',
      badge: 'Akses Instan & Garansi Resmi',
      durationSeconds: 225,
      subtitle: 'Paket langganan resmi PT. CAHAYA ARSYA GEMILANG tanpa biaya tersembunyi.',
      narrationScript: 'Miliki seluruh ekosistem ini sekarang juga. Hanya 99 ribu saja perbulan, didukung penuh oleh PT. CAHAYA ARSYA GEMILANG. Mulai perjalanan bisnis digital Anda hari ini.',
      keyPoints: ['Harga terjangkau Rp 99.000 / bln', 'Garansi kepuasan & support penuh', 'Akses langsung detik ini juga'],
      visualType: 'pricing_offer',
    },
  ];

  readonly currentChapter = computed<VideoChapter>(() => {
    const sec = this.currentSeconds();
    for (let i = this.chapters.length - 1; i >= 0; i--) {
      if (sec >= this.chapters[i].durationSeconds) {
        return this.chapters[i];
      }
    }
    return this.chapters[0];
  });

  readonly progressPercent = computed<number>(() => {
    return Math.min(100, Math.round((this.currentSeconds() / this.totalSeconds) * 100));
  });

  readonly playbackTimeFormatted = computed<string>(() => {
    return this.formatTime(this.currentSeconds());
  });

  formatTime(totalSec: number): string {
    const m = Math.floor(totalSec / 60);
    const s = Math.floor(totalSec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  togglePlay() {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying.set(true);
    this.startPlaybackTimer();
    this.speakCurrentNarration();
  }

  pause() {
    this.isPlaying.set(false);
    this.stopPlaybackTimer();
    this.stopSpeech();
  }

  private startPlaybackTimer() {
    this.stopPlaybackTimer();
    if (!isPlatformBrowser(this.platformId)) return;

    const intervalTime = Math.max(250, 1000 / this.playbackSpeed());
    this.playbackInterval = setInterval(() => {
      const nextSec = this.currentSeconds() + 1;
      if (nextSec >= this.totalSeconds) {
        this.currentSeconds.set(this.totalSeconds);
        this.pause();
      } else {
        const prevChap = this.currentChapter();
        this.currentSeconds.set(nextSec);
        const newChap = this.currentChapter();
        if (prevChap.id !== newChap.id) {
          this.speakCurrentNarration();
        }
      }
    }, intervalTime);
  }

  private stopPlaybackTimer() {
    if (this.playbackInterval) {
      clearInterval(this.playbackInterval);
      this.playbackInterval = null;
    }
  }

  jumpToChapter(chap: VideoChapter) {
    this.currentSeconds.set(chap.durationSeconds);
    if (!this.isPlaying()) {
      this.play();
    } else {
      this.startPlaybackTimer();
      this.speakCurrentNarration();
    }
  }

  replayVideo() {
    this.jumpToChapter(this.chapters[0]);
  }

  seekRelative(deltaSeconds: number) {
    const updated = Math.max(0, Math.min(this.totalSeconds, this.currentSeconds() + deltaSeconds));
    this.currentSeconds.set(updated);
    if (this.isPlaying()) {
      this.startPlaybackTimer();
      this.speakCurrentNarration();
    }
  }

  onTimelineClick(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSec = Math.round(ratio * this.totalSeconds);
    this.currentSeconds.set(targetSec);
    if (this.isPlaying()) {
      this.startPlaybackTimer();
      this.speakCurrentNarration();
    }
  }

  cycleSpeed() {
    const speeds = [1, 1.25, 1.5, 2];
    const current = this.playbackSpeed();
    const nextIdx = (speeds.indexOf(current) + 1) % speeds.length;
    this.playbackSpeed.set(speeds[nextIdx]);
    if (this.isPlaying()) {
      this.startPlaybackTimer();
    }
  }

  onVolumeChange(event: Event) {
    const val = Number((event.target as HTMLInputElement).value);
    this.volume.set(val);
  }

  toggleMute() {
    if (this.volume() > 0) {
      this.previousVolume = this.volume();
      this.volume.set(0);
      this.stopSpeech();
    } else {
      this.volume.set(this.previousVolume || 80);
      if (this.isPlaying()) {
        this.speakCurrentNarration();
      }
    }
  }

  toggleVoiceNarration() {
    const next = !this.voiceEnabled();
    this.voiceEnabled.set(next);
    if (!next) {
      this.stopSpeech();
    } else if (this.isPlaying()) {
      this.speakCurrentNarration();
    }
  }

  private speakCurrentNarration() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.voiceEnabled() || this.volume() === 0) return;

    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const script = this.currentChapter().narrationScript;
        const utterance = new SpeechSynthesisUtterance(script);
        utterance.lang = 'id-ID';
        utterance.rate = this.playbackSpeed();
        utterance.volume = this.volume() / 100;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Graceful fallback if speech synthesis is restricted in preview sandbox
    }
  }

  private stopSpeech() {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // Graceful fallback
    }
  }

  openInteractiveDemo() {
    this.platformService.setView('demo');
  }

  openDirectCheckout() {
    this.platformService.setView('checkout');
  }

  toggleFullscreen() {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err: unknown) => {
          console.debug('Fullscreen requested failed or was dismissed', err);
        });
      } else {
        document.exitFullscreen().catch((err: unknown) => {
          console.debug('Exit fullscreen failed or was dismissed', err);
        });
      }
    } catch {
      // Graceful fallback
    }
  }

  ngOnDestroy(): void {
    this.stopPlaybackTimer();
    this.stopSpeech();
  }
}
