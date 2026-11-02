import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';

interface AiModule {
  id: string;
  badge: string;
  icon: string;
  title: string;
  roleDescription: string;
  laymanExplanation: string;
  outputExample: string;
  statusText: string;
}

@Component({
  selector: 'app-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="fitur" class="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Miliki Karyawan AI Anda Sekarang</span>
            <span aria-hidden="true">·</span>
            <span>Hanya 99 Ribu Saja Perbulan</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            5 Karyawan AI Anda: Bekerja 24 Jam Nonstop
          </h2>

          <p class="text-base text-zinc-400 leading-relaxed">
            Dahulu Anda butuh mempekerjakan tim staf dengan beban gaji puluhan juta per bulan. 
            Kini, cukup dengan <strong class="text-emerald-400 font-semibold">99 ribu saja perbulan</strong> di 
            <strong class="text-zinc-200">NexusFlow</strong>, seluruh operasional bisnis ditangani 5 Karyawan AI terpadu 
            tanpa drama, tanpa cuti, dan siap melipatgandakan omzet Anda.
          </p>
        </div>

        <!-- 5 AI Modules Grid -->
        <div class="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (mod of aiModules(); track mod.id) {
            <div class="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between hover:bg-zinc-900/80">
              <div>
                <!-- Top Header -->
                <div class="flex items-center justify-between pb-4 border-b border-zinc-800/60">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                    <mat-icon>{{ mod.icon }}</mat-icon>
                  </div>
                  <div class="text-xs font-mono text-zinc-400">
                    {{ mod.badge }}
                  </div>
                </div>

                <!-- Module Title -->
                <div class="mt-4">
                  <h3 class="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {{ mod.title }}
                  </h3>
                  <div class="text-xs font-medium text-emerald-400/90 mt-0.5">
                    {{ mod.roleDescription }}
                  </div>
                </div>

                <!-- Layman Explanation -->
                <p class="text-sm text-zinc-300 mt-3 leading-relaxed">
                  {{ mod.laymanExplanation }}
                </p>

                <!-- Output Sample Box -->
                <div class="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                  <div class="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                    Hasil Yang Anda Terima:
                  </div>
                  <div class="text-xs text-zinc-300 font-medium">
                    {{ mod.outputExample }}
                  </div>
                </div>
              </div>

              <!-- Bottom Indicator -->
              <div class="mt-5 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
                <span class="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  {{ mod.statusText }}
                </span>
                <span class="text-zinc-500">100% Otomatis</span>
              </div>
            </div>
          }

          <!-- 6th Special Card: Automated Payment Gateway Engine -->
          <div class="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 flex flex-col justify-between shadow-lg shadow-emerald-500/5">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                  <mat-icon>paid</mat-icon>
                </div>
                <div class="text-xs font-mono text-emerald-400 font-semibold">
                  INTEGRASI PEMBAYARAN
                </div>
              </div>

              <div class="mt-4">
                <h3 class="text-lg font-bold text-white">
                  Mesin Kasir Otomatis 24 Jam
                </h3>
                <div class="text-xs font-medium text-emerald-400 mt-0.5">
                  QRIS Dinamis & Virtual Account Bank
                </div>
              </div>

              <p class="text-sm text-zinc-300 mt-3 leading-relaxed">
                Pembeli tidak perlu lagi kirim foto struk transfer via WhatsApp. Sistem kasir otomatis memverifikasi pembayaran detik itu juga dan langsung mengaktifkan pesanan mereka.
              </p>

              <div class="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3">
                <div class="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                  Mendukung Pembayaran:
                </div>
                <div class="text-xs text-zinc-200 font-medium flex flex-wrap gap-2">
                  <span>BCA VA</span> · <span>Mandiri VA</span> · <span>BRI VA</span> · <span>QRIS Semua Bank</span> · <span>GoPay</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-3 border-t border-zinc-800/60">
              <button
                type="button"
                (click)="testPaymentEngine()"
                class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <mat-icon class="text-sm">play_circle</mat-icon>
                <span>Uji Coba Sistem Pembayaran</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
})
export class FeaturesComponent {
  private projectService = inject(ProjectService);

  readonly aiModules = signal<AiModule[]>([
    {
      id: 'ai-riset',
      badge: 'MODUL 01',
      icon: 'insights',
      title: 'AI Riset Pasar',
      roleDescription: 'Pengganti Periset Pasar & Analis Tren',
      laymanExplanation:
        'Membantu Anda menemukan produk yang sedang dicari banyak orang di Indonesia. Menganalisis tren pasar dan strategi kompetitor tanpa perlu menebak-nebak.',
      outputExample: 'Laporan kata kunci pencarian tinggi, harga ideal, & celah kompetitor.',
      statusText: 'Riset Instan',
    },
    {
      id: 'ai-copy',
      badge: 'MODUL 02',
      icon: 'edit_note',
      title: 'AI Penulis Iklan (Copy)',
      roleDescription: 'Pengganti Copywriter Profesional',
      laymanExplanation:
        'Merangkai kata-kata penawaran yang mudah dipahami orang awam namun sangat meyakinkan, sehingga calon pembeli langsung terdorong untuk klik tombol beli.',
      outputExample: 'Naskah landing page, judul headline penarik perhatian, & materi promosi.',
      statusText: 'Bahasa Memikat',
    },
    {
      id: 'ai-desain',
      badge: 'MODUL 03',
      icon: 'palette',
      title: 'AI Desain Grafis Visual',
      roleDescription: 'Pengganti Graphic Designer',
      laymanExplanation:
        'Membuat tampilan produk yang mewah, banner iklan yang menarik mata, dan tata letak website yang elegan tanpa perlu repot belajar aplikasi desain rumit.',
      outputExample: 'Mockup produk 3D beresolusi tinggi & materi banner promosi tajam.',
      statusText: 'Desain Elegan',
    },
    {
      id: 'ai-video',
      badge: 'MODUL 04',
      icon: 'videocam',
      title: 'AI Video Promosi UGC',
      roleDescription: 'Pengganti Video Editor & Creator',
      laymanExplanation:
        'Menghasilkan format video vertikal 9:16 ala konten TikTok dan Instagram Reels yang terbukti ampuh mendatangkan jutaan penonton organik maupun berbayar.',
      outputExample: 'Skrip video promosi, storyboard hook visual, & panduan take video.',
      statusText: 'Format TikTok/Reels',
    },
    {
      id: 'ai-ads',
      badge: 'MODUL 05',
      icon: 'campaign',
      title: 'AI Ahli Iklan (Ads)',
      roleDescription: 'Pengganti Media Buyer & Advertiser',
      laymanExplanation:
        'Menentukan target penonton iklan di Meta (Facebook/Instagram) dan TikTok agar biaya iklan Anda tidak boncos dan menghasilkan pembeli nyata.',
      outputExample: 'Struktur kampanye iklan, target demografi usia/minat, & strategi scaling.',
      statusText: 'Optimasi Akurat',
    },
  ]);

  testPaymentEngine() {
    this.projectService.initiateOrder({
      packageName: 'Starter Launchpad',
      price: 2990000,
    });
  }
}
