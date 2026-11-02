import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="faq" class="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div class="text-center space-y-4">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Tanya Jawab Populer</span>
            <span aria-hidden="true">·</span>
            <span>Mudah Dipahami Orang Awam</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Pertanyaan yang Sering Diajukan
          </h2>

          <p class="text-base text-zinc-400 leading-relaxed">
            Punya keraguan atau ingin tahu lebih dalam cara kerja sistem kami? Berikut jawaban langsung tanpa istilah teknis berbelit-belit.
          </p>
        </div>

        <div class="mt-12 space-y-4">
          @for (faq of faqs; track faq.id) {
            <div class="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden transition-colors">
              <button
                type="button"
                (click)="toggleFaq(faq.id)"
                class="w-full flex items-center justify-between p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span class="text-sm sm:text-base font-bold text-white pr-4">{{ faq.question }}</span>
                <mat-icon 
                  class="text-zinc-400 transition-transform duration-200 shrink-0"
                  [class.rotate-180]="openId() === faq.id"
                >
                  expand_more
                </mat-icon>
              </button>

              @if (openId() === faq.id) {
                <div class="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 border-t border-zinc-800/60 leading-relaxed">
                  {{ faq.answer }}
                </div>
              }
            </div>
          }
        </div>

      </div>
    </section>
  `,
})
export class FaqComponent {
  readonly openId = signal<string | null>('faq-1');

  readonly faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Saya orang awam dan tidak paham teknis, apakah bisa menggunakan sistem ini?',
      answer:
        'Sangat bisa! NexusFlow mengusung prinsip "Terima Beres". Seluruh urusan teknis seperti riset pasar, penulisan kalimat penawaran (copywriting), desain visual, hingga integrasi pembayaran bank dikerjakan langsung oleh tim PT. CAHAYA ARSYA GEMILANG. Anda cukup memantau progres lewat dashboard di HP Anda dan menerima uang penjualan yang masuk otomatis ke rekening.',
    },
    {
      id: 'faq-2',
      question: 'Uang pembayaran dari pembeli website saya masuk ke mana?',
      answer:
        '100% uang pembayaran langsung masuk ke rekening bank pribadi atau rekening perusahaan Anda sendiri (BCA, Mandiri, BRI, BNI, dll). NexusFlow tidak memotong persenan dari omset produk Anda.',
    },
    {
      id: 'faq-3',
      question: 'Bagaimana cara kerja pembayaran otomatis tanpa cek mutasi manual?',
      answer:
        'Saat pembeli klik beli di website Anda, sistem menampilkan kode QRIS atau nomor Virtual Account unik. Saat pembeli selesai membayar lewat m-Banking mereka, mesin pembayaran otomatis NexusFlow memverifikasi dalam waktu kurang dari 2 detik. Status pesanan seketika berubah jadi lunas, dan sistem otomatis mengirimkan notifikasi struk ke WhatsApp pembeli tanpa Anda perlu begadang mencocokkan struk mutasi bank.',
    },
    {
      id: 'faq-4',
      question: 'Bagaimana saya bisa memantau perkembangan proyek pembuatan website saya?',
      answer:
        'Anda akan mendapatkan akses ke Dashboard Klien NexusFlow. Di sana, Anda bisa melihat tahapan pengerjaan secara real-time (tahap riset, tahap desain, integrasi pembayaran, hingga quality control), mencoba demo website di server staging, mengajukan tiket revisi jika ada yang ingin disesuaikan, serta mengunduh faktur resmi PT. CAHAYA ARSYA GEMILANG.',
    },
    {
      id: 'faq-5',
      question: 'Berapa lama proses pembuatan sampai website saya siap jualan?',
      answer:
        'Untuk paket Starter Launchpad selesai dalam 3-5 hari kerja. Paket Pro Growth berkisar 7-10 hari kerja. Kami juga menyediakan opsi Jalur Kilat (Express) jika Anda memiliki jadwal peluncuran produk yang mendesak.',
    },
    {
      id: 'faq-6',
      question: 'Apakah ada garansi jika hasilnya tidak sesuai dengan keinginan saya?',
      answer:
        'Tentu saja. Anda mendapatkan garansi revisi sampai puas sesuai paket, didukung kontrak resmi PT. CAHAYA ARSYA GEMILANG, serta pendampingan tutorial pengoperasian website agar Anda tidak merasa ditinggal sendirian.',
    },
  ];

  toggleFaq(id: string) {
    this.openId.update((current) => (current === id ? null : id));
  }
}
