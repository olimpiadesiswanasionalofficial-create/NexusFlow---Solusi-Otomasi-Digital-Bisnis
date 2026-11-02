import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  calculateProjectEstimate,
  formatRupiah,
  PricingOptions,
} from '../../services/project-calculator';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-estimator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <section id="kalkulator" class="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Kalkulator Proyek Mandiri</span>
            <span aria-hidden="true">·</span>
            <span>Transparan Tanpa Biaya Tersembunyi</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Hitung Estimasi Biaya & Waktu Pengerjaan
          </h2>

          <p class="text-base text-zinc-400 leading-relaxed">
            Sesuaikan kebutuhan fitur bisnis Anda. Dapatkan perkiraan biaya resmi dari 
            <strong class="text-zinc-200">PT. CAHAYA ARSYA GEMILANG</strong> seketika tanpa perlu menunggu proposal berhari-hari.
          </p>
        </div>

        <!-- Estimator Interactive Form & Summary Card -->
        <div class="mt-12 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left: Selection Form -->
          <div class="lg:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm space-y-6">
            <form [formGroup]="form" class="space-y-6">
              
              <!-- 1. Tipe Paket Dasar -->
              <div>
                <div class="block text-sm font-semibold text-white mb-2">
                  1. Pilih Model Langganan Karyawan AI
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label class="cursor-pointer relative flex flex-col p-3.5 rounded-xl border transition-all"
                    [class.border-emerald-500]="form.get('packageType')?.value === 'starter'"
                    [class.bg-emerald-500/10]="form.get('packageType')?.value === 'starter'"
                    [class.border-zinc-800]="form.get('packageType')?.value !== 'starter'"
                    [class.bg-zinc-950]="form.get('packageType')?.value !== 'starter'"
                  >
                    <input type="radio" formControlName="packageType" value="starter" class="sr-only">
                    <span class="text-xs font-bold text-white">Langganan Bulanan</span>
                    <span class="text-[11px] text-zinc-400 mt-1">5 Karyawan AI + QRIS Otomatis</span>
                    <span class="text-xs text-emerald-400 font-semibold mt-2">Rp 99.000 / bln</span>
                  </label>

                  <label class="cursor-pointer relative flex flex-col p-3.5 rounded-xl border transition-all"
                    [class.border-emerald-500]="form.get('packageType')?.value === 'growth'"
                    [class.bg-emerald-500/10]="form.get('packageType')?.value === 'growth'"
                    [class.border-zinc-800]="form.get('packageType')?.value !== 'growth'"
                    [class.bg-zinc-950]="form.get('packageType')?.value !== 'growth'"
                  >
                    <input type="radio" formControlName="packageType" value="growth" class="sr-only">
                    <span class="text-xs font-bold text-white">Paket Kuartal (3 Bln)</span>
                    <span class="text-[11px] text-zinc-400 mt-1">Hemat Rp 48rb + Server Prioritas</span>
                    <span class="text-xs text-emerald-400 font-semibold mt-2">Rp 249.000</span>
                  </label>

                  <label class="cursor-pointer relative flex flex-col p-3.5 rounded-xl border transition-all"
                    [class.border-emerald-500]="form.get('packageType')?.value === 'enterprise'"
                    [class.bg-emerald-500/10]="form.get('packageType')?.value === 'enterprise'"
                    [class.border-zinc-800]="form.get('packageType')?.value !== 'enterprise'"
                    [class.bg-zinc-950]="form.get('packageType')?.value !== 'enterprise'"
                  >
                    <input type="radio" formControlName="packageType" value="enterprise" class="sr-only">
                    <span class="text-xs font-bold text-white">Tahunan VIP (1 Tahun)</span>
                    <span class="text-[11px] text-zinc-400 mt-1">Hanya ~74rb/bln + Setup Domain</span>
                    <span class="text-xs text-emerald-400 font-semibold mt-2">Rp 890.000 / thn</span>
                  </label>
                </div>
              </div>

              <!-- 2. Kecepatan Pengerjaan -->
              <div>
                <div class="block text-sm font-semibold text-white mb-2">
                  2. Kecepatan Pengerjaan Proyek
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <label class="cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between"
                    [class.border-emerald-500]="form.get('deliverySpeed')?.value === 'normal'"
                    [class.bg-emerald-500/10]="form.get('deliverySpeed')?.value === 'normal'"
                    [class.border-zinc-800]="form.get('deliverySpeed')?.value !== 'normal'"
                    [class.bg-zinc-950]="form.get('deliverySpeed')?.value !== 'normal'"
                  >
                    <input type="radio" formControlName="deliverySpeed" value="normal" class="sr-only">
                    <div class="flex items-center gap-2">
                      <mat-icon class="text-sm text-zinc-400">calendar_today</mat-icon>
                      <span class="text-xs font-medium text-white">Standar Normal</span>
                    </div>
                    <span class="text-[11px] text-zinc-400">Standar Aktif</span>
                  </label>

                  <label class="cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between"
                    [class.border-emerald-500]="form.get('deliverySpeed')?.value === 'express'"
                    [class.bg-emerald-500/10]="form.get('deliverySpeed')?.value === 'express'"
                    [class.border-zinc-800]="form.get('deliverySpeed')?.value !== 'express'"
                    [class.bg-zinc-950]="form.get('deliverySpeed')?.value !== 'express'"
                  >
                    <input type="radio" formControlName="deliverySpeed" value="express" class="sr-only">
                    <div class="flex items-center gap-2">
                      <mat-icon class="text-sm text-amber-400">bolt</mat-icon>
                      <span class="text-xs font-medium text-white">VIP Fast-Track</span>
                    </div>
                    <span class="text-[11px] text-amber-400 font-medium">Instan (+50rb)</span>
                  </label>
                </div>
              </div>

              <!-- 3. Addon Checkboxes -->
              <div class="space-y-3">
                <div class="block text-sm font-semibold text-white">
                  3. Fitur Tambahan & Otomasi
                </div>

                <!-- Checkbox 1: Payment Gateway -->
                <label class="flex items-start gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950 cursor-pointer hover:border-zinc-700 transition-colors">
                  <input type="checkbox" formControlName="includePaymentGateway" class="mt-0.5 rounded text-emerald-500 focus:ring-emerald-400">
                  <div class="text-xs">
                    <span class="font-semibold text-white block">Mesin Pembayaran Otomatis (QRIS & VA Bank)</span>
                    <span class="text-zinc-400 block mt-0.5">Konfirmasi pembayaran instan tanpa perlu cek mutasi manual tengah malam (Sudah termasuk gratis di paket Pro & Enterprise).</span>
                  </div>
                </label>

                <!-- Checkbox 2: AI Automations -->
                <label class="flex items-start gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950 cursor-pointer hover:border-zinc-700 transition-colors">
                  <input type="checkbox" formControlName="includeAiAutomations" class="mt-0.5 rounded text-emerald-500 focus:ring-emerald-400">
                  <div class="text-xs">
                    <span class="font-semibold text-white block">Paket 5 Modul AI Marketing Terintegrasi</span>
                    <span class="text-zinc-400 block mt-0.5">Riset pasar otomatis, copywriting naskah penjualan, desain banner promo, dan video iklan UGC 9:16.</span>
                  </div>
                </label>
              </div>

              <!-- 4. Maintenance / Garansi -->
              <div>
                <label for="est-maint-select" class="block text-sm font-semibold text-white mb-2">
                  4. Tambahan Pendampingan & Maintenance Rutin
                </label>
                <select id="est-maint-select" formControlName="maintenanceMonths" class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500">
                  <option [value]="0">Garansi Standar (1 Bulan Gratis Termasuk)</option>
                  <option [value]="3">Tambahan 3 Bulan Maintenance (+Rp 1.350.000)</option>
                  <option [value]="6">Tambahan 6 Bulan Maintenance (+Rp 2.700.000)</option>
                  <option [value]="12">Tambahan 1 Tahun Prioritas VIP (+Rp 5.400.000)</option>
                </select>
              </div>

            </form>
          </div>

          <!-- Right: Live Calculation Quote Card -->
          <div class="lg:col-span-5 rounded-2xl border border-emerald-500/30 bg-zinc-900/90 p-6 sm:p-8 space-y-6 shadow-xl shadow-emerald-500/5 sticky top-24">
            
            <div class="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span class="text-xs font-mono text-emerald-400 tracking-wider uppercase font-semibold">Estimasi Real-Time</span>
                <h3 class="text-lg font-bold text-white mt-0.5">Rincian Investasi Proyek</h3>
              </div>
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <mat-icon>calculate</mat-icon>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-3 text-xs">
              <div class="flex items-center justify-between text-zinc-300">
                <span>Harga Paket Dasar</span>
                <span class="font-mono font-medium text-white">{{ formatIdr(estimate().basePrice) }}</span>
              </div>

              @if (estimate().addonsPrice > 0) {
                <div class="flex items-center justify-between text-zinc-300">
                  <span>Fitur Tambahan & Akselerasi</span>
                  <span class="font-mono font-medium text-white">+{{ formatIdr(estimate().addonsPrice) }}</span>
                </div>
              }

              @if (estimate().discount > 0) {
                <div class="flex items-center justify-between text-emerald-400">
                  <span>Diskon Promo NexusFlow (10%)</span>
                  <span class="font-mono font-medium">-{{ formatIdr(estimate().discount) }}</span>
                </div>
              }

              <div class="flex items-center justify-between text-zinc-400">
                <span>Biaya Transaksi Otomatis (0.7%)</span>
                <span class="font-mono">{{ formatIdr(estimate().gatewayFee) }}</span>
              </div>

              <div class="pt-4 border-t border-zinc-800 flex items-baseline justify-between">
                <div>
                  <span class="text-xs text-zinc-400 block">Total Investasi Bersih:</span>
                  <span class="text-2xl font-extrabold text-white font-mono">{{ formatIdr(estimate().totalPrice) }}</span>
                </div>
                <div class="text-right">
                  <span class="text-[11px] text-zinc-400 block">Waktu Selesai:</span>
                  <span class="text-xs font-bold text-emerald-400">~{{ estimate().estimatedDays }} Hari Kerja</span>
                </div>
              </div>
            </div>

            <!-- Guarantee Note in simple language -->
            <div class="rounded-xl border border-zinc-800 bg-zinc-950 p-3.5 text-[11px] text-zinc-400 space-y-1">
              <div class="flex items-center gap-1.5 text-zinc-200 font-semibold">
                <mat-icon class="text-xs text-emerald-400">shield</mat-icon>
                <span>Garansi Resmi PT. CAHAYA ARSYA GEMILANG</span>
              </div>
              <p>
                Proyek langsung dialokasikan ke Lead Engineer detik ini juga setelah pembayaran otomatis terkonfirmasi.
              </p>
            </div>

            <!-- Direct Instant Order Button -->
            <button
              type="button"
              (click)="proceedWithEstimate()"
              class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 px-4 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <mat-icon class="text-sm">shopping_cart_checkout</mat-icon>
              <span>Bayar Otomatis Sesuai Estimasi Ini</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  `,
})
export class EstimatorComponent {
  private projectService = inject(ProjectService);

  readonly form = new FormGroup({
    packageType: new FormControl<'starter' | 'growth' | 'enterprise' | 'custom'>('growth', {
      nonNullable: true,
    }),
    includePaymentGateway: new FormControl<boolean>(true, { nonNullable: true }),
    includeAiAutomations: new FormControl<boolean>(false, { nonNullable: true }),
    pageCount: new FormControl<number>(1, { nonNullable: true }),
    deliverySpeed: new FormControl<'normal' | 'express'>('normal', { nonNullable: true }),
    maintenanceMonths: new FormControl<number>(0, { nonNullable: true }),
  });

  // Convert form value to signal
  private formValue = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });

  readonly estimate = computed(() => {
    const raw = this.formValue();
    const options: PricingOptions = {
      packageType: raw.packageType ?? 'growth',
      includePaymentGateway: raw.includePaymentGateway ?? true,
      includeAiAutomations: raw.includeAiAutomations ?? false,
      pageCount: raw.pageCount ?? 1,
      deliverySpeed: raw.deliverySpeed ?? 'normal',
      maintenanceMonths: Number(raw.maintenanceMonths ?? 0),
    };
    return calculateProjectEstimate(options);
  });

  formatIdr(val: number): string {
    return formatRupiah(val);
  }

  proceedWithEstimate() {
    const est = this.estimate();
    const currentPkg = this.form.get('packageType')?.value || 'growth';
    const pkgName =
      currentPkg === 'starter'
        ? 'Starter Launchpad (Kustom)'
        : currentPkg === 'growth'
        ? 'Pro Growth (Kustom)'
        : 'Enterprise Scale (Kustom)';

    this.projectService.initiateOrder({
      packageName: pkgName,
      price: est.subtotal,
      addons: 0,
    });
  }
}
