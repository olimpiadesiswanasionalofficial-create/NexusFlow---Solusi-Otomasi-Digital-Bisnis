import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PlatformService } from '../../services/platform.service';
import { formatRupiah } from '../../services/project-calculator';
import { CopywritingDraft } from '../../models/platform.model';

@Component({
  selector: 'app-interactive-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <section id="demo-aplikasi" class="py-20 bg-zinc-950 border-b border-zinc-800/80">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div class="max-w-3xl mx-auto text-center space-y-4">
          <div class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <span>Uji Coba Langsung Tanpa Login</span>
            <span aria-hidden="true">·</span>
            <span>Simulasi Aplikasi Asli</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Demonstrasi Aplikasi Interaktif NexusFlow
          </h2>

          <p class="text-base text-zinc-400 leading-relaxed">
            Rasakan langsung bagaimana Anda mengendalikan 5 modul AI, menghasilkan naskah promosi, 
            menguji kalkulator bisnis, hingga membuat avatar AI tanpa perlu mendaftar terlebih dahulu.
          </p>
        </div>

        <!-- Demo Window Shell (Simulasi Browser & Smartphone) -->
        <div class="mt-12 max-w-6xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">
          
          <!-- Top Window Navigation Bar -->
          <div class="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 border-b border-zinc-800 bg-zinc-950 gap-3">
            <div class="flex items-center gap-3">
              <div class="flex gap-1.5">
                <div class="h-3 w-3 rounded-full bg-rose-500/80"></div>
                <div class="h-3 w-3 rounded-full bg-amber-500/80"></div>
                <div class="h-3 w-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div class="hidden sm:flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-mono text-zinc-400">
                <mat-icon class="text-xs text-emerald-400">lock</mat-icon>
                <span>app.nexusflow.id/demo/{{ activeSubTab() }}</span>
              </div>
            </div>

            <!-- Viewport Switcher (Desktop vs Mobile 390px) -->
            <div class="flex items-center gap-2">
              <span class="rounded bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                MODE SIMULASI DEMO
              </span>

              <div class="flex items-center gap-1 p-0.5 rounded-lg border border-zinc-800 bg-zinc-900">
                <button
                  type="button"
                  (click)="setViewport('desktop')"
                  class="px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors"
                  [class.bg-zinc-800]="viewport() === 'desktop'"
                  [class.text-white]="viewport() === 'desktop'"
                  [class.text-zinc-400]="viewport() !== 'desktop'"
                >
                  <mat-icon class="text-xs">laptop</mat-icon>
                  <span class="hidden sm:inline">Desktop</span>
                </button>

                <button
                  type="button"
                  (click)="setViewport('mobile')"
                  class="px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors"
                  [class.bg-zinc-800]="viewport() === 'mobile'"
                  [class.text-white]="viewport() === 'mobile'"
                  [class.text-zinc-400]="viewport() !== 'mobile'"
                >
                  <mat-icon class="text-xs">phone_iphone</mat-icon>
                  <span class="hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Demo Inner Menu Tabs -->
          <div class="border-b border-zinc-800 bg-zinc-950/70 overflow-x-auto">
            <nav class="flex space-x-1 p-2 sm:px-4 min-w-max" aria-label="Menu Demo">
              @for (item of demoMenuItems; track item.id) {
                <button
                  type="button"
                  (click)="activeSubTab.set(item.id)"
                  class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap"
                  [class.bg-emerald-500]="activeSubTab() === item.id"
                  [class.text-zinc-950]="activeSubTab() === item.id"
                  [class.text-zinc-400]="activeSubTab() !== item.id"
                  [class.hover:text-white]="activeSubTab() !== item.id"
                  [class.hover:bg-zinc-800]="activeSubTab() !== item.id"
                >
                  <mat-icon class="text-sm">{{ item.icon }}</mat-icon>
                  <span>{{ item.label }}</span>
                </button>
              }
            </nav>
          </div>

          <!-- Dynamic Viewport Area -->
          <div class="p-4 sm:p-6 bg-zinc-950/40 flex justify-center min-h-[580px] overflow-y-auto">
            <div 
              class="transition-all duration-300 w-full"
              [class.max-w-4xl]="viewport() === 'desktop'"
              [class.max-w-[390px]]="viewport() === 'mobile'"
              [class.border]="viewport() === 'mobile'"
              [class.border-zinc-800]="viewport() === 'mobile'"
              [class.rounded-2xl]="viewport() === 'mobile'"
              [class.p-4]="viewport() === 'mobile'"
              [class.bg-zinc-950]="viewport() === 'mobile'"
            >
              
              <!-- SUBTAB 1: DASHBOARD PREVIEW -->
              @if (activeSubTab() === 'beranda') {
                <div class="space-y-6">
                  <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span class="text-xs text-zinc-400 block font-mono">SIMULASI ANGGOTA AKTIF</span>
                      <h3 class="text-xl font-bold text-white mt-1">Selamat datang kembali, Bpk. Ridwan Santoso!</h3>
                      <p class="text-xs text-zinc-400 mt-0.5">5 Karyawan AI Anda siap menerima arahan bisnis hari ini.</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span class="text-xs text-emerald-400 font-bold">5 AI Worker Aktif</span>
                    </div>
                  </div>

                  <!-- Quick Stats Cards -->
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                      <span class="text-[11px] text-zinc-400 block">Produk Aktif</span>
                      <span class="text-xl font-extrabold text-white mt-1 block">3 Produk</span>
                      <span class="text-[10px] text-emerald-400 mt-1 block">+1 dalam pengerjaan</span>
                    </div>
                    <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                      <span class="text-[11px] text-zinc-400 block">Total Penjualan</span>
                      <span class="text-xl font-extrabold text-emerald-400 font-mono mt-1 block">Rp 54.570.000</span>
                      <span class="text-[10px] text-zinc-500 mt-1 block">230 transaksi QRIS</span>
                    </div>
                    <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                      <span class="text-[11px] text-zinc-400 block">Konten Dibuat</span>
                      <span class="text-xl font-extrabold text-white mt-1 block">18 Berkas</span>
                      <span class="text-[10px] text-zinc-500 mt-1 block">Naskah, banner, video</span>
                    </div>
                    <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                      <span class="text-[11px] text-zinc-400 block">Status Kasir</span>
                      <span class="text-xl font-extrabold text-cyan-400 mt-1 block">24 Jam</span>
                      <span class="text-[10px] text-emerald-400 mt-1 block">Webhook: Terhubung</span>
                    </div>
                  </div>

                  <!-- Recent AI Activity -->
                  <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                    <div class="flex items-center justify-between text-xs font-semibold text-white">
                      <span>Aktivitas Terakhir Tim AI Anda</span>
                      <span class="text-emerald-400 font-normal">Real-Time Sync</span>
                    </div>
                    <ul class="space-y-2 text-xs text-zinc-300">
                      <li class="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800/60">
                        <span class="flex items-center gap-2">
                          <mat-icon class="text-emerald-400 text-sm">check_circle</mat-icon>
                          <span>Karin (AI Copywriter) menyelesaikan 15 Hook Iklan Meta Ads</span>
                        </span>
                        <span class="text-[10px] font-mono text-zinc-500">10 mnt lalu</span>
                      </li>
                      <li class="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800/60">
                        <span class="flex items-center gap-2">
                          <mat-icon class="text-cyan-400 text-sm">sync</mat-icon>
                          <span>Rizky (AI Product Builder) sedang memproses template web-app</span>
                        </span>
                        <span class="text-[10px] font-mono text-zinc-500">Sedang jalan</span>
                      </li>
                    </ul>
                  </div>
                </div>
              }

              <!-- SUBTAB 2: AI RESEARCH -->
              @if (activeSubTab() === 'research') {
                <div class="space-y-5">
                  <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
                    <h3 class="text-base font-bold text-white">Mesin AI Riset Pasar Indonesia</h3>
                    <p class="text-xs text-zinc-400 leading-relaxed">
                      Ketikkan topik atau niche yang ingin Anda uji. Sistem akan menganalisis tren pencarian, masalah pasar yang belum terpecahkan, dan skor peluang keuntungannya.
                    </p>

                    <div class="flex flex-col sm:flex-row gap-2 pt-1">
                      <input 
                        type="text" 
                        #nicheInput
                        [value]="currentNicheInput()"
                        (input)="currentNicheInput.set(nicheInput.value)"
                        placeholder="Contoh: Alat bantu perhitungan keuntungan untuk seller marketplace" 
                        class="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                      >
                      <button
                        type="button"
                        (click)="runResearch(nicheInput.value)"
                        [disabled]="isResearching()"
                        class="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5 shrink-0"
                      >
                        <mat-icon class="text-sm">{{ isResearching() ? 'sync' : 'auto_awesome' }}</mat-icon>
                        <span>{{ isResearching() ? 'Menganalisis Niche...' : 'Jalankan Riset AI' }}</span>
                      </button>
                    </div>
                  </div>

                  <!-- Research Results -->
                  <div class="space-y-4">
                    @for (idea of platformService.researchIdeas(); track idea.id) {
                      <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                        <div class="flex items-start justify-between gap-4">
                          <div>
                            <span class="text-[11px] font-mono text-emerald-400 font-semibold block">NICHE: {{ idea.niche }}</span>
                            <h4 class="text-sm font-bold text-white mt-1">{{ idea.productName }}</h4>
                          </div>
                          <div class="text-right shrink-0">
                            <span class="text-[10px] text-zinc-400 block font-mono">Skor Peluang:</span>
                            <span class="text-lg font-extrabold text-emerald-400 font-mono">{{ idea.opportunityScore }}/100</span>
                          </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-300 pt-1">
                          <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80">
                            <strong class="text-white block mb-0.5">Masalah yang Diselesaikan:</strong>
                            <span class="text-zinc-400">{{ idea.problemSolved }}</span>
                          </div>
                          <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80">
                            <strong class="text-white block mb-0.5">Target Pembeli Ideal:</strong>
                            <span class="text-zinc-400">{{ idea.targetMarket }}</span>
                          </div>
                        </div>

                        <div class="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-zinc-800/60 gap-2">
                          <div class="flex items-center gap-2">
                            <span class="text-zinc-400">Rekomendasi Harga:</span>
                            <span class="font-bold text-emerald-400 font-mono">{{ formatIdr(idea.suggestedPrice) }}</span>
                          </div>
                          <span class="text-[11px] text-zinc-500 italic">{{ idea.methodologyNote }}</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- SUBTAB 3: AI WORKER STATUS -->
              @if (activeSubTab() === 'team') {
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-base font-bold text-white">Status 5 Karyawan AI Anda</h3>
                      <p class="text-xs text-zinc-400">Bekerja berurutan dari riset, naskah, desain, pembuatan produk, hingga strategi iklan.</p>
                    </div>
                    <span class="text-xs text-emerald-400 font-mono">Status: Terkoordinasi</span>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    @for (w of platformService.aiWorkers(); track w.id) {
                      <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
                        <div class="flex items-center gap-3">
                          <img 
                            [src]="w.avatar" 
                            [alt]="w.name" 
                            class="h-12 w-12 rounded-xl object-cover border border-zinc-700"
                            referrerpolicy="no-referrer"
                          >
                          <div>
                            <span class="text-[10px] font-mono text-zinc-500">WORKER {{ w.number }}</span>
                            <h4 class="text-sm font-bold text-white">{{ w.name }}</h4>
                            <span class="text-xs text-emerald-400 font-medium block">{{ w.position }}</span>
                          </div>
                        </div>

                        <p class="text-xs text-zinc-300 leading-relaxed">{{ w.description }}</p>

                        <!-- Progress Bar & Status -->
                        <div>
                          <div class="flex justify-between text-[11px] font-mono text-zinc-400 mb-1">
                            <span>Status: {{ w.status }}</span>
                            <span>{{ w.progress }}%</span>
                          </div>
                          <div class="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div class="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" [style.width.%]="w.progress"></div>
                          </div>
                        </div>

                        <!-- Current output sample -->
                        <div class="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80 text-[11px] text-zinc-300">
                          <strong class="text-zinc-500 block uppercase tracking-wider text-[10px]">Hasil Terkini:</strong>
                          <span>{{ w.currentOutput }}</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- SUBTAB 4: AI COPYWRITER -->
              @if (activeSubTab() === 'copywriter') {
                <div class="space-y-5">
                  <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3">
                    <h3 class="text-base font-bold text-white">Generator Naskah Iklan & Penawaran (AI Copy)</h3>
                    <p class="text-xs text-zinc-400">
                      Pilih tipe naskah dan sudut pandang pemasaran (angle). Sistem menghasilkan kalimat yang memikat calon pembeli.
                    </p>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label for="demo-copy-type" class="block text-xs font-semibold text-zinc-300 mb-1">Tipe Naskah:</label>
                        <select id="demo-copy-type" #typeSelect class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
                          <option value="hook">Hook Iklan 3 Detik (Reels/TikTok)</option>
                          <option value="sales_page">Naskah Landing Page Penjualan</option>
                          <option value="facebook_ads">Facebook & Instagram Ads Copy</option>
                        </select>
                      </div>

                      <div>
                        <label for="demo-copy-angle" class="block text-xs font-semibold text-zinc-300 mb-1">Sudut Pandang (Angle):</label>
                        <select id="demo-copy-angle" #angleSelect class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
                          <option value="Problem-Agitation">Problem-Agitation (Bongkar Masalah Konsumen)</option>
                          <option value="FOMO">FOMO (Takut Kelewatan Peluang)</option>
                          <option value="Direct-Offer">Direct-Offer (Penawaran Lugas Siap Pakai)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      (click)="generateCopy(typeSelect.value, angleSelect.value)"
                      class="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors"
                    >
                      <mat-icon class="text-sm">edit_note</mat-icon>
                      <span>Buat Naskah Penjualan Baru</span>
                    </button>
                  </div>

                  <!-- Generated Drafts -->
                  <div class="space-y-4">
                    @for (draft of platformService.copyDrafts(); track draft.id) {
                      <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                        <div class="flex items-center justify-between">
                          <span class="text-xs font-mono text-emerald-400 font-bold uppercase">{{ draft.angle }} · {{ draft.type }}</span>
                          <button
                            type="button"
                            (click)="copyText(draft.headline + ' ' + draft.body, draft.id)"
                            class="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white"
                          >
                            <mat-icon class="text-xs">{{ copiedDraftId() === draft.id ? 'check' : 'content_copy' }}</mat-icon>
                            <span>{{ copiedDraftId() === draft.id ? 'Tersalin!' : 'Salin Teks' }}</span>
                          </button>
                        </div>

                        <h4 class="text-sm font-bold text-white">{{ draft.headline }}</h4>
                        <p class="text-xs text-zinc-300 leading-relaxed">{{ draft.body }}</p>

                        <div class="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                          <span class="text-emerald-400 font-medium">CTA Rekomendasi: "{{ draft.cta }}"</span>
                          <span class="text-zinc-500 text-[11px]">{{ draft.createdAt }}</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- SUBTAB 5: TOOL FACTORY (Mini Web-App Playground) -->
              @if (activeSubTab() === 'tools') {
                <div class="space-y-5">
                  <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
                    <h3 class="text-base font-bold text-white">Tool Factory: Mini Web-App Siap Pakai</h3>
                    <p class="text-xs text-zinc-400">
                      Di bawah ini adalah contoh nyata web-app mini yang dapat Anda jual sebagai produk digital seharga Rp 149.000 - Rp 299.000 kepada para seller online. Uji coba langsung perhitungannya!
                    </p>
                  </div>

                  <!-- Real Functioning Tool: Kalkulator Margin Marketplace -->
                  <div class="rounded-2xl border border-emerald-500/30 bg-zinc-950 p-6 space-y-5">
                    <div class="flex items-center justify-between pb-3 border-b border-zinc-800">
                      <div>
                        <span class="text-[10px] font-mono text-emerald-400 font-bold uppercase">PRODUK MINI WEB-APP CONTOH</span>
                        <h4 class="text-sm font-bold text-white mt-0.5">Kalkulator Margin Bersih Seller Marketplace</h4>
                      </div>
                      <span class="rounded bg-emerald-500/10 text-emerald-400 px-2.5 py-1 text-xs font-bold">
                        Fungsi Berjalan 100%
                      </span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label for="demo-sell-input" class="block text-xs font-semibold text-zinc-300 mb-1">Harga Jual Produk (Rp):</label>
                        <input 
                          id="demo-sell-input"
                          type="number" 
                          [value]="demoSellPrice()" 
                          (input)="demoSellPrice.set(asNumber($event))" 
                          class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white font-mono"
                        >
                      </div>

                      <div>
                        <label for="demo-hpp-input" class="block text-xs font-semibold text-zinc-300 mb-1">Harga Modal / HPP (Rp):</label>
                        <input 
                          id="demo-hpp-input"
                          type="number" 
                          [value]="demoHppPrice()" 
                          (input)="demoHppPrice.set(asNumber($event))" 
                          class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white font-mono"
                        >
                      </div>

                      <div>
                        <label for="demo-admin-input" class="block text-xs font-semibold text-zinc-300 mb-1">Potongan Admin & Promo (%):</label>
                        <input 
                          id="demo-admin-input"
                          type="number" 
                          [value]="demoAdminFeePercent()" 
                          (input)="demoAdminFeePercent.set(asNumber($event))" 
                          class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white font-mono"
                        >
                      </div>
                    </div>

                    <!-- Calculated Output -->
                    <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                      <div>
                        <span class="text-xs text-zinc-400 block">Potongan Biaya Admin:</span>
                        <span class="text-base font-bold text-rose-400 font-mono mt-0.5 block">
                          -{{ formatIdr(calculatedAdminCut()) }}
                        </span>
                      </div>

                      <div>
                        <span class="text-xs text-zinc-400 block">Keuntungan Bersih per Pcs:</span>
                        <span class="text-lg font-extrabold text-emerald-400 font-mono mt-0.5 block">
                          {{ formatIdr(calculatedNetProfit()) }}
                        </span>
                      </div>

                      <div>
                        <span class="text-xs text-zinc-400 block">Margin Keuntungan:</span>
                        <span class="text-base font-bold text-cyan-400 font-mono mt-0.5 block">
                          {{ calculatedMarginPercent() }}%
                        </span>
                      </div>
                    </div>

                    <div class="text-[11px] text-zinc-400 text-center">
                      Produk mini-app seperti ini memiliki tingkat retensi pengguna tinggi dan siap Anda jual berkali-kali tanpa biaya cetak fisik.
                    </div>
                  </div>
                </div>
              }

              <!-- SUBTAB 6: AI AVATAR -->
              @if (activeSubTab() === 'avatar') {
                <div class="space-y-5">
                  <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
                    <h3 class="text-base font-bold text-white">Katalog Avatar AI & Custom Generator</h3>
                    <p class="text-xs text-zinc-400">
                      Gunakan avatar AI representatif untuk membawakan video promosi TikTok & Reels tanpa Anda harus tampil malu di depan kamera.
                    </p>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    @for (av of platformService.avatarLibrary(); track av.id) {
                      <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 flex items-center gap-4">
                        <img 
                          [src]="av.previewUrl" 
                          [alt]="av.name" 
                          class="h-16 w-16 rounded-xl object-cover border border-zinc-700 shrink-0"
                          referrerpolicy="no-referrer"
                        >
                        <div class="space-y-1">
                          <span class="text-[10px] font-mono text-emerald-400 font-bold uppercase">{{ av.style }}</span>
                          <h4 class="text-xs font-bold text-white">{{ av.name }}</h4>
                          <p class="text-[11px] text-zinc-400 leading-relaxed">{{ av.characteristics }}</p>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- SUBTAB 7: AI MENTOR CHAT -->
              @if (activeSubTab() === 'mentor') {
                <div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-4 flex flex-col h-[500px]">
                  <div class="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
                    <div class="flex items-center gap-2.5">
                      <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                        <mat-icon>psychology</mat-icon>
                      </div>
                      <div>
                        <h4 class="text-xs font-bold text-white">AI Mentor NexusFlow</h4>
                        <span class="text-[10px] text-emerald-400">Online & Siap Memandu</span>
                      </div>
                    </div>
                    <span class="text-[11px] font-mono text-zinc-500">Knowledge Base: V2.4</span>
                  </div>

                  <!-- Chat Messages Area -->
                  <div class="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                    @for (msg of platformService.mentorMessages(); track msg.text) {
                      <div 
                        class="flex flex-col"
                        [class.items-end]="msg.sender === 'user'"
                        [class.items-start]="msg.sender === 'mentor'"
                      >
                        <div 
                          class="max-w-md rounded-2xl p-3.5 leading-relaxed"
                          [class.bg-emerald-500]="msg.sender === 'user'"
                          [class.text-zinc-950]="msg.sender === 'user'"
                          [class.font-medium]="msg.sender === 'user'"
                          [class.bg-zinc-900]="msg.sender === 'mentor'"
                          [class.text-zinc-200]="msg.sender === 'mentor'"
                          [class.border]="msg.sender === 'mentor'"
                          [class.border-zinc-800]="msg.sender === 'mentor'"
                        >
                          {{ msg.text }}
                        </div>
                        <span class="text-[10px] text-zinc-500 mt-0.5 px-1">{{ msg.time }}</span>
                      </div>
                    }

                    @if (platformService.isMentorTyping()) {
                      <div class="flex items-center gap-1.5 text-xs text-zinc-400">
                        <mat-icon class="text-sm animate-spin">sync</mat-icon>
                        <span>AI Mentor sedang merangkai saran terbaik...</span>
                      </div>
                    }
                  </div>

                  <!-- Suggested Prompt Chips -->
                  <div class="flex flex-wrap gap-1.5 shrink-0 pt-2 border-t border-zinc-800/60">
                    <button
                      type="button"
                      (click)="sendQuickPrompt('Bagaimana cara kerja pembayaran QRIS otomatis?')"
                      class="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 hover:border-emerald-500"
                    >
                      Cara kerja QRIS otomatis?
                    </button>
                    <button
                      type="button"
                      (click)="sendQuickPrompt('Niche produk apa yang paling laris di Indonesia saat ini?')"
                      class="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 hover:border-emerald-500"
                    >
                      Niche paling laris saat ini?
                    </button>
                  </div>

                  <!-- Input bar -->
                  <div class="flex items-center gap-2 shrink-0 pt-1">
                    <input
                      type="text"
                      #chatInput
                      (keydown.enter)="onSendMessage(chatInput)"
                      placeholder="Tanyakan apapun seputar bisnis digital & pembayaran otomatis..."
                      class="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                    <button
                      type="button"
                      (click)="onSendMessage(chatInput)"
                      class="rounded-xl bg-emerald-500 p-2.5 text-zinc-950 hover:bg-emerald-400 transition-colors"
                    >
                      <mat-icon class="text-sm">send</mat-icon>
                    </button>
                  </div>
                </div>
              }

              <!-- SUBTAB 8: ACADEMY -->
              @if (activeSubTab() === 'academy') {
                <div class="space-y-5">
                  <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-2">
                    <h3 class="text-base font-bold text-white">Digital Academy: Pusat Pembelajaran Terstruktur</h3>
                    <p class="text-xs text-zinc-400">
                      Pelajari langkah demi langkah dari fondasi, pembuatan produk, hingga otomasi penjualan dengan kurikulum terarah.
                    </p>
                  </div>

                  <div class="space-y-4">
                    @for (mod of platformService.academyModules(); track mod.id) {
                      <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 space-y-3">
                        <div class="flex items-center justify-between">
                          <h4 class="text-xs sm:text-sm font-bold text-white">{{ mod.title }}</h4>
                          <span class="text-[11px] font-mono text-zinc-400">{{ mod.duration }}</span>
                        </div>
                        <p class="text-xs text-zinc-400">{{ mod.description }}</p>

                        <div class="space-y-2 pt-2 border-t border-zinc-800/60">
                          @for (les of mod.lessons; track les.id) {
                            <div class="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300">
                              <div class="flex items-center gap-2">
                                <button
                                  type="button"
                                  (click)="platformService.toggleLessonComplete(mod.id, les.id)"
                                  class="text-emerald-400"
                                >
                                  <mat-icon class="text-sm">{{ les.completed ? 'check_box' : 'check_box_outline_blank' }}</mat-icon>
                                </button>
                                <span [class.line-through]="les.completed" [class.text-zinc-500]="les.completed">
                                  {{ les.title }}
                                </span>
                              </div>
                              <span class="text-[11px] font-mono text-zinc-500">{{ les.duration }}</span>
                            </div>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

            </div>
          </div>

          <!-- Bottom Footer CTA within Demo Window -->
          <div class="p-4 sm:p-5 border-t border-zinc-800 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="text-xs text-zinc-400 text-center sm:text-left">
              Tertarik memiliki sistem lengkap ini untuk brand Anda sendiri?
            </div>
            <button
              type="button"
              (click)="takeAction()"
              class="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-md active:scale-95"
            >
              <mat-icon class="text-sm">shopping_cart_checkout</mat-icon>
              <span>Mulai Buat Website & Otomasi Sekarang</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  `,
})
export class InteractiveDemoComponent {
  platformService = inject(PlatformService);

  readonly activeSubTab = signal<string>('beranda');
  readonly viewport = signal<'desktop' | 'mobile'>('desktop');
  readonly isResearching = signal<boolean>(false);
  readonly currentNicheInput = signal<string>('Alat bantu perhitungan keuntungan untuk seller marketplace');

  // Mini-app live state
  readonly demoSellPrice = signal<number>(150000);
  readonly demoHppPrice = signal<number>(65000);
  readonly demoAdminFeePercent = signal<number>(12);

  readonly demoMenuItems = [
    { id: 'beranda', label: 'Dashboard Preview', icon: 'dashboard' },
    { id: 'research', label: 'AI Research', icon: 'insights' },
    { id: 'team', label: 'AI Worker Status', icon: 'groups' },
    { id: 'copywriter', label: 'AI Copywriter', icon: 'edit_note' },
    { id: 'tools', label: 'Tool Factory', icon: 'handyman' },
    { id: 'avatar', label: 'AI Avatar', icon: 'face' },
    { id: 'mentor', label: 'AI Mentor Chat', icon: 'psychology' },
    { id: 'academy', label: 'Digital Academy', icon: 'school' },
  ];

  setViewport(mode: 'desktop' | 'mobile') {
    this.viewport.set(mode);
  }

  runResearch(val: string) {
    this.isResearching.set(true);
    setTimeout(() => {
      this.platformService.generateAiResearch(val);
      this.isResearching.set(false);
    }, 1200);
  }

  generateCopy(type: string, angle: string) {
    this.platformService.generateCopywriting(type as CopywritingDraft['type'], angle as CopywritingDraft['angle'], 'Produk Digital Unggulan');
  }

  copiedDraftId = signal<string | null>(null);

  copyText(text: string, id?: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (id) {
        this.copiedDraftId.set(id);
        setTimeout(() => this.copiedDraftId.set(null), 2000);
      }
    }
  }

  formatIdr(val: number): string {
    return formatRupiah(val);
  }

  asNumber(e: Event): number {
    return Number((e.target as HTMLInputElement).value) || 0;
  }

  calculatedAdminCut(): number {
    return Math.round(this.demoSellPrice() * (this.demoAdminFeePercent() / 100));
  }

  calculatedNetProfit(): number {
    return this.demoSellPrice() - this.demoHppPrice() - this.calculatedAdminCut();
  }

  calculatedMarginPercent(): number {
    if (this.demoSellPrice() === 0) return 0;
    return Math.round((this.calculatedNetProfit() / this.demoSellPrice()) * 100);
  }

  onSendMessage(inputEl: HTMLInputElement) {
    const txt = inputEl.value;
    if (txt) {
      this.platformService.sendMentorMessage(txt);
      inputEl.value = '';
    }
  }

  sendQuickPrompt(txt: string) {
    this.platformService.sendMentorMessage(txt);
  }

  takeAction() {
    this.platformService.setView('checkout');
  }
}
