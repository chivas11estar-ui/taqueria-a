export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'tacos' | 'sincronizadas' | 'burritos' | 'bebidas';
  imageUrl: string;
  rating?: number;
  isPopular?: boolean;
  ingredients?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'cash' | 'transfer';
  loyaltyPoints: number;
  level: number;
  levelName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  appFee: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'transfer';
  address: string;
  status: 'pending' | 'preparing' | 'on_way' | 'delivered';
  createdAt: string;
  pointsEarned: number;
  tacoGratisApplied: boolean;
}
