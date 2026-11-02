import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-comparison',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section class="py-20 bg-zinc-900/40 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Perbandingan Nyata</span>
            <span aria-hidden="true">·</span>
            <span>Efisiensi Bisnis</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Mengapa Pemilik Bisnis Beralih ke NexusFlow?
          </h2>

          <p class="text-base text-zinc-400 leading-relaxed">
            Lihat perbedaan signifikan antara cara lama mengelola website dan tim manual dibandingkan dengan ekosistem otomatis terpadu NexusFlow.
          </p>
        </div>

        <!-- Comparison Table / Cards -->
        <div class="mt-12 max-w-4xl mx-auto overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <div class="grid grid-cols-1 md:grid-cols-2">
            
            <!-- Left Side: Old Conventional Way -->
            <div class="p-6 sm:p-8 border-b md:border-b-0 md:border-r border-zinc-800 bg-zinc-950/60">
              <div class="flex items-center gap-2 text-rose-400 text-sm font-bold uppercase tracking-wider mb-4">
                <mat-icon class="text-base">cancel</mat-icon>
                <span>Cara Lama yang Melelahkan</span>
              </div>
              <p class="text-xs text-zinc-400 mb-6">
                Merekrut tim sendiri atau menyewa freelancer lepasan secara terpisah-pisah.
              </p>

              <ul class="space-y-4 text-sm text-zinc-300">
                <li class="flex items-start gap-3">
                  <mat-icon class="text-rose-400 text-base mt-0.5 shrink-0">close</mat-icon>
                  <div>
                    <strong class="text-zinc-200 block">Biaya Gaji Sangat Tinggi</strong>
                    <span class="text-xs text-zinc-400">Gaji 5 orang (desainer, copywriter, web dev, admin kasir, ads) mencapai Rp 15jt - 25jt setiap bulan.</span>
                  </div>
                </li>

                <li class="flex items-start gap-3">
                  <mat-icon class="text-rose-400 text-base mt-0.5 shrink-0">close</mat-icon>
                  <div>
                    <strong class="text-zinc-200 block">Cek Pembayaran Manual</strong>
                    <span class="text-xs text-zinc-400">Harus begadang cek m-Banking, cocokkan bukti transfer via WhatsApp. Rentan bukti transfer palsu.</span>
                  </div>
                </li>

                <li class="flex items-start gap-3">
                  <mat-icon class="text-rose-400 text-base mt-0.5 shrink-0">close</mat-icon>
                  <div>
                    <strong class="text-zinc-200 block">Progres Tidak Jelas</strong>
                    <span class="text-xs text-zinc-400">Harus sering chat "Halo mas, web saya sudah sampai mana?". Waktu terbuang sia-sia.</span>
                  </div>
                </li>

                <li class="flex items-start gap-3">
                  <mat-icon class="text-rose-400 text-base mt-0.5 shrink-0">close</mat-icon>
                  <div>
                    <strong class="text-zinc-200 block">Legalitas Diragukan</strong>
                    <span class="text-xs text-zinc-400">Banyak penyedia jasa perorangan tanpa kontrak resmi, rawan ditinggal kabur di tengah jalan.</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Right Side: NexusFlow Modern Way -->
            <div class="p-6 sm:p-8 bg-zinc-900/50 relative">
              <div class="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-4">
                <mat-icon class="text-base">check_circle</mat-icon>
                <span>Solusi Modern NexusFlow</span>
              </div>
              <p class="text-xs text-zinc-400 mb-6">
                Ekosistem otomatis dari PT. CAHAYA ARSYA GEMILANG siap pakai.
              </p>

              <ul class="space-y-4 text-sm text-zinc-200">
                <li class="flex items-start gap-3">
                  <mat-icon class="text-emerald-400 text-base mt-0.5 shrink-0">done</mat-icon>
                  <div>
                    <strong class="text-white block">Hanya 99 Ribu Saja Perbulan (Hemat >98%)</strong>
                    <span class="text-xs text-zinc-300">Gantikan beban gaji puluhan juta rupiah dengan 5 Karyawan AI pintar yang bekerja 24 jam nonstop untuk bisnis Anda.</span>
                  </div>
                </li>

                <li class="flex items-start gap-3">
                  <mat-icon class="text-emerald-400 text-base mt-0.5 shrink-0">done</mat-icon>
                  <div>
                    <strong class="text-white block">Mesin Pembayaran Otomatis 24 Jam</strong>
                    <span class="text-xs text-zinc-300">QRIS & Virtual Account langsung verifikasi detik itu juga. Uang masuk rekening Anda seketika.</span>
                  </div>
                </li>

                <li class="flex items-start gap-3">
                  <mat-icon class="text-emerald-400 text-base mt-0.5 shrink-0">done</mat-icon>
                  <div>
                    <strong class="text-white block">Dashboard Progres Real-Time</strong>
                    <span class="text-xs text-zinc-300">Pantau tiap tahapan pengerjaan (Riset, Desain, Koding, QC) transparan lewat link khusus Anda.</span>
                  </div>
                </li>

                <li class="flex items-start gap-3">
                  <mat-icon class="text-emerald-400 text-base mt-0.5 shrink-0">done</mat-icon>
                  <div>
                    <strong class="text-white block">Legalitas Resmi PT & Faktur Pajak</strong>
                    <span class="text-xs text-zinc-300">Dikelola legal oleh PT. CAHAYA ARSYA GEMILANG dengan jaminan kontrak dan faktur resmi.</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
})
export class ComparisonComponent {}
