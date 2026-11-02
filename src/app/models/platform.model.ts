export type AppView = 'landing' | 'demo' | 'checkout';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'member' | 'admin';
  avatarUrl: string;
  plan: 'Starter' | 'Pro Growth' | 'Enterprise';
  status: 'active' | 'suspended';
  purchasedAddons: string[];
  createdAt: string;
}

export interface AiWorker {
  id: string;
  number: string;
  name: string;
  position: string;
  avatar: string;
  specialty: string;
  description: string;
  mainTasks: string[];
  status: 'Waiting' | 'Processing' | 'Completed' | 'Review';
  progress: number;
  currentOutput: string;
}

export interface ResearchIdea {
  id: string;
  niche: string;
  productName: string;
  targetMarket: string;
  problemSolved: string;
  uniqueValue: string;
  monetization: string;
  suggestedPrice: number;
  opportunityScore: number;
  methodologyNote: string;
  date: string;
}

export interface CopywritingDraft {
  id: string;
  type: 'hook' | 'video_script' | 'facebook_ads' | 'instagram_caption' | 'tiktok_script' | 'sales_page';
  angle: 'FOMO' | 'Problem-Agitation' | 'Storytelling' | 'Direct-Offer' | 'Authority';
  headline: string;
  body: string;
  cta: string;
  createdAt: string;
}

export interface BrandAsset {
  id: string;
  brandName: string;
  industry: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontPairing: string;
  logoMockupUrl: string;
  createdAt: string;
}

export interface DigitalProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'Draft' | 'Building' | 'Ready' | 'Published';
  salesCount: number;
  revenue: number;
  description: string;
  fileOutput: string;
  landingPageUrl: string;
}

export interface GalleryAsset {
  id: string;
  name: string;
  category: 'Logo' | 'Branding' | 'Image Ads' | 'Video' | 'Landing Page' | 'PDF' | 'Digital Product' | 'Tools';
  fileType: string;
  size: string;
  date: string;
  downloadUrl?: string;
  thumbnailUrl?: string;
}

export interface AvatarProfile {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  style: 'Professional' | 'Casual' | 'Business' | 'Young Adult' | 'Mature' | 'Hijab';
  previewUrl: string;
  characteristics: string;
}

export interface AcademyModule {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  lessons: {
    id: string;
    title: string;
    duration: string;
    completed: boolean;
    videoUrl?: string;
    notes?: string[];
  }[];
}

export interface SupportTicket {
  id: string;
  userEmail: string;
  userName: string;
  subject: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  messages: { sender: string; text: string; time: string }[];
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  productName: string;
  basePrice: number;
  addons: { name: string; price: number }[];
  gatewayFee: number;
  total: number;
  paymentMethod: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: string;
  paidAt?: string;
}

export interface QuizState {
  currentStep: number;
  answers: {
    currentJob?: string;
    digitalExp?: string;
    budget?: string;
    targetProduct?: string;
    dailyHours?: string;
    mainGoal?: string;
  };
  result?: {
    userProfile: string;
    recommendedCategory: string;
    businessIdea: string;
    actionRoadmap: string[];
    priorityTasks: string[];
    recommendedFeatures: string[];
  };
}
