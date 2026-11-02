import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';

interface SolutionItem {
  id: string;
  icon: string;
  category: string;
  title: string;
  simpleDescription: string;
  features: string[];
  recommendedFor: string;
  actionText: string;
  packageTier: string;
  price: number;
}

@Component({
  selector: 'app-solutions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="solusi" class="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Solusi & Layanan Utama</span>
            <span aria-hidden="true">·</span>
            <span>Semua Serba Otomatis</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Solusi Website Sesuai Kebutuhan Bisnis Anda
          </h2>

          <p class="text-base text-zinc-400 leading-relaxed">
            Tidak perlu pusing memilih arsitektur teknis rumit. Kami sediakan paket sistem yang sudah terbukti menghasilkan penjualan dan siap diintegrasikan dengan mesin kasir otomatis.
          </p>
        </div>

        <!-- 4 Core Solutions Grid -->
        <div class="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          @for (sol of solutions; track sol.id) {
            <div class="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 sm:p-8 hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between pb-4 border-b border-zinc-800/60">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400">
                    <mat-icon>{{ sol.icon }}</mat-icon>
                  </div>
                  <div class="text-xs font-mono text-zinc-400">
                    {{ sol.category }}
                  </div>
                </div>

                <div class="mt-5">
                  <h3 class="text-xl font-bold text-white">
                    {{ sol.title }}
                  </h3>
                  <p class="text-sm text-zinc-300 mt-2 leading-relaxed">
                    {{ sol.simpleDescription }}
                  </p>
                </div>

                <!-- Feature points -->
                <div class="mt-6 space-y-2.5">
                  <div class="text-xs font-semibold uppercase text-zinc-400 tracking-wider">
                    Termasuk Dalam Sistem:
                  </div>
                  <ul class="space-y-2 text-xs text-zinc-300">
                    @for (feat of sol.features; track feat) {
                      <li class="flex items-center gap-2">
                        <mat-icon class="text-emerald-400 text-sm">check</mat-icon>
                        <span>{{ feat }}</span>
                      </li>
                    }
                  </ul>
                </div>
              </div>

              <div class="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <div>
                  <span class="text-[11px] text-zinc-400 block">Cocok untuk:</span>
                  <span class="text-xs font-medium text-emerald-400">{{ sol.recommendedFor }}</span>
                </div>
                <button
                  type="button"
                  (click)="orderSolution(sol)"
                  class="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 px-4 py-2 text-xs font-bold text-zinc-200 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <mat-icon class="text-sm">shopping_cart</mat-icon>
                  <span>{{ sol.actionText }}</span>
                </button>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
})
export class SolutionsComponent {
  private projectService = inject(ProjectService);

  readonly solutions: SolutionItem[] = [
    {
      id: 'sol-lp',
      icon: 'web',
      category: 'HIGH-CONVERTING LANDING PAGE',
      title: 'Landing Page Penjualan 1-Halaman',
      simpleDescription:
        'Halaman website terarah yang dirancang khusus untuk membuat calon pembeli fokus membaca penawaran tanpa distraksi hingga klik tombol beli.',
      features: [
        'Desain mobile-first super cepat (loading di bawah 1.5 detik)',
        'Copywriting naskah penawaran persuasif berbantuan AI',
        'Formulir pesanan otomatis terhubung ke WhatsApp CS',
        'Integrasi QRIS instan langsung cair ke rekening bank Anda',
        'Pemasangan Meta Pixel & TikTok Pixel siap iklan',
      ],
      recommendedFor: 'Penjual produk fisik, herbal, skincare, fashion',
      actionText: 'Pilih Landing Page',
      packageTier: 'Starter Launchpad',
      price: 2990000,
    },
    {
      id: 'sol-ecom',
      icon: 'storefront',
      category: 'AUTOMATED E-COMMERCE',
      title: 'Toko Online & Sistem Kasir Otomatis',
      simpleDescription:
        'Toko online mandiri tanpa potongan komisi marketplace. Dilengkapi kalkulator cek ongkir otomatis seluruh Indonesia dan verifikasi pembayaran otomatis.',
      features: [
        'Katalog produk rapi tanpa batas variasi ukuran & warna',
        'Integrasi kurir otomatis (JNE, J&T, SiCepat, Anteraja)',
        'Virtual Account BCA, Mandiri, BRI, BNI & QRIS',
        'Struk faktur resmi terbit detik itu juga ke email pembeli',
        'Dashboard stok barang yang mudah dipelajari orang awam',
      ],
      recommendedFor: 'Toko retail, produsen, distributor, brand fashion',
      actionText: 'Pilih Toko Online',
      packageTier: 'Pro Growth',
      price: 5990000,
    },
    {
      id: 'sol-edu',
      icon: 'school',
      category: 'DIGITAL ACADEMY & MEMBERSHIP',
      title: 'Portal Kursus & Penjualan Produk Digital',
      simpleDescription:
        'Sistem otomatis mirip Leveling Digital untuk menjual ebook, video tutorial, dan langganan member tanpa repot kirim link materi satu per satu.',
      features: [
        'Aktivasi akun member otomatis dalam 2 detik setelah bayar',
        'Proteksi video materi anti download bajakan',
        'Sistem sertifikat kelulusan digital otomatis',
        'Sistem komisi affiliate bagi yang ingin merekrut reseller',
        'Integrasi email marketing & notifikasi WhatsApp otomatis',
      ],
      recommendedFor: 'Mentor, kreator konten, trainer, lembaga kursus',
      actionText: 'Pilih Portal Edukasi',
      packageTier: 'Pro Growth',
      price: 5990000,
    },
    {
      id: 'sol-corp',
      icon: 'business',
      category: 'ENTERPRISE SYSTEM',
      title: 'Website Korporat & Sistem Kustom Perusahaan',
      simpleDescription:
        'Website kredibel berstandar enterprise untuk membangun reputasi resmi perusahaan di hadapan investor, tender pemerintah, dan klien korporat.',
      features: [
        'Arsitektur cloud skalabilitas tinggi dengan perlindungan DDoS',
        'Dukungan multi-bahasa (Indonesia & Inggris)',
        'Sistem kalkulator penawaran harga B2B kustom',
        'Faktur pajak PPN resmi dari PT. CAHAYA ARSYA GEMILANG',
        'Dukungan dedicated Project Manager & SLA respon 2 jam',
      ],
      recommendedFor: 'PT, CV, pabrik manufaktur, logistik, instansi resmi',
      actionText: 'Pilih Enterprise',
      packageTier: 'Enterprise Scale',
      price: 12990000,
    },
  ];

  orderSolution(sol: SolutionItem) {
    this.projectService.initiateOrder({
      packageName: `${sol.packageTier} (${sol.title})`,
      price: sol.price,
    });
  }
}
