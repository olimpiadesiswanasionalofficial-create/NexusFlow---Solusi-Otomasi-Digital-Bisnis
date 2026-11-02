import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-announcement-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    @if (isVisible()) {
      <aside aria-label="Pengumuman promo" class="relative z-50 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-zinc-950 px-4 py-2 text-xs font-semibold shadow-sm">
        <div class="mx-auto max-w-7xl flex items-center justify-between gap-3">
          <div class="flex-1 flex items-center justify-center gap-2 text-center flex-wrap">
            <span class="rounded bg-black/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
              PROMO SPESIAL
            </span>
            <span class="text-zinc-950 font-bold">
              Miliki Karyawan AI Anda Sekarang · Biaya Langganan Hanya 99 Ribu Saja Perbulan (Rp 99.000/bln) + Pembayaran Otomatis QRIS Aktif!
            </span>
            <button
              type="button"
              (click)="goToCheckout()"
              class="inline-flex items-center gap-1 underline hover:text-white transition-colors cursor-pointer ml-1"
            >
              <span>Miliki Sekarang</span>
              <mat-icon class="text-xs">arrow_forward</mat-icon>
            </button>
          </div>
          <button
            type="button"
            (click)="close()"
            aria-label="Tutup bar pengumuman"
            class="p-1 rounded hover:bg-black/10 transition-colors shrink-0"
          >
            <mat-icon class="text-sm">close</mat-icon>
          </button>
        </div>
      </aside>
    }
  `,
})
export class AnnouncementBarComponent {
  platformService = inject(PlatformService);
  isVisible = signal<boolean>(true);

  close() {
    this.isVisible.set(false);
  }

  goToCheckout() {
    this.platformService.setView('checkout');
  }
}
