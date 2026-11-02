import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProjectEstimate,
  calculateOverallProgress,
  formatRupiah,
  Milestone,
} from './project-calculator';

test('calculateProjectEstimate correctly calculates starter package', () => {
  const estimate = calculateProjectEstimate({
    packageType: 'starter',
    includePaymentGateway: false,
    includeAiAutomations: false,
    pageCount: 1,
    deliverySpeed: 'normal',
    maintenanceMonths: 0,
  });

  assert.equal(estimate.basePrice, 99000);
  assert.equal(estimate.addonsPrice, 0);
  assert.equal(estimate.discount, 0);
  assert.equal(estimate.subtotal, 99000);
  assert.equal(estimate.estimatedDays, 1);
  assert.ok(estimate.totalPrice > 99000); // Includes gateway fee
});

test('calculateProjectEstimate handles express delivery and add-ons', () => {
  const estimate = calculateProjectEstimate({
    packageType: 'starter',
    includePaymentGateway: true,
    includeAiAutomations: true,
    pageCount: 1,
    deliverySpeed: 'express',
    maintenanceMonths: 2,
  });

  // starter addons: 50000 (gateway) + 100000 (ai) + 2*25000 (50000 maintenance) + 50000 (express) = 250000
  assert.equal(estimate.addonsPrice, 250000);
  assert.ok(estimate.estimatedDays <= 2);
});

test('calculateOverallProgress accurately weighs completed, in_progress, and pending milestones', () => {
  const milestones: Milestone[] = [
    {
      id: 'm1',
      title: 'Strategy & Wireframe',
      description: 'Done',
      status: 'completed',
      progressPercent: 100,
    },
    {
      id: 'm2',
      title: 'UI Design & Copy',
      description: 'Done',
      status: 'completed',
      progressPercent: 100,
    },
    {
      id: 'm3',
      title: 'Development & Payment Integration',
      description: 'Active',
      status: 'in_progress',
      progressPercent: 50,
    },
    {
      id: 'm4',
      title: 'Testing & Launch',
      description: 'Pending',
      status: 'pending',
      progressPercent: 0,
    },
  ];

  // (100 + 100 + 50 + 0) / 4 = 250 / 4 = 62.5 -> 63%
  const progress = calculateOverallProgress(milestones);
  assert.equal(progress, 63);
});

test('formatRupiah formats number to IDR string', () => {
  const formatted = formatRupiah(2500000);
  assert.ok(formatted.includes('2.500.000') || formatted.includes('Rp'));
});
