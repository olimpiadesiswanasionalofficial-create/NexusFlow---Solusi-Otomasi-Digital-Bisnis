import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scenarios',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section class="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        
        <!-- SECTION 9: TWO BUSINESS SCENARIOS -->
        <div>
          <div class="max-w-3xl mx-auto text-center space-y-4">
            <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span>Studi Perjalanan Bisnis</span>
              <span aria-hidden="true">·</span>
              <span>Timeline Nyata</span>
            </div>

            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Dua Skenario Membangun Bisnis Digital
            </h2>

            <p class="text-base text-zinc-400 leading-relaxed">
              Pilihan jalur yang Anda ambil di awal akan menentukan apakah waktu Anda habis mengurus hal teknis atau fokus memperbesar omset.
            </p>
          </div>

          <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Skenario A: Manual -->
            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6">
              <div class="flex items-center gap-2 text-rose-400 text-sm font-bold uppercase tracking-wider">
                <mat-icon class="text-base">route</mat-icon>
                <span>Skenario A: Cara Konvensional / Manual</span>
              </div>

              <div class="relative pl-6 border-l border-zinc-800 space-y-6 text-xs">
                <div class="relative">
                  <div class="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-rose-500/80 border-2 border-zinc-950"></div>
                  <strong class="text-white block font-semibold text-sm">Minggu 1-2: Menebak Niche Pasar</strong>
                  <p class="text-zinc-400 mt-1">Mencari ide hanya berdasarkan firasat tanpa data tren pencarian nyata. Rentan salah memilih produk.</p>
                </div>

                <div class="relative">
                  <div class="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-rose-500/80 border-2 border-zinc-950"></div>
                  <strong class="text-white block font-semibold text-sm">Minggu 3-5: Drama Merekrut Freelancer</strong>
                  <p class="text-zinc-400 mt-1">Mencari desainer dan web dev di berbagai platform. Biaya membengkak dan revisi sering molor dari tenggat waktu.</p>
                </div>

                <div class="relative">
                  <div class="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-rose-500/80 border-2 border-zinc-950"></div>
                  <strong class="text-white block font-semibold text-sm">Minggu 6-8: Masalah Pembayaran Manual</strong>
                  <p class="text-zinc-400 mt-1">Pembeli harus kirim foto struk transfer via WhatsApp. Anda harus sering cek mutasi m-banking di tengah malam.</p>
                </div>

                <div class="relative">
                  <div class="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-rose-500/80 border-2 border-zinc-950"></div>
                  <strong class="text-white block font-semibold text-sm">Bulan 3: Lelah & Boncos</strong>
                  <p class="text-zinc-400 mt-1">Modal terlanjur habis untuk biaya tim sebelum produk berhasil divalidasi ke pasar.</p>
                </div>
              </div>
            </div>

            <!-- Skenario B: NexusFlow Integrated -->
            <div class="rounded-2xl border border-emerald-500/30 bg-zinc-900/60 p-6 sm:p-8 space-y-6">
              <div class="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider">
                <mat-icon class="text-base">auto_mode</mat-icon>
                <span>Skenario B: Sistem Terpadu NexusFlow</span>
              </div>

              <div class="relative pl-6 border-l border-emerald-500/40 space-y-6 text-xs">
                <div class="relative">
                  <div class="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-zinc-950"></div>
                  <strong class="text-white block font-semibold text-sm">Hari 1-3: Riset Berbasis Data AI</strong>
                  <p class="text-zinc-300 mt-1">AI Research memindai ribuan data pencarian produk di Indonesia dan menyajikan skor peluang dengan metodologi jelas.</p>
                </div>

                <div class="relative">
                  <div class="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-zinc-950"></div>
                  <strong class="text-white block font-semibold text-sm">Hari 4-7: Naskah, Desain & Produk Siap</strong>
                  <p class="text-zinc-300 mt-1">AI Copywriter dan AI Visual Designer menyusun materi penawaran, banner iklan 3D, dan template produk secara sinkron.</p>
                </div>

                <div class="relative">
                  <div class="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-zinc-950"></div>
                  <strong class="text-white block font-semibold text-sm">Hari 8-10: Kasir Otomatis Aktif</strong>
                  <p class="text-zinc-300 mt-1">Website dan QRIS otomatis online. Pembeli transfer, sistem mendeteksi dalam 1.2 detik dan uang langsung masuk rekening bank Anda.</p>
                </div>

                <div class="relative">
                  <div class="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-zinc-950"></div>
                  <strong class="text-white block font-semibold text-sm">Bulan 1+: Fokus Scaling & Profit</strong>
                  <p class="text-zinc-300 mt-1">Sistem berjalan 24 jam nonstop tanpa Anda perlu begadang mencocokkan struk rekening.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- SECTION 10: DALAMAN APLIKASI (ALTERNATE VISUAL LAYOUT) -->
        <div class="space-y-12">
          <div class="max-w-3xl mx-auto text-center space-y-4">
            <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span>Eksplorasi Mendalam</span>
              <span aria-hidden="true">·</span>
              <span>14 Fitur Terintegrasi</span>
            </div>

            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Bedah Fitur di Balik Layar NexusFlow
            </h2>

            <p class="text-base text-zinc-400 leading-relaxed">
              Arsitektur aplikasi terpadu yang menggabungkan AI generative, sistem kasir payment gateway, dan manajemen aset digital dalam satu atap.
            </p>
          </div>

          <!-- Alternate row 1 -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-6 space-y-4">
              <span class="text-xs font-mono text-emerald-400 font-bold uppercase">FITUR 01 & 02</span>
              <h3 class="text-2xl font-bold text-white">AI Workflow Pipeline & AI Research Niche</h3>
              <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Output dari modul riset secara otomatis menjadi brief masukan bagi copywriter dan desainer visual tanpa Anda perlu memindahkan teks manual dari satu aplikasi ke aplikasi lain.
              </p>
              <ul class="space-y-2 text-xs text-zinc-400">
                <li class="flex items-center gap-2">
                  <mat-icon class="text-emerald-400 text-sm">check</mat-icon>
                  <span>Mendeteksi tren pencarian kata kunci dengan volume tertinggi</span>
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-emerald-400 text-sm">check</mat-icon>
                  <span>Pipeline terstruktur: Waiting > Processing > Completed > Review</span>
                </li>
              </ul>
            </div>
            <div class="lg:col-span-6 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 space-y-3 font-mono text-xs">
              <div class="flex items-center justify-between text-zinc-500 pb-2 border-b border-zinc-800 text-[11px]">
                <span>pipeline.nexusflow.id</span>
                <span class="text-emerald-400">STATUS: PIPELINE RUNNING</span>
              </div>
              <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                [INPUT] Niche: "Seller Marketplace Indonesia"
              </div>
              <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-400">
                [AI-RESEARCH] 3 Pain Points Identified · Opportunity Score: 94/100
              </div>
              <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-cyan-400">
                [AI-COPYWRITER] 15 Hooks & 1 Sales Page Generated Automatically
              </div>
            </div>
          </div>

          <!-- Alternate row 2 -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-6 order-2 lg:order-1 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 space-y-3 font-mono text-xs">
              <div class="flex items-center justify-between text-zinc-500 pb-2 border-b border-zinc-800 text-[11px]">
                <span>gateway.nexusflow.id</span>
                <span class="text-emerald-400">SETTLEMENT: INSTANT</span>
              </div>
              <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                Pembayaran Masuk: Rp 199.000 (QRIS BCA/ShopeePay)
              </div>
              <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-400">
                Webhook Callback: 200 OK (Verifikasi dalam 1.1s)
              </div>
              <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-cyan-400">
                Akses Member Aktif + Notifikasi Struk WA Terkirim
              </div>
            </div>
            <div class="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <span class="text-xs font-mono text-emerald-400 font-bold uppercase">FITUR 03 & 04</span>
              <h3 class="text-2xl font-bold text-white">Tool Factory & Mesin Kasir QRIS Otomatis</h3>
              <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Rancang dan terbitkan mini web-app produktivitas untuk pelanggan Anda. Lengkap dengan sistem pembayaran QRIS yang diverifikasi di server detik itu juga.
              </p>
              <ul class="space-y-2 text-xs text-zinc-400">
                <li class="flex items-center gap-2">
                  <mat-icon class="text-emerald-400 text-sm">check</mat-icon>
                  <span>Mendukung Virtual Account BCA, Mandiri, BRI, BNI dan QRIS</span>
                </li>
                <li class="flex items-center gap-2">
                  <mat-icon class="text-emerald-400 text-sm">check</mat-icon>
                  <span>Dana penjualan 100% langsung masuk ke rekening bank Anda</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  `,
})
export class ScenariosComponent {}
