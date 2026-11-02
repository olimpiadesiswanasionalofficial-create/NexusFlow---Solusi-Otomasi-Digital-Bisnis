import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="beranda" class="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-zinc-800/60">
      <!-- Background subtle grid accent -->
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(255,255,255,0))]"></div>
      
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-4xl mx-auto space-y-6">
          
          <!-- Unboxed metadata header (Zero-Pill discipline) -->
          <div class="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-zinc-400">
            <span class="text-emerald-400 font-semibold tracking-wide">PT. CAHAYA ARSYA GEMILANG</span>
            <span aria-hidden="true" class="text-zinc-600">·</span>
            <span>Ekosistem Digital Otomatis</span>
            <span aria-hidden="true" class="text-zinc-600">·</span>
            <span>Garansi Terima Beres</span>
          </div>

          <!-- Main Headline in simple layman Indonesian -->
          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Miliki Karyawan AI Anda Sekarang
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-emerald-300 to-emerald-500">
              Hanya 99 Ribu Saja Perbulan
            </span>
          </h1>

          <!-- Subtitle / Value Proposition in clear language -->
          <p class="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Tinggalkan beban gaji puluhan juta rupiah. <strong class="text-white font-semibold">NexusFlow</strong> 
            (PT. CAHAYA ARSYA GEMILANG) menghadirkan <span class="text-emerald-400 font-medium">5 Karyawan AI pintar</span> 
            yang bekerja 24 jam nonstop untuk bisnis Anda: riset produk, naskah copywriting, desain visual, generator video, hingga 
            <span class="text-emerald-400 font-medium">kasir pembayaran otomatis (QRIS & Virtual Account)</span> 
            serta <span class="text-emerald-400 font-medium">dashboard progres real-time</span>.
          </p>

          <!-- Action Buttons -->
          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              (click)="openCheckout()"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <mat-icon class="text-base">smart_toy</mat-icon>
              <span>Miliki Karyawan AI (99 Ribu/Bulan)</span>
            </button>

            <button
              type="button"
              (click)="openPortalPreview()"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 transition-all focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <mat-icon class="text-base">monitoring</mat-icon>
              <span>Pantau Progres Klien (Live Demo)</span>
            </button>
          </div>

          <!-- Trust Badges with clean typography -->
          <div class="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400">
            <div class="flex items-center gap-1.5">
              <mat-icon class="text-sm text-emerald-400">verified</mat-icon>
              <span>Legalitas Resmi PT</span>
            </div>
            <div class="flex items-center gap-1.5">
              <mat-icon class="text-sm text-emerald-400">speed</mat-icon>
              <span>Uang Pembeli Langsung Masuk Rekening</span>
            </div>
            <div class="flex items-center gap-1.5">
              <mat-icon class="text-sm text-emerald-400">visibility</mat-icon>
              <span>Transparansi Progres 100% Real-Time</span>
            </div>
            <div class="flex items-center gap-1.5">
              <mat-icon class="text-sm text-emerald-400">lock</mat-icon>
              <span>Sertifikasi Enkripsi Bank-Grade</span>
            </div>
          </div>
        </div>

        <!-- Live Interactive Visual Showcase (Minimalist Glassmorphism Card) -->
        <div class="mt-14 max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
          <!-- Top bar with simulated status indicators -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-zinc-800 gap-3">
            <div class="flex items-center gap-3">
              <div class="flex gap-1.5">
                <div class="h-3 w-3 rounded-full bg-zinc-700"></div>
                <div class="h-3 w-3 rounded-full bg-zinc-700"></div>
                <div class="h-3 w-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span class="text-xs font-mono text-zinc-400">system-status.nexusflow.id</span>
            </div>
            <div class="flex items-center gap-3 text-xs text-zinc-400">
              <div class="flex items-center gap-1.5">
                <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-emerald-400 font-medium">Gateway Pembayaran Aktif</span>
              </div>
              <span aria-hidden="true" class="text-zinc-600">|</span>
              <span>Respon Rata-rata 1.1s</span>
            </div>
          </div>

          <!-- Content 3-column overview -->
          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <!-- Card 1: Automated Payment Event -->
            <div class="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-4 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span class="flex items-center gap-1 text-emerald-400 font-medium">
                    <mat-icon class="text-sm">qr_code_scanner</mat-icon>
                    Pembayaran Otomatis
                  </span>
                  <span class="text-[11px] text-zinc-500">Baru Saja</span>
                </div>
                <div class="text-xl font-bold text-white tracking-tight">Rp 2.990.000</div>
                <p class="text-xs text-zinc-400 mt-1">
                  Pembayaran QRIS dari Pembeli #8920 terverifikasi otomatis. Tidak perlu kirim bukti transfer manual via WhatsApp!
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
                <span class="text-emerald-400">Status: Dana Masuk Rekening</span>
                <span>Faktur Terbit Otomatis</span>
              </div>
            </div>

            <!-- Card 2: Real-time Project Tracker Preview -->
            <div class="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-4 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span class="flex items-center gap-1 text-cyan-400 font-medium">
                    <mat-icon class="text-sm">timeline</mat-icon>
                    Live Milestone Proyek
                  </span>
                  <span class="text-xs text-emerald-400 font-semibold">75% Selesai</span>
                </div>
                <div class="text-sm font-semibold text-white">Integrasi Payment & Testing</div>
                <p class="text-xs text-zinc-400 mt-1">
                  Klien dapat memantau tiap tahapan pengerjaan transparan 24 jam tanpa perlu mengejar-ngejar freelancer.
                </p>
                <!-- Mini Progress Bar -->
                <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mt-3">
                  <div class="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full w-3/4 transition-all"></div>
                </div>
              </div>
              <div class="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
                <span>Target: 07 November</span>
                <span class="text-zinc-300 font-medium">2 Revisi Terselesaikan</span>
              </div>
            </div>

            <!-- Card 3: AI Modules Efficiency -->
            <div class="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-4 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span class="flex items-center gap-1 text-indigo-400 font-medium">
                    <mat-icon class="text-sm">smart_toy</mat-icon>
                    5 Karyawan AI Terpadu
                  </span>
                  <span class="text-[11px] text-zinc-400">Hemat 85%</span>
                </div>
                <div class="text-sm font-semibold text-white">Riset, Naskah & Desain Iklan</div>
                <p class="text-xs text-zinc-400 mt-1">
                  Sistem menghasilkan naskah promosi, desain cover, dan video promosi UGC dalam 1 alur terkoordinasi.
                </p>
              </div>
              <div class="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
                <span class="text-zinc-300">Gaji Tim: Rp 0 / Bulan</span>
                <span class="text-emerald-400 font-medium">Efisiensi Maksimal</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
})
export class HeroComponent {
  private projectService = inject(ProjectService);

  openCheckout() {
    this.projectService.initiateOrder({
      packageName: 'Karyawan AI Bulanan (99 Ribu Saja Perbulan)',
      price: 99000,
    });
  }

  openPortalPreview() {
    this.projectService.showClientPortal();
  }
}
