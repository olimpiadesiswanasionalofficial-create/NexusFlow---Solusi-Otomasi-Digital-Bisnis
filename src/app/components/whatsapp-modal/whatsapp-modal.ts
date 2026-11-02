import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-whatsapp-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    @if (projectService.isWhatsAppModalOpen()) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
      >
        <div class="relative w-full max-w-md rounded-2xl border border-zinc-700 bg-zinc-950 p-6 sm:p-7 shadow-2xl space-y-5 text-left">
          
          <div class="flex items-start justify-between pb-3 border-b border-zinc-800">
            <div class="flex items-center gap-2.5">
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                <mat-icon>support_agent</mat-icon>
              </div>
              <div>
                <h3 class="text-base font-bold text-white">Konsultasi Bisnis Gratis</h3>
                <span class="text-xs text-zinc-400">Tim Ahli PT. CAHAYA ARSYA GEMILANG</span>
              </div>
            </div>
            <button
              type="button"
              (click)="close()"
              class="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <mat-icon class="text-base">close</mat-icon>
            </button>
          </div>

          <p class="text-xs text-zinc-300 leading-relaxed">
            Ingin berkonsultasi mengenai produk yang tepat untuk bisnis Anda? Kirimkan pesan singkat, konsultan kami akan memandu Anda dari nol.
          </p>

          <form [formGroup]="chatForm" (ngSubmit)="sendConsultation()" class="space-y-4">
            <div>
              <label for="wa-name-input" class="block text-xs font-semibold text-zinc-300 mb-1">Nama Lengkap / Nama Bisnis:</label>
              <input
                id="wa-name-input"
                type="text"
                formControlName="name"
                placeholder="Contoh: Bpk. Budi - Toko Baju Barokah"
                class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
            </div>

            <div>
              <label for="wa-cat-select" class="block text-xs font-semibold text-zinc-300 mb-1">Bidang Usaha Anda:</label>
              <select id="wa-cat-select" formControlName="category" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
                <option value="Produk Fisik (Fashion/Skincare/Makanan)">Jual Produk Fisik (Fashion / Skincare / Herbal / Makanan)</option>
                <option value="Produk Digital (Ebook/Kelas/Membership)">Jual Produk Digital (Ebook / Video Kelas / Edukasi)</option>
                <option value="Jasa & Konsultasi Perusahaan">Jasa & Profil Perusahaan (B2B / Kantor / Kontraktor)</option>
                <option value="Lainnya">Lainnya / Masih Merencanakan</option>
              </select>
            </div>

            <div>
              <label for="wa-msg-area" class="block text-xs font-semibold text-zinc-300 mb-1">Apa yang Ingin Anda Tanyakan?</label>
              <textarea
                id="wa-msg-area"
                formControlName="message"
                rows="3"
                placeholder="Contoh: Saya ingin website yang bisa terima pembayaran QRIS otomatis langsung masuk ke rekening BCA saya..."
                class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              ></textarea>
            </div>

            @if (isSent()) {
              <div class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 text-center flex items-center justify-center gap-1.5">
                <mat-icon class="text-sm">check_circle</mat-icon>
                <span>Pesan terhubung! Mengarahkan ke WhatsApp Tim Konsultan...</span>
              </div>
            }

            <button
              type="submit"
              [disabled]="chatForm.invalid || isSent()"
              class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 px-4 text-xs font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 transition-all focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <mat-icon class="text-sm">chat</mat-icon>
              <span>Hubungi Tim Konsultan Sekarang</span>
            </button>
          </form>

        </div>
      </div>
    }
  `,
})
export class WhatsAppModalComponent {
  projectService = inject(ProjectService);
  isSent = signal<boolean>(false);

  readonly chatForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    category: new FormControl<string>('Produk Fisik (Fashion/Skincare/Makanan)', { nonNullable: true }),
    message: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  close() {
    this.projectService.closeWhatsAppModal();
    this.isSent.set(false);
  }

  sendConsultation() {
    if (this.chatForm.invalid) return;
    this.isSent.set(true);
    setTimeout(() => {
      this.close();
    }, 2000);
  }
}
