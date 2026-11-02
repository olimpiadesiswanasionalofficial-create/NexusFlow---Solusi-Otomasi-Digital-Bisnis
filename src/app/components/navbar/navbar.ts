import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProjectService } from '../../services/project.service';
import { PlatformService } from '../../services/platform.service';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <header class="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <!-- Brand identity -->
        <a 
          href="#beranda" 
          (click)="onLogoClick($event)"
          class="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
            <mat-icon class="text-xl">all_inclusive</mat-icon>
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">NexusFlow</span>
              <span class="text-xs text-zinc-500 hidden sm:inline">·</span>
              <span class="text-[11px] font-medium text-emerald-400/90 hidden sm:inline">Karyawan AI · 99rb/Bulan</span>
            </div>
            <span class="text-[10px] text-zinc-400 tracking-wide uppercase">PT. CAHAYA ARSYA GEMILANG</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden xl:flex items-center gap-6 text-xs font-semibold text-zinc-300">
          <a href="#video-penjelasan" class="hover:text-white transition-colors">Video Penjelasan</a>
          <button type="button" (click)="openDemo()" class="hover:text-emerald-400 transition-colors">Demo 5 AI</button>
          <a href="#fitur" class="hover:text-white transition-colors">5 Karyawan AI</a>
          <a href="#roadmap" class="hover:text-white transition-colors">Roadmap 30 Hari</a>
          <a href="#kalkulator" class="hover:text-white transition-colors">Kalkulator Biaya</a>
          <a href="#kuis-rencana-bisnis" class="hover:text-white transition-colors">Kuis Bisnis</a>
          <a href="#paket" class="hover:text-white transition-colors">Langganan 99rb</a>
        </nav>

        <!-- Right Action Shortcuts: HANYA SATU TOMBOL LOGIN DASHBOARD + CTA CHECKOUT -->
        <div class="flex items-center gap-2.5">
          <!-- Single Dashboard Login Button pointing to https://dashboard-nexus-black.vercel.app/ -->
          <a
            href="https://dashboard-nexus-black.vercel.app/"
            (click)="onLoginClick($event)"
            class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-900/90 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:border-emerald-500/60 hover:text-white transition-all shadow-sm active:scale-95"
            title="Masuk ke Dashboard NexusFlow"
          >
            <mat-icon class="text-xs text-emerald-400">login</mat-icon>
            <span>Login Dashboard</span>
          </a>

          <!-- Main CTA: Checkout -->
          <button
            type="button"
            (click)="goToCheckout()"
            class="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 shadow-sm shadow-emerald-500/20 transition-all active:scale-95"
          >
            <mat-icon class="text-xs">smart_toy</mat-icon>
            <span class="hidden sm:inline">Mulai 99 Ribu/Bln</span>
            <span class="sm:hidden">99rb/Bln</span>
          </button>
        </div>

      </div>
    </header>
  `,
})
export class NavbarComponent {
  private projectService = inject(ProjectService);
  private platformService = inject(PlatformService);

  onLogoClick(event: Event) {
    event.preventDefault();
    this.platformService.setView('landing');
    this.projectService.showLandingPage();
  }

  openDemo() {
    this.platformService.setView('demo');
  }

  onLoginClick(event: Event) {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      window.location.href = 'https://dashboard-nexus-black.vercel.app/';
    }
  }

  goToCheckout() {
    this.platformService.setView('checkout');
  }
}
