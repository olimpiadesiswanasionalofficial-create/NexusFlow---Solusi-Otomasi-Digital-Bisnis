import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface RoadmapPhase {
  days: string;
  phase: string;
  title: string;
  targetDescription: string;
  tasks: string[];
  completed: boolean;
}

@Component({
  selector: 'app-roadmap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="roadmap" class="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
        
        <!-- SECTION 17: 12-STEP HOW IT WORKS -->
        <div>
          <div class="max-w-3xl mx-auto text-center space-y-4">
            <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <span>Alur Kerja Terarah</span>
              <span aria-hidden="true">·</span>
              <span>12 Tahapan Sistematis</span>
            </div>

            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Bagaimana Alur Kerja NexusFlow Bekerja?
            </h2>

            <p class="text-base text-zinc-400 leading-relaxed">
              Dari sekadar ide di kepala hingga menjadi produk digital beromset yang menerima pembayaran otomatis 24 jam nonstop.
            </p>
          </div>

          <div class="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            @for (step of twelveSteps; track step.num) {
              <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                <div>
                  <div class="flex items-center justify-between text-xs font-mono mb-1">
                    <span class="text-emerald-400 font-bold">{{ step.num }}</span>
                    <mat-icon class="text-zinc-500 text-sm">{{ step.icon }}</mat-icon>
                  </div>
                  <h4 class="text-xs font-bold text-white">{{ step.title }}</h4>
                  <p class="text-[11px] text-zinc-400 mt-1 leading-relaxed">{{ step.desc }}</p>
                </div>
                <div class="pt-2 border-t border-zinc-800/60 text-[10px] text-zinc-500 font-mono">
                  Output: {{ step.output }}
                </div>
              </div>
            }
          </div>
        </div>

        <!-- SECTION 18: 30-DAY IMPLEMENTATION ROADMAP TRACKER -->
        <div class="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10">
          <div class="max-w-2xl mx-auto text-center space-y-3 mb-10">
            <span class="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">Panduan Kerja 30 Hari</span>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-white">
              Roadmap Implementasi 30 Hari Anda
            </h3>
            <p class="text-xs text-zinc-400">
              Panduan terukur agar Anda memiliki target harian yang jelas tanpa merasa bingung harus mulai dari mana.
            </p>
          </div>

          <!-- Overall Progress Bar -->
          <div class="max-w-xl mx-auto mb-10 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-zinc-400">Progres Roadmap:</span>
              <span class="text-emerald-400 font-bold font-mono">{{ completedPercentage() }}% Selesai</span>
            </div>
            <div class="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-300" [style.width.%]="completedPercentage()"></div>
            </div>
            <span class="text-[10px] text-zinc-500 block">
              Klik kotak centang pada setiap fase untuk mencatat pencapaian harian Anda.
            </span>
          </div>

          <!-- 6 Phases Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (p of phases(); track p.days) {
              <div 
                class="rounded-2xl border p-5 space-y-4 transition-all"
                [class.border-emerald-500/50]="p.completed"
                [class.bg-zinc-950]="!p.completed"
                [class.bg-emerald-500/5]="p.completed"
                [class.border-zinc-800]="!p.completed"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <span class="text-[11px] font-mono text-emerald-400 font-bold block">{{ p.days }}</span>
                    <h4 class="text-sm font-bold text-white mt-0.5">{{ p.phase }}</h4>
                    <span class="text-xs text-zinc-300 block font-medium mt-0.5">{{ p.title }}</span>
                  </div>
                  <button
                    type="button"
                    (click)="togglePhase(p.days)"
                    class="p-1 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                  >
                    <mat-icon class="text-lg">{{ p.completed ? 'check_circle' : 'radio_button_unchecked' }}</mat-icon>
                  </button>
                </div>

                <p class="text-xs text-zinc-400 leading-relaxed">{{ p.targetDescription }}</p>

                <div class="space-y-1.5 pt-2 border-t border-zinc-800/80">
                  <div class="text-[10px] uppercase font-mono text-zinc-500">Target Pekerjaan:</div>
                  @for (t of p.tasks; track t) {
                    <div class="flex items-center gap-2 text-xs text-zinc-300">
                      <mat-icon class="text-emerald-400 text-xs shrink-0">done</mat-icon>
                      <span>{{ t }}</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

          <div class="mt-8 text-center text-[11px] text-zinc-500 italic">
            *Catatan: Roadmap adalah panduan kerja sistematis, bukan jaminan angka penjualan. Kecepatan eksekusi Anda menentukan hasil akhir.
          </div>
        </div>

      </div>
    </section>
  `,
})
export class RoadmapComponent {
  readonly twelveSteps = [
    { num: '01', title: 'Masukkan Ide', icon: 'lightbulb', desc: 'Ketikkan topik atau minat pasar Anda.', output: 'Prompt Niche' },
    { num: '02', title: 'Jalankan Riset', icon: 'insights', desc: 'AI menganalisis tren pencarian Google & MP.', output: 'Skor Peluang' },
    { num: '03', title: 'Pilih Konsep', icon: 'tune', desc: 'Tentukan model produk yang paling pas.', output: 'Spesifikasi Produk' },
    { num: '04', title: 'Bangun Brand', icon: 'palette', desc: 'Buat nama, warna, dan logo profesional.', output: 'Brand Identity' },
    { num: '05', title: 'Materi Pemasaran', icon: 'edit_note', desc: 'Buat hook, skrip video & banner iklan.', output: 'Aset Konten' },
    { num: '06', title: 'Bangun Produk', icon: 'handyman', desc: 'Kompilasi web-app mini atau template.', output: 'File Deliverables' },
    { num: '07', title: 'Buat Landing Page', icon: 'web', desc: 'Tata letak halaman fokus konversi beli.', output: 'Web Siap Rilis' },
    { num: '08', title: 'Publikasikan', icon: 'cloud_upload', desc: 'Pasang domain dan aktifkan hosting kilat.', output: 'URL Online' },
    { num: '09', title: 'Promosikan', icon: 'campaign', desc: 'Jalankan iklan Meta Ads atau traffic UGC.', output: 'Kunjungan Calon Pembeli' },
    { num: '10', title: 'Analisis Hasil', icon: 'analytics', desc: 'Pantau data transaksi dan retensi.', output: 'Laporan Konversi' },
    { num: '11', title: 'Optimalkan', icon: 'speed', desc: 'Perbaiki angle naskah yang paling laris.', output: 'Peningkatan ROAS' },
    { num: '12', title: 'Kembangkan Produk', icon: 'autorenew', desc: 'Buat produk turunan untuk pembeli lama.', output: 'LTV Maksimal' },
  ];

  readonly phases = signal<RoadmapPhase[]>([
    {
      days: 'Hari 1-3',
      phase: 'Foundation',
      title: 'Menentukan Niche & Ide Produk',
      targetDescription: 'Memilih kategori masalah pasar dan memvalidasi ide dengan AI Research.',
      tasks: ['Scan tren kata kunci di Google', 'Pilih 1 masalah utama konsumen', 'Tentukan harga jual yang ideal'],
      completed: true,
    },
    {
      days: 'Hari 4-10',
      phase: 'Product Development',
      title: 'Validasi & Pembuatan Produk',
      targetDescription: 'Menyusun materi inti produk digital atau konfigurasi Tool Factory.',
      tasks: ['Kompilasi file deliverables', 'Uji coba fungsi mini web-app', 'Bikin panduan penggunaan singkat'],
      completed: true,
    },
    {
      days: 'Hari 11-15',
      phase: 'Marketing Preparation',
      title: 'Branding, Copywriting & Landing Page',
      targetDescription: 'Menyiapkan halaman penjualan persuasif dan materi iklan berdaya pikat.',
      tasks: ['Generate naskah penawaran dengan AI', 'Buat 5 variasi banner iklan 3D', 'Setup landing page mobile-first'],
      completed: false,
    },
    {
      days: 'Hari 16-20',
      phase: 'Launch Preparation',
      title: 'Setup Toko, Pembayaran & Promosi',
      targetDescription: 'Menghubungkan mesin pembayaran otomatis QRIS dan uji coba webhook.',
      tasks: ['Sambungkan rekening bank penerima', 'Uji coba scan QRIS dinamis', 'Setup notifikasi WhatsApp pembeli'],
      completed: false,
    },
    {
      days: 'Hari 21-25',
      phase: 'Marketing',
      title: 'Promosi & Pengujian Pasar',
      targetDescription: 'Mendatangkan pengunjung lewat konten organik TikTok/Reels atau iklan Meta.',
      tasks: ['Posting video promosi 9:16', 'Uji 3 variasi hook penawaran', 'Catat pertanyaan umum pembeli'],
      completed: false,
    },
    {
      days: 'Hari 26-30',
      phase: 'Optimization',
      title: 'Evaluasi & Pengembangan Lanjutan',
      targetDescription: 'Menganalisis hasil penjualan, mengumpulkan review, dan merencanakan produk baru.',
      tasks: ['Evaluasi rasio konversi checkout', 'Tambahkan ulasan kepuasan pembeli', 'Rencanakan produk upsell kedua'],
      completed: false,
    },
  ]);

  completedPercentage() {
    const list = this.phases();
    const done = list.filter((p) => p.completed).length;
    return Math.round((done / list.length) * 100);
  }

  togglePhase(days: string) {
    this.phases.update((items) =>
      items.map((p) => (p.days === days ? { ...p, completed: !p.completed } : p))
    );
  }
}
