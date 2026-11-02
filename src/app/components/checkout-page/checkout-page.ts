import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
import { PlatformService } from '../../services/platform.service';
import { formatRupiah } from '../../services/project-calculator';

@Component({
  selector: 'app-checkout-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
      
      <!-- Top Checkout Header -->
      <div class="max-w-4xl mx-auto flex items-center justify-between pb-8 border-b border-zinc-800">
        <button
          type="button"
          (click)="returnToLanding()"
          class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
        >
          <mat-icon class="text-xs">arrow_back</mat-icon>
          <span>Kembali ke Penjelasan Produk</span>
        </button>

        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950 font-bold text-xs">
            NF
          </div>
          <span class="text-sm font-bold text-white">NexusFlow Checkout</span>
        </div>

        <div class="text-[11px] font-mono text-zinc-400 hidden sm:block">
          PT. CAHAYA ARSYA GEMILANG
        </div>
      </div>

      <!-- Step Indicator (1: Isi Data, 2: Pembayaran, 3: Akses Diterima) -->
      <div class="max-w-4xl mx-auto my-8">
        <div class="grid grid-cols-3 gap-2 text-center text-xs">
          <div 
            class="p-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition-all"
            [class.border-emerald-500]="step() === 1"
            [class.bg-emerald-500/10]="step() === 1"
            [class.text-emerald-400]="step() === 1"
            [class.border-zinc-800]="step() !== 1"
            [class.text-zinc-500]="step() !== 1"
          >
            <span>1. Isi Data Diri</span>
          </div>

          <div 
            class="p-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition-all"
            [class.border-emerald-500]="step() === 2"
            [class.bg-emerald-500/10]="step() === 2"
            [class.text-emerald-400]="step() === 2"
            [class.border-zinc-800]="step() !== 2"
            [class.text-zinc-500]="step() !== 2"
          >
            <span>2. Pembayaran Otomatis</span>
          </div>

          <div 
            class="p-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition-all"
            [class.border-emerald-500]="step() === 3"
            [class.bg-emerald-500/10]="step() === 3"
            [class.text-emerald-400]="step() === 3"
            [class.border-zinc-800]="step() !== 3"
            [class.text-zinc-500]="step() !== 3"
          >
            <span>3. Akses Diterima</span>
          </div>
        </div>
      </div>

      <!-- MAIN CONTENT -->
      <div class="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left: Form Steps -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- STEP 1: CUSTOMER INFORMATION -->
          @if (step() === 1) {
            <div class="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-6">
              <div>
                <span class="text-[11px] font-mono text-emerald-400 uppercase font-semibold">LANGKAH 1 DARI 3</span>
                <h3 class="text-xl font-bold text-white mt-1">Informasi Pembeli & Akun Baru</h3>
                <p class="text-xs text-zinc-400 mt-1">
                  Data ini digunakan untuk menerbitkan faktur resmi PT. CAHAYA ARSYA GEMILANG dan mengaktifkan akun member Anda.
                </p>
              </div>

              <form [formGroup]="userForm" class="space-y-4">
                <div>
                  <label for="co-name" class="block text-xs font-semibold text-zinc-300 mb-1">Nama Lengkap:</label>
                  <input
                    id="co-name"
                    type="text"
                    formControlName="name"
                    placeholder="Contoh: Bpk. Ridwan Santoso"
                    class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                </div>

                <div>
                  <label for="co-email" class="block text-xs font-semibold text-zinc-300 mb-1">Alamat Email Aktif:</label>
                  <input
                    id="co-email"
                    type="email"
                    formControlName="email"
                    placeholder="Contoh: ridwan.bisnis@gmail.com"
                    class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                  <span class="text-[10px] text-zinc-500 mt-0.5 block">Informasi akun dan akses aplikasi akan dikirimkan ke email ini.</span>
                </div>

                <div>
                  <label for="co-phone" class="block text-xs font-semibold text-zinc-300 mb-1">Nomor WhatsApp Aktif:</label>
                  <input
                    id="co-phone"
                    type="tel"
                    formControlName="phone"
                    placeholder="Contoh: 0821-4567-8901"
                    class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                  <span class="text-[10px] text-zinc-500 mt-0.5 block">Format: 08xx-xxxx-xxxx (Untuk notifikasi konfirmasi otomatis).</span>
                </div>

                <!-- Optional Add-ons Selection -->
                <div class="pt-4 border-t border-zinc-800 space-y-3">
                  <div class="block text-xs font-semibold text-white uppercase tracking-wider">
                    Pilihan Fasilitas Tambahan (Opsional):
                  </div>

                  <label class="flex items-start gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950 cursor-pointer hover:border-zinc-700 transition-colors">
                    <input type="checkbox" formControlName="addonSetupDomain" class="mt-0.5 rounded text-emerald-500 focus:ring-emerald-400">
                    <div class="text-xs">
                      <div class="flex items-center justify-between">
                        <span class="font-semibold text-white">Bantuan Setup Custom Domain Sendiri (+Rp 99.000)</span>
                        <span class="text-emerald-400 font-mono text-[11px] font-bold">Hemat 50%</span>
                      </div>
                      <span class="text-zinc-400 block mt-0.5">Tim IT PT. CAHAYA ARSYA GEMILANG akan menghubungkan domain bisnis Anda langsung.</span>
                    </div>
                  </label>

                  <label class="flex items-start gap-3 p-3 rounded-xl border border-zinc-800 bg-zinc-950 cursor-pointer hover:border-zinc-700 transition-colors">
                    <input type="checkbox" formControlName="addonVipMentoring" class="mt-0.5 rounded text-emerald-500 focus:ring-emerald-400">
                    <div class="text-xs">
                      <div class="flex items-center justify-between">
                        <span class="font-semibold text-white">Sesi Mentoring 1-on-1 Private (+Rp 149.000)</span>
                      </div>
                      <span class="text-zinc-400 block mt-0.5">Konsultasi strategi penjualan otomatis via Google Meet langsung dengan Business Director.</span>
                    </div>
                  </label>
                </div>

                <div class="pt-4">
                  <button
                    type="button"
                    (click)="goToStep2()"
                    [disabled]="userForm.invalid"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 px-4 text-xs font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-md active:scale-95"
                  >
                    <span>Lanjut ke Metode Pembayaran</span>
                    <mat-icon class="text-sm">arrow_forward</mat-icon>
                  </button>
                </div>
              </form>
            </div>
          }

          <!-- STEP 2: PAYMENT METHOD & SIMULATION -->
          @if (step() === 2) {
            <div class="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 space-y-6">
              <div class="flex items-start justify-between">
                <div>
                  <span class="text-[11px] font-mono text-emerald-400 uppercase font-semibold">LANGKAH 2 DARI 3</span>
                  <h3 class="text-xl font-bold text-white mt-1">Pilih Metode Pembayaran</h3>
                  <p class="text-xs text-zinc-400 mt-1">
                    Verifikasi dilakukan otomatis oleh sistem gateway PT. CAHAYA ARSYA GEMILANG.
                  </p>
                </div>
                <button
                  type="button"
                  (click)="step.set(1)"
                  class="text-xs text-zinc-400 hover:text-white"
                >
                  Ubah Data
                </button>
              </div>

              <!-- Payment Tabs -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  (click)="paymentMethod.set('qris')"
                  class="p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all"
                  [class.border-emerald-500]="paymentMethod() === 'qris'"
                  [class.bg-emerald-500/10]="paymentMethod() === 'qris'"
                  [class.text-white]="paymentMethod() === 'qris'"
                  [class.border-zinc-800]="paymentMethod() !== 'qris'"
                  [class.bg-zinc-950]="paymentMethod() !== 'qris'"
                  [class.text-zinc-400]="paymentMethod() !== 'qris'"
                >
                  <mat-icon class="text-base text-emerald-400">qr_code_2</mat-icon>
                  <span>QRIS Dinamis</span>
                </button>

                <button
                  type="button"
                  (click)="paymentMethod.set('va_bca')"
                  class="p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all"
                  [class.border-emerald-500]="paymentMethod() === 'va_bca'"
                  [class.bg-emerald-500/10]="paymentMethod() === 'va_bca'"
                  [class.text-white]="paymentMethod() === 'va_bca'"
                  [class.border-zinc-800]="paymentMethod() !== 'va_bca'"
                  [class.bg-zinc-950]="paymentMethod() !== 'va_bca'"
                  [class.text-zinc-400]="paymentMethod() !== 'va_bca'"
                >
                  <mat-icon class="text-base text-blue-400">account_balance</mat-icon>
                  <span>BCA VA</span>
                </button>

                <button
                  type="button"
                  (click)="paymentMethod.set('va_mandiri')"
                  class="p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all"
                  [class.border-emerald-500]="paymentMethod() === 'va_mandiri'"
                  [class.bg-emerald-500/10]="paymentMethod() === 'va_mandiri'"
                  [class.text-white]="paymentMethod() === 'va_mandiri'"
                  [class.border-zinc-800]="paymentMethod() !== 'va_mandiri'"
                  [class.bg-zinc-950]="paymentMethod() !== 'va_mandiri'"
                  [class.text-zinc-400]="paymentMethod() !== 'va_mandiri'"
                >
                  <mat-icon class="text-base text-amber-400">account_balance</mat-icon>
                  <span>Mandiri VA</span>
                </button>

                <button
                  type="button"
                  (click)="paymentMethod.set('gopay')"
                  class="p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all"
                  [class.border-emerald-500]="paymentMethod() === 'gopay'"
                  [class.bg-emerald-500/10]="paymentMethod() === 'gopay'"
                  [class.text-white]="paymentMethod() === 'gopay'"
                  [class.border-zinc-800]="paymentMethod() !== 'gopay'"
                  [class.bg-zinc-950]="paymentMethod() !== 'gopay'"
                  [class.text-zinc-400]="paymentMethod() !== 'gopay'"
                >
                  <mat-icon class="text-base text-cyan-400">payments</mat-icon>
                  <span>GoPay</span>
                </button>
              </div>

              <!-- Payment details view -->
              @if (paymentMethod() === 'qris') {
                <div class="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-center space-y-3">
                  <span class="text-xs text-zinc-300 font-semibold block">Scan QRIS Menggunakan BCA, Mandiri, BRI, GoPay, OVO, Dana</span>
                  
                  <div class="inline-block p-4 rounded-xl bg-white shadow-md">
                    <div class="w-44 h-44 bg-zinc-100 rounded-lg p-2 grid grid-cols-6 gap-1 relative overflow-hidden">
                      @for (i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]; track i) {
                        <div class="rounded-xs" [class.bg-zinc-950]="i % 2 === 0 || i % 4 === 0" [class.bg-zinc-300]="i % 2 !== 0 && i % 4 !== 0"></div>
                      }
                      <div class="absolute inset-x-0 top-0 h-1 bg-emerald-500 animate-pulse"></div>
                    </div>
                  </div>

                  <span class="text-[11px] text-zinc-500 block">Kode QR Dinamis · Terbit Otomatis</span>
                </div>
              } @else {
                <div class="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
                  <div class="flex justify-between text-xs text-zinc-400">
                    <span>Nomor Virtual Account:</span>
                    <span class="text-emerald-400 font-medium">Otomatis Aktif</span>
                  </div>
                  <div class="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex justify-between items-center font-mono text-base font-bold text-white tracking-widest">
                    <span>8808 9214 7882 1093</span>
                    <span class="text-xs font-sans text-zinc-400">Salin</span>
                  </div>
                  <p class="text-[11px] text-zinc-400">
                    Buka aplikasi m-Banking Anda, pilih menu Bayar > Virtual Account, dan masukkan nomor di atas.
                  </p>
                </div>
              }

              <!-- Simulation Trigger Button -->
              <div class="pt-2">
                <button
                  type="button"
                  (click)="simulateServerPayment()"
                  [disabled]="isVerifyingPayment()"
                  class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 px-4 text-xs font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-md active:scale-95"
                >
                  @if (isVerifyingPayment()) {
                    <mat-icon class="text-sm animate-spin">sync</mat-icon>
                    <span>Memverifikasi Webhook Server Gateway...</span>
                  } @else {
                    <mat-icon class="text-sm">check_circle</mat-icon>
                    <span>Simulasikan Pembayaran Berhasil (Uji Coba Detik Ini)</span>
                  }
                </button>
              </div>
            </div>
          }

          <!-- STEP 3: ACCESS GRANTED & CELEBRATION -->
          @if (step() === 3) {
            <div class="rounded-2xl border border-emerald-500/40 bg-zinc-900/80 p-6 sm:p-10 text-center space-y-6">
              <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                <mat-icon class="text-3xl">verified</mat-icon>
              </div>

              <div>
                <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">TRANSAKSI SUKSES</span>
                <h3 class="text-2xl font-bold text-white mt-1">Selamat! Akun & Sistem Anda Telah Aktif</h3>
                <p class="text-xs text-zinc-300 mt-2 max-w-md mx-auto leading-relaxed">
                  Faktur resmi PT. CAHAYA ARSYA GEMILANG telah terbit. 5 Karyawan AI dan seluruh fitur SaaS anggota telah terbuka penuh.
                </p>
              </div>

              <div class="pt-2">
                <button
                  type="button"
                  (click)="goToMemberDashboard()"
                  class="inline-flex items-center gap-2 rounded-xl bg-emerald-500 py-3.5 px-6 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <mat-icon class="text-sm">dashboard</mat-icon>
                  <span>Masuk ke Member Dashboard Sekarang</span>
                </button>
              </div>
            </div>
          }

        </div>

        <!-- Right: Real-Time Order Summary Card -->
        <div class="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 space-y-6 sticky top-8">
          <div class="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h4 class="text-sm font-bold text-white">Ringkasan Pesanan</h4>
            <span class="text-xs text-emerald-400 font-mono">100% Aman</span>
          </div>

          <div class="space-y-3 text-xs">
            <div class="flex justify-between text-zinc-300">
              <div>
                <span class="block font-medium text-white">Karyawan AI Full Akses</span>
                <span class="text-[11px] text-emerald-400">99 Ribu Saja Perbulan</span>
              </div>
              <span class="font-mono text-white font-medium">{{ formatIdr(basePackagePrice) }}</span>
            </div>

            @if (userForm.get('addonSetupDomain')?.value) {
              <div class="flex justify-between text-emerald-400">
                <span>+ Setup Custom Domain</span>
                <span class="font-mono font-medium">+{{ formatIdr(99000) }}</span>
              </div>
            }

            @if (userForm.get('addonVipMentoring')?.value) {
              <div class="flex justify-between text-emerald-400">
                <span>+ Mentoring 1-on-1 VIP</span>
                <span class="font-mono font-medium">+{{ formatIdr(149000) }}</span>
              </div>
            }

            <div class="flex justify-between text-zinc-400">
              <span>Biaya Gateway Otomatis (0.7%)</span>
              <span class="font-mono">{{ formatIdr(calculatedGatewayFee()) }}</span>
            </div>

            <div class="pt-4 border-t border-zinc-800 flex justify-between items-baseline">
              <div>
                <span class="text-xs text-zinc-400 block">Total Tagihan Bersih:</span>
                <span class="text-2xl font-extrabold text-white font-mono">{{ formatIdr(totalFinal()) }}</span>
              </div>
              <span class="text-[11px] text-emerald-400 font-semibold">Aktif Seketika</span>
            </div>
          </div>

          <!-- Legal Assurance Box -->
          <div class="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-400 space-y-1">
            <div class="flex items-center gap-1.5 text-zinc-200 font-semibold">
              <mat-icon class="text-xs text-emerald-400">verified</mat-icon>
              <span>PT. CAHAYA ARSYA GEMILANG</span>
            </div>
            <p>Transaksi dilindungi enkripsi bank dan diawasi oleh tim kepatuhan resmi.</p>
          </div>
        </div>

      </div>

    </div>
  `,
})
export class CheckoutPageComponent {
  platformService = inject(PlatformService);

  readonly step = signal<number>(1);
  readonly paymentMethod = signal<'qris' | 'va_bca' | 'va_mandiri' | 'gopay'>('qris');
  readonly isVerifyingPayment = signal<boolean>(false);
  readonly basePackagePrice = 99000;

  readonly userForm = new FormGroup({
    name: new FormControl<string>('Bpk. Ridwan Santoso', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('ridwan.bisnis@gmail.com', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl<string>('0821-4567-8901', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    addonSetupDomain: new FormControl<boolean>(false, { nonNullable: true }),
    addonVipMentoring: new FormControl<boolean>(false, { nonNullable: true }),
  });

  readonly formValues = toSignal(this.userForm.valueChanges, { initialValue: this.userForm.getRawValue() });

  readonly addonsTotal = computed(() => {
    const val = this.formValues();
    let sum = 0;
    if (val.addonSetupDomain) sum += 99000;
    if (val.addonVipMentoring) sum += 149000;
    return sum;
  });

  readonly calculatedGatewayFee = computed(() => {
    const subtotal = this.basePackagePrice + this.addonsTotal();
    return Math.round(subtotal * 0.007);
  });

  readonly totalFinal = computed(() => {
    return this.basePackagePrice + this.addonsTotal() + this.calculatedGatewayFee();
  });

  formatIdr(val: number): string {
    return formatRupiah(val);
  }

  returnToLanding() {
    this.platformService.setView('landing');
  }

  goToStep2() {
    if (this.userForm.invalid) return;
    this.step.set(2);
  }

  simulateServerPayment() {
    this.isVerifyingPayment.set(true);
    setTimeout(() => {
      this.isVerifyingPayment.set(false);
      this.step.set(3);
    }, 1200);
  }

  goToMemberDashboard() {
    this.platformService.setView('member');
  }
}
