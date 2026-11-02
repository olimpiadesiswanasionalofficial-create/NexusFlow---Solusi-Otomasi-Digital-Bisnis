import { Milestone } from '../services/project-calculator';

export interface DeliverableAsset {
  id: string;
  name: string;
  category: 'Desain & UI' | 'Source Code' | 'Dokumentasi' | 'Akses Hosting';
  fileType: string;
  size: string;
  updatedAt: string;
  status: 'Ready' | 'Draft' | 'Locked';
  downloadUrl?: string;
}

export interface ProjectRevision {
  id: string;
  title: string;
  description: string;
  category: 'Tampilan (UI)' | 'Teks / Konten' | 'Sistem Pembayaran' | 'Fitur Tambahan';
  submittedAt: string;
  status: 'Diajukan' | 'Sedang Dikerjakan' | 'Selesai';
  developerNote?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  badge?: string;
}

export interface ProjectInvoice {
  invoiceNumber: string;
  issuedTo: string;
  companyName: string;
  projectTitle: string;
  amount: number;
  paymentMethod: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  issuedDate: string;
  paidDate?: string;
  companyLegal: string;
}

export interface ClientProject {
  id: string;
  code: string; // e.g. NXF-8921
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName: string;
  projectTitle: string;
  category: string;
  packageType: 'Starter Launchpad' | 'Pro Growth' | 'Enterprise Scale' | 'Custom Solutions';
  status: 'Sedang Berjalan' | 'Review Klien' | 'Siap Rilis' | 'Selesai';
  startDate: string;
  targetLaunchDate: string;
  overallProgress: number;
  healthStatus: 'Optimal' | 'On Track' | 'Memerlukan Feedback';
  stagingUrl: string;
  milestones: Milestone[];
  deliverables: DeliverableAsset[];
  revisions: ProjectRevision[];
  invoices: ProjectInvoice[];
  activityLogs: ActivityLog[];
}

export interface CheckoutPaymentState {
  orderId: string;
  packageName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  businessName: string;
  packagePrice: number;
  addonsCost: number;
  gatewayFee: number;
  totalAmount: number;
  paymentMethod: 'qris' | 'va_bca' | 'va_mandiri' | 'va_bri' | 'gopay';
  vaNumber?: string;
  status: 'awaiting_payment' | 'verifying' | 'paid';
  expiresAt: string;
  paidAt?: string;
}
