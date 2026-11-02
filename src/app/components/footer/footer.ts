import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer class="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <!-- Column 1: Brand & Legal Info -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 text-emerald-400">
                <mat-icon class="text-lg">all_inclusive</mat-icon>
              </div>
              <div>
                <span class="text-base font-bold text-white block">NexusFlow</span>
                <span class="text-[10px] text-zinc-400 font-medium uppercase tracking-wide">PT. CAHAYA ARSYA GEMILANG</span>
              </div>
            </div>

            <p class="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Platform dan solusi ekosistem bisnis digital terpadu di Indonesia. 
              Membangun website penjualan berkonversi tinggi, otomasi 5 mesin AI, 
              serta mesin pembayaran otomatis tanpa perlu pusing urusan teknis.
            </p>

            <div class="pt-2 text-xs space-y-1">
              <div class="text-zinc-300 font-semibold">Alamat Kantor Resmi:</div>
              <p class="text-zinc-400">Gedung Wisma Gemilang Lt. 4, Kawasan Bisnis Terpadu, Jakarta Selatan, Indonesia</p>
              <p class="text-zinc-400">Email: halo&#64;nexusflow.id · WhatsApp: +62 821-4567-8901</p>
            </div>
          </div>

          <!-- Column 2: Layanan & Solusi -->
          <div class="space-y-3">
            <div class="text-xs font-bold uppercase tracking-wider text-white">Layanan Utama</div>
            <ul class="space-y-2 text-xs">
              <li><a href="#solusi" class="hover:text-emerald-400 transition-colors">Landing Page Konversi Tinggi</a></li>
              <li><a href="#solusi" class="hover:text-emerald-400 transition-colors">Toko Online Kasir Otomatis</a></li>
              <li><a href="#solusi" class="hover:text-emerald-400 transition-colors">Portal Kursus & Membership</a></li>
              <li><a href="#solusi" class="hover:text-emerald-400 transition-colors">Website Profil Korporat B2B</a></li>
              <li><a href="#fitur" class="hover:text-emerald-400 transition-colors">Integrasi QRIS & Virtual Account</a></li>
            </ul>
          </div>

          <!-- Column 3: Ekosistem AI -->
          <div class="space-y-3">
            <div class="text-xs font-bold uppercase tracking-wider text-white">5 Mesin AI</div>
            <ul class="space-y-2 text-xs">
              <li><a href="#fitur" class="hover:text-emerald-400 transition-colors">AI Riset Produk & Niche</a></li>
              <li><a href="#fitur" class="hover:text-emerald-400 transition-colors">AI Copywriter Penjualan</a></li>
              <li><a href="#fitur" class="hover:text-emerald-400 transition-colors">AI Desain Banner & Mockup</a></li>
              <li><a href="#fitur" class="hover:text-emerald-400 transition-colors">AI Video UGC 9:16</a></li>
              <li><a href="#fitur" class="hover:text-emerald-400 transition-colors">AI Ads Targeting Optimizer</a></li>
            </ul>
          </div>

          <!-- Column 4: Keamanan & Pembayaran -->
          <div class="space-y-3">
            <div class="text-xs font-bold uppercase tracking-wider text-white">Standar Keamanan</div>
            <ul class="space-y-2 text-xs text-zinc-400">
              <li class="flex items-center gap-1.5">
                <mat-icon class="text-xs text-emerald-400">lock</mat-icon>
                <span>Enkripsi 256-bit SSL</span>
              </li>
              <li class="flex items-center gap-1.5">
                <mat-icon class="text-xs text-emerald-400">verified_user</mat-icon>
                <span>Standar QRIS Bank Indonesia</span>
              </li>
              <li class="flex items-center gap-1.5">
                <mat-icon class="text-xs text-emerald-400">security</mat-icon>
                <span>Anti-Fraud & Proteksi Webhook</span>
              </li>
              <li class="flex items-center gap-1.5">
                <mat-icon class="text-xs text-emerald-400">receipt_long</mat-icon>
                <span>Faktur Sah PT. CAHAYA ARSYA GEMILANG</span>
              </li>
            </ul>

            <div class="pt-3">
              <button
                type="button"
                (click)="openPortal()"
                class="w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 py-2 px-3 text-xs font-semibold text-zinc-200 hover:text-white hover:border-emerald-500 transition-colors"
              >
                <mat-icon class="text-xs text-emerald-400">dashboard</mat-icon>
                <span>Buka Dashboard Klien</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Payment Channels Bar -->
        <div class="mt-12 pt-8 border-t border-zinc-850 flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-xs text-zinc-500">
            <span>Dukungan Pembayaran Otomatis:</span>
            <span class="text-zinc-400 font-mono">BCA · Mandiri · BRI · BNI · QRIS · GoPay · OVO · ShopeePay</span>
          </div>

          <div class="text-xs text-zinc-500 text-center md:text-right">
            &copy; 2026 NexusFlow oleh <strong class="text-zinc-300">PT. CAHAYA ARSYA GEMILANG</strong>. Hak Cipta Dilindungi Undang-Undang.
          </div>
        </div>

      </div>
    </footer>
  `,
})
export class FooterComponent {
  private projectService = inject(ProjectService);

  openPortal() {
    this.projectService.showClientPortal();
  }
}
