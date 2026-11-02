import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="kuis-rencana-bisnis" class="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div class="text-center space-y-4 mb-10">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Kuis Interaktif Gratis</span>
            <span aria-hidden="true">·</span>
            <span>Business Plan Generator</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Temukan Model Bisnis Digital yang Paling Cocok untuk Anda
          </h2>

          <p class="text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Jawab 6 pertanyaan singkat untuk mendapatkan rekomendasi ide produk, estimasi modal, dan roadmap kerja pribadi Anda tanpa perlu memasukkan email.
          </p>
        </div>

        @let q = platformService.quiz();

        <div class="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10 shadow-2xl space-y-8">
          
          <!-- Step Indicator (Progress Bar) -->
          <div class="space-y-2">
            <div class="flex justify-between text-xs font-mono">
              <span class="text-zinc-400">
                {{ q.currentStep <= 6 ? 'Pertanyaan ' + q.currentStep + ' dari 6' : 'Hasil Rekomendasi Rencana Bisnis Anda' }}
              </span>
              <span class="text-emerald-400 font-bold">
                {{ q.currentStep <= 6 ? Math.round((q.currentStep / 6) * 100) + '%' : '100% Selesai' }}
              </span>
            </div>
            <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div 
                class="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-300"
                [style.width.%]="q.currentStep <= 6 ? (q.currentStep / 6) * 100 : 100"
              ></div>
            </div>
          </div>

          <!-- QUESTION 1: Current Job -->
          @if (q.currentStep === 1) {
            <div class="space-y-4">
              <h3 class="text-lg font-bold text-white">1. Apa aktivitas atau pekerjaan Anda saat ini?</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                @for (opt of jobOptions; track opt) {
                  <button
                    type="button"
                    (click)="selectAnswer('currentJob', opt)"
                    class="p-4 rounded-xl border text-left text-xs font-medium transition-all"
                    [class.border-emerald-500]="q.answers.currentJob === opt"
                    [class.bg-emerald-500/10]="q.answers.currentJob === opt"
                    [class.text-white]="q.answers.currentJob === opt"
                    [class.border-zinc-800]="q.answers.currentJob !== opt"
                    [class.bg-zinc-950]="q.answers.currentJob !== opt"
                    [class.text-zinc-300]="q.answers.currentJob !== opt"
                  >
                    {{ opt }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- QUESTION 2: Digital Experience -->
          @if (q.currentStep === 2) {
            <div class="space-y-4">
              <h3 class="text-lg font-bold text-white">2. Seberapa jauh pengalaman Anda dalam bisnis online / digital?</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                @for (opt of expOptions; track opt) {
                  <button
                    type="button"
                    (click)="selectAnswer('digitalExp', opt)"
                    class="p-4 rounded-xl border text-left text-xs font-medium transition-all"
                    [class.border-emerald-500]="q.answers.digitalExp === opt"
                    [class.bg-emerald-500/10]="q.answers.digitalExp === opt"
                    [class.text-white]="q.answers.digitalExp === opt"
                    [class.border-zinc-800]="q.answers.digitalExp !== opt"
                    [class.bg-zinc-950]="q.answers.digitalExp !== opt"
                    [class.text-zinc-300]="q.answers.digitalExp !== opt"
                  >
                    {{ opt }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- QUESTION 3: Budget Available -->
          @if (q.currentStep === 3) {
            <div class="space-y-4">
              <h3 class="text-lg font-bold text-white">3. Berapa estimasi modal awal yang Anda alokasikan untuk sistem & promosi?</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                @for (opt of budgetOptions; track opt) {
                  <button
                    type="button"
                    (click)="selectAnswer('budget', opt)"
                    class="p-4 rounded-xl border text-left text-xs font-medium transition-all"
                    [class.border-emerald-500]="q.answers.budget === opt"
                    [class.bg-emerald-500/10]="q.answers.budget === opt"
                    [class.text-white]="q.answers.budget === opt"
                    [class.border-zinc-800]="q.answers.budget !== opt"
                    [class.bg-zinc-950]="q.answers.budget !== opt"
                    [class.text-zinc-300]="q.answers.budget !== opt"
                  >
                    {{ opt }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- QUESTION 4: Target Product -->
          @if (q.currentStep === 4) {
            <div class="space-y-4">
              <h3 class="text-lg font-bold text-white">4. Jenis produk apa yang paling menarik bagi Anda?</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                @for (opt of productOptions; track opt) {
                  <button
                    type="button"
                    (click)="selectAnswer('targetProduct', opt)"
                    class="p-4 rounded-xl border text-left text-xs font-medium transition-all"
                    [class.border-emerald-500]="q.answers.targetProduct === opt"
                    [class.bg-emerald-500/10]="q.answers.targetProduct === opt"
                    [class.text-white]="q.answers.targetProduct === opt"
                    [class.border-zinc-800]="q.answers.targetProduct !== opt"
                    [class.bg-zinc-950]="q.answers.targetProduct !== opt"
                    [class.text-zinc-300]="q.answers.targetProduct !== opt"
                  >
                    {{ opt }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- QUESTION 5: Daily Hours Available -->
          @if (q.currentStep === 5) {
            <div class="space-y-4">
              <h3 class="text-lg font-bold text-white">5. Berapa banyak waktu luang per hari yang bisa Anda dedikasikan?</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                @for (opt of hourOptions; track opt) {
                  <button
                    type="button"
                    (click)="selectAnswer('dailyHours', opt)"
                    class="p-4 rounded-xl border text-left text-xs font-medium transition-all"
                    [class.border-emerald-500]="q.answers.dailyHours === opt"
                    [class.bg-emerald-500/10]="q.answers.dailyHours === opt"
                    [class.text-white]="q.answers.dailyHours === opt"
                    [class.border-zinc-800]="q.answers.dailyHours !== opt"
                    [class.bg-zinc-950]="q.answers.dailyHours !== opt"
                    [class.text-zinc-300]="q.answers.dailyHours !== opt"
                  >
                    {{ opt }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- QUESTION 6: Main Goal -->
          @if (q.currentStep === 6) {
            <div class="space-y-4">
              <h3 class="text-lg font-bold text-white">6. Apa tujuan utama yang ingin Anda capai dalam 3 bulan ke depan?</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                @for (opt of goalOptions; track opt) {
                  <button
                    type="button"
                    (click)="selectAnswer('mainGoal', opt)"
                    class="p-4 rounded-xl border text-left text-xs font-medium transition-all"
                    [class.border-emerald-500]="q.answers.mainGoal === opt"
                    [class.bg-emerald-500/10]="q.answers.mainGoal === opt"
                    [class.text-white]="q.answers.mainGoal === opt"
                    [class.border-zinc-800]="q.answers.mainGoal !== opt"
                    [class.bg-zinc-950]="q.answers.mainGoal !== opt"
                    [class.text-zinc-300]="q.answers.mainGoal !== opt"
                  >
                    {{ opt }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- RESULT VIEW (Step 7) -->
          @if (q.currentStep === 7 && q.result) {
            <div class="space-y-6">
              <div class="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-2">
                <mat-icon class="text-3xl text-emerald-400">verified</mat-icon>
                <span class="text-xs font-mono text-emerald-300 uppercase tracking-wider block font-semibold">
                  HASIL REKOMENDASI RENCANA BISNIS PRIBADI
                </span>
                <h3 class="text-xl font-bold text-white">{{ q.result.businessIdea }}</h3>
                <span class="text-xs text-zinc-300 block">{{ q.result.userProfile }}</span>
              </div>

              <!-- Recommendation Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Priority Tasks -->
                <div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
                  <h4 class="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <mat-icon class="text-emerald-400 text-sm">priority_high</mat-icon>
                    <span>Langkah Prioritas Pertama Anda:</span>
                  </h4>
                  <ul class="space-y-2 text-xs text-zinc-300">
                    @for (task of q.result.priorityTasks; track task) {
                      <li class="flex items-start gap-2">
                        <mat-icon class="text-emerald-400 text-xs mt-0.5 shrink-0">check</mat-icon>
                        <span>{{ task }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- 4-Phase Roadmap -->
                <div class="rounded-xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
                  <h4 class="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <mat-icon class="text-cyan-400 text-sm">timeline</mat-icon>
                    <span>Roadmap Aksi 30 Hari:</span>
                  </h4>
                  <ul class="space-y-2 text-xs text-zinc-300">
                    @for (rm of q.result.actionRoadmap; track rm) {
                      <li class="flex items-start gap-2">
                        <mat-icon class="text-cyan-400 text-xs mt-0.5 shrink-0">arrow_right</mat-icon>
                        <span>{{ rm }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>

              <!-- Action buttons -->
              <div class="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-800">
                <button
                  type="button"
                  (click)="platformService.resetQuiz()"
                  class="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white"
                >
                  <mat-icon class="text-xs">replay</mat-icon>
                  <span>Ulangi Kuis dari Awal</span>
                </button>

                <button
                  type="button"
                  (click)="goToCheckout()"
                  class="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-md active:scale-95"
                >
                  <mat-icon class="text-sm">shopping_cart_checkout</mat-icon>
                  <span>Bangun Sistem Sesuai Rencana Ini</span>
                </button>
              </div>
            </div>
          }

          <!-- Back / Next Buttons (for steps 1-6) -->
          @if (q.currentStep <= 6) {
            <div class="flex items-center justify-between pt-4 border-t border-zinc-800">
              <button
                type="button"
                (click)="platformService.prevQuizStep()"
                [disabled]="q.currentStep === 1"
                class="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-950 text-xs font-semibold text-zinc-300 hover:text-white disabled:opacity-30 transition-colors"
              >
                <mat-icon class="text-xs">arrow_back</mat-icon>
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                (click)="platformService.nextQuizStep()"
                class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-sm"
              >
                <span>{{ q.currentStep === 6 ? 'Lihat Hasil Rencana Bisnis' : 'Selanjutnya' }}</span>
                <mat-icon class="text-xs">arrow_forward</mat-icon>
              </button>
            </div>
          }

        </div>

      </div>
    </section>
  `,
})
export class QuizComponent {
  platformService = inject(PlatformService);
  readonly Math = Math;

  readonly jobOptions = [
    'Pekerja Kantoran / Karyawan Swasta',
    'Pemilik Usaha UMKM / Toko Fisik',
    'Ibu Rumah Tangga / Pengusaha Rumahan',
    'Freelancer / Desainer / Programmer',
    'Content Creator / Affiliate Marketer',
    'Mahasiswa / Fresh Graduate',
  ];

  readonly expOptions = [
    'Pemula Total (Belum pernah jualan digital)',
    'Pernah mencoba jualan di Marketplace / TikTok Shop',
    'Sudah punya produk tapi bingung bikin sistem pembayaran otomatis',
    'Sudah berpengalaman dan ingin scaling tanpa repot kelola tim',
  ];

  readonly budgetOptions = [
    'Di bawah Rp 3 Juta (Cari paket paling efisien)',
    'Rp 3 - 7 Juta (Siap sistem lengkap + payment gateway)',
    'Di atas Rp 10 Juta (Butuh sistem skala enterprise & portal custom)',
  ];

  readonly productOptions = [
    'Mini Web-App / Tools Produktivitas Otomatis',
    'Template Naskah Iklan & Kumpulan Prompt AI',
    'Ebook & Panduan Digital Solusi Masalah Pasar',
    'Video Kelas / Portal Membership Berlangganan',
  ];

  readonly hourOptions = [
    '1 - 2 Jam per hari (Fokus sistem otomatis)',
    '3 - 4 Jam per hari (Cukup leluasa)',
    'Full-time (Siap gaspol membangun brand)',
  ];

  readonly goalOptions = [
    'Membangun penghasilan sampingan Rp 5-15 Juta/bulan',
    'Mengotomatiskan bisnis agar tidak perlu begadang cek transferan',
    'Membangun brand produk digital mandiri berskala nasional',
  ];

  selectAnswer(key: 'currentJob' | 'digitalExp' | 'budget' | 'targetProduct' | 'dailyHours' | 'mainGoal', val: string) {
    this.platformService.setQuizAnswer(key, val);
  }

  goToCheckout() {
    this.platformService.setView('checkout');
  }
}
