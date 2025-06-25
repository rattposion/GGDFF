export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  steamId?: string;
  balance: number;
  rating: number;
  totalSales: number;
  joinDate: string;
  isVerified: boolean;
  isBanned: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface ProductVariation {
  id: string;
  name: string;
  price: number;
  description: string;
  stock?: number;
  subscriptionPlans?: SubscriptionPlan[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  duration: string; // '1d', '7d', '30d', 'lifetime'
  price: number;
  autoRenew: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subcategory: string;
  type: 'skin' | 'account' | 'key' | 'service' | 'subscription' | 'other';
  sellerId: string;
  seller: User;
  stock?: number;
  isActive: boolean;
  hasAutoDelivery: boolean;
  deliveryType?: 'text' | 'file' | 'link';
  deliveryContent?: string;
  guarantee?: string;
  status: 'available' | 'sold' | 'pending' | 'inactive';
  variations?: ProductVariation[];
  subscriptionPlans?: SubscriptionPlan[];
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  rating: number;
  totalReviews: number;
}

export interface Review {
  id: string;
  productId: string;
  buyerId: string;
  buyer: User;
  sellerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Question {
  id: string;
  productId: string;
  userId: string;
  user: User;
  question: string;
  answer?: string;
  createdAt: string;
  answeredAt?: string;
}

export interface Order {
  id: string;
  productId: string;
  product: Product;
  buyerId: string;
  buyer: User;
  sellerId: string;
  seller: User;
  variationId?: string;
  subscriptionPlanId?: string;
  amount: number;
  status: 'pending' | 'paid' | 'delivered' | 'completed' | 'disputed' | 'cancelled';
  paymentMethod: 'pix' | 'balance';
  deliveryContent?: string;
  createdAt: string;
  completedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'sale' | 'purchase' | 'payment' | 'dispute' | 'message' | 'question' | 'withdrawal' | 'review';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  message: string;
  type: 'text' | 'file' | 'image';
  createdAt: string;
}

export interface Dispute {
  id: string;
  orderId: string;
  order: Order;
  reason: string;
  description: string;
  evidence?: string[];
  status: 'open' | 'under_review' | 'resolved' | 'closed';
  resolution?: string;
  createdAt: string;
  resolvedAt?: string;
}