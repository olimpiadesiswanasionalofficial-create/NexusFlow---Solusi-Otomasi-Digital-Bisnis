export interface PricingOptions {
  packageType: 'starter' | 'growth' | 'enterprise' | 'custom';
  includePaymentGateway: boolean;
  includeAiAutomations: boolean;
  pageCount: number;
  deliverySpeed: 'normal' | 'express';
  maintenanceMonths: number;
}

export interface PriceEstimate {
  basePrice: number;
  addonsPrice: number;
  discount: number;
  subtotal: number;
  ppnTax: number; // 11% PPN if applicable
  gatewayFee: number;
  totalPrice: number;
  estimatedDays: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  progressPercent: number;
  completionDate?: string;
  notes?: string;
}

/**
 * Calculates project price and delivery timeline based on selected business options
 */
export function calculateProjectEstimate(options: PricingOptions): PriceEstimate {
  let basePrice = 0;
  let baseDays = 7;

  switch (options.packageType) {
    case 'starter':
      basePrice = 99000; // Rp 99.000 / bulan (99 ribu saja perbulan)
      baseDays = 1;
      break;
    case 'growth':
      basePrice = 249000; // Rp 249.000 / 3 bulan
      baseDays = 1;
      break;
    case 'enterprise':
      basePrice = 890000; // Rp 890.000 / tahun
      baseDays = 1;
      break;
    case 'custom':
      basePrice = 99000 + Math.max(1, options.pageCount) * 50000;
      baseDays = 2;
      break;
  }

  let addonsPrice = 0;
  if (options.includePaymentGateway && options.packageType === 'starter') {
    addonsPrice += 50000; // Setup gateway integrasi
  }
  if (options.includeAiAutomations && options.packageType !== 'enterprise') {
    addonsPrice += 100000; // VIP prompt & workflow setup
  }
  if (options.maintenanceMonths > 0) {
    addonsPrice += options.maintenanceMonths * 25000;
  }

  let discount = 0;
  if (options.packageType === 'growth' || options.packageType === 'enterprise') {
    // Promo diskon hemat langsung
    discount = Math.round(basePrice * 0.1);
  }

  let estimatedDays = baseDays;
  if (options.deliverySpeed === 'express') {
    addonsPrice += 50000;
    estimatedDays = 1;
  }

  const subtotal = basePrice + addonsPrice - discount;
  // 0.7% QRIS/VA standard flat gateway processing fee simulation
  const gatewayFee = Math.round(subtotal * 0.007);
  const ppnTax = 0; // Inclusive for regular clients
  const totalPrice = subtotal + gatewayFee;

  return {
    basePrice,
    addonsPrice,
    discount,
    subtotal,
    ppnTax,
    gatewayFee,
    totalPrice,
    estimatedDays,
  };
}

/**
 * Calculates overall progress percentage of milestones
 */
export function calculateOverallProgress(milestones: Milestone[]): number {
  if (!milestones || milestones.length === 0) return 0;
  const total = milestones.reduce((acc, m) => {
    if (m.status === 'completed') return acc + 100;
    if (m.status === 'in_progress') return acc + (m.progressPercent || 50);
    return acc;
  }, 0);
  return Math.round(total / milestones.length);
}

/**
 * Formats IDR currency in clean Indonesian standard
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}
