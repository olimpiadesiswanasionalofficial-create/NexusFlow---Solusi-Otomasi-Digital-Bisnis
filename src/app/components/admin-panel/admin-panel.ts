import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PlatformService } from '../../services/platform.service';
import { formatRupiah } from '../../services/project-calculator';

@Component({
  selector: 'app-admin-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      
      <!-- Admin Sidebar -->
      <aside class="w-full md:w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col justify-between shrink-0">
        <div>
          <div class="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-zinc-950 font-extrabold text-sm">
                <mat-icon class="text-base">security</mat-icon>
              </div>
              <div>
                <span class="text-sm font-bold text-white block">NexusFlow Admin</span>
                <span class="text-[10px] text-zinc-400 font-mono">SUPERADMIN PORTAL</span>
              </div>
            </div>

            <button
              type="button"
              (click)="goHome()"
              title="Kembali ke Beranda Publik"
              class="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <mat-icon class="text-sm">logout</mat-icon>
            </button>
          </div>

          <nav class="p-3 space-y-1" aria-label="Menu Admin">
            @for (tab of adminNav; track tab.id) {
              <button
                type="button"
                (click)="platformService.setAdminTab(tab.id)"
                class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left"
                [class.bg-amber-500]="activeTab() === tab.id"
                [class.text-zinc-950]="activeTab() === tab.id"
                [class.text-zinc-400]="activeTab() !== tab.id"
                [class.hover:text-white]="activeTab() !== tab.id"
                [class.hover:bg-zinc-900]="activeTab() !== tab.id"
              >
                <mat-icon class="text-base">{{ tab.icon }}</mat-icon>
                <span>{{ tab.label }}</span>
              </button>
            }
          </nav>
        </div>

        <div class="p-4 border-t border-zinc-800 bg-zinc-950 space-y-2">
          <button
            type="button"
            (click)="goToMemberApp()"
            class="w-full flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <mat-icon class="text-xs text-emerald-400">arrow_back</mat-icon>
            <span>Masuk Member Area</span>
          </button>
          <div class="text-[10px] text-zinc-500 text-center font-mono">
            PT. CAHAYA ARSYA GEMILANG
          </div>
        </div>
      </aside>

      <!-- Main Admin Content Area -->
      <main class="flex-1 min-w-0 bg-zinc-900/20 p-4 sm:p-8 space-y-8 overflow-y-auto">
        
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
          <div>
            <h1 class="text-2xl font-extrabold text-white">
              {{ currentTabTitle() }}
            </h1>
            <span class="text-xs text-zinc-400">
              Panel Pengendalian Sistem, Database, Pembayaran & Konfigurasi Brand
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              DB STATUS: CONNECTED (POSTGRES / CLOUD)
            </span>
          </div>
        </div>

        <!-- 1. DASHBOARD OVERVIEW -->
        @if (activeTab() === 'dashboard') {
          <div class="space-y-6">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-1">
                <span class="text-xs text-zinc-400">Total Pengguna Terdaftar</span>
                <div class="text-2xl font-extrabold text-white font-mono">{{ platformService.stats().totalUsers }}</div>
                <span class="text-[11px] text-emerald-400">+12 minggu ini</span>
              </div>

              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-1">
                <span class="text-xs text-zinc-400">Total Transaksi Selesai</span>
                <div class="text-2xl font-extrabold text-emerald-400 font-mono">{{ platformService.stats().successfulOrders }} Order</div>
                <span class="text-[11px] text-zinc-500">100% Terverifikasi</span>
              </div>

              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-1">
                <span class="text-xs text-zinc-400">Total Pendapatan Bersih</span>
                <div class="text-2xl font-extrabold text-white font-mono">{{ formatIdr(platformService.stats().totalRevenue) }}</div>
                <span class="text-[11px] text-emerald-400">Cair Langsung ke Rekening</span>
              </div>

              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-1">
                <span class="text-xs text-zinc-400">Tiket Bantuan Terbuka</span>
                <div class="text-2xl font-extrabold text-amber-400 font-mono">{{ platformService.stats().openTickets }}</div>
                <span class="text-[11px] text-zinc-500">SLA Respons < 2 Jam</span>
              </div>
            </div>

            <!-- Recent Orders Table -->
            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
              <div class="flex justify-between items-center pb-2 border-b border-zinc-800">
                <h3 class="text-sm font-bold text-white">Transaksi Pesanan Terbaru</h3>
                <span class="text-xs text-emerald-400 font-mono">Gateway Otomatis</span>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="text-zinc-500 font-mono border-b border-zinc-800">
                    <tr>
                      <th class="py-2.5">No. Order</th>
                      <th>Nama Klien</th>
                      <th>Paket / Produk</th>
                      <th>Total</th>
                      <th>Metode</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-zinc-800/60 text-zinc-300">
                    @for (ord of platformService.orders(); track ord.id) {
                      <tr>
                        <td class="py-3 font-mono text-white font-bold">{{ ord.orderNumber }}</td>
                        <td>{{ ord.userName }}</td>
                        <td>{{ ord.productName }}</td>
                        <td class="font-mono text-emerald-400 font-semibold">{{ formatIdr(ord.total) }}</td>
                        <td>{{ ord.paymentMethod }}</td>
                        <td>
                          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400">
                            {{ ord.status }}
                          </span>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }

        <!-- 2. USER MANAGEMENT -->
        @if (activeTab() === 'users') {
          <div class="space-y-6">
            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
              <div class="flex justify-between items-center">
                <h3 class="text-sm font-bold text-white">Manajemen Akun Anggota</h3>
                <span class="text-xs text-zinc-400">{{ platformService.stats().totalUsers }} Pengguna Terdaftar</span>
              </div>

              <div class="space-y-3">
                <div class="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <img 
                      [src]="platformService.currentUser().avatarUrl" 
                      alt="avatar" 
                      class="h-10 w-10 rounded-xl object-cover"
                      referrerpolicy="no-referrer"
                    >
                    <div>
                      <strong class="text-sm text-white block">{{ platformService.currentUser().name }}</strong>
                      <span class="text-xs text-zinc-400">{{ platformService.currentUser().email }} · {{ platformService.currentUser().phone }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
                      {{ platformService.currentUser().status }}
                    </span>
                    <button type="button" class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300">
                      Kelola Hak Akses
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- 3. BRANDING & CMS CONFIGURATION -->
        @if (activeTab() === 'branding' || activeTab() === 'cms') {
          <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6">
            <div>
              <h3 class="text-lg font-bold text-white">Konfigurasi Identitas Brand Global</h3>
              <p class="text-xs text-zinc-400 mt-1">
                Seluruh halaman landing page, dashboard klien, checkout, dan struk faktur dikontrol dari konfigurasi ini tanpa perlu mengubah kode sumber.
              </p>
            </div>

            <form [formGroup]="brandForm" class="space-y-4 max-w-2xl">
              <div>
                <label for="adm-brand" class="block text-xs font-semibold text-zinc-300 mb-1">Nama Brand:</label>
                <input id="adm-brand" type="text" formControlName="brandName" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white">
              </div>

              <div>
                <label for="adm-legal" class="block text-xs font-semibold text-zinc-300 mb-1">Nama Entitas Legal PT:</label>
                <input id="adm-legal" type="text" formControlName="legalName" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white">
              </div>

              <div>
                <label for="adm-tagline" class="block text-xs font-semibold text-zinc-300 mb-1">Tagline Bisnis:</label>
                <input id="adm-tagline" type="text" formControlName="tagline" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white">
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="adm-email" class="block text-xs font-semibold text-zinc-300 mb-1">Email Dukungan:</label>
                  <input id="adm-email" type="email" formControlName="email" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white">
                </div>
                <div>
                  <label for="adm-wa" class="block text-xs font-semibold text-zinc-300 mb-1">WhatsApp Resmi:</label>
                  <input id="adm-wa" type="text" formControlName="whatsapp" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-xs text-white">
                </div>
              </div>

              <div class="pt-2 flex items-center gap-4">
                <button
                  type="button"
                  (click)="saveBrandSettings()"
                  class="rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-xs font-bold text-zinc-950 transition-colors"
                >
                  Simpan Perubahan Konfigurasi
                </button>
                @if (saveSuccess()) {
                  <span class="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                    <mat-icon class="text-sm">check_circle</mat-icon>
                    Konfigurasi berhasil disimpan!
                  </span>
                }
              </div>
            </form>
          </div>
        }

        <!-- 4. SUPPORT MANAGEMENT -->
        @if (activeTab() === 'support') {
          <div class="space-y-4">
            <h3 class="text-sm font-bold text-white">Daftar Tiket Bantuan Klien</h3>
            @for (ticket of platformService.supportTickets(); track ticket.id) {
              <div class="p-5 rounded-2xl border border-zinc-800 bg-zinc-950 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-mono text-amber-400 font-bold">{{ ticket.id }} · {{ ticket.category }}</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400">
                    {{ ticket.status }}
                  </span>
                </div>
                <h4 class="text-sm font-bold text-white">{{ ticket.subject }}</h4>
                <p class="text-xs text-zinc-400">Pengirim: {{ ticket.userName }} ({{ ticket.userEmail }})</p>
                <div class="text-[11px] text-zinc-500">{{ ticket.createdAt }}</div>
              </div>
            }
          </div>
        }

      </main>

    </div>
  `,
})
export class AdminPanelComponent {
  platformService = inject(PlatformService);
  readonly activeTab = this.platformService.adminTabActive;

  readonly adminNav = [
    { id: 'dashboard', label: 'Ringkasan Dashboard', icon: 'dashboard' },
    { id: 'users', label: 'Kelola Pengguna', icon: 'people' },
    { id: 'orders', label: 'Kelola Transaksi', icon: 'receipt_long' },
    { id: 'branding', label: 'Konfigurasi Brand', icon: 'branding_watermark' },
    { id: 'cms', label: 'Manajemen Konten', icon: 'edit_note' },
    { id: 'support', label: 'Kelola Tiket Bantuan', icon: 'support_agent' },
  ];

  readonly brandForm = new FormGroup({
    brandName: new FormControl<string>('NexusFlow', { nonNullable: true }),
    legalName: new FormControl<string>('PT. CAHAYA ARSYA GEMILANG', { nonNullable: true }),
    tagline: new FormControl<string>('Sistem Digital & Pembayaran Otomatis', { nonNullable: true }),
    email: new FormControl<string>('halo@nexusflow.id', { nonNullable: true }),
    whatsapp: new FormControl<string>('+62 821-4567-8901', { nonNullable: true }),
  });

  currentTabTitle(): string {
    const found = this.adminNav.find((t) => t.id === this.activeTab());
    return found ? found.label : 'Admin Control Panel';
  }

  formatIdr(val: number): string {
    return formatRupiah(val);
  }

  goHome() {
    this.platformService.setView('landing');
  }

  goToMemberApp() {
    this.platformService.setView('member');
  }

  saveSuccess = signal(false);

  saveBrandSettings() {
    this.saveSuccess.set(true);
    setTimeout(() => {
      this.saveSuccess.set(false);
    }, 3000);
  }
}
