import { Injectable, signal, computed } from '@angular/core';
import {
  ClientProject,
  CheckoutPaymentState,
  ProjectRevision,
  ProjectInvoice,
} from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // Navigation & View state
  readonly activeView = signal<'landing' | 'client_portal'>('landing');
  readonly isPaymentModalOpen = signal<boolean>(false);
  readonly isWhatsAppModalOpen = signal<boolean>(false);

  // Active checkout state
  readonly currentCheckout = signal<CheckoutPaymentState | null>(null);

  // Initial projects data
  readonly projects = signal<ClientProject[]>([
    {
      id: 'proj-001',
      code: 'NXF-8921',
      clientName: 'Hendra Wijaya, S.Kom',
      clientEmail: 'hendra.wijaya@indokreatif.co.id',
      clientPhone: '0812-8899-2345',
      companyName: 'PT. Indo Kreatif Mandiri',
      projectTitle: 'Portal Kursus Digital & Sistem Pembayaran Otomatis',
      category: 'Website Edukasi & Membership',
      packageType: 'Pro Growth',
      status: 'Sedang Berjalan',
      startDate: '24 Oktober 2026',
      targetLaunchDate: '07 November 2026',
      overallProgress: 75,
      healthStatus: 'Optimal',
      stagingUrl: 'https://staging-indokreatif.nexusflow.id',
      milestones: [
        {
          id: 'm-1',
          title: '1. Riset Target Pasar & Blueprint Sistem',
          description: 'Analisis audiens pembeli, perumusan struktur menu, dan pemetaan alur belanja anti ribet.',
          status: 'completed',
          progressPercent: 100,
          completionDate: '26 Okt 2026',
          notes: 'Disetujui tanpa revisi. 4 user personas dan alur checkout 1-klik tuntas.',
        },
        {
          id: 'm-2',
          title: '2. Desain Visual UI/UX & Naskah Penjualan (Copywriting)',
          description: 'Pembuatan tampilan mobile-first estetis, banner promo, dan kalimat penawaran persuasif.',
          status: 'completed',
          progressPercent: 100,
          completionDate: '30 Okt 2026',
          notes: 'Figma prototype disetujui. Naskah lolos review tone brand.',
        },
        {
          id: 'm-3',
          title: '3. Pemrograman Web & Integrasi Payment Gateway',
          description: 'Koneksi API QRIS instan, Virtual Account BCA/BRI/Mandiri, dan aktivasi otomatis database member.',
          status: 'in_progress',
          progressPercent: 80,
          notes: 'Webhook pembayaran BCA & QRIS berhasil diuji. Sedang merapikan dashboard murid.',
        },
        {
          id: 'm-4',
          title: '4. Quality Control & Simulasi Transaksi Riil',
          description: 'Uji kecepatan loading di bawah 1.5 detik, uji proteksi keamanan data, dan tes notifikasi WhatsApp otomatis.',
          status: 'pending',
          progressPercent: 0,
          notes: 'Dijadwalkan mulai 04 November 2026.',
        },
        {
          id: 'm-5',
          title: '5. Peluncuran Resmi & Serah Terima Kunci',
          description: 'Pemasangan domain utama (.com / .id), serah terima video tutorial panduan admin, dan garansi maintenance aktif.',
          status: 'pending',
          progressPercent: 0,
        },
      ],
      deliverables: [
        {
          id: 'del-1',
          name: 'Master UI/UX Design System (Figma File)',
          category: 'Desain & UI',
          fileType: 'FIGMA',
          size: '48.2 MB',
          updatedAt: '30 Okt 2026',
          status: 'Ready',
          downloadUrl: '#',
        },
        {
          id: 'del-2',
          name: 'Naskah Penjualan & Copywriting Landing Page',
          category: 'Dokumentasi',
          fileType: 'PDF / DOCX',
          size: '3.4 MB',
          updatedAt: '30 Okt 2026',
          status: 'Ready',
          downloadUrl: '#',
        },
        {
          id: 'del-3',
          name: 'Source Code Web & Setup Database (Git Repo)',
          category: 'Source Code',
          fileType: 'ZIP',
          size: '124 MB',
          updatedAt: 'Hari ini',
          status: 'Draft',
          downloadUrl: '#',
        },
        {
          id: 'del-4',
          name: 'Panduan Operasional & Buku Saku Admin Pemula',
          category: 'Dokumentasi',
          fileType: 'PDF + Video',
          size: '310 MB',
          updatedAt: 'Menunggu QA',
          status: 'Locked',
        },
      ],
      revisions: [
        {
          id: 'rev-1',
          title: 'Ubah warna tombol CTA beli di bagian atas menjadi hijau terang',
          description: 'Mohon kontras tombol dipertegas agar pembeli usia 40+ lebih mudah melihat tombol bayar sekarang.',
          category: 'Tampilan (UI)',
          submittedAt: '31 Okt 2026 - 14:20 WIB',
          status: 'Selesai',
          developerNote: 'Sudah disesuaikan ke Emerald #10B981 dengan efek pulsasi lembut.',
        },
        {
          id: 'rev-2',
          title: 'Tambahkan opsi pembayaran Virtual Account Bank Mandiri',
          description: 'Banyak calon pembeli kami nasabah Mandiri Livin.',
          category: 'Sistem Pembayaran',
          submittedAt: '01 Nov 2026 - 09:15 WIB',
          status: 'Sedang Dikerjakan',
          developerNote: 'API Mandiri VA sandbox telah ditambahkan, sedang sinkronisasi callback.',
        },
      ],
      invoices: [
        {
          invoiceNumber: 'INV/2026/NXF/0891',
          issuedTo: 'Hendra Wijaya',
          companyName: 'PT. Indo Kreatif Mandiri',
          projectTitle: 'Paket Pro Growth - Website Edukasi + Payment Otomatis',
          amount: 5990000,
          paymentMethod: 'QRIS Dinamis Otomatis',
          status: 'PAID',
          issuedDate: '24 Okt 2026',
          paidDate: '24 Okt 2026 - 11:04 WIB',
          companyLegal: 'PT. CAHAYA ARSYA GEMILANG',
        },
      ],
      activityLogs: [
        {
          id: 'act-1',
          timestamp: 'Hari ini, 15:45 WIB',
          actor: 'Arga Pratama (Lead Engineer)',
          role: 'NexusFlow Engineering',
          action: 'Konfigurasi callback webhook Virtual Account Bank Mandiri berhasil diverifikasi 100%.',
          badge: 'Sistem Pembayaran',
        },
        {
          id: 'act-2',
          timestamp: 'Hari ini, 11:20 WIB',
          actor: 'Siti Rahmawati (Project Manager)',
          role: 'NexusFlow Operations',
          action: 'Pembaruan catatan progres milestone 3: Integrasi QRIS instan selesai tanpa hambatan.',
          badge: 'Progres',
        },
        {
          id: 'act-3',
          timestamp: '31 Okt 2026, 17:30 WIB',
          actor: 'Bima Satria (UI/UX Designer)',
          role: 'NexusFlow Creative',
          action: 'Menyelesaikan revisi tampilan tombol CTA sesuai permintaan Bpk. Hendra.',
          badge: 'Revisi Selesai',
        },
      ],
    },
    {
      id: 'proj-002',
      code: 'NXF-7814',
      clientName: 'Kevin Saputra',
      clientEmail: 'kevin@glownaturals.id',
      clientPhone: '0813-1122-8877',
      companyName: 'Glow Naturals Indonesia',
      projectTitle: 'High-Converting Landing Page Skincare & Checkout Otomatis',
      category: 'Landing Page Produk Fisik',
      packageType: 'Starter Launchpad',
      status: 'Review Klien',
      startDate: '18 Oktober 2026',
      targetLaunchDate: '28 Oktober 2026',
      overallProgress: 95,
      healthStatus: 'Memerlukan Feedback',
      stagingUrl: 'https://staging-glow.nexusflow.id',
      milestones: [
        {
          id: 'm2-1',
          title: '1. Riset Persona & Sudut Pandang Naskah',
          description: 'Menemukan titik sakit calon pembeli produk perawatan wajah.',
          status: 'completed',
          progressPercent: 100,
          completionDate: '20 Okt 2026',
        },
        {
          id: 'm2-2',
          title: '2. Desain Visual Modern & Clean',
          description: 'Tampilan premium dengan fotografi produk beresolusi tinggi.',
          status: 'completed',
          progressPercent: 100,
          completionDate: '24 Okt 2026',
        },
        {
          id: 'm2-3',
          title: '3. Pemasangan Form Pesanan & Cek Ongkir Otomatis',
          description: 'Koneksi kurir JNE, J&T, SiCepat dan pembayaran QRIS instan.',
          status: 'completed',
          progressPercent: 100,
          completionDate: '27 Okt 2026',
        },
        {
          id: 'm2-4',
          title: '4. Review Akhir Klien Sebelum Peluncuran',
          description: 'Pengecekan akhir teks, kontak WhatsApp CS, dan link Instagram.',
          status: 'in_progress',
          progressPercent: 80,
          notes: 'Menunggu konfirmasi final dari Bpk. Kevin untuk pengalihan domain.',
        },
      ],
      deliverables: [
        {
          id: 'del2-1',
          name: 'Desain Landing Page Final (Figma)',
          category: 'Desain & UI',
          fileType: 'FIGMA',
          size: '32 MB',
          updatedAt: '24 Okt 2026',
          status: 'Ready',
        },
        {
          id: 'del2-2',
          name: 'Aset Gambar Iklan Meta Ads (10 Variasi)',
          category: 'Desain & UI',
          fileType: 'ZIP',
          size: '64 MB',
          updatedAt: '26 Okt 2026',
          status: 'Ready',
        },
      ],
      revisions: [
        {
          id: 'rev2-1',
          title: 'Ganti nomor WhatsApp layanan pelanggan di footer',
          description: 'Ganti ke nomor CS khusus 0812-7788-9900.',
          category: 'Teks / Konten',
          submittedAt: '28 Okt 2026',
          status: 'Selesai',
          developerNote: 'Telah diperbarui di seluruh tombol chat.',
        },
      ],
      invoices: [
        {
          invoiceNumber: 'INV/2026/NXF/0788',
          issuedTo: 'Kevin Saputra',
          companyName: 'Glow Naturals Indonesia',
          projectTitle: 'Paket Starter Launchpad Skincare',
          amount: 2990000,
          paymentMethod: 'BCA Virtual Account',
          status: 'PAID',
          issuedDate: '18 Okt 2026',
          paidDate: '18 Okt 2026 - 14:10 WIB',
          companyLegal: 'PT. CAHAYA ARSYA GEMILANG',
        },
      ],
      activityLogs: [
        {
          id: 'act2-1',
          timestamp: '28 Okt 2026, 16:00 WIB',
          actor: 'Siti Rahmawati (Project Manager)',
          role: 'NexusFlow Operations',
          action: 'Staging website siap direview klien. Email notifikasi telah dikirim.',
        },
      ],
    },
    {
      id: 'proj-003',
      code: 'NXF-6502',
      clientName: 'Maya Anggraini, S.E.',
      clientEmail: 'maya@samudralogistik.com',
      clientPhone: '0811-3456-7890',
      companyName: 'PT. Samudra Logistik Internasional',
      projectTitle: 'Company Profile Perusahaan & Integrasi Sistem Penawaran Otomatis',
      category: 'Website Korporat & B2B',
      packageType: 'Enterprise Scale',
      status: 'Selesai',
      startDate: '01 Oktober 2026',
      targetLaunchDate: '20 Oktober 2026',
      overallProgress: 100,
      healthStatus: 'Optimal',
      stagingUrl: 'https://samudralogistik.com',
      milestones: [
        {
          id: 'm3-1',
          title: '1. Perumusan Profil & Legalitas Usaha',
          description: 'Penataan lisensi, armada logistik, dan galeri fasilitas.',
          status: 'completed',
          progressPercent: 100,
          completionDate: '05 Okt 2026',
        },
        {
          id: 'm3-2',
          title: '2. Desain Korporat Elegan & Responsif',
          description: 'Standar estetika enterprise dengan multi-bahasa (ID & EN).',
          status: 'completed',
          progressPercent: 100,
          completionDate: '12 Okt 2026',
        },
        {
          id: 'm3-3',
          title: '3. Sistem Kalkulator Tarif Pengiriman Kontainer',
          description: 'Fitur kalkulasi estimasi biaya instan untuk calon klien B2B.',
          status: 'completed',
          progressPercent: 100,
          completionDate: '16 Okt 2026',
        },
        {
          id: 'm3-4',
          title: '4. Peluncuran & Integrasi Google Analytics 4',
          description: 'Pemasangan SSL enterprise, optimasi SEO skor 98, live di domain utama.',
          status: 'completed',
          progressPercent: 100,
          completionDate: '20 Okt 2026',
        },
      ],
      deliverables: [
        {
          id: 'del3-1',
          name: 'Dokumentasi Source Code & Akses Cloudflare',
          category: 'Source Code',
          fileType: 'ZIP',
          size: '180 MB',
          updatedAt: '20 Okt 2026',
          status: 'Ready',
        },
        {
          id: 'del3-2',
          name: 'Laporan Audit SEO & Kecepatan Google PageSpeed',
          category: 'Dokumentasi',
          fileType: 'PDF',
          size: '4.8 MB',
          updatedAt: '20 Okt 2026',
          status: 'Ready',
        },
      ],
      revisions: [],
      invoices: [
        {
          invoiceNumber: 'INV/2026/NXF/0650',
          issuedTo: 'Maya Anggraini',
          companyName: 'PT. Samudra Logistik Internasional',
          projectTitle: 'Paket Enterprise Scale - Portal B2B Logistik',
          amount: 12990000,
          paymentMethod: 'Transfer Mandiri Prioritas',
          status: 'PAID',
          issuedDate: '01 Okt 2026',
          paidDate: '01 Okt 2026 - 09:30 WIB',
          companyLegal: 'PT. CAHAYA ARSYA GEMILANG',
        },
      ],
      activityLogs: [
        {
          id: 'act3-1',
          timestamp: '20 Okt 2026, 11:00 WIB',
          actor: 'NexusFlow Release Bot',
          role: 'System',
          action: 'Domain resmi https://samudralogistik.com aktif & SSL terpasang.',
        },
      ],
    },
  ]);

  // Selected project ID in client portal
  readonly activeProjectId = signal<string>('proj-001');

  // Computed active project
  readonly activeProject = computed(() => {
    const list = this.projects();
    const currentId = this.activeProjectId();
    return list.find((p) => p.id === currentId) || list[0];
  });

  // Switch views
  showLandingPage() {
    this.activeView.set('landing');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  showClientPortal(projectId?: string) {
    if (projectId) {
      this.activeProjectId.set(projectId);
    }
    this.activeView.set('client_portal');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Set active project inside portal
  selectProject(id: string) {
    this.activeProjectId.set(id);
  }

  // Open checkout with specific package
  initiateOrder(params: {
    packageName: string;
    price: number;
    clientName?: string;
    clientEmail?: string;
    clientPhone?: string;
    businessName?: string;
    addons?: number;
  }) {
    const randomOrderId = 'NXF-' + Math.floor(1000 + Math.random() * 9000);
    const addonsCost = params.addons || 0;
    const gatewayFee = Math.round((params.price + addonsCost) * 0.007);
    const totalAmount = params.price + addonsCost + gatewayFee;

    // Generate random VA number (e.g. 8808 + random 10 digits)
    const vaRandom = '8808' + Math.floor(1000000000 + Math.random() * 9000000000).toString().substring(0, 8);

    const now = new Date();
    const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    const checkoutState: CheckoutPaymentState = {
      orderId: randomOrderId,
      packageName: params.packageName,
      clientName: params.clientName || 'Bpk. Ridwan Santoso',
      clientEmail: params.clientEmail || 'ridwan.bisnis@gmail.com',
      clientPhone: params.clientPhone || '0821-4567-8901',
      businessName: params.businessName || 'Kopi Nusantara Modern',
      packagePrice: params.price,
      addonsCost,
      gatewayFee,
      totalAmount,
      paymentMethod: 'qris',
      vaNumber: vaRandom,
      status: 'awaiting_payment',
      expiresAt: expiry.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB, Besok',
    };

    this.currentCheckout.set(checkoutState);
    this.isPaymentModalOpen.set(true);
  }

  closePaymentModal() {
    this.isPaymentModalOpen.set(false);
  }

  updatePaymentMethod(method: 'qris' | 'va_bca' | 'va_mandiri' | 'va_bri' | 'gopay') {
    const curr = this.currentCheckout();
    if (!curr) return;
    this.currentCheckout.set({
      ...curr,
      paymentMethod: method,
    });
  }

  /**
   * Simulates the instant automated payment confirmation & webhook processing
   */
  processAutomatedPayment() {
    const curr = this.currentCheckout();
    if (!curr) return;

    // Set state to verifying
    this.currentCheckout.set({
      ...curr,
      status: 'verifying',
    });

    // Simulate instant 1.2s gateway webhook response
    setTimeout(() => {
      const nowStr = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB';

      const updatedCheckout: CheckoutPaymentState = {
        ...curr,
        status: 'paid',
        paidAt: `Hari ini, ${nowStr}`,
      };
      this.currentCheckout.set(updatedCheckout);

      // Create new official invoice
      const invoiceNumber = `INV/${new Date().getFullYear()}/NXF/${Math.floor(1000 + Math.random() * 9000)}`;
      const newInvoice: ProjectInvoice = {
        invoiceNumber,
        issuedTo: curr.clientName,
        companyName: curr.businessName,
        projectTitle: `${curr.packageName} - Sistem Digital & Pembayaran Otomatis`,
        amount: curr.totalAmount,
        paymentMethod: this.getPaymentMethodLabel(curr.paymentMethod),
        status: 'PAID',
        issuedDate: 'Hari ini',
        paidDate: `Hari ini, ${nowStr}`,
        companyLegal: 'PT. CAHAYA ARSYA GEMILANG',
      };

      // Create new real-time client project immediately!
      const newProjectId = `proj-${Date.now()}`;
      const newProject: ClientProject = {
        id: newProjectId,
        code: curr.orderId,
        clientName: curr.clientName,
        clientEmail: curr.clientEmail,
        clientPhone: curr.clientPhone,
        companyName: curr.businessName,
        projectTitle: `Pembangunan Sistem Web & Otomasi ${curr.businessName}`,
        category: 'Website & Otomasi Bisnis',
        packageType: curr.packageName.includes('Starter')
          ? 'Starter Launchpad'
          : curr.packageName.includes('Growth')
          ? 'Pro Growth'
          : 'Enterprise Scale',
        status: 'Sedang Berjalan',
        startDate: 'Hari ini',
        targetLaunchDate: '10 Hari Mendatang',
        overallProgress: 15,
        healthStatus: 'Optimal',
        stagingUrl: `https://staging-${curr.orderId.toLowerCase()}.nexusflow.id`,
        milestones: [
          {
            id: 'm-new-1',
            title: '1. Pembayaran Berhasil & Verifikasi Proyek',
            description: 'Pembayaran otomatis terverifikasi oleh gateway PT. CAHAYA ARSYA GEMILANG. Slot pengerjaan aktif.',
            status: 'completed',
            progressPercent: 100,
            completionDate: 'Hari ini',
            notes: 'Faktur lunas terbit otomatis detik itu juga.',
          },
          {
            id: 'm-new-2',
            title: '2. Riset Niche, Alur Konversi & Naskah AI Penjual',
            description: 'Pembuatan copywriting dan struktur penawaran yang mudah dipahami pembeli.',
            status: 'in_progress',
            progressPercent: 25,
            notes: 'Tim riset NexusFlow sedang menganalisis kompetitor dan target pasar.',
          },
          {
            id: 'm-new-3',
            title: '3. Desain UI/UX & Tampilan Mobile-First',
            description: 'Tampilan bersih, elegan, dan ramah pengguna dengan tombol mudah diakses.',
            status: 'pending',
            progressPercent: 0,
          },
          {
            id: 'm-new-4',
            title: '4. Integrasi Mesin Pembayaran Otomatis & Testing Webhook',
            description: 'Pemasangan QRIS instan dan Virtual Account langsung terhubung ke sistem kasir web.',
            status: 'pending',
            progressPercent: 0,
          },
          {
            id: 'm-new-5',
            title: '5. Peluncuran Web & Serah Terima Akses Lengkap',
            description: 'Domain aktif, panduan pengoperasian video, dan pendampingan garansi resmi.',
            status: 'pending',
            progressPercent: 0,
          },
        ],
        deliverables: [
          {
            id: 'del-new-1',
            name: 'Kuitansi & Faktur Resmi Lunas (PDF)',
            category: 'Dokumentasi',
            fileType: 'PDF',
            size: '520 KB',
            updatedAt: 'Baru saja',
            status: 'Ready',
          },
          {
            id: 'del-new-2',
            name: 'Formulir Kebutuhan Konten & Warna Brand',
            category: 'Dokumentasi',
            fileType: 'ONLINE',
            size: 'Interactive',
            updatedAt: 'Baru saja',
            status: 'Ready',
          },
        ],
        revisions: [],
        invoices: [newInvoice],
        activityLogs: [
          {
            id: `act-${Date.now()}`,
            timestamp: `Hari ini, ${nowStr}`,
            actor: 'NexusFlow Payment Gateway',
            role: 'Automated System',
            action: `Pembayaran ${curr.packageName} sebesar Rp ${curr.totalAmount.toLocaleString('id-ID')} terkonfirmasi otomatis via ${this.getPaymentMethodLabel(curr.paymentMethod)}. Proyek dialokasikan ke Lead Engineer.`,
            badge: 'Pembayaran Lunas',
          },
        ],
      };

      // Add to projects signal at the beginning
      this.projects.update((existing) => [newProject, ...existing]);
      this.activeProjectId.set(newProjectId);
    }, 1200);
  }

  addRevision(params: {
    projectId: string;
    title: string;
    description: string;
    category: 'Tampilan (UI)' | 'Teks / Konten' | 'Sistem Pembayaran' | 'Fitur Tambahan';
  }) {
    const newRev: ProjectRevision = {
      id: `rev-${Date.now()}`,
      title: params.title,
      description: params.description,
      category: params.category,
      submittedAt: 'Hari ini - Baru saja',
      status: 'Diajukan',
      developerNote: 'Tiket revisi diterima oleh Project Manager. Sedang dijadwalkan ke tim teknis.',
    };

    const newLog = {
      id: `act-${Date.now()}`,
      timestamp: 'Baru saja',
      actor: 'Klien (Anda)',
      role: 'Client Portal',
      action: `Mengajukan tiket perbaikan: "${params.title}" (${params.category}).`,
      badge: 'Revisi Baru',
    };

    this.projects.update((items) =>
      items.map((p) => {
        if (p.id === params.projectId) {
          return {
            ...p,
            healthStatus: 'Memerlukan Feedback' as const,
            revisions: [newRev, ...p.revisions],
            activityLogs: [newLog, ...p.activityLogs],
          };
        }
        return p;
      })
    );
  }

  getPaymentMethodLabel(method: string): string {
    switch (method) {
      case 'qris':
        return 'QRIS Dinamis (Semua Bank & E-Wallet)';
      case 'va_bca':
        return 'BCA Virtual Account';
      case 'va_mandiri':
        return 'Mandiri Virtual Account';
      case 'va_bri':
        return 'BRI Virtual Account';
      case 'gopay':
        return 'GoPay / GoPay Later';
      default:
        return 'Transfer Otomatis';
    }
  }

  openWhatsAppModal() {
    this.isWhatsAppModalOpen.set(true);
  }

  closeWhatsAppModal() {
    this.isWhatsAppModalOpen.set(false);
  }
}
