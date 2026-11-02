import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';
import { formatRupiah } from '../../services/project-calculator';
import { ProjectInvoice } from '../../models/project.model';

@Component({
  selector: 'app-client-portal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatIconModule],
  template: `
    <div class="min-h-screen bg-zinc-950 text-zinc-100 pb-24">
      
      <!-- Top Navigation for Portal -->
      <div class="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <div class="flex items-center gap-3">
            <button
              type="button"
              (click)="goBack()"
              class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
            >
              <mat-icon class="text-xs">arrow_back</mat-icon>
              <span>Beranda</span>
            </button>

            <span aria-hidden="true" class="text-zinc-700">|</span>

            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-white">Dashboard Klien NexusFlow</span>
              <span class="text-xs text-zinc-500 hidden sm:inline">·</span>
              <span class="text-xs text-emerald-400 font-medium hidden sm:inline">Monitoring Proyek Real-Time</span>
            </div>
          </div>

          <!-- Project Switcher & Status -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <label for="project-select" class="text-xs text-zinc-400 hidden md:inline">Pilih Proyek:</label>
              <select
                id="project-select"
                [value]="projectService.activeProjectId()"
                (change)="onProjectSelect($event)"
                class="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 max-w-[200px] sm:max-w-xs truncate"
              >
                @for (p of projectService.projects(); track p.id) {
                  <option [value]="p.id">{{ p.code }} - {{ p.companyName }}</option>
                }
              </select>
            </div>

            <!-- Live Status Pulse -->
            <div class="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
              <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live Sync</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Main Portal Container -->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        @let project = projectService.activeProject();

        <!-- Project Hero Card -->
        <div class="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-sm">
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                <span class="font-bold text-emerald-400">{{ project.code }}</span>
                <span aria-hidden="true" class="text-zinc-600">·</span>
                <span>{{ project.packageType }}</span>
                <span aria-hidden="true" class="text-zinc-600">·</span>
                <span>Mulai: {{ project.startDate }}</span>
              </div>

              <h1 class="text-2xl sm:text-3xl font-extrabold text-white">
                {{ project.projectTitle }}
              </h1>

              <div class="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pt-1">
                <span class="flex items-center gap-1 text-zinc-300">
                  <mat-icon class="text-xs text-zinc-500">business</mat-icon>
                  {{ project.companyName }} ({{ project.clientName }})
                </span>
                <span aria-hidden="true" class="text-zinc-700">·</span>
                <span class="flex items-center gap-1 text-zinc-300">
                  <mat-icon class="text-xs text-zinc-500">event</mat-icon>
                  Target Rilis: <strong class="text-emerald-400 ml-1">{{ project.targetLaunchDate }}</strong>
                </span>
                <span aria-hidden="true" class="text-zinc-700">·</span>
                <span class="flex items-center gap-1 text-zinc-300">
                  <mat-icon class="text-xs text-emerald-400">verified</mat-icon>
                  PT. CAHAYA ARSYA GEMILANG
                </span>
              </div>
            </div>

            <!-- Health & Overall Progress Widget -->
            <div class="rounded-xl border border-zinc-800 bg-zinc-950 p-4 sm:p-5 min-w-[260px] flex flex-col justify-between">
              <div class="flex items-center justify-between text-xs mb-2">
                <span class="text-zinc-400">Status Kesehatan:</span>
                <span class="font-semibold text-emerald-400 flex items-center gap-1">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  {{ project.healthStatus }}
                </span>
              </div>

              <div class="flex items-baseline justify-between mb-2">
                <span class="text-xs text-zinc-300">Progres Keseluruhan:</span>
                <span class="text-2xl font-extrabold text-white font-mono">{{ project.overallProgress }}%</span>
              </div>

              <div class="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  class="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  [style.width.%]="project.overallProgress"
                ></div>
              </div>

              <span class="text-[11px] text-zinc-500 mt-2 block text-right">
                Pengerjaan sesuai jadwal
              </span>
            </div>

          </div>
        </div>

        <!-- Dashboard Navigation Tabs -->
        <div class="border-b border-zinc-800">
          <nav class="flex space-x-2 sm:space-x-4 overflow-x-auto pb-1" aria-label="Tabs Proyek">
            <button
              type="button"
              (click)="activeTab.set('timeline')"
              class="flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors"
              [class.border-emerald-500]="activeTab() === 'timeline'"
              [class.text-emerald-400]="activeTab() === 'timeline'"
              [class.border-transparent]="activeTab() !== 'timeline'"
              [class.text-zinc-400]="activeTab() !== 'timeline'"
              [class.hover:text-zinc-200]="activeTab() !== 'timeline'"
            >
              <mat-icon class="text-sm">timeline</mat-icon>
              <span>Milestone & Progres</span>
            </button>

            <button
              type="button"
              (click)="activeTab.set('preview')"
              class="flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors"
              [class.border-emerald-500]="activeTab() === 'preview'"
              [class.text-emerald-400]="activeTab() === 'preview'"
              [class.border-transparent]="activeTab() !== 'preview'"
              [class.text-zinc-400]="activeTab() !== 'preview'"
              [class.hover:text-zinc-200]="activeTab() !== 'preview'"
            >
              <mat-icon class="text-sm">devices</mat-icon>
              <span>Live Staging Preview</span>
            </button>

            <button
              type="button"
              (click)="activeTab.set('deliverables')"
              class="flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors"
              [class.border-emerald-500]="activeTab() === 'deliverables'"
              [class.text-emerald-400]="activeTab() === 'deliverables'"
              [class.border-transparent]="activeTab() !== 'deliverables'"
              [class.text-zinc-400]="activeTab() !== 'deliverables'"
              [class.hover:text-zinc-200]="activeTab() !== 'deliverables'"
            >
              <mat-icon class="text-sm">folder_open</mat-icon>
              <span>Aset & Berkas ({{ project.deliverables.length }})</span>
            </button>

            <button
              type="button"
              (click)="activeTab.set('revisions')"
              class="flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors"
              [class.border-emerald-500]="activeTab() === 'revisions'"
              [class.text-emerald-400]="activeTab() === 'revisions'"
              [class.border-transparent]="activeTab() !== 'revisions'"
              [class.text-zinc-400]="activeTab() !== 'revisions'"
              [class.hover:text-zinc-200]="activeTab() !== 'revisions'"
            >
              <mat-icon class="text-sm">feedback</mat-icon>
              <span>Tiket Revisi ({{ project.revisions.length }})</span>
            </button>

            <button
              type="button"
              (click)="activeTab.set('invoices')"
              class="flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors"
              [class.border-emerald-500]="activeTab() === 'invoices'"
              [class.text-emerald-400]="activeTab() === 'invoices'"
              [class.border-transparent]="activeTab() !== 'invoices'"
              [class.text-zinc-400]="activeTab() !== 'invoices'"
              [class.hover:text-zinc-200]="activeTab() !== 'invoices'"
            >
              <mat-icon class="text-sm">receipt</mat-icon>
              <span>Faktur & Pembayaran</span>
            </button>

            <button
              type="button"
              (click)="activeTab.set('logs')"
              class="flex items-center gap-2 py-3 px-3.5 border-b-2 text-xs font-semibold whitespace-nowrap transition-colors"
              [class.border-emerald-500]="activeTab() === 'logs'"
              [class.text-emerald-400]="activeTab() === 'logs'"
              [class.border-transparent]="activeTab() !== 'logs'"
              [class.text-zinc-400]="activeTab() !== 'logs'"
              [class.hover:text-zinc-200]="activeTab() !== 'logs'"
            >
              <mat-icon class="text-sm">history</mat-icon>
              <span>Log Tim NexusFlow</span>
            </button>
          </nav>
        </div>

        <!-- TAB CONTENT 1: Timeline & Milestones -->
        @if (activeTab() === 'timeline') {
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-bold text-white">Tahapan Milestone Pengerjaan Proyek</h2>
                <p class="text-xs text-zinc-400">Setiap progres diuji dan diverifikasi sebelum beralih ke tahap berikutnya.</p>
              </div>
              <span class="text-xs text-zinc-500 font-mono hidden sm:inline">5 Tahapan Standar ISO</span>
            </div>

            <div class="space-y-4">
              @for (m of project.milestones; track m.id; let idx = $index) {
                <div 
                  class="rounded-xl border p-5 transition-all"
                  [class.border-emerald-500/40]="m.status === 'completed'"
                  [class.bg-zinc-900/40]="m.status === 'completed'"
                  [class.border-cyan-500/60]="m.status === 'in_progress'"
                  [class.bg-zinc-900/80]="m.status === 'in_progress'"
                  [class.border-zinc-800]="m.status === 'pending'"
                  [class.bg-zinc-950/40]="m.status === 'pending'"
                  [class.opacity-60]="m.status === 'pending'"
                >
                  <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div class="flex items-start gap-4">
                      <!-- Status Icon -->
                      <div 
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border mt-0.5"
                        [class.border-emerald-500/40]="m.status === 'completed'"
                        [class.bg-emerald-500/20]="m.status === 'completed'"
                        [class.text-emerald-400]="m.status === 'completed'"
                        [class.border-cyan-500/40]="m.status === 'in_progress'"
                        [class.bg-cyan-500/20]="m.status === 'in_progress'"
                        [class.text-cyan-400]="m.status === 'in_progress'"
                        [class.border-zinc-800]="m.status === 'pending'"
                        [class.bg-zinc-900]="m.status === 'pending'"
                        [class.text-zinc-600]="m.status === 'pending'"
                      >
                        @if (m.status === 'completed') {
                          <mat-icon class="text-base">check</mat-icon>
                        } @else if (m.status === 'in_progress') {
                          <mat-icon class="text-base animate-spin">sync</mat-icon>
                        } @else {
                          <mat-icon class="text-base">schedule</mat-icon>
                        }
                      </div>

                      <div class="space-y-1">
                        <div class="flex items-center gap-2">
                          <h3 class="text-sm font-bold text-white">{{ m.title }}</h3>
                          @if (m.status === 'completed') {
                            <span class="text-[11px] text-emerald-400 font-semibold">Tuntas (100%)</span>
                          } @else if (m.status === 'in_progress') {
                            <span class="text-[11px] text-cyan-400 font-semibold">Sedang Dikerjakan ({{ m.progressPercent }}%)</span>
                          } @else {
                            <span class="text-[11px] text-zinc-500">Antrean</span>
                          }
                        </div>
                        <p class="text-xs text-zinc-300 leading-relaxed">{{ m.description }}</p>

                        @if (m.notes) {
                          <div class="mt-2 text-xs rounded-lg border border-zinc-800 bg-zinc-950/60 p-2.5 text-zinc-400 flex items-start gap-2">
                            <mat-icon class="text-xs text-emerald-400 mt-0.5 shrink-0">info</mat-icon>
                            <span>{{ m.notes }}</span>
                          </div>
                        }
                      </div>
                    </div>

                    <div class="text-left sm:text-right shrink-0">
                      @if (m.completionDate) {
                        <span class="text-[11px] text-zinc-400 block font-mono">Diselesaikan:</span>
                        <span class="text-xs font-semibold text-zinc-200">{{ m.completionDate }}</span>
                      } @else if (m.status === 'in_progress') {
                        <span class="text-[11px] text-cyan-400 block font-mono font-medium">Estimasi Tuntas:</span>
                        <span class="text-xs font-semibold text-white">1-2 Hari Lagi</span>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- TAB CONTENT 2: Live Staging Preview (Desktop & Mobile toggle) -->
        @if (activeTab() === 'preview') {
          <div class="space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 class="text-lg font-bold text-white">Live Staging Preview</h2>
                <p class="text-xs text-zinc-400">Uji coba tampilan langsung website Anda di server staging sebelum rilis resmi ke domain utama.</p>
              </div>

              <!-- Viewport mode selector -->
              <div class="flex items-center gap-1.5 p-1 rounded-xl border border-zinc-800 bg-zinc-900">
                <button
                  type="button"
                  (click)="previewMode.set('desktop')"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  [class.bg-zinc-800]="previewMode() === 'desktop'"
                  [class.text-white]="previewMode() === 'desktop'"
                  [class.text-zinc-400]="previewMode() !== 'desktop'"
                >
                  <mat-icon class="text-sm">laptop</mat-icon>
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  (click)="previewMode.set('mobile')"
                  class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  [class.bg-zinc-800]="previewMode() === 'mobile'"
                  [class.text-white]="previewMode() === 'mobile'"
                  [class.text-zinc-400]="previewMode() !== 'mobile'"
                >
                  <mat-icon class="text-sm">phone_iphone</mat-icon>
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            <!-- Staging Viewport Mockup Window -->
            <div class="rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden shadow-2xl">
              <!-- Window top bar -->
              <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950">
                <div class="flex items-center gap-2">
                  <div class="flex gap-1.5">
                    <div class="h-2.5 w-2.5 rounded-full bg-rose-500/80"></div>
                    <div class="h-2.5 w-2.5 rounded-full bg-amber-500/80"></div>
                    <div class="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                  <span class="text-xs font-mono text-zinc-400 ml-2 truncate">{{ project.stagingUrl }}</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-zinc-400">
                  <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="hidden sm:inline">Staging Server Online</span>
                </div>
              </div>

              <!-- Content Canvas (Interactive Responsive Simulation) -->
              <div class="p-4 sm:p-8 flex justify-center bg-zinc-950/60 overflow-x-auto min-h-[500px]">
                <div 
                  class="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
                  [class.w-full]="previewMode() === 'desktop'"
                  [class.max-w-4xl]="previewMode() === 'desktop'"
                  [class.w-[390px]]="previewMode() === 'mobile'"
                >
                  <!-- Staging App Header -->
                  <div class="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
                    <div class="flex items-center gap-2">
                      <div class="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-zinc-950 text-xs">
                        {{ project.companyName.charAt(0) }}
                      </div>
                      <span class="text-xs font-bold text-white">{{ project.companyName }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[11px] text-zinc-400 hidden sm:inline">Pembayaran Siap</span>
                      <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">QRIS AKTIF</span>
                    </div>
                  </div>

                  <!-- Staging App Body -->
                  <div class="p-6 space-y-6">
                    <div class="space-y-3 text-center py-6">
                      <span class="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                        Situs Resmi Siap Jualan
                      </span>
                      <h4 class="text-xl sm:text-2xl font-extrabold text-white">
                        Solusi Terbaik untuk {{ project.companyName }}
                      </h4>
                      <p class="text-xs text-zinc-400 max-w-lg mx-auto">
                        Website cepat, modern, dan langsung terhubung dengan rekening bank Anda. Pembeli dapat langsung checkout dengan QRIS instan kapan saja.
                      </p>
                      
                      <!-- Interactive simulated buy button inside staging -->
                      <div class="pt-2">
                        <button
                          type="button"
                          (click)="triggerStagingDemoPayment()"
                          class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-colors shadow-md"
                        >
                          <mat-icon class="text-xs">shopping_cart</mat-icon>
                          <span>Tes Beli Produk (Simulasi Rp 150.000)</span>
                        </button>
                      </div>
                    </div>

                    <!-- 3 Feature preview cards inside staging -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-zinc-800/60">
                      <div class="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-left">
                        <mat-icon class="text-sm text-emerald-400">bolt</mat-icon>
                        <div class="text-xs font-bold text-white mt-1">Cepat & Responsif</div>
                        <p class="text-[11px] text-zinc-400 mt-0.5">Optimasi mobile-first untuk pengalaman belanja tanpa lemot.</p>
                      </div>
                      <div class="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-left">
                        <mat-icon class="text-sm text-cyan-400">lock</mat-icon>
                        <div class="text-xs font-bold text-white mt-1">Kasir Otomatis</div>
                        <p class="text-[11px] text-zinc-400 mt-0.5">Semua bank BCA, Mandiri, BRI dan QRIS terverifikasi otomatis.</p>
                      </div>
                      <div class="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-left">
                        <mat-icon class="text-sm text-amber-400">support_agent</mat-icon>
                        <div class="text-xs font-bold text-white mt-1">Order ke WhatsApp</div>
                        <p class="text-[11px] text-zinc-400 mt-0.5">Struk otomatis terkirim langsung ke nomor WhatsApp pembeli.</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- TAB CONTENT 3: Deliverables & Files -->
        @if (activeTab() === 'deliverables') {
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-bold text-white">Aset & Berkas Proyek</h2>
                <p class="text-xs text-zinc-400">Semua berkas desain master, naskah copywriting, dan source code menjadi hak milik Anda 100%.</p>
              </div>
              <span class="text-xs text-emerald-400 font-medium">Hak Milik Penuh Klien</span>
            </div>

            @if (downloadNotice()) {
              <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold flex items-center gap-2">
                <mat-icon class="text-base">check_circle</mat-icon>
                <span>{{ downloadNotice() }}</span>
              </div>
            }

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              @for (file of project.deliverables; track file.id) {
                <div class="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 flex items-start justify-between gap-4">
                  <div class="flex items-start gap-3">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400">
                      <mat-icon class="text-base">description</mat-icon>
                    </div>
                    <div>
                      <h3 class="text-xs font-bold text-white">{{ file.name }}</h3>
                      <div class="flex items-center gap-2 text-[11px] text-zinc-400 mt-1">
                        <span>{{ file.category }}</span>
                        <span aria-hidden="true">·</span>
                        <span class="font-mono">{{ file.size }}</span>
                        <span aria-hidden="true">·</span>
                        <span>{{ file.updatedAt }}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    (click)="downloadAsset(file.name)"
                    [disabled]="file.status === 'Locked'"
                    class="shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                    [class.bg-zinc-800]="file.status !== 'Locked'"
                    [class.text-zinc-200]="file.status !== 'Locked'"
                    [class.hover:bg-emerald-500]="file.status !== 'Locked'"
                    [class.hover:text-zinc-950]="file.status !== 'Locked'"
                    [class.opacity-40]="file.status === 'Locked'"
                  >
                    <mat-icon class="text-xs">{{ file.status === 'Locked' ? 'lock' : 'download' }}</mat-icon>
                    <span>{{ file.status === 'Locked' ? 'Terkunci' : 'Unduh' }}</span>
                  </button>
                </div>
              }
            </div>
          </div>
        }

        <!-- TAB CONTENT 4: Revision System -->
        @if (activeTab() === 'revisions') {
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left: Revision Form -->
            <div class="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
              <div class="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <mat-icon class="text-sm">edit_note</mat-icon>
                <span>Ajukan Tiket Revisi Baru</span>
              </div>
              <p class="text-xs text-zinc-400">
                Punya masukan mengenai teks, tata letak warna, atau penambahan fitur? Tulis di sini, tim teknis kami akan langsung merespons.
              </p>

              <form [formGroup]="revisionForm" (ngSubmit)="submitRevision()" class="space-y-4">
                <div>
                  <label for="rev-category" class="block text-xs font-semibold text-zinc-300 mb-1">Kategori Bagian yang Ingin Diperbaiki:</label>
                  <select id="rev-category" formControlName="category" class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
                    <option value="Tampilan (UI)">Tampilan (UI / Warna / Gambar)</option>
                    <option value="Teks / Konten">Teks / Naskah Penawaran (Copywriting)</option>
                    <option value="Sistem Pembayaran">Sistem Pembayaran / Rekening Bank</option>
                    <option value="Fitur Tambahan">Fitur Tambahan Lainnya</option>
                  </select>
                </div>

                <div>
                  <label for="rev-title" class="block text-xs font-semibold text-zinc-300 mb-1">Judul Ringkas Masukan:</label>
                  <input
                    id="rev-title"
                    type="text"
                    formControlName="title"
                    placeholder="Contoh: Ganti warna tombol WhatsApp menjadi hijau"
                    class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                </div>

                <div>
                  <label for="rev-desc" class="block text-xs font-semibold text-zinc-300 mb-1">Rincian Penjelasan Masukan:</label>
                  <textarea
                    id="rev-desc"
                    formControlName="description"
                    rows="3"
                    placeholder="Jelaskan secara santai apa yang ingin Anda sesuaikan..."
                    class="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  [disabled]="revisionForm.invalid"
                  class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-2.5 px-4 text-xs font-bold text-zinc-950 hover:bg-emerald-400 disabled:opacity-50 transition-all focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <mat-icon class="text-sm">send</mat-icon>
                  <span>Kirim Tiket Masukan ke Tim</span>
                </button>
              </form>
            </div>

            <!-- Right: Existing Revision Tickets -->
            <div class="lg:col-span-7 space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold text-white">Daftar Tiket Revisi Anda</h3>
                <span class="text-xs text-zinc-400">{{ project.revisions.length }} Tiket Diajukan</span>
              </div>

              @if (project.revisions.length === 0) {
                <div class="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-500">
                  Belum ada tiket revisi yang diajukan. Proyek berjalan optimal sesuai brief awal.
                </div>
              } @else {
                <div class="space-y-3">
                  @for (rev of project.revisions; track rev.id) {
                    <div class="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-2">
                      <div class="flex items-start justify-between gap-2">
                        <div>
                          <span class="text-[11px] font-mono text-emerald-400 font-semibold block">{{ rev.category }}</span>
                          <h4 class="text-xs font-bold text-white mt-0.5">{{ rev.title }}</h4>
                        </div>
                        <span 
                          class="px-2 py-0.5 rounded text-[10px] font-semibold uppercase"
                          [class.bg-emerald-500/20]="rev.status === 'Selesai'"
                          [class.text-emerald-400]="rev.status === 'Selesai'"
                          [class.bg-cyan-500/20]="rev.status === 'Sedang Dikerjakan'"
                          [class.text-cyan-400]="rev.status === 'Sedang Dikerjakan'"
                          [class.bg-zinc-800]="rev.status === 'Diajukan'"
                          [class.text-zinc-300]="rev.status === 'Diajukan'"
                        >
                          {{ rev.status }}
                        </span>
                      </div>

                      <p class="text-xs text-zinc-400 leading-relaxed">{{ rev.description }}</p>

                      @if (rev.developerNote) {
                        <div class="rounded-lg bg-zinc-950 p-2.5 border border-zinc-800/80 text-[11px] text-zinc-300 flex items-start gap-2">
                          <mat-icon class="text-xs text-emerald-400 mt-0.5 shrink-0">check</mat-icon>
                          <div>
                            <span class="text-emerald-400 font-medium block">Tanggapan Tim Teknis:</span>
                            <span>{{ rev.developerNote }}</span>
                          </div>
                        </div>
                      }

                      <div class="text-[10px] text-zinc-500 text-right">
                        {{ rev.submittedAt }}
                      </div>
                    </div>
                  }
                </div>
              }
            </div>

          </div>
        }

        <!-- TAB CONTENT 5: Invoices & Receipts -->
        @if (activeTab() === 'invoices') {
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-bold text-white">Faktur & Kuitansi Resmi</h2>
                <p class="text-xs text-zinc-400">Bukti pembayaran sah berbadan hukum dari PT. CAHAYA ARSYA GEMILANG untuk keperluan arsip akuntansi Anda.</p>
              </div>
              <span class="text-xs text-emerald-400 font-medium">Status Lunas 100%</span>
            </div>

            <div class="space-y-4">
              @for (inv of project.invoices; track inv.invoiceNumber) {
                <div class="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div class="space-y-1">
                    <div class="flex items-center gap-2 text-xs font-mono">
                      <span class="font-bold text-white">{{ inv.invoiceNumber }}</span>
                      <span aria-hidden="true" class="text-zinc-600">·</span>
                      <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">LUNAS (PAID)</span>
                    </div>
                    <h3 class="text-sm font-bold text-white mt-1">{{ inv.projectTitle }}</h3>
                    <div class="text-xs text-zinc-400 flex flex-wrap gap-x-4 gap-y-1 pt-1">
                      <span>Metode: {{ inv.paymentMethod }}</span>
                      <span>Diterbitkan: {{ inv.issuedDate }}</span>
                      <span>Waktu Lunas: {{ inv.paidDate }}</span>
                    </div>
                    <span class="text-[11px] text-emerald-400/90 block font-medium">Entitas Hukum: {{ inv.companyLegal }}</span>
                  </div>

                  <div class="flex items-center gap-4">
                    <div class="text-left md:text-right">
                      <span class="text-xs text-zinc-400 block">Total Pembayaran:</span>
                      <span class="text-xl font-extrabold text-white font-mono">{{ formatIdr(inv.amount) }}</span>
                    </div>

                    <button
                      type="button"
                      (click)="viewReceipt(inv)"
                      class="inline-flex items-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 px-4 py-2.5 text-xs font-bold text-zinc-200 transition-colors"
                    >
                      <mat-icon class="text-xs">print</mat-icon>
                      <span>Lihat Kuitansi</span>
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- TAB CONTENT 6: Activity Logs -->
        @if (activeTab() === 'logs') {
          <div class="space-y-6">
            <div>
              <h2 class="text-lg font-bold text-white">Log Aktivitas Tim Pengembang</h2>
              <p class="text-xs text-zinc-400">Catatan riil setiap aksi pemrograman, integrasi API, dan pengecekan kualitas oleh tim NexusFlow.</p>
            </div>

            <div class="relative pl-6 border-l border-zinc-800 space-y-6">
              @for (act of project.activityLogs; track act.id) {
                <div class="relative group">
                  <!-- Dot -->
                  <div class="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-zinc-950"></div>
                  
                  <div class="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 space-y-1">
                    <div class="flex items-center justify-between text-xs">
                      <span class="font-bold text-white">{{ act.actor }}</span>
                      <span class="text-zinc-400 font-mono text-[11px]">{{ act.timestamp }}</span>
                    </div>
                    <span class="text-[11px] text-emerald-400 font-medium block">{{ act.role }}</span>
                    <p class="text-xs text-zinc-300 pt-1 leading-relaxed">{{ act.action }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        }

      </div>

      <!-- Receipt Modal View -->
      @if (selectedInvoice()) {
        <div 
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div class="relative w-full max-w-lg rounded-2xl border border-zinc-700 bg-zinc-950 p-6 sm:p-8 text-left shadow-2xl space-y-6">
            
            <div class="flex items-start justify-between pb-4 border-b border-zinc-800">
              <div>
                <span class="text-[11px] font-mono font-bold text-emerald-400 tracking-wider uppercase">BUKTI RESMI PEMBAYARAN LUNAS</span>
                <h3 class="text-lg font-bold text-white mt-0.5">PT. CAHAYA ARSYA GEMILANG</h3>
                <span class="text-xs text-zinc-400">Sistem Ekosistem Digital NexusFlow</span>
              </div>
              <button
                type="button"
                (click)="selectedInvoice.set(null)"
                class="rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <mat-icon class="text-base">close</mat-icon>
              </button>
            </div>

            <div class="space-y-3 text-xs">
              <div class="flex justify-between text-zinc-400">
                <span>Nomor Kuitansi:</span>
                <span class="font-mono text-white font-bold">{{ selectedInvoice()?.invoiceNumber }}</span>
              </div>
              <div class="flex justify-between text-zinc-400">
                <span>Diterima Dari:</span>
                <span class="text-white">{{ selectedInvoice()?.issuedTo }} ({{ selectedInvoice()?.companyName }})</span>
              </div>
              <div class="flex justify-between text-zinc-400">
                <span>Untuk Pembayaran:</span>
                <span class="text-white font-medium text-right max-w-xs">{{ selectedInvoice()?.projectTitle }}</span>
              </div>
              <div class="flex justify-between text-zinc-400">
                <span>Metode Pembayaran:</span>
                <span class="text-emerald-400 font-medium">{{ selectedInvoice()?.paymentMethod }}</span>
              </div>
              <div class="flex justify-between text-zinc-400">
                <span>Waktu Transaksi:</span>
                <span class="text-white">{{ selectedInvoice()?.paidDate }}</span>
              </div>

              <div class="pt-4 border-t border-zinc-800 flex justify-between items-baseline">
                <span class="text-sm font-semibold text-white">Jumlah Lunas:</span>
                <span class="text-2xl font-extrabold text-emerald-400 font-mono">
                  {{ formatIdr(selectedInvoice()?.amount || 0) }}
                </span>
              </div>
            </div>

            <!-- Official Seal Simulator -->
            <div class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center text-xs text-emerald-300 space-y-1">
              <div class="font-bold flex items-center justify-center gap-1.5">
                <mat-icon class="text-sm">verified</mat-icon>
                <span>TERVERIFIKASI OTOMATIS OLEH GATEWAY NEXUSFLOW</span>
              </div>
              <p class="text-[11px] text-zinc-400">Dokumen sah ini diterbitkan secara elektronik oleh PT. CAHAYA ARSYA GEMILANG.</p>
            </div>

            <button
              type="button"
              (click)="selectedInvoice.set(null)"
              class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 py-2.5 px-4 text-xs font-semibold text-white transition-colors"
            >
              <mat-icon class="text-sm">close</mat-icon>
              <span>Tutup Kuitansi</span>
            </button>
          </div>
        </div>
      }

    </div>
  `,
})
export class ClientPortalComponent {
  projectService = inject(ProjectService);

  readonly activeTab = signal<'timeline' | 'preview' | 'deliverables' | 'revisions' | 'invoices' | 'logs'>('timeline');
  readonly previewMode = signal<'desktop' | 'mobile'>('desktop');
  readonly selectedInvoice = signal<ProjectInvoice | null>(null);

  readonly revisionForm = new FormGroup({
    category: new FormControl<'Tampilan (UI)' | 'Teks / Konten' | 'Sistem Pembayaran' | 'Fitur Tambahan'>('Tampilan (UI)', {
      nonNullable: true,
    }),
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  formatIdr(val: number): string {
    return formatRupiah(val);
  }

  onProjectSelect(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.projectService.selectProject(val);
  }

  goBack() {
    this.projectService.showLandingPage();
  }

  downloadNotice = signal<string | null>(null);

  downloadAsset(name: string) {
    this.downloadNotice.set(`Berkas ${name} siap diunduh.`);
    setTimeout(() => {
      this.downloadNotice.set(null);
    }, 3000);
  }

  triggerStagingDemoPayment() {
    this.projectService.initiateOrder({
      packageName: 'Simulasi Produk Staging',
      price: 150000,
    });
  }

  submitRevision() {
    if (this.revisionForm.invalid) return;
    const formVal = this.revisionForm.getRawValue();
    this.projectService.addRevision({
      projectId: this.projectService.activeProjectId(),
      title: formVal.title,
      description: formVal.description,
      category: formVal.category,
    });
    this.revisionForm.reset({
      category: 'Tampilan (UI)',
      title: '',
      description: '',
    });
  }

  viewReceipt(invoice: ProjectInvoice) {
    this.selectedInvoice.set(invoice);
  }
}
