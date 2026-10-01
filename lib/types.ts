export type WizardAnswers = {
  businessName: string;
  businessType: string; // grocery | restaurant | clothing | pharmacy | salon | bakery | electronics | other
  dailyItemsScale: string; // small | medium | large
  features: string[]; // inventory | discounts | receipt | multiPayment | loyalty | holdOrder | tableOrder | barcode
  brandColor: string; // hex color
  currency?: string;
  tagline?: string;
};

export type PosProduct = {
  id: string;
  name: string;
  price: number;
  costPrice?: number;
  sku: string;
  stock: number;
  category: string;
  emoji: string;
  unit?: string; // pcs, kg, pack, bottle, service
  barcode?: string;
  isPopular?: boolean;
  lowStockThreshold?: number;
};

export type PosCategory = {
  id: string;
  name: string;
  icon?: string;
  products: PosProduct[];
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  points: number;
  totalSpent: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'VIP';
};

export type CartLine = PosProduct & {
  qty: number;
  notes?: string;
};

export type Transaction = {
  id: string;
  receiptNumber: string;
  date: string;
  time: string;
  items: CartLine[];
  subtotal: number;
  discountPct: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'qr' | 'split';
  amountTendered: number;
  change: number;
  customer?: Customer;
  cashier: string;
  orderType?: 'walk-in' | 'dine-in' | 'takeaway' | 'delivery';
  orderNotes?: string;
};

export type HeldOrder = {
  id: string;
  label: string;
  timestamp: string;
  cart: CartLine[];
  customer?: Customer;
  orderType: 'walk-in' | 'dine-in' | 'takeaway' | 'delivery';
  discountPct: number;
};

export type PosConfig = {
  businessName: string;
  businessType: string;
  tagline?: string;
  currency: string; // e.g. "Rs." or "$"
  brandColor: string;
  features: string[];
  categories: PosCategory[];
  sampleCustomers: Customer[];
  taxRate?: number; // percentage, e.g. 0 or 2.5
  loyaltyRate?: number; // e.g. 1 point per 100 spent
  generatedBy: 'ai' | 'template';
};
