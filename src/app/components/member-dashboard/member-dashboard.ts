import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PlatformService } from '../../services/platform.service';
import { formatRupiah } from '../../services/project-calculator';
import { CopywritingDraft } from '../../models/platform.model';

@Component({
  selector: 'app-member-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row">
      
      <!-- SIDEBAR (16 Menus as required by PDF) -->
      <aside class="w-full md:w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col justify-between shrink-0">
        <div>
          <!-- Brand Logo Header -->
          <div class="p-5 border-b border-zinc-800 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-zinc-950 font-extrabold text-sm">
                NF
              </div>
              <div>
                <span class="text-sm font-bold text-white block">NexusFlow App</span>
                <span class="text-[10px] text-zinc-400 font-mono">MEMBER AREA</span>
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

          <!-- User Card Brief -->
          <div class="p-4 border-b border-zinc-800 bg-zinc-900/40 flex items-center gap-3">
            <img 
              [src]="user.avatarUrl" 
              [alt]="user.name"
              class="h-10 w-10 rounded-xl object-cover border border-zinc-700"
              referrerpolicy="no-referrer"
            >
            <div class="overflow-hidden">
              <span class="text-xs font-bold text-white block truncate">{{ user.name }}</span>
              <span class="text-[10px] text-emerald-400 font-medium block">{{ user.plan }} Active</span>
            </div>
          </div>

          <!-- 16 Navigation Menu Items -->
          <nav class="p-3 space-y-1 max-h-[calc(100vh-210px)] overflow-y-auto" aria-label="Sidebar Member">
            @for (item of sidebarMenus; track item.id) {
              <button
                type="button"
                (click)="platformService.setMemberTab(item.id)"
                class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left"
                [class.bg-emerald-500]="activeTab() === item.id"
                [class.text-zinc-950]="activeTab() === item.id"
                [class.text-zinc-400]="activeTab() !== item.id"
                [class.hover:text-white]="activeTab() !== item.id"
                [class.hover:bg-zinc-900]="activeTab() !== item.id"
              >
                <mat-icon class="text-base">{{ item.icon }}</mat-icon>
                <span>{{ item.label }}</span>
              </button>
            }
          </nav>
        </div>

        <!-- Sidebar Bottom Footer -->
        <div class="p-4 border-t border-zinc-800 bg-zinc-950 space-y-2">
          <button
            type="button"
            (click)="goToAdmin()"
            class="w-full flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <mat-icon class="text-xs text-amber-400">admin_panel_settings</mat-icon>
            <span>Buka Panel Admin</span>
          </button>
          <div class="text-[10px] text-zinc-500 text-center font-mono">
            PT. CAHAYA ARSYA GEMILANG
          </div>
        </div>
      </aside>

      <!-- MAIN CONTENT AREA -->
      <main class="flex-1 min-w-0 bg-zinc-900/20 p-4 sm:p-8 space-y-8 overflow-y-auto">
        
        <!-- TOP HEADER BAR -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
          <div>
            <h1 class="text-2xl font-extrabold text-white capitalize">
              {{ currentMenuLabel() }}
            </h1>
            <span class="text-xs text-zinc-400">
              Sistem SaaS NexusFlow · Status Sistem: 100% Operasional
            </span>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-300">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Gateway QRIS Aktif</span>
            </div>
            <button
              type="button"
              (click)="createNewProduct()"
              class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors"
            >
              <mat-icon class="text-xs">add</mat-icon>
              <span>Buat Produk Baru</span>
            </button>
          </div>
        </div>

        <!-- 1. DASHBOARD OVERVIEW TAB -->
        @if (activeTab() === 'dashboard') {
          <div class="space-y-6">
            <!-- Summary Stats -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-1">
                <span class="text-xs text-zinc-400">Total Produk Anda</span>
                <div class="text-2xl font-extrabold text-white font-mono">{{ platformService.digitalProducts().length }}</div>
                <span class="text-[11px] text-emerald-400">Siap Ditransaksikan</span>
              </div>

              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-1">
                <span class="text-xs text-zinc-400">Karyawan AI Aktif</span>
                <div class="text-2xl font-extrabold text-white font-mono">5 Worker</div>
                <span class="text-[11px] text-emerald-400">100% Terkoordinasi</span>
              </div>

              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-1">
                <span class="text-xs text-zinc-400">Total Omset Penjualan</span>
                <div class="text-2xl font-extrabold text-emerald-400 font-mono">{{ formatIdr(54570000) }}</div>
                <span class="text-[11px] text-zinc-500">230 Pembeli Otomatis</span>
              </div>

              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-1">
                <span class="text-xs text-zinc-400">Aset Konten Tersimpan</span>
                <div class="text-2xl font-extrabold text-cyan-400 font-mono">{{ platformService.gallery().length }} Berkas</div>
                <span class="text-[11px] text-zinc-500">Logo, Banner, Skrip</span>
              </div>
            </div>

            <!-- AI Workers Quick Status -->
            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-zinc-800">
                <h3 class="text-sm font-bold text-white">Pipeline AI Workers Saat Ini</h3>
                <span class="text-xs text-emerald-400 font-mono">Pipeline #894</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
                @for (w of platformService.aiWorkers(); track w.id) {
                  <div class="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/60 space-y-2 text-xs">
                    <div class="flex items-center gap-2">
                      <img [src]="w.avatar" [alt]="w.name" class="h-8 w-8 rounded-lg object-cover" referrerpolicy="no-referrer">
                      <div class="truncate">
                        <strong class="text-white block truncate">{{ w.name }}</strong>
                        <span class="text-[10px] text-zinc-400">{{ w.position }}</span>
                      </div>
                    </div>
                    <div class="flex justify-between text-[10px] font-mono text-zinc-400">
                      <span>{{ w.status }}</span>
                      <span>{{ w.progress }}%</span>
                    </div>
                    <div class="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div class="bg-emerald-500 h-full rounded-full" [style.width.%]="w.progress"></div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Digital Products List -->
            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
              <h3 class="text-sm font-bold text-white">Produk Digital yang Siap Dijual</h3>
              <div class="space-y-3">
                @for (prod of platformService.digitalProducts(); track prod.id) {
                  <div class="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div class="space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-white">{{ prod.name }}</span>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 uppercase">
                          {{ prod.status }}
                        </span>
                      </div>
                      <p class="text-xs text-zinc-400">{{ prod.description }}</p>
                      <span class="text-[11px] font-mono text-zinc-500">File: {{ prod.fileOutput }}</span>
                    </div>

                    <div class="flex items-center gap-4 shrink-0">
                      <div class="text-left sm:text-right">
                        <span class="text-xs text-zinc-400 block">Harga:</span>
                        <span class="text-sm font-bold text-emerald-400 font-mono">{{ formatIdr(prod.price) }}</span>
                      </div>
                      <a 
                        [href]="prod.landingPageUrl" 
                        target="_blank"
                        class="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
                      >
                        Buka Web
                      </a>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }

        <!-- 2. MY PRODUCTS TAB -->
        @if (activeTab() === 'products') {
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              @for (prod of platformService.digitalProducts(); track prod.id) {
                <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3 flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-start">
                      <span class="text-[10px] font-mono text-emerald-400 font-bold uppercase">{{ prod.category }}</span>
                      <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        {{ prod.status }}
                      </span>
                    </div>
                    <h4 class="text-base font-bold text-white mt-2">{{ prod.name }}</h4>
                    <p class="text-xs text-zinc-400 mt-1 leading-relaxed">{{ prod.description }}</p>
                  </div>

                  <div class="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <div>
                      <span class="text-[10px] text-zinc-400 block">Penjualan:</span>
                      <span class="text-xs font-bold text-white">{{ prod.salesCount }} Transaksi</span>
                    </div>
                    <div class="text-right">
                      <span class="text-[10px] text-zinc-400 block">Harga:</span>
                      <span class="text-sm font-bold text-emerald-400 font-mono">{{ formatIdr(prod.price) }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- 3. AI RESEARCH TAB -->
        @if (activeTab() === 'research') {
          <div class="space-y-6">
            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
              <h3 class="text-sm font-bold text-white">Jalankan Analisis AI Research Baru</h3>
              <div class="flex gap-2">
                <input 
                  type="text" 
                  #memberNiche
                  placeholder="Masukkan kata kunci niche (contoh: Template Excel Keuangan Warung)..."
                  class="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                <button
                  type="button"
                  (click)="platformService.generateAiResearch(memberNiche.value)"
                  class="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors shrink-0"
                >
                  Analisis Celah Pasar
                </button>
              </div>
            </div>

            <div class="space-y-4">
              @for (idea of platformService.researchIdeas(); track idea.id) {
                <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
                  <div class="flex justify-between items-start">
                    <div>
                      <span class="text-[10px] font-mono text-emerald-400 uppercase font-semibold">NICHE: {{ idea.niche }}</span>
                      <h4 class="text-base font-bold text-white mt-1">{{ idea.productName }}</h4>
                    </div>
                    <span class="text-xl font-extrabold text-emerald-400 font-mono">{{ idea.opportunityScore }}/100</span>
                  </div>
                  <p class="text-xs text-zinc-300">{{ idea.problemSolved }}</p>
                  <div class="text-[11px] text-zinc-500 italic">{{ idea.methodologyNote }}</div>
                </div>
              }
            </div>
          </div>
        }

        <!-- 4. COPYWRITER TAB -->
        @if (activeTab() === 'copywriter') {
          <div class="space-y-6">
            <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
              <h3 class="text-sm font-bold text-white">Generator Naskah Copywriting</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select #memCopyType class="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white">
                  <option value="hook">Hook Iklan Video (3 Detik Pertama)</option>
                  <option value="sales_page">Naskah Lengkap Landing Page</option>
                  <option value="facebook_ads">Instagram / Meta Ads Naskah</option>
                </select>
                <select #memCopyAngle class="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white">
                  <option value="Problem-Agitation">Problem-Agitation</option>
                  <option value="Direct-Offer">Direct-Offer</option>
                  <option value="FOMO">FOMO</option>
                </select>
              </div>
              <button
                type="button"
                (click)="createCopyDraft(memCopyType.value, memCopyAngle.value)"
                class="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400"
              >
                Buat Naskah Baru
              </button>
            </div>

            <div class="space-y-4">
              @for (c of platformService.copyDrafts(); track c.id) {
                <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-2">
                  <span class="text-xs font-mono text-emerald-400 font-bold uppercase">{{ c.angle }} · {{ c.type }}</span>
                  <h4 class="text-sm font-bold text-white">{{ c.headline }}</h4>
                  <p class="text-xs text-zinc-300 leading-relaxed">{{ c.body }}</p>
                  <span class="text-xs text-emerald-400 block pt-1">Call to Action: "{{ c.cta }}"</span>
                </div>
              }
            </div>
          </div>
        }

        <!-- 5. GALLERY TAB -->
        @if (activeTab() === 'gallery') {
          <div class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              @for (item of platformService.gallery(); track item.id) {
                <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3 flex flex-col justify-between">
                  <div class="space-y-2">
                    <span class="text-[10px] font-mono text-emerald-400 uppercase font-semibold">{{ item.category }}</span>
                    <h4 class="text-xs font-bold text-white">{{ item.name }}</h4>
                    <span class="text-[11px] text-zinc-400 block">{{ item.fileType }} · {{ item.size }}</span>
                  </div>
                  <div class="pt-3 border-t border-zinc-800/80 flex justify-between items-center text-xs">
                    <span class="text-[10px] text-zinc-500">{{ item.date }}</span>
                    <button type="button" class="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 font-semibold text-zinc-200 transition-colors">
                      Unduh
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- 6. ACADEMY TAB -->
        @if (activeTab() === 'academy') {
          <div class="space-y-6">
            @for (mod of platformService.academyModules(); track mod.id) {
              <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-bold text-white">{{ mod.title }}</h3>
                  <span class="text-xs text-emerald-400 font-mono">{{ mod.duration }}</span>
                </div>
                <p class="text-xs text-zinc-400">{{ mod.description }}</p>

                <div class="space-y-2 pt-2">
                  @for (l of mod.lessons; track l.id) {
                    <div class="flex items-center justify-between p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                      <div class="flex items-center gap-2">
                        <button
                          type="button"
                          (click)="platformService.toggleLessonComplete(mod.id, l.id)"
                          class="text-emerald-400"
                        >
                          <mat-icon class="text-sm">{{ l.completed ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>
                        </button>
                        <span [class.line-through]="l.completed" [class.text-zinc-500]="l.completed">{{ l.title }}</span>
                      </div>
                      <span class="text-[11px] font-mono text-zinc-500">{{ l.duration }}</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        }

        <!-- 7. AI MENTOR TAB -->
        @if (activeTab() === 'mentor') {
          <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4 flex flex-col h-[600px]">
            <div class="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
              <div class="flex items-center gap-2.5">
                <mat-icon class="text-emerald-400">psychology</mat-icon>
                <h3 class="text-sm font-bold text-white">AI Mentor Private Assistant</h3>
              </div>
              <span class="text-xs text-emerald-400 font-mono">Tersedia 24 Jam</span>
            </div>

            <div class="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
              @for (m of platformService.mentorMessages(); track m.text) {
                <div 
                  class="flex flex-col"
                  [class.items-end]="m.sender === 'user'"
                  [class.items-start]="m.sender === 'mentor'"
                >
                  <div 
                    class="max-w-lg rounded-2xl p-4 leading-relaxed"
                    [class.bg-emerald-500]="m.sender === 'user'"
                    [class.text-zinc-950]="m.sender === 'user'"
                    [class.bg-zinc-900]="m.sender === 'mentor'"
                    [class.text-zinc-200]="m.sender === 'mentor'"
                  >
                    {{ m.text }}
                  </div>
                  <span class="text-[10px] text-zinc-500 mt-0.5 px-1">{{ m.time }}</span>
                </div>
              }
            </div>

            <div class="flex gap-2 shrink-0 pt-2 border-t border-zinc-800">
              <input 
                type="text" 
                #dashMentorInput
                (keydown.enter)="onMentorSend(dashMentorInput)"
                placeholder="Ketik pertanyaan strategi bisnis..."
                class="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
              <button 
                type="button"
                (click)="onMentorSend(dashMentorInput)"
                class="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400"
              >
                Kirim
              </button>
            </div>
          </div>
        }

        <!-- 8. SUPPORT & SETTINGS TABS (Fallback for other menus) -->
        @if (activeTab() === 'support' || activeTab() === 'settings' || activeTab() === 'team' || activeTab() === 'image' || activeTab() === 'video' || activeTab() === 'avatar' || activeTab() === 'brand' || activeTab() === 'tools' || activeTab() === 'landing_page') {
          <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center space-y-4">
            <mat-icon class="text-4xl text-emerald-400">check_circle</mat-icon>
            <h3 class="text-lg font-bold text-white capitalize">Modul {{ currentMenuLabel() }} Aktif</h3>
            <p class="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              Modul ini terhubung langsung ke mesin generasi AI dan sistem hosting Anda. Anda dapat mengelola parameter operasional kapan saja.
            </p>
            <button
              type="button"
              (click)="platformService.setMemberTab('dashboard')"
              class="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors"
            >
              <mat-icon class="text-xs">arrow_back</mat-icon>
              <span>Kembali ke Ringkasan Dashboard</span>
            </button>
          </div>
        }

      </main>

    </div>
  `,
})
export class MemberDashboardComponent {
  platformService = inject(PlatformService);
  user = this.platformService.currentUser();

  readonly activeTab = this.platformService.memberSidebarActive;

  readonly sidebarMenus = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'products', label: 'My Products', icon: 'inventory_2' },
    { id: 'research', label: 'AI Research', icon: 'insights' },
    { id: 'team', label: 'AI Team', icon: 'groups' },
    { id: 'copywriter', label: 'Copywriter', icon: 'edit_note' },
    { id: 'image', label: 'Image Generator', icon: 'palette' },
    { id: 'video', label: 'Video Generator', icon: 'videocam' },
    { id: 'avatar', label: 'Avatar Library', icon: 'face' },
    { id: 'brand', label: 'Brand Creator', icon: 'branding_watermark' },
    { id: 'tools', label: 'Tool Factory', icon: 'handyman' },
    { id: 'landing_page', label: 'Landing Page', icon: 'web' },
    { id: 'gallery', label: 'Gallery Aset', icon: 'folder_open' },
    { id: 'academy', label: 'Academy', icon: 'school' },
    { id: 'mentor', label: 'AI Mentor', icon: 'psychology' },
    { id: 'support', label: 'Support & Tiket', icon: 'support_agent' },
    { id: 'settings', label: 'Pengaturan Akun', icon: 'settings' },
  ];

  currentMenuLabel(): string {
    const found = this.sidebarMenus.find((m) => m.id === this.activeTab());
    return found ? found.label : 'Member Dashboard';
  }

  formatIdr(val: number): string {
    return formatRupiah(val);
  }

  goHome() {
    this.platformService.setView('landing');
  }

  goToAdmin() {
    this.platformService.setView('admin');
  }

  createNewProduct() {
    this.platformService.setMemberTab('research');
  }

  createCopyDraft(type: string, angle: string) {
    this.platformService.generateCopywriting(type as CopywritingDraft['type'], angle as CopywritingDraft['angle'], 'Produk Bisnis Unggulan');
  }

  onMentorSend(input: HTMLInputElement) {
    if (input.value) {
      this.platformService.sendMentorMessage(input.value);
      input.value = '';
    }
  }
}
