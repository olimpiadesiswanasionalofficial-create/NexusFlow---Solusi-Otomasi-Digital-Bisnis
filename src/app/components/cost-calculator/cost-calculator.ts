import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { formatRupiah } from '../../services/project-calculator';

@Component({
  selector: 'app-cost-calculator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <section class="py-20 bg-zinc-900/30 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- SECTION 7: REALITY OF DIGITAL BUSINESS COST -->
        <div>
          <div class="max-w-3xl mx-auto text-center space-y-4">
            <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span>Realita Biaya Operasional</span>
              <span aria-hidden="true">·</span>
              <span>Perbandingan Nyata di Pasar Indonesia</span>
            </div>

            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Berapa Biaya Sebenarnya Membangun Bisnis Digital?
            </h2>

            <p class="text-base text-zinc-400 leading-relaxed">
              Banyak pemula kaget saat mendapati biaya bulanan untuk membayar tim lepasan atau agensi profesional bisa menghabiskan belasan hingga puluhan juta rupiah.
            </p>
          </div>

          <!-- Cost Comparison Grid -->
          <div class="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
            
            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
              <span class="text-xs font-mono text-zinc-400 block font-semibold">01. DIGITAL AGENCY</span>
              <div class="text-xl font-bold text-rose-400 font-mono">Rp 20jt - 45jt+</div>
              <span class="text-[11px] text-zinc-500 block">per proyek / bulan</span>
              <p class="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800/80">
                Layanan lengkap tapi memakan biaya sangat besar dan proses approval birokratis berminggu-minggu.
              </p>
            </div>

            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
              <span class="text-xs font-mono text-zinc-400 block font-semibold">02. FREELANCER TERPISAH</span>
              <div class="text-xl font-bold text-amber-400 font-mono">Rp 12jt - 25jt</div>
              <span class="text-[11px] text-zinc-500 block">akumulasi 3-4 pekerja</span>
              <p class="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800/80">
                Desainer, programmer web, copywriter dicari terpisah. Rentan tidak sinkron dan rawan ghosting.
              </p>
            </div>

            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
              <span class="text-xs font-mono text-zinc-400 block font-semibold">03. TIM INTERNAL KANTOR</span>
              <div class="text-xl font-bold text-rose-500 font-mono">Rp 25jt - 50jt</div>
              <span class="text-[11px] text-zinc-500 block">beban gaji UMR per bulan</span>
              <p class="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800/80">
                Gaji bulanan tetap harus dibayar setiap bulan meski produk belum tentu langsung menghasilkan penjualan.
              </p>
            </div>

            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
              <span class="text-xs font-mono text-zinc-400 block font-semibold">04. KURSUS BIASA</span>
              <div class="text-xl font-bold text-zinc-300 font-mono">Rp 3jt - 8jt</div>
              <span class="text-[11px] text-zinc-500 block">hanya dapat video teori</span>
              <p class="text-xs text-zinc-400 leading-relaxed pt-2 border-t border-zinc-800/80">
                Hanya diajarkan materi teori rekaman tanpa sistem website, tanpa kasir otomatis, dan tanpa AI tools.
              </p>
            </div>

            <div class="rounded-2xl border border-emerald-500/50 bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 p-5 space-y-3 shadow-xl shadow-emerald-500/10">
              <span class="text-xs font-mono text-emerald-400 block font-bold">05. 5 KARYAWAN AI NEXUSFLOW</span>
              <div class="text-xl font-bold text-white font-mono">99 Ribu / Bulan</div>
              <span class="text-[11px] text-emerald-400 font-semibold block">Hemat lebih dari 98%</span>
              <p class="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-zinc-800/80">
                5 Karyawan AI pintar bekerja 24 jam nonstop: riset, copywriting, desain, video UGC, CS WhatsApp & pembayaran otomatis QRIS.
              </p>
            </div>

          </div>
        </div>

        <!-- SECTION 8: INTERACTIVE ROI COST CALCULATOR -->
        <div class="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 shadow-2xl">
          <div class="max-w-2xl mx-auto text-center space-y-3 mb-10">
            <span class="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">Kalkulator Interaktif</span>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
              Hitung Titik Impas (BEP) & Potensi Penghematan Anda
            </h3>
            <p class="text-xs text-zinc-400">
              Ubah angka di bawah ini sesuai estimasi biaya di kota Anda untuk melihat simulasi perbandingan penghematan nyata.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Controls Form -->
            <div class="lg:col-span-7 space-y-5">
              <form [formGroup]="calcForm" class="space-y-4">
                
                <div>
                  <div class="flex justify-between text-xs text-zinc-300 mb-1">
                    <label for="freelancerRate">Gaji / Fee Freelancer per Orang per Bulan:</label>
                    <span class="font-mono text-emerald-400 font-bold">{{ formatIdr(formSignal().freelancerRate ?? 3500000) }}</span>
                  </div>
                  <input 
                    id="freelancerRate"
                    type="range" 
                    min="1500000" 
                    max="10000000" 
                    step="250000" 
                    formControlName="freelancerRate"
                    class="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  >
                </div>

                <div>
                  <div class="flex justify-between text-xs text-zinc-300 mb-1">
                    <label for="workerCount">Jumlah Tenaga Kerja (Desain, Web, Copywriter, dll):</label>
                    <span class="font-mono text-emerald-400 font-bold">{{ formSignal().workerCount ?? 3 }} Orang</span>
                  </div>
                  <input 
                    id="workerCount"
                    type="range" 
                    min="1" 
                    max="8" 
                    step="1" 
                    formControlName="workerCount"
                    class="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  >
                </div>

                <div>
                  <div class="flex justify-between text-xs text-zinc-300 mb-1">
                    <label for="durationMonths">Durasi Pengerjaan / Kontrak Awal:</label>
                    <span class="font-mono text-emerald-400 font-bold">{{ formSignal().durationMonths ?? 2 }} Bulan</span>
                  </div>
                  <input 
                    id="durationMonths"
                    type="range" 
                    min="1" 
                    max="12" 
                    step="1" 
                    formControlName="durationMonths"
                    class="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  >
                </div>

                <div>
                  <div class="flex justify-between text-xs text-zinc-300 mb-1">
                    <label for="toolsCost">Estimasi Biaya Langganan Tools & Software per Bulan:</label>
                    <span class="font-mono text-emerald-400 font-bold">{{ formatIdr(formSignal().toolsCost ?? 750000) }}</span>
                  </div>
                  <input 
                    id="toolsCost"
                    type="range" 
                    min="200000" 
                    max="5000000" 
                    step="100000" 
                    formControlName="toolsCost"
                    class="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  >
                </div>

                <div>
                  <div class="flex justify-between text-xs text-zinc-300 mb-1">
                    <label for="productPrice">Rencana Harga Jual Produk Digital Anda:</label>
                    <span class="font-mono text-emerald-400 font-bold">{{ formatIdr(formSignal().productPrice ?? 199000) }}</span>
                  </div>
                  <input 
                    id="productPrice"
                    type="range" 
                    min="50000" 
                    max="1500000" 
                    step="10000" 
                    formControlName="productPrice"
                    class="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  >
                </div>

              </form>
            </div>

            <!-- Output Analytics Card -->
            <div class="lg:col-span-5 rounded-2xl border border-emerald-500/30 bg-zinc-900/90 p-6 sm:p-7 space-y-5 shadow-xl">
              <span class="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                HASIL ANALISIS SIMULASI BIAYA
              </span>

              <div class="space-y-3 text-xs">
                <div class="flex items-center justify-between text-zinc-300">
                  <span>Total Biaya Metode Konvensional:</span>
                  <span class="font-bold text-rose-400 font-mono text-sm">
                    {{ formatIdr(results().conventionalTotal) }}
                  </span>
                </div>

                <div class="flex items-center justify-between text-zinc-300">
                  <span>Langganan Karyawan AI ({{ formSignal().durationMonths ?? 2 }} Bulan):</span>
                  <span class="font-bold text-emerald-400 font-mono text-sm">
                    {{ formatIdr(results().nexusFlowCost) }} ({{ formatIdr(99000) }}/bln)
                  </span>
                </div>

                <div class="pt-3 border-t border-zinc-800 flex items-baseline justify-between">
                  <span class="text-xs text-zinc-400">Potensi Penghematan Bersih:</span>
                  <span class="text-xl font-extrabold text-emerald-400 font-mono">
                    {{ formatIdr(results().potentialSavings) }}
                  </span>
                </div>

                <div class="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
                  <span class="text-xs text-zinc-400 block">Titik Impas Balik Modal (BEP):</span>
                  <div class="text-2xl font-extrabold text-white font-mono">
                    Hanya butuh {{ results().breakEvenSales }} Penjualan Saja!
                  </div>
                  <span class="text-[11px] text-zinc-400 block">
                    Dengan produk seharga {{ formatIdr(formSignal().productPrice ?? 199000) }}, hanya 1 kali transaksi sudah langsung menutup biaya langganan 99 ribu/bulan dan menghasilkan profit bersih!
                  </span>
                </div>
              </div>

              <p class="text-[10px] text-zinc-400 text-center italic">
                *Catatan: Hasil di atas adalah simulasi penghematan nyata menggantikan beban gaji staf kantor dengan 5 Karyawan AI.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
})
export class CostCalculatorComponent {
  readonly calcForm = new FormGroup({
    freelancerRate: new FormControl<number>(3500000, { nonNullable: true }),
    workerCount: new FormControl<number>(3, { nonNullable: true }),
    durationMonths: new FormControl<number>(2, { nonNullable: true }),
    toolsCost: new FormControl<number>(750000, { nonNullable: true }),
    productPrice: new FormControl<number>(199000, { nonNullable: true }),
  });

  readonly formSignal = toSignal(this.calcForm.valueChanges, { initialValue: this.calcForm.getRawValue() });

  readonly results = computed(() => {
    const raw = this.formSignal();
    const rate = raw.freelancerRate ?? 3500000;
    const workers = raw.workerCount ?? 3;
    const duration = raw.durationMonths ?? 2;
    const tools = raw.toolsCost ?? 750000;
    const price = raw.productPrice ?? 199000;

    const conventionalTotal = (rate * workers * duration) + (tools * duration);
    const nexusFlowCost = 99000 * duration;
    const potentialSavings = Math.max(0, conventionalTotal - nexusFlowCost);
    const breakEvenSales = Math.max(1, Math.ceil(99000 / Math.max(1, price)));

    return {
      conventionalTotal,
      nexusFlowCost,
      potentialSavings,
      breakEvenSales,
    };
  });

  formatIdr(val: number): string {
    return formatRupiah(val);
  }
}
