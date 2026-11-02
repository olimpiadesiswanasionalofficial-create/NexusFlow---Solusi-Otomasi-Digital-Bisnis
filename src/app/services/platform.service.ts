import { Injectable, signal, computed } from '@angular/core';
import {
  AppView,
  UserAccount,
  AiWorker,
  ResearchIdea,
  CopywritingDraft,
  BrandAsset,
  DigitalProduct,
  GalleryAsset,
  AvatarProfile,
  AcademyModule,
  SupportTicket,
  OrderRecord,
  QuizState,
} from '../models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  // Navigation View State
  readonly currentView = signal<AppView>('landing');
  readonly demoTabActive = signal<string>('beranda');
  readonly demoViewportMode = signal<'desktop' | 'mobile'>('desktop');

  // Modals & drawers
  readonly isLoginModalOpen = signal<boolean>(false);
  readonly isConsultationModalOpen = signal<boolean>(false);
  readonly isVideoModalOpen = signal<boolean>(false);

  // Authenticated user
  readonly currentUser = signal<UserAccount>({
    id: 'user-01',
    name: 'Bpk. Ridwan Santoso',
    email: 'ridwan.bisnis@gmail.com',
    phone: '0821-4567-8901',
    role: 'member',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    plan: 'Pro Growth',
    status: 'active',
    purchasedAddons: ['Tool Factory', 'Academy Pro'],
    createdAt: '24 Oktober 2026',
  });

  // 5 AI Workers System
  readonly aiWorkers = signal<AiWorker[]>([
    {
      id: 'w-1',
      number: '01',
      name: 'Dr. Arya Wirawan',
      position: 'AI Market Researcher',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      specialty: 'Validasi Niche, Analisis Tren & Celah Pasar',
      description: 'Menemukan ribuan data pencarian produk di Indonesia untuk memastikan produk Anda pasti ada pembelinya.',
      mainTasks: ['Analisis Kata Kunci', 'Audit Kompetitor', 'Validasi Harga Jual', 'Identifikasi Keluhan Konsumen'],
      status: 'Completed',
      progress: 100,
      currentOutput: 'Laporan Niche: 5 Kategori Produk Digital dengan Margin Tertinggi di Q4 2026',
    },
    {
      id: 'w-2',
      number: '02',
      name: 'Karin Anindya',
      position: 'AI Senior Copywriter',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      specialty: 'High-Converting Sales Copy & Video Scripts',
      description: 'Merangkai kalimat penawaran menghipnotis yang mudah dipahami orang awam hingga memicu checkout seketika.',
      mainTasks: ['Naskah Landing Page', 'Hook Iklan 3 Detik', 'Skrip Video UGC 9:16', 'Email Follow-up Otomatis'],
      status: 'Completed',
      progress: 100,
      currentOutput: '15 Variasi Hook Iklan Meta Ads & 1 Full Long-Form Sales Copy',
    },
    {
      id: 'w-3',
      number: '03',
      name: 'Rizky Mahendra',
      position: 'AI Product Builder',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      specialty: 'Pembuatan Produk Digital & Mini Web-App',
      description: 'Merancang produk digital bernilai tinggi seperti panduan interaktif, template bisnis, dan tools otomatis.',
      mainTasks: ['Struktur Modul Produk', 'Pembuatan File Template', 'Arsitektur Mini-Tool', 'Checklist Deliverables'],
      status: 'Processing',
      progress: 85,
      currentOutput: 'Sedang mengompilasi Mini-App: Kalkulator Laba Bersih Seller Marketplace v2.1',
    },
    {
      id: 'w-4',
      number: '04',
      name: 'Sonia Clarissa',
      position: 'AI Visual Designer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
      specialty: 'Desain Brand Identity & Banner Ads 3D',
      description: 'Menghasilkan visual kemasan produk premium, banner iklan tajam berbagai ukuran, dan logo elegan.',
      mainTasks: ['Mockup Produk 3D', 'Banner Ads 1:1 & 9:16', 'Palet Warna Brand', 'Aset Visual Landing Page'],
      status: 'Processing',
      progress: 70,
      currentOutput: 'Menyelesaikan 8 Konsep Banner Iklan Instagram Feed & Story',
    },
    {
      id: 'w-5',
      number: '05',
      name: 'Fandi Rahardjo',
      position: 'AI Marketing Strategist',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
      specialty: 'Optimasi Iklan & Setup Funnel Konversi',
      description: 'Menyusun struktur campaign Meta Ads & TikTok Ads serta mengoptimalkan alur checkout otomatis.',
      mainTasks: ['Segmentasi Target Audiens', 'Pengaturan Pixel & CAPI', 'A/B Testing Angle Iklan', 'Proyeksi ROAS'],
      status: 'Waiting',
      progress: 30,
      currentOutput: 'Menunggu finalisasi banner visual dari Sonia Clarissa',
    },
  ]);

  // AI Research Saved Concepts
  readonly researchIdeas = signal<ResearchIdea[]>([
    {
      id: 'res-1',
      niche: 'Seller Marketplace UMKM',
      productName: 'Kalkulator Profit & Biaya Admin Shopee/Tokopedia Otomatis',
      targetMarket: 'Pebisnis online shop pemula yang bingung menghitung potongan komisi dan gratis ongkir.',
      problemSolved: 'Banyak seller marketplace mengira untung besar padahal rugi akibat salah menghitung potongan admin.',
      uniqueValue: 'Aplikasi web instan tanpa instalasi, update otomatis dengan skema biaya komisi terbaru.',
      monetization: 'Sekali bayar lisensi seumur hidup (One-time payment) + opsi update tahunan.',
      suggestedPrice: 199000,
      opportunityScore: 94,
      methodologyNote: 'Pencarian kata kunci naik 340% dalam 6 bulan terakhir dengan kompetisi rendah.',
      date: '01 Nov 2026',
    },
    {
      id: 'res-2',
      niche: 'Kreator Konten & Affiliate',
      productName: 'Bank Naskah Viral 365 Hari untuk Video TikTok & Reels',
      targetMarket: 'Affiliate marketer dan kreator yang kehabisan ide konten harian untuk jualan.',
      problemSolved: 'Writer block dan kesulitan merangkai hook video yang ditonton hingga akhir.',
      uniqueValue: 'Kategori segmented: Skincare, Elektronik, Fashion, dan Makanan dengan formula hook teruji.',
      monetization: 'Paket bundling template naskah + bonus panduan video UGC.',
      suggestedPrice: 249000,
      opportunityScore: 91,
      methodologyNote: 'Pasar kreator affiliate di Indonesia bertumbuh pesat dengan daya beli tinggi untuk tools penunjang.',
      date: '28 Okt 2026',
    },
  ]);

  // Copywriting drafts
  readonly copyDrafts = signal<CopywritingDraft[]>([
    {
      id: 'cp-1',
      type: 'hook',
      angle: 'Problem-Agitation',
      headline: 'Jualan di Marketplace Ramai tapi Rekening Malah Boncos? Ini Penyebabnya!',
      body: 'Tahukah Anda kalau potongan biaya admin, program gratis ongkir ekstra, dan cash-back bisa memakan hingga 18% dari harga jual Anda? Tanpa hitungan pasti, setiap paket yang Anda kirim justru mengikis modal Anda perlahan.',
      cta: 'Hitung Profit Bersih Anda Sekarang (Gratis)',
      createdAt: 'Hari ini',
    },
    {
      id: 'cp-2',
      type: 'sales_page',
      angle: 'Direct-Offer',
      headline: 'Miliki Sistem Bisnis Otomatis yang Menerima Pembayaran 24 Jam Tanpa Begadang Cek Mutasi Bank!',
      body: 'NexusFlow menghadirkan solusi terlengkap untuk pebisnis Indonesia: website penjualan modern, 5 karyawan AI cerdas, dan mesin QRIS otomatis yang langsung mentransfer uang ke rekening Anda seketika.',
      cta: 'Dapatkan Akses Lengkap NexusFlow Hari Ini',
      createdAt: 'Kemarin',
    },
  ]);

  // Brand Assets
  readonly brandAssets = signal<BrandAsset[]>([
    {
      id: 'b-1',
      brandName: 'NexusFlow',
      industry: 'Platform Bisnis AI & SaaS',
      tagline: 'Otomasi Cerdas, Bisnis Naik Kelas',
      primaryColor: '#09090b',
      secondaryColor: '#18181b',
      accentColor: '#10b981',
      fontPairing: 'Plus Jakarta Sans + JetBrains Mono',
      logoMockupUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      createdAt: '24 Okt 2026',
    },
  ]);

  // Digital Products in Member Area
  readonly digitalProducts = signal<DigitalProduct[]>([
    {
      id: 'prod-1',
      name: 'Kalkulator Margin Marketplace Pro',
      category: 'Web App & Tool',
      price: 199000,
      status: 'Ready',
      salesCount: 142,
      revenue: 28258000,
      description: 'Aplikasi web interaktif untuk menghitung keuntungan bersih seller online.',
      fileOutput: 'marketplace-calc-v2.zip',
      landingPageUrl: 'https://sellercalc.nexusflow.id',
    },
    {
      id: 'prod-2',
      name: 'Masterclass Copywriting AI 2026',
      category: 'Course & Template',
      price: 299000,
      status: 'Ready',
      salesCount: 88,
      revenue: 26312000,
      description: 'Panduan lengkap merangkai naskah penjualan otomatis berkonversi tinggi.',
      fileOutput: 'masterclass-copywriting.pdf',
      landingPageUrl: 'https://copyclass.nexusflow.id',
    },
    {
      id: 'prod-3',
      name: 'Katalog 50+ Template UGC 9:16',
      category: 'Video Assets',
      price: 149000,
      status: 'Building',
      salesCount: 0,
      revenue: 0,
      description: 'Kumpulan aset video vertikal siap edit untuk kampanye iklan TikTok.',
      fileOutput: 'ugc-templates-pack.zip',
      landingPageUrl: 'https://ugcpack.nexusflow.id',
    },
  ]);

  // Gallery Assets
  readonly gallery = signal<GalleryAsset[]>([
    {
      id: 'g-1',
      name: 'Logo Master NexusFlow Vector',
      category: 'Logo',
      fileType: 'SVG / PNG',
      size: '1.8 MB',
      date: '24 Okt 2026',
    },
    {
      id: 'g-2',
      name: 'Banner Iklan Meta Ads 1:1 (Set 10 Variasi)',
      category: 'Image Ads',
      fileType: 'ZIP (PNG)',
      size: '28.4 MB',
      date: '28 Okt 2026',
    },
    {
      id: 'g-3',
      name: 'Skrip & Storyboard Video UGC TikTok 9:16',
      category: 'Video',
      fileType: 'PDF / MP4',
      size: '45.1 MB',
      date: '30 Okt 2026',
    },
    {
      id: 'g-4',
      name: 'Landing Page HTML5 & Tailwind Template',
      category: 'Landing Page',
      fileType: 'ZIP',
      size: '12.5 MB',
      date: '31 Okt 2026',
    },
    {
      id: 'g-5',
      name: 'Buku Panduan Admin & Blueprint Validasi',
      category: 'PDF',
      fileType: 'PDF',
      size: '4.2 MB',
      date: '01 Nov 2026',
    },
  ]);

  // Avatars Library
  readonly avatarLibrary = signal<AvatarProfile[]>([
    {
      id: 'av-1',
      name: 'Rian (Executive Professional)',
      gender: 'Male',
      style: 'Professional',
      previewUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      characteristics: 'Pria formal, jas rapi, tatapan meyakinkan, cocok untuk produk edukasi bisnis & investasi.',
    },
    {
      id: 'av-2',
      name: 'Nadia (Hijab Entrepreneur)',
      gender: 'Female',
      style: 'Hijab',
      previewUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      characteristics: 'Wanita berhijab modern, hangat, komunikatif, ideal untuk fashion muslim, kosmetik & UMKM.',
    },
    {
      id: 'av-3',
      name: 'Dimas (Casual Creator)',
      gender: 'Male',
      style: 'Casual',
      previewUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      characteristics: 'Pemuda kasual, gaya santai, ramah, cocok untuk review gadget, tools produktivitas, & affiliate.',
    },
    {
      id: 'av-4',
      name: 'Siti (Corporate Leader)',
      gender: 'Female',
      style: 'Business',
      previewUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      characteristics: 'Wanita profesional berwibawa, nada suara tegas, cocok untuk presentasi B2B & corporate.',
    },
  ]);

  // Academy Modules
  readonly academyModules = signal<AcademyModule[]>([
    {
      id: 'ac-1',
      number: 1,
      title: 'Modul 1: Foundation (Fondasi Bisnis Digital)',
      description: 'Memahami ekosistem produk digital, pemilihan niche, dan pemanfaatan tools AI dari nol.',
      duration: '45 Menit',
      completed: true,
      lessons: [
        { id: 'l-1', title: '1.1 Pengenalan Bisnis Produk Digital di Indonesia', duration: '10:15', completed: true },
        { id: 'l-2', title: '1.2 Menemukan Masalah Pasar dengan AI Research', duration: '14:20', completed: true },
        { id: 'l-3', title: '1.3 Menentukan Target Pembeli & Daya Beli', duration: '12:05', completed: true },
        { id: 'l-4', title: '1.4 Perhitungan Modal & Manajemen Arus Kas', duration: '08:40', completed: true },
      ],
    },
    {
      id: 'ac-2',
      number: 2,
      title: 'Modul 2: Product Development (Pembuatan Produk Bernilai Tinggi)',
      description: 'Langkah praktis merancang ebook, kelas online, dan mini web-app tanpa perlu coding.',
      duration: '1 Jam 15 Menit',
      completed: false,
      lessons: [
        { id: 'l-5', title: '2.1 Validasi Produk Sebelum Diproduksi', duration: '15:10', completed: true },
        { id: 'l-6', title: '2.2 Membangun Identitas Brand & Logo Profesional', duration: '18:45', completed: false },
        { id: 'l-7', title: '2.3 Menentukan Harga Jual (Pricing Psychology)', duration: '20:10', completed: false },
        { id: 'l-8', title: '2.4 Strategi Penawaran Berantai (Upsell & Cross-sell)', duration: '21:30', completed: false },
      ],
    },
    {
      id: 'ac-3',
      number: 3,
      title: 'Modul 3: Online Business & Automated Sales (Otomasi Kasir 24 Jam)',
      description: 'Setup landing page, integrasi QRIS & Virtual Account langsung ke rekening bank Anda.',
      duration: '1 Jam 30 Menit',
      completed: false,
      lessons: [
        { id: 'l-9', title: '3.1 Menyusun Struktur Landing Page Konversi Tinggi', duration: '22:15', completed: false },
        { id: 'l-10', title: '3.2 Menghubungkan Payment Gateway QRIS & VA Bank', duration: '25:40', completed: false },
        { id: 'l-11', title: '3.3 Otomasi Struk Pembayaran & Pesan WhatsApp', duration: '18:15', completed: false },
        { id: 'l-12', title: '3.4 Strategi Iklan Meta Ads Menggunakan Materi AI', duration: '24:00', completed: false },
      ],
    },
  ]);

  // Support Tickets
  readonly supportTickets = signal<SupportTicket[]>([
    {
      id: 'TICK-802',
      userEmail: 'ridwan.bisnis@gmail.com',
      userName: 'Bpk. Ridwan Santoso',
      subject: 'Integrasi Callback Webhook Virtual Account Mandiri',
      category: 'Payment Gateway',
      priority: 'High',
      status: 'In Progress',
      createdAt: '01 Nov 2026, 09:30 WIB',
      messages: [
        { sender: 'Ridwan Santoso', text: 'Apakah webhook Mandiri sudah otomatis aktif di dashboard?', time: '09:30 WIB' },
        { sender: 'NexusFlow Support', text: 'Halo Pak Ridwan! Tim teknis kami sedang memvalidasi endpoint sandbox Anda.', time: '09:42 WIB' },
      ],
    },
    {
      id: 'TICK-799',
      userEmail: 'kevin@glownaturals.id',
      userName: 'Kevin Saputra',
      subject: 'Ubah font pada landing page skincare ke Plus Jakarta Sans',
      category: 'Design & UI',
      priority: 'Medium',
      status: 'Resolved',
      createdAt: '28 Okt 2026',
      messages: [
        { sender: 'Kevin', text: 'Mohon font headline disamakan dengan brand guidelines kami.', time: '14:00 WIB' },
        { sender: 'NexusFlow Support', text: 'Font telah diperbarui ke Plus Jakarta Sans di seluruh halaman staging.', time: '15:10 WIB' },
      ],
    },
  ]);

  // Orders Records
  readonly orders = signal<OrderRecord[]>([
    {
      id: 'ord-101',
      orderNumber: 'NXF-8921',
      userName: 'Hendra Wijaya',
      userEmail: 'hendra.wijaya@indokreatif.co.id',
      userPhone: '0812-8899-2345',
      productName: 'Paket Pro Growth',
      basePrice: 5990000,
      addons: [{ name: 'Tool Factory Mini-App', price: 1500000 }],
      gatewayFee: 52430,
      total: 7542430,
      paymentMethod: 'QRIS Dinamis',
      status: 'success',
      createdAt: '24 Okt 2026, 11:00 WIB',
      paidAt: '24 Okt 2026, 11:04 WIB',
    },
    {
      id: 'ord-102',
      orderNumber: 'NXF-7814',
      userName: 'Kevin Saputra',
      userEmail: 'kevin@glownaturals.id',
      userPhone: '0813-1122-8877',
      productName: 'Paket Starter Launchpad',
      basePrice: 2990000,
      addons: [],
      gatewayFee: 20930,
      total: 3010930,
      paymentMethod: 'BCA Virtual Account',
      status: 'success',
      createdAt: '18 Okt 2026, 14:05 WIB',
      paidAt: '18 Okt 2026, 14:10 WIB',
    },
    {
      id: 'ord-103',
      orderNumber: 'NXF-6502',
      userName: 'Maya Anggraini',
      userEmail: 'maya@samudralogistik.com',
      userPhone: '0811-3456-7890',
      productName: 'Paket Enterprise Scale',
      basePrice: 12990000,
      addons: [{ name: 'VIP Dedicated SLA', price: 2500000 }],
      gatewayFee: 108430,
      total: 15598430,
      paymentMethod: 'Mandiri Virtual Account',
      status: 'success',
      createdAt: '01 Okt 2026, 09:20 WIB',
      paidAt: '01 Okt 2026, 09:30 WIB',
    },
  ]);

  // Interactive Quiz State
  readonly quiz = signal<QuizState>({
    currentStep: 1,
    answers: {},
  });

  // AI Mentor Chat Messages
  readonly mentorMessages = signal<{ sender: 'user' | 'mentor'; text: string; time: string }[]>([
    {
      sender: 'mentor',
      text: 'Halo! Saya AI Mentor NexusFlow. Saya siap membantu Anda menyusun ide produk digital, menentukan harga jual yang menguntungkan, atau memandu langkah teknis pembayaran otomatis Anda. Apa yang ingin kita bahas hari ini?',
      time: '09:00 WIB',
    },
  ]);
  readonly isMentorTyping = signal<boolean>(false);

  // Computed platform statistics
  readonly stats = computed(() => {
    const list = this.orders();
    const totalRev = list.filter((o) => o.status === 'success').reduce((acc, o) => acc + o.total, 0);
    return {
      totalUsers: 148,
      totalOrders: list.length,
      successfulOrders: list.filter((o) => o.status === 'success').length,
      totalRevenue: totalRev,
      activeAiWorkers: 5,
      openTickets: this.supportTickets().filter((t) => t.status !== 'Resolved').length,
    };
  });

  // View navigation methods
  setView(view: AppView) {
    this.currentView.set(view);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  setDemoTab(tab: string) {
    this.demoTabActive.set(tab);
  }

  setDemoViewport(mode: 'desktop' | 'mobile') {
    this.demoViewportMode.set(mode);
  }

  // Quiz methods
  setQuizAnswer(stepKey: 'currentJob' | 'digitalExp' | 'budget' | 'targetProduct' | 'dailyHours' | 'mainGoal', val: string) {
    this.quiz.update((q) => ({
      ...q,
      answers: { ...q.answers, [stepKey]: val },
    }));
  }

  nextQuizStep() {
    const q = this.quiz();
    if (q.currentStep < 6) {
      this.quiz.update((curr) => ({ ...curr, currentStep: curr.currentStep + 1 }));
    } else {
      this.generateQuizResult();
    }
  }

  prevQuizStep() {
    this.quiz.update((curr) => ({ ...curr, currentStep: Math.max(1, curr.currentStep - 1) }));
  }

  generateQuizResult() {
    const answers = this.quiz().answers;
    const profile = answers.currentJob || 'Profesional / Pemula Bisnis';
    const goal = answers.mainGoal || 'Membangun Sumber Penghasilan Otomatis';
    const target = answers.targetProduct || 'Web App & Template Digital';

    const result = {
      userProfile: `Kategori: ${profile} dengan target ${goal}`,
      recommendedCategory: `${target} Berbasis Nilai Praktis`,
      businessIdea: `Platform Solusi Praktis untuk ${answers.targetProduct || 'Pasar UMKM'} dengan Sistem Pembayaran QRIS Langsung`,
      actionRoadmap: [
        'Hari 1-3: Validasi Masalah Pasar menggunakan AI Research',
        'Hari 4-7: Pembuatan Naskah & Tampilan Landing Page via AI Copywriter',
        'Hari 8-12: Integrasi Sistem Kasir Otomatis & Testing Webhook QRIS',
        'Hari 13-20: Kampanye Iklan Berbantuan AI Ads Generator',
      ],
      priorityTasks: [
        'Uji coba fitur AI Research untuk mendapatkan 3 konsep niche potensial',
        'Buka Demo Tool Factory untuk melihat contoh produk digital yang bisa langsung dijual',
        'Aktifkan akun NexusFlow untuk mengakses 5 AI Worker sekaligus',
      ],
      recommendedFeatures: ['AI Research', 'Mesin Kasir Otomatis QRIS', 'Tool Factory', 'AI Copywriter'],
    };

    this.quiz.update((curr) => ({ ...curr, currentStep: 7, result }));
  }

  resetQuiz() {
    this.quiz.set({ currentStep: 1, answers: {} });
  }

  // AI Mentor Chat
  sendMentorMessage(text: string) {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    this.mentorMessages.update((msgs) => [...msgs, { sender: 'user', text, time: now }]);
    this.isMentorTyping.set(true);

    setTimeout(() => {
      let reply = 'Terima kasih atas pertanyaan Anda! ';
      const lower = text.toLowerCase();
      if (lower.includes('harga') || lower.includes('paket') || lower.includes('biaya')) {
        reply += 'NexusFlow menyediakan 3 pilihan: Starter Launchpad (Rp 2.990.000), Pro Growth (Rp 5.990.000 dengan payment gateway otomatis), dan Enterprise Scale (Rp 12.990.000 untuk portal kustom). Uang pembeli 100% langsung masuk ke rekening Anda tanpa potongan komisi omset.';
      } else if (lower.includes('qris') || lower.includes('pembayaran') || lower.includes('uang')) {
        reply += 'Sistem pembayaran otomatis NexusFlow mendukung QRIS dinamis dan Virtual Account (BCA, Mandiri, BRI). Saat pembeli transfer, sistem mendeteksi dalam 1.2 detik dan langsung mengaktifkan pesanan mereka tanpa Anda perlu cek mutasi.';
      } else if (lower.includes('niche') || lower.includes('ide') || lower.includes('produk')) {
        reply += 'Untuk pasar Indonesia saat ini, produk digital bertema produktivitas seller marketplace, template naskah video affiliate TikTok, dan tools kalkulator bisnis memiliki rasio konversi tertinggi. Anda bisa mengujinya langsung di menu AI Research!';
      } else {
        reply += 'Di NexusFlow, seluruh alur dari riset pasar, penulisan copy, desain visual, hingga mesin kasir sudah siap pakai. Anda bisa mencoba demo interaktif tanpa login atau langsung memilih paket sesuai skala bisnis Anda.';
      }

      this.isMentorTyping.set(false);
      this.mentorMessages.update((msgs) => [...msgs, { sender: 'mentor', text: reply, time: now }]);
    }, 1000);
  }

  // Generate new AI Research Item simulation
  generateAiResearch(nicheInput: string) {
    const newId = `res-${Date.now()}`;
    const score = Math.floor(88 + Math.random() * 10);
    const newIdea: ResearchIdea = {
      id: newId,
      niche: nicheInput || 'Kreator Edukasi & Bisnis',
      productName: `Sistem Otomasi Praktis untuk ${nicheInput || 'Kreator Mandiri'}`,
      targetMarket: `Komunitas dan pebisnis aktif di segmen ${nicheInput || 'digital'} di Indonesia.`,
      problemSolved: 'Alur operasional manual yang memakan waktu berjam-jam setiap hari.',
      uniqueValue: 'Otomatisasi 1-klik, mudah dipelajari orang awam, langsung terhubung ke payment gateway.',
      monetization: 'Lisensi seumur hidup + add-on materi pelatihan.',
      suggestedPrice: 249000,
      opportunityScore: score,
      methodologyNote: `Skor dihitung dari perbandingan volume pencarian (High), tingkat kejenuhan pasar (Low), dan elastisitas harga pembeli.`,
      date: 'Hari ini',
    };

    this.researchIdeas.update((list) => [newIdea, ...list]);
    return newIdea;
  }

  // Generate new Copywriting draft
  generateCopywriting(type: CopywritingDraft['type'], angle: CopywritingDraft['angle'], productTitle: string) {
    const newDraft: CopywritingDraft = {
      id: `cp-${Date.now()}`,
      type,
      angle,
      headline: `Rahasia Sukses Mengembangkan ${productTitle || 'Bisnis Digital'} Tanpa Tim Besar!`,
      body: `Banyak orang mengira membangun bisnis digital butuh biaya belasan juta untuk rekrut tim. Padahal dengan sistem otomasi cerdas NexusFlow, Anda bisa menyelesaikan riset, copywriting, dan mesin pembayaran hanya dalam hitungan hari.`,
      cta: 'Mulai Sekarang dan Rasakan Kemudahannya',
      createdAt: 'Baru saja',
    };
    this.copyDrafts.update((drafts) => [newDraft, ...drafts]);
    return newDraft;
  }

  // Mark lesson completed
  toggleLessonComplete(moduleId: string, lessonId: string) {
    this.academyModules.update((modules) =>
      modules.map((m) => {
        if (m.id === moduleId) {
          const updatedLessons = m.lessons.map((l) => (l.id === lessonId ? { ...l, completed: !l.completed } : l));
          const allCompleted = updatedLessons.every((l) => l.completed);
          return { ...m, lessons: updatedLessons, completed: allCompleted };
        }
        return m;
      })
    );
  }

  // Add new support ticket
  submitSupportTicket(subject: string, category: string, message: string) {
    const user = this.currentUser();
    const newTicket: SupportTicket = {
      id: `TICK-${Math.floor(100 + Math.random() * 900)}`,
      userEmail: user.email,
      userName: user.name,
      subject,
      category,
      priority: 'Medium',
      status: 'Open',
      createdAt: 'Hari ini, Baru saja',
      messages: [{ sender: user.name, text: message, time: 'Baru saja' }],
    };
    this.supportTickets.update((t) => [newTicket, ...t]);
  }
}
