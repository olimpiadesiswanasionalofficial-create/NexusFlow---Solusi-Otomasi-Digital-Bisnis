import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';
import { formatRupiah } from '../../services/project-calculator';

@Component({
  selector: 'app-payment-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (projectService.isPaymentModalOpen()) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
      >
        <div class="relative w-full max-w-xl rounded-2xl border border-zinc-700/80 bg-zinc-950 p-6 sm:p-8 shadow-2xl text-left my-8">
          
          <!-- Top bar with brand & close -->
          <div class="flex items-start justify-between pb-4 border-b border-zinc-800">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono font-bold text-emerald-400">NEXUSFLOW PAYMENT GATEWAY</span>
                <span aria-hidden="true" class="text-zinc-600">·</span>
                <span class="text-[11px] text-zinc-400">PT. CAHAYA ARSYA GEMILANG</span>
              </div>
              <h3 id="payment-modal-title" class="text-lg font-bold text-white mt-1">
                Checkout Pembayaran Otomatis
              </h3>
            </div>
            <button
              type="button"
              (click)="closeModal()"
              aria-label="Tutup jendela pembayaran"
              class="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <mat-icon class="text-base">close</mat-icon>
            </button>
          </div>

          @let order = projectService.currentCheckout();
          @if (order) {
            
            <!-- STATE 1: Awaiting Payment or Verifying -->
            @if (order.status !== 'paid') {
              <div class="mt-4 space-y-5">
                
                <!-- Order Summary banner -->
                <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span class="text-xs text-zinc-400 block">Paket Pilihan:</span>
                    <span class="text-sm font-bold text-white">{{ order.packageName }}</span>
                    <span class="text-xs text-zinc-400 block mt-0.5">Order ID: {{ order.orderId }}</span>
                  </div>
                  <div class="text-left sm:text-right">
                    <span class="text-xs text-zinc-400 block">Total Tagihan:</span>
                    <span class="text-xl font-extrabold text-emerald-400 font-mono">
                      {{ formatAmount(order.totalAmount) }}
                    </span>
                    <span class="text-[11px] text-zinc-500 block">Termasuk biaya gateway</span>
                  </div>
                </div>

                <!-- Payment Method Tabs -->
                <div>
                  <div class="block text-xs font-semibold uppercase text-zinc-400 tracking-wider mb-2">
                    Pilih Metode Pembayaran Otomatis:
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      (click)="setMethod('qris')"
                      class="p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all"
                      [class.border-emerald-500]="order.paymentMethod === 'qris'"
                      [class.bg-emerald-500/10]="order.paymentMethod === 'qris'"
                      [class.text-white]="order.paymentMethod === 'qris'"
                      [class.border-zinc-800]="order.paymentMethod !== 'qris'"
                      [class.bg-zinc-900]="order.paymentMethod !== 'qris'"
                      [class.text-zinc-400]="order.paymentMethod !== 'qris'"
                    >
                      <mat-icon class="text-base text-emerald-400">qr_code_2</mat-icon>
                      <span>QRIS Dinamis</span>
                    </button>

                    <button
                      type="button"
                      (click)="setMethod('va_bca')"
                      class="p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all"
                      [class.border-emerald-500]="order.paymentMethod === 'va_bca'"
                      [class.bg-emerald-500/10]="order.paymentMethod === 'va_bca'"
                      [class.text-white]="order.paymentMethod === 'va_bca'"
                      [class.border-zinc-800]="order.paymentMethod !== 'va_bca'"
                      [class.bg-zinc-900]="order.paymentMethod !== 'va_bca'"
                      [class.text-zinc-400]="order.paymentMethod !== 'va_bca'"
                    >
                      <mat-icon class="text-base text-blue-400">account_balance</mat-icon>
                      <span>BCA VA</span>
                    </button>

                    <button
                      type="button"
                      (click)="setMethod('va_mandiri')"
                      class="p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all"
                      [class.border-emerald-500]="order.paymentMethod === 'va_mandiri'"
                      [class.bg-emerald-500/10]="order.paymentMethod === 'va_mandiri'"
                      [class.text-white]="order.paymentMethod === 'va_mandiri'"
                      [class.border-zinc-800]="order.paymentMethod !== 'va_mandiri'"
                      [class.bg-zinc-900]="order.paymentMethod !== 'va_mandiri'"
                      [class.text-zinc-400]="order.paymentMethod !== 'va_mandiri'"
                    >
                      <mat-icon class="text-base text-amber-400">account_balance</mat-icon>
                      <span>Mandiri VA</span>
                    </button>

                    <button
                      type="button"
                      (click)="setMethod('gopay')"
                      class="p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1 transition-all"
                      [class.border-emerald-500]="order.paymentMethod === 'gopay'"
                      [class.bg-emerald-500/10]="order.paymentMethod === 'gopay'"
                      [class.text-white]="order.paymentMethod === 'gopay'"
                      [class.border-zinc-800]="order.paymentMethod !== 'gopay'"
                      [class.bg-zinc-900]="order.paymentMethod !== 'gopay'"
                      [class.text-zinc-400]="order.paymentMethod !== 'gopay'"
                    >
                      <mat-icon class="text-base text-cyan-400">payments</mat-icon>
                      <span>GoPay / E-Wallet</span>
                    </button>
                  </div>
                </div>

                <!-- Payment Details View based on selected method -->
                @if (order.paymentMethod === 'qris') {
                  <div class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 text-center space-y-3">
                    <span class="text-xs text-zinc-300 font-medium block">
                      Scan QRIS Menggunakan BCA, Mandiri, BRI, BNI, GoPay, OVO, atau Dana:
                    </span>
                    
                    <!-- Simulated QRIS Box -->
                    <div class="inline-block p-4 rounded-xl bg-white shadow-md">
                      <div class="w-48 h-48 bg-white flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-lg p-2 relative overflow-hidden">
                        <!-- QR Code pattern simulation -->
                        <div class="grid grid-cols-6 gap-1 w-full h-full p-2 bg-zinc-100 rounded">
                          @for (i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]; track i) {
                            <div class="rounded-xs" [class.bg-zinc-950]="i % 2 === 0 || i % 5 === 0" [class.bg-zinc-300]="i % 2 !== 0 && i % 5 !== 0"></div>
                          }
                        </div>
                        <div class="absolute inset-x-0 top-0 h-1 bg-emerald-500/70 animate-pulse"></div>
                      </div>
                    </div>

                    <div class="text-[11px] text-zinc-400">
                      Batas waktu: <span class="text-amber-400 font-semibold">{{ order.expiresAt }}</span>
                    </div>
                  </div>
                } @else {
                  <!-- Virtual Account Details -->
                  <div class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 space-y-4">
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-zinc-400">Nomor Virtual Account:</span>
                      <span class="text-xs text-emerald-400 font-medium">Verifikasi Otomatis</span>
                    </div>

                    <div class="flex items-center justify-between p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                      <span class="text-lg font-mono font-bold text-white tracking-widest">
                        {{ order.vaNumber }}
                      </span>
                      <button
                        type="button"
                        (click)="copyVaNumber(order.vaNumber || '')"
                        class="inline-flex items-center gap-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-colors"
                      >
                        <mat-icon class="text-xs">content_copy</mat-icon>
                        <span>{{ isCopied() ? 'Tersalin!' : 'Salin' }}</span>
                      </button>
                    </div>

                    <div class="text-xs text-zinc-400 space-y-1">
                      <div class="font-medium text-zinc-300">Cara Bayar Cepat:</div>
                      <p>1. Buka aplikasi m-Banking atau ATM bank pilihan Anda.</p>
                      <p>2. Pilih menu Transfer > Virtual Account dan masukkan nomor di atas.</p>
                      <p>3. Konfirmasi pembayaran. Sistem NexusFlow otomatis memproses tanpa perlu upload bukti.</p>
                    </div>
                  </div>
                }

                <!-- Live Webhook Listening Bar -->
                <div class="flex items-center justify-between p-3 rounded-xl border border-zinc-800 bg-zinc-950 text-xs">
                  <div class="flex items-center gap-2 text-zinc-300">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Menunggu Pembayaran Otomatis...</span>
                  </div>
                  <span class="font-mono text-zinc-400">Webhook: Ready</span>
                </div>

                <!-- Simulation Trigger Button -->
                <div class="pt-2">
                  <button
                    type="button"
                    (click)="simulatePayment()"
                    [disabled]="order.status === 'verifying'"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 px-4 text-xs font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-md shadow-emerald-500/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    @if (order.status === 'verifying') {
                      <mat-icon class="animate-spin text-sm">sync</mat-icon>
                      <span>Memverifikasi Transaksi Otomatis...</span>
                    } @else {
                      <mat-icon class="text-sm">check_circle</mat-icon>
                      <span>Simulasikan Pembayaran Berhasil (Uji Coba Detik Ini)</span>
                    }
                  </button>
                  <p class="text-[11px] text-zinc-400 text-center mt-2">
                    Tekan tombol di atas untuk melihat bagaimana sistem otomatis mendeteksi uang masuk dan seketika membuat proyek di dashboard Anda.
                  </p>
                </div>

              </div>
            } @else {
              
              <!-- STATE 2: Payment Successfully Confirmed! -->
              <div class="mt-6 text-center space-y-6">
                
                <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <mat-icon class="text-3xl">verified</mat-icon>
                </div>

                <div>
                  <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                    PEMBAYARAN DIVERIFIKASI
                  </span>
                  <h3 class="text-xl font-bold text-white mt-1">
                    Transaksi Sukses & Slot Proyek Aktif!
                  </h3>
                  <p class="text-xs text-zinc-300 mt-2 max-w-md mx-auto leading-relaxed">
                    Dana sebesar <strong class="text-white">{{ formatAmount(order.totalAmount) }}</strong> telah diterima secara otomatis oleh sistem <strong class="text-white">PT. CAHAYA ARSYA GEMILANG</strong>. Faktur resmi lunas telah diterbitkan.
                  </p>
                </div>

                <!-- Invoice summary snapshot -->
                <div class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 text-left text-xs space-y-2">
                  <div class="flex justify-between text-zinc-400">
                    <span>Nomor Faktur:</span>
                    <span class="font-mono text-zinc-200">INV/2026/NXF/{{ order.orderId }}</span>
                  </div>
                  <div class="flex justify-between text-zinc-400">
                    <span>Waktu Pembayaran:</span>
                    <span class="text-zinc-200">{{ order.paidAt }}</span>
                  </div>
                  <div class="flex justify-between text-zinc-400">
                    <span>Penerima Resmi:</span>
                    <span class="text-emerald-400 font-medium">PT. CAHAYA ARSYA GEMILANG</span>
                  </div>
                  <div class="flex justify-between text-zinc-400 border-t border-zinc-800/80 pt-2">
                    <span class="font-medium text-white">Status Proyek:</span>
                    <span class="text-emerald-400 font-bold">Sedang Berjalan (Alokasi Tim)</span>
                  </div>
                </div>

                <div class="pt-2">
                  <button
                    type="button"
                    (click)="goToDashboard()"
                    class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 px-4 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    <mat-icon class="text-sm">dashboard</mat-icon>
                    <span>Buka Dashboard Klien Saya Sekarang</span>
                  </button>
                </div>

              </div>

            }

          }
        </div>
      </div>
    }
  `,
})
export class PaymentModalComponent {
  projectService = inject(ProjectService);
  isCopied = signal<boolean>(false);

  formatAmount(val: number): string {
    return formatRupiah(val);
  }

  setMethod(method: 'qris' | 'va_bca' | 'va_mandiri' | 'va_bri' | 'gopay') {
    this.projectService.updatePaymentMethod(method);
  }

  copyVaNumber(va: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(va);
      this.isCopied.set(true);
      setTimeout(() => this.isCopied.set(false), 2000);
    }
  }

  simulatePayment() {
    this.projectService.processAutomatedPayment();
  }

  goToDashboard() {
    this.projectService.closePaymentModal();
    this.projectService.showClientPortal();
  }

  closeModal() {
    this.projectService.closePaymentModal();
  }
}
