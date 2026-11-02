import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';

interface PricingTier {
  id: string;
  name: string;
  popular?: boolean;
  priceFormatted: string;
  priceNumeric: number;
  timeline: string;
  tagline: string;
  features: string[];
  paymentHighlights: string;
  buttonLabel: string;
}

@Component({
  selector: 'app-pricing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="paket" class="py-20 bg-zinc-900/30 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Langganan Fleksibel & Transparan</span>
            <span aria-hidden="true">·</span>
            <span>Garansi Terima Beres</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Miliki Karyawan AI Anda Sekarang
          </h2>

          <p class="text-base text-zinc-400 leading-relaxed">
            Hanya <strong class="text-emerald-400 font-bold">99 ribu saja perbulan</strong>. 
            Solusi cerdas pengganti gaji staf puluhan juta rupiah yang didukung resmi oleh 
            <strong class="text-zinc-200">PT. CAHAYA ARSYA GEMILANG</strong> dan dipantau real-time melalui dashboard proyek pribadi Anda.
          </p>
        </div>

        <!-- 3 Tiers Grid -->
        <div class="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          @for (tier of tiers; track tier.id) {
            <div 
              class="relative rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all"
              [class.border-emerald-500]="tier.popular"
              [class.bg-gradient-to-b]="tier.popular"
              [class.from-zinc-900]="tier.popular"
              [class.to-zinc-950]="tier.popular"
              [class.shadow-2xl]="tier.popular"
              [class.shadow-emerald-500/10]="tier.popular"
              [class.border-zinc-800]="!tier.popular"
              [class.bg-zinc-950]="!tier.popular"
            >
              @if (tier.popular) {
                <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-zinc-950 shadow-sm whitespace-nowrap">
                  Paling Populer · 99 Ribu Saja Perbulan
                </div>
              }

              <div>
                <div class="flex items-baseline justify-between">
                  <h3 class="text-xl font-bold text-white">{{ tier.name }}</h3>
                  <span class="text-xs text-zinc-400 font-medium">~{{ tier.timeline }}</span>
                </div>

                <p class="text-xs text-zinc-400 mt-2">{{ tier.tagline }}</p>

                <div class="mt-6 pb-6 border-b border-zinc-800">
                  <div class="flex items-baseline gap-1">
                    <span class="text-3xl sm:text-4xl font-extrabold text-white font-mono">{{ tier.priceFormatted }}</span>
                  </div>
                  <span class="text-[11px] text-emerald-400 mt-1 block font-medium">
                    {{ tier.paymentHighlights }}
                  </span>
                </div>

                <!-- Features list -->
                <div class="mt-6 space-y-3">
                  <div class="text-xs font-semibold uppercase text-zinc-400 tracking-wider">
                    Fasilitas Lengkap:
                  </div>
                  <ul class="space-y-2.5 text-xs text-zinc-300">
                    @for (feat of tier.features; track feat) {
                      <li class="flex items-start gap-2.5">
                        <mat-icon class="text-emerald-400 text-sm mt-0.5 shrink-0">check_circle</mat-icon>
                        <span class="leading-relaxed">{{ feat }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>

              <!-- Action button -->
              <div class="mt-8 pt-4 border-t border-zinc-800/60">
                <button
                  type="button"
                  (click)="selectTier(tier)"
                  class="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-400"
                  [class.bg-emerald-500]="tier.popular"
                  [class.text-zinc-950]="tier.popular"
                  [class.hover:bg-emerald-400]="tier.popular"
                  [class.bg-zinc-800]="!tier.popular"
                  [class.text-white]="!tier.popular"
                  [class.hover:bg-zinc-700]="!tier.popular"
                >
                  <mat-icon class="text-sm">shopping_bag</mat-icon>
                  <span>{{ tier.buttonLabel }}</span>
                </button>
              </div>
            </div>
          }
        </div>

        <!-- Trust Note at bottom of pricing -->
        <div class="mt-12 text-center text-xs text-zinc-400 flex flex-wrap items-center justify-center gap-4">
          <span class="flex items-center gap-1.5">
            <mat-icon class="text-xs text-emerald-400">receipt_long</mat-icon>
            Faktur & Kuitansi Resmi PT. CAHAYA ARSYA GEMILANG
          </span>
          <span aria-hidden="true" class="text-zinc-700">·</span>
          <span class="flex items-center gap-1.5">
            <mat-icon class="text-xs text-emerald-400">autorenew</mat-icon>
            Tanpa Kontrak Mengikat · Bisa Batal Kapan Saja
          </span>
          <span aria-hidden="true" class="text-zinc-700">·</span>
          <span class="flex items-center gap-1.5">
            <mat-icon class="text-xs text-emerald-400">headset_mic</mat-icon>
            Pendampingan Pemula Bebas Konsultasi
          </span>
        </div>

      </div>
    </section>
  `,
})
export class PricingComponent {
  private projectService = inject(ProjectService);

  readonly tiers: PricingTier[] = [
    {
      id: 'monthly',
      name: 'Karyawan AI Bulanan',
      popular: true,
      priceFormatted: 'Rp 99.000 / bln',
      priceNumeric: 99000,
      timeline: 'Akses Instan',
      tagline: 'Miliki 5 Karyawan AI pintar yang bekerja 24 jam nonstop untuk bisnis & penjualan Anda.',
      features: [
        '5 Karyawan AI Bekerja 24/7 (Riset, Copywriter, Builder, Desain, CS)',
        'Mesin Pembayaran Otomatis (QRIS Dinamis & Virtual Account)',
        'Uang Penjualan Otomatis Masuk ke Rekening Bank Pribadi/PT Anda',
        'Notifikasi WhatsApp Otomatis ke Pembeli Detik Itu Juga',
        'Dashboard Klien Real-Time dengan Live Staging Preview',
        'Generator Naskah Penawaran & Mockup Desain Tanpa Batas',
        'Tanpa Ikatan Kontrak, Bebas Berhenti Kapan Saja',
        'Faktur Pajak & Kuitansi Resmi PT. CAHAYA ARSYA GEMILANG',
      ],
      paymentHighlights: '99 Ribu Saja Perbulan · Akses Penuh',
      buttonLabel: 'Miliki Karyawan AI (99 Ribu/Bln)',
    },
    {
      id: 'quarterly',
      name: 'Paket AI Kuartal (3 Bulan)',
      popular: false,
      priceFormatted: 'Rp 249.000',
      priceNumeric: 249000,
      timeline: 'Akses Instan',
      tagline: 'Pilihan hemat 3 bulan untuk konsistensi operasional tanpa repot bayar tiap bulan.',
      features: [
        'Semua Fasilitas 5 Karyawan AI Lengkap 24/7',
        'Hemat Rp 48.000 Dibanding Langganan Bulanan',
        'Mesin Pembayaran Otomatis QRIS & Virtual Account Siap Pakai',
        'Prioritas Kecepatan Antrean Komputasi Server AI',
        'Akses Template Produk Digital Siap Jual',
        'Garansi Pemeliharaan Sistem & Bebas Konsultasi',
      ],
      paymentHighlights: 'Setara Rp 83.000 / Bulan (Hemat)',
      buttonLabel: 'Pilih Paket 3 Bulan',
    },
    {
      id: 'annual',
      name: 'Paket AI Tahunan VIP',
      popular: false,
      priceFormatted: 'Rp 890.000',
      priceNumeric: 890000,
      timeline: 'Akses Instan',
      tagline: 'Komitmen 1 tahun penuh untuk profit bisnis maksimal dengan pendampingan langsung tim ahli.',
      features: [
        'Semua Fasilitas 5 Karyawan AI Sepanjang Tahun (12 Bulan)',
        'Paling Hemat: Hanya Setara ~Rp 74.000 / Bulan',
        'Bantuan Setup Custom Domain Sendiri oleh Tim IT PT',
        'Sesi Konsultasi Strategi Bisnis 1-on-1 Eksklusif',
        'Garansi Server SLA 99.9% Bebas Gangguan',
        'Dukungan VIP Support 24/7 Jalur Khusus',
      ],
      paymentHighlights: 'Paling Hemat · Asistensi VIP',
      buttonLabel: 'Pilih Paket Tahunan VIP',
    },
  ];

  selectTier(tier: PricingTier) {
    this.projectService.initiateOrder({
      packageName: tier.name,
      price: tier.priceNumeric,
    });
  }
}
