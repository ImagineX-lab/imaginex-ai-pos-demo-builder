import { PosCategory, PosConfig, WizardAnswers, Customer } from './types';

const SAMPLE_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Kasun Perera', phone: '077 123 4567', points: 420, totalSpent: 28500, tier: 'Gold' },
  { id: 'c2', name: 'Dilani Fernando', phone: '071 987 6543', points: 150, totalSpent: 9200, tier: 'Silver' },
  { id: 'c3', name: 'Nuwan Jayasinghe', phone: '076 555 8899', points: 890, totalSpent: 64000, tier: 'VIP' },
  { id: 'c4', name: 'Shanika Silva', phone: '078 333 2211', points: 45, totalSpent: 2300, tier: 'Bronze' },
];

const TEMPLATES: Record<string, PosCategory[]> = {
  grocery: [
    {
      id: 'cat_groceries',
      name: 'Pantry & Staples',
      icon: '🌾',
      products: [
        { id: 'g1', name: 'Keeri Samba Rice (1kg)', price: 280, sku: 'RICE-01', stock: 45, category: 'Pantry & Staples', emoji: '🌾', unit: 'kg', barcode: '8901001', isPopular: true },
        { id: 'g2', name: 'Nadu Rice (1kg)', price: 220, sku: 'RICE-02', stock: 60, category: 'Pantry & Staples', emoji: '🍚', unit: 'kg', barcode: '8901002' },
        { id: 'g3', name: 'White Sugar (1kg)', price: 290, sku: 'SUG-01', stock: 35, category: 'Pantry & Staples', emoji: '🧂', unit: 'kg', barcode: '8901003' },
        { id: 'g4', name: 'Mysore Dhal (1kg)', price: 360, sku: 'DHAL-01', stock: 28, category: 'Pantry & Staples', emoji: '🥣', unit: 'kg', barcode: '8901004', isPopular: true },
        { id: 'g5', name: 'Wheat Flour (1kg)', price: 190, sku: 'FLR-01', stock: 40, category: 'Pantry & Staples', emoji: '🥡', unit: 'kg', barcode: '8901005' },
        { id: 'g6', name: 'Pure Coconut Oil (1L)', price: 790, sku: 'OIL-01', stock: 15, category: 'Pantry & Staples', emoji: '🫒', unit: 'btl', barcode: '8901006' },
      ],
    },
    {
      id: 'cat_dairy',
      name: 'Dairy & Breakfast',
      icon: '🥛',
      products: [
        { id: 'g7', name: 'Full Cream Milk Powder (400g)', price: 980, sku: 'MLK-01', stock: 24, category: 'Dairy & Breakfast', emoji: '🥛', unit: 'pack', barcode: '8902001', isPopular: true },
        { id: 'g8', name: 'Fresh Milk (1L Bottle)', price: 420, sku: 'MLK-02', stock: 12, category: 'Dairy & Breakfast', emoji: '🍼', unit: 'btl', barcode: '8902002' },
        { id: 'g9', name: 'Highland Butter (200g)', price: 650, sku: 'BTR-01', stock: 18, category: 'Dairy & Breakfast', emoji: '🧈', unit: 'pack', barcode: '8902003' },
        { id: 'g10', name: 'Fresh Farm Eggs (Pack of 10)', price: 440, sku: 'EGG-10', stock: 30, category: 'Dairy & Breakfast', emoji: '🥚', unit: 'pack', barcode: '8902004', isPopular: true },
        { id: 'g11', name: 'Ceylon BOPF Tea (100g)', price: 240, sku: 'TEA-01', stock: 50, category: 'Dairy & Breakfast', emoji: '☕', unit: 'pack', barcode: '8902005' },
      ],
    },
    {
      id: 'cat_snacks',
      name: 'Snacks & Beverages',
      icon: '🥤',
      products: [
        { id: 'g12', name: 'Munchee Cream Cracker', price: 180, sku: 'BSC-01', stock: 55, category: 'Snacks & Beverages', emoji: '🍘', unit: 'pack', barcode: '8903001', isPopular: true },
        { id: 'g13', name: 'Chocolate Marie Biscuits', price: 220, sku: 'BSC-02', stock: 40, category: 'Snacks & Beverages', emoji: '🍪', unit: 'pack', barcode: '8903002' },
        { id: 'g14', name: 'Soft Drink (1.5L Bottle)', price: 380, sku: 'BEV-01', stock: 22, category: 'Snacks & Beverages', emoji: '🥤', unit: 'btl', barcode: '8903003' },
        { id: 'g15', name: 'Mineral Water (1.5L)', price: 120, sku: 'BEV-02', stock: 65, category: 'Snacks & Beverages', emoji: '💧', unit: 'btl', barcode: '8903004' },
        { id: 'g16', name: 'Spicy Cassava Chips', price: 150, sku: 'CHP-01', stock: 19, category: 'Snacks & Beverages', emoji: '🍿', unit: 'pack', barcode: '8903005' },
      ],
    },
    {
      id: 'cat_household',
      name: 'Household & Personal Care',
      icon: '🧼',
      products: [
        { id: 'g17', name: 'Laundry Washing Powder (1kg)', price: 540, sku: 'DET-01', stock: 16, category: 'Household & Personal Care', emoji: '🧺', unit: 'pack', barcode: '8904001' },
        { id: 'g18', name: 'Beauty Bath Soap (100g)', price: 140, sku: 'SOP-01', stock: 48, category: 'Household & Personal Care', emoji: '🧼', unit: 'pcs', barcode: '8904002' },
        { id: 'g19', name: 'Dishwash Liquid (500ml)', price: 340, sku: 'DSH-01', stock: 14, category: 'Household & Personal Care', emoji: '🫧', unit: 'btl', barcode: '8904003' },
        { id: 'g20', name: 'Herbal Toothpaste (120g)', price: 210, sku: 'TP-01', stock: 32, category: 'Household & Personal Care', emoji: '🪥', unit: 'pack', barcode: '8904004' },
      ],
    },
  ],

  restaurant: [
    {
      id: 'cat_rice',
      name: 'Rice & Main Meals',
      icon: '🍛',
      products: [
        { id: 'r1', name: 'Special Chicken Fried Rice', price: 750, sku: 'RCE-CHK', stock: 99, category: 'Rice & Main Meals', emoji: '🍗', unit: 'portion', isPopular: true },
        { id: 'r2', name: 'Sri Lankan Village Rice & Curry', price: 450, sku: 'RCE-CUR', stock: 80, category: 'Rice & Main Meals', emoji: '🍛', unit: 'portion', isPopular: true },
        { id: 'r3', name: 'Crispy Seafood Rice', price: 950, sku: 'RCE-SEA', stock: 50, category: 'Rice & Main Meals', emoji: '🍤', unit: 'portion' },
        { id: 'r4', name: 'Mixed Meat Biryani with Egg', price: 1100, sku: 'RCE-BIR', stock: 40, category: 'Rice & Main Meals', emoji: '🥘', unit: 'portion', isPopular: true },
        { id: 'r5', name: 'Healthy Veggie Fried Rice', price: 550, sku: 'RCE-VEG', stock: 65, category: 'Rice & Main Meals', emoji: '🥗', unit: 'portion' },
      ],
    },
    {
      id: 'cat_kottu',
      name: 'Kottu & Roti Specials',
      icon: '🥘',
      products: [
        { id: 'r6', name: 'Chicken Cheese Kottu', price: 980, sku: 'KOT-CHK', stock: 99, category: 'Kottu & Roti Specials', emoji: '🧀', unit: 'portion', isPopular: true },
        { id: 'r7', name: 'Egg & Roast Chicken Kottu', price: 720, sku: 'KOT-EGG', stock: 99, category: 'Kottu & Roti Specials', emoji: '🍳', unit: 'portion' },
        { id: 'r8', name: 'Cheesy Garlic Naan (2 pcs)', price: 480, sku: 'RT-NAN', stock: 45, category: 'Kottu & Roti Specials', emoji: '🫓', unit: 'set' },
        { id: 'r9', name: 'Beef Dolphin Kottu (Large)', price: 1250, sku: 'KOT-DOL', stock: 35, category: 'Kottu & Roti Specials', emoji: '🥩', unit: 'portion' },
      ],
    },
    {
      id: 'cat_shorteats',
      name: 'Bites & Short Eats',
      icon: '🥟',
      products: [
        { id: 'r10', name: 'Spicy Fish Cutlet (3 pcs)', price: 180, sku: 'SHT-CUT', stock: 60, category: 'Bites & Short Eats', emoji: '🧆', unit: 'set', isPopular: true },
        { id: 'r11', name: 'Golden Chicken Roll', price: 140, sku: 'SHT-ROL', stock: 50, category: 'Bites & Short Eats', emoji: '🌯', unit: 'pcs' },
        { id: 'r12', name: 'Devilled Chicken Wings (6 pcs)', price: 850, sku: 'BIT-WNG', stock: 25, category: 'Bites & Short Eats', emoji: '🍗', unit: 'portion', isPopular: true },
        { id: 'r13', name: 'Hot Butter Cuttlefish', price: 1350, sku: 'BIT-HBC', stock: 20, category: 'Bites & Short Eats', emoji: '🦑', unit: 'portion' },
      ],
    },
    {
      id: 'cat_drinks',
      name: 'Beverages & Desserts',
      icon: '🍹',
      products: [
        { id: 'r14', name: 'King Coconut Fresh', price: 160, sku: 'DRK-KCO', stock: 40, category: 'Beverages & Desserts', emoji: '🥥', unit: 'pcs', isPopular: true },
        { id: 'r15', name: 'Chilled Iced Coffee with Ice Cream', price: 420, sku: 'DRK-COF', stock: 55, category: 'Beverages & Desserts', emoji: '🧋', unit: 'glass', isPopular: true },
        { id: 'r16', name: 'Fresh Lime & Mint Juice', price: 320, sku: 'DRK-LIM', stock: 45, category: 'Beverages & Desserts', emoji: '🍋', unit: 'glass' },
        { id: 'r17', name: 'Caramel Pudding Slice', price: 280, sku: 'DES-PUD', stock: 18, category: 'Beverages & Desserts', emoji: '🍮', unit: 'slice' },
        { id: 'r18', name: 'Chocolate Lava Cake', price: 490, sku: 'DES-LAV', stock: 15, category: 'Beverages & Desserts', emoji: '🍰', unit: 'pcs' },
      ],
    },
  ],

  clothing: [
    {
      id: 'cat_men',
      name: "Men's Collection",
      icon: '👔',
      products: [
        { id: 'c1', name: 'Slim Fit Cotton T-Shirt (M/L/XL)', price: 1650, sku: 'MEN-TSH', stock: 28, category: "Men's Collection", emoji: '👕', unit: 'pcs', isPopular: true },
        { id: 'c2', name: 'Premium Oxford Formal Shirt', price: 3400, sku: 'MEN-SHR', stock: 15, category: "Men's Collection", emoji: '👔', unit: 'pcs' },
        { id: 'c3', name: 'Stretch Denim Jeans - Dark Blue', price: 4500, sku: 'MEN-JNS', stock: 18, category: "Men's Collection", emoji: '👖', unit: 'pcs', isPopular: true },
        { id: 'c4', name: 'Casual Linen Short Sleeve', price: 2600, sku: 'MEN-LIN', stock: 22, category: "Men's Collection", emoji: '🩳', unit: 'pcs' },
        { id: 'c5', name: 'Comfort Polo Shirt', price: 2200, sku: 'MEN-POL', stock: 35, category: "Men's Collection", emoji: '👕', unit: 'pcs' },
      ],
    },
    {
      id: 'cat_women',
      name: "Women's Collection",
      icon: '👗',
      products: [
        { id: 'c6', name: 'Floral Summer Maxi Dress', price: 4200, sku: 'WMN-DRS', stock: 12, category: "Women's Collection", emoji: '👗', unit: 'pcs', isPopular: true },
        { id: 'c7', name: 'Office Casual Silk Blouse', price: 2400, sku: 'WMN-BLS', stock: 20, category: "Women's Collection", emoji: '👚', unit: 'pcs' },
        { id: 'c8', name: 'High-Waist Cotton Pants', price: 3100, sku: 'WMN-PNT', stock: 16, category: "Women's Collection", emoji: '👖', unit: 'pcs' },
        { id: 'c9', name: 'Embroidered Kurti Top', price: 2800, sku: 'WMN-KRT', stock: 25, category: "Women's Collection", emoji: '👘', unit: 'pcs', isPopular: true },
      ],
    },
    {
      id: 'cat_accessories',
      name: 'Footwear & Accessories',
      icon: '👜',
      products: [
        { id: 'c10', name: 'Genuine Leather Wallet', price: 1850, sku: 'ACC-WAL', stock: 30, category: 'Footwear & Accessories', emoji: '👛', unit: 'pcs', isPopular: true },
        { id: 'c11', name: 'Luxury Leather Belt', price: 1450, sku: 'ACC-BLT', stock: 24, category: 'Footwear & Accessories', emoji: '🪢', unit: 'pcs' },
        { id: 'c12', name: 'Casual Canvas Sneakers', price: 4800, sku: 'FTW-SNK', stock: 10, category: 'Footwear & Accessories', emoji: '👟', unit: 'pair' },
        { id: 'c13', name: 'Women Leather Handbag', price: 5600, sku: 'ACC-BAG', stock: 8, category: 'Footwear & Accessories', emoji: '👜', unit: 'pcs', isPopular: true },
      ],
    },
  ],

  pharmacy: [
    {
      id: 'cat_otc',
      name: 'OTC Medicines & Pain Relief',
      icon: '💊',
      products: [
        { id: 'p1', name: 'Paracetamol 500mg (10 Tabs)', price: 70, sku: 'MED-PCM', stock: 150, category: 'OTC Medicines & Pain Relief', emoji: '💊', unit: 'strip', isPopular: true },
        { id: 'p2', name: 'Amoxicillin 500mg (10 Caps)', price: 240, sku: 'MED-AMX', stock: 85, category: 'OTC Medicines & Pain Relief', emoji: '💊', unit: 'strip' },
        { id: 'p3', name: 'Herbal Cough Syrup (100ml)', price: 380, sku: 'MED-SYR', stock: 40, category: 'OTC Medicines & Pain Relief', emoji: '🧪', unit: 'btl', isPopular: true },
        { id: 'p4', name: 'Antacid Gel Suspension (200ml)', price: 420, sku: 'MED-ANT', stock: 35, category: 'OTC Medicines & Pain Relief', emoji: '🍶', unit: 'btl' },
        { id: 'p5', name: 'Siddhalepa Herbal Balm (50g)', price: 220, sku: 'MED-BLM', stock: 75, category: 'OTC Medicines & Pain Relief', emoji: '🫙', unit: 'pcs', isPopular: true },
      ],
    },
    {
      id: 'cat_vitamins',
      name: 'Vitamins & Supplements',
      icon: '✨',
      products: [
        { id: 'p6', name: 'Vitamin C 500mg Chewable (30s)', price: 550, sku: 'VIT-VTC', stock: 45, category: 'Vitamins & Supplements', emoji: '🍊', unit: 'btl', isPopular: true },
        { id: 'p7', name: 'Multivitamin & Zinc Formula (30s)', price: 1200, sku: 'VIT-MLT', stock: 30, category: 'Vitamins & Supplements', emoji: '🌟', unit: 'btl' },
        { id: 'p8', name: 'Calcium + D3 Tablets (60s)', price: 950, sku: 'VIT-CAL', stock: 25, category: 'Vitamins & Supplements', emoji: '🦴', unit: 'btl' },
        { id: 'p9', name: 'Fish Oil Omega-3 (60 Caps)', price: 1800, sku: 'VIT-OMG', stock: 18, category: 'Vitamins & Supplements', emoji: '🐟', unit: 'btl' },
      ],
    },
    {
      id: 'cat_firstaid',
      name: 'First Aid & Diagnostic Devices',
      icon: '🩹',
      products: [
        { id: 'p10', name: 'Sterile Bandages (Pack of 20)', price: 180, sku: 'AID-BND', stock: 90, category: 'First Aid & Diagnostic Devices', emoji: '🩹', unit: 'pack', isPopular: true },
        { id: 'p11', name: 'Digital Infrared Thermometer', price: 2400, sku: 'DEV-THM', stock: 12, category: 'First Aid & Diagnostic Devices', emoji: '🌡️', unit: 'pcs' },
        { id: 'p12', name: 'Blood Pressure Monitor (Arm)', price: 6800, sku: 'DEV-BPM', stock: 8, category: 'First Aid & Diagnostic Devices', emoji: '🩺', unit: 'pcs' },
        { id: 'p13', name: 'Surgical Face Masks (50 Pcs)', price: 450, sku: 'AID-MSK', stock: 60, category: 'First Aid & Diagnostic Devices', emoji: '😷', unit: 'box', isPopular: true },
      ],
    },
  ],

  salon: [
    {
      id: 'cat_hair',
      name: 'Hair Services',
      icon: '💇',
      products: [
        { id: 's1', name: 'Ladies Signature Haircut & Blowdry', price: 1800, sku: 'SRV-HCL', stock: 999, category: 'Hair Services', emoji: '💇‍♀️', unit: 'service', isPopular: true },
        { id: 's2', name: "Gentlemen's Haircut & Styling", price: 800, sku: 'SRV-HCG', stock: 999, category: 'Hair Services', emoji: '💇‍♂️', unit: 'service', isPopular: true },
        { id: 's3', name: 'Deep Nourishing Hair Spa Treatment', price: 3500, sku: 'SRV-SPA', stock: 999, category: 'Hair Services', emoji: '💆‍♀️', unit: 'service' },
        { id: 's4', name: 'Full Hair Coloring / Highlights', price: 6500, sku: 'SRV-COL', stock: 999, category: 'Hair Services', emoji: '🎨', unit: 'service' },
        { id: 's5', name: 'Keratin Protein Treatment', price: 12000, sku: 'SRV-KRT', stock: 999, category: 'Hair Services', emoji: '✨', unit: 'service' },
      ],
    },
    {
      id: 'cat_beauty',
      name: 'Facial & Skin Care',
      icon: '🧖',
      products: [
        { id: 's6', name: 'Gold Radiance Facial Cleanup', price: 2800, sku: 'SRV-FGL', stock: 999, category: 'Facial & Skin Care', emoji: '🧖‍♀️', unit: 'service', isPopular: true },
        { id: 's7', name: 'Acne Defense Herbal Facial', price: 3200, sku: 'SRV-FAC', stock: 999, category: 'Facial & Skin Care', emoji: '🌿', unit: 'service' },
        { id: 's8', name: 'Eyebrow Threading & Shaping', price: 300, sku: 'SRV-EYB', stock: 999, category: 'Facial & Skin Care', emoji: '✨', unit: 'service', isPopular: true },
        { id: 's9', name: 'Full Face Waxing & Soothing Mask', price: 1500, sku: 'SRV-WAX', stock: 999, category: 'Facial & Skin Care', emoji: '💆', unit: 'service' },
      ],
    },
    {
      id: 'cat_nails',
      name: 'Nails & Retail Products',
      icon: '💅',
      products: [
        { id: 's10', name: 'Luxury Gel Manicure with Art', price: 2200, sku: 'SRV-MAN', stock: 999, category: 'Nails & Retail Products', emoji: '💅', unit: 'service', isPopular: true },
        { id: 's11', name: 'Aroma Foot Spa & Pedicure', price: 2600, sku: 'SRV-PED', stock: 999, category: 'Nails & Retail Products', emoji: '🦶', unit: 'service' },
        { id: 's12', name: 'Salon Pro Argan Hair Serum (100ml)', price: 2900, sku: 'RET-SRM', stock: 15, category: 'Nails & Retail Products', emoji: '🧴', unit: 'btl' },
        { id: 's13', name: 'Sulfate-Free Shampoo (250ml)', price: 2100, sku: 'RET-SHP', stock: 20, category: 'Nails & Retail Products', emoji: '🫧', unit: 'btl' },
      ],
    },
  ],

  bakery: [
    {
      id: 'cat_breads',
      name: 'Artisan Breads & Loaves',
      icon: '🍞',
      products: [
        { id: 'b1', name: 'Whole Wheat Brown Bread', price: 240, sku: 'BRD-WHT', stock: 35, category: 'Artisan Breads & Loaves', emoji: '🍞', unit: 'loaf', isPopular: true },
        { id: 'b2', name: 'Crusty Garlic French Baguette', price: 280, sku: 'BRD-BAG', stock: 25, category: 'Artisan Breads & Loaves', emoji: '🥖', unit: 'pcs' },
        { id: 'b3', name: 'Butter Milk Sandwich Bread', price: 200, sku: 'BRD-SND', stock: 50, category: 'Artisan Breads & Loaves', emoji: '🍞', unit: 'loaf', isPopular: true },
        { id: 'b4', name: 'Cheese & Garlic Bun', price: 160, sku: 'BRD-CHZ', stock: 40, category: 'Artisan Breads & Loaves', emoji: '🥯', unit: 'pcs' },
      ],
    },
    {
      id: 'cat_pastries',
      name: 'Pastries & Savories',
      icon: '🥐',
      products: [
        { id: 'b5', name: 'Butter Croissant Flaky', price: 260, sku: 'PST-CRS', stock: 30, category: 'Pastries & Savories', emoji: '🥐', unit: 'pcs', isPopular: true },
        { id: 'b6', name: 'Spicy Chicken Puff Pastry', price: 180, sku: 'PST-CHK', stock: 45, category: 'Pastries & Savories', emoji: '🥟', unit: 'pcs', isPopular: true },
        { id: 'b7', name: 'Roast Fish Bun (Malu Paan)', price: 110, sku: 'PST-MLU', stock: 60, category: 'Pastries & Savories', emoji: '🥪', unit: 'pcs', isPopular: true },
        { id: 'b8', name: 'Sausage Egg Tart', price: 190, sku: 'PST-EGG', stock: 35, category: 'Pastries & Savories', emoji: '🥧', unit: 'pcs' },
      ],
    },
    {
      id: 'cat_cakes',
      name: 'Cakes & Café Beverages',
      icon: '🎂',
      products: [
        { id: 'b9', name: 'Rich Chocolate Fudge Cake (1kg)', price: 3400, sku: 'CKE-FUD', stock: 8, category: 'Cakes & Café Beverages', emoji: '🎂', unit: 'whole', isPopular: true },
        { id: 'b10', name: 'Red Velvet Cake Slice', price: 420, sku: 'CKE-RED', stock: 20, category: 'Cakes & Café Beverages', emoji: '🍰', unit: 'slice', isPopular: true },
        { id: 'b11', name: 'Cappuccino / Hot Latte', price: 550, sku: 'COF-LAT', stock: 99, category: 'Cakes & Café Beverages', emoji: '☕', unit: 'cup', isPopular: true },
        { id: 'b12', name: 'Iced Vanilla Frappuccino', price: 650, sku: 'COF-FRP', stock: 99, category: 'Cakes & Café Beverages', emoji: '🧋', unit: 'cup' },
      ],
    },
  ],

  electronics: [
    {
      id: 'cat_accessories_el',
      name: 'Mobile & Audio Accessories',
      icon: '🎧',
      products: [
        { id: 'e1', name: 'TWS Wireless Bluetooth Earbuds', price: 4200, sku: 'AUD-TWS', stock: 18, category: 'Mobile & Audio Accessories', emoji: '🎧', unit: 'pcs', isPopular: true },
        { id: 'e2', name: '20W PD Fast Charging Adapter', price: 2600, sku: 'CHG-20W', stock: 30, category: 'Mobile & Audio Accessories', emoji: '🔌', unit: 'pcs', isPopular: true },
        { id: 'e3', name: 'Type-C Braided Fast Cable (1.2m)', price: 850, sku: 'CBL-TYC', stock: 55, category: 'Mobile & Audio Accessories', emoji: '➰', unit: 'pcs' },
        { id: 'e4', name: '20,000mAh Power Bank with LED', price: 6500, sku: 'PWR-20K', stock: 14, category: 'Mobile & Audio Accessories', emoji: '🔋', unit: 'pcs', isPopular: true },
      ],
    },
    {
      id: 'cat_peripherals',
      name: 'Computer & Office Peripherals',
      icon: '💻',
      products: [
        { id: 'e5', name: 'RGB Wireless Gaming Mouse', price: 3400, sku: 'PER-MOU', stock: 22, category: 'Computer & Office Peripherals', emoji: '🖱️', unit: 'pcs', isPopular: true },
        { id: 'e6', name: 'Slim Wireless Keyboard', price: 3900, sku: 'PER-KEY', stock: 16, category: 'Computer & Office Peripherals', emoji: '⌨️', unit: 'pcs' },
        { id: 'e7', name: '1080P Full HD Streaming Webcam', price: 5800, sku: 'PER-CAM', stock: 11, category: 'Computer & Office Peripherals', emoji: '📷', unit: 'pcs' },
        { id: 'e8', name: '64GB USB 3.2 Flash Drive', price: 1450, sku: 'STR-64G', stock: 40, category: 'Computer & Office Peripherals', emoji: '💾', unit: 'pcs', isPopular: true },
      ],
    },
  ],

  other: [
    {
      id: 'cat_general',
      name: 'General Products',
      icon: '📦',
      products: [
        { id: 'o1', name: 'Standard Product A', price: 850, sku: 'GEN-01', stock: 35, category: 'General Products', emoji: '📦', unit: 'pcs', isPopular: true },
        { id: 'o2', name: 'Premium Product B', price: 1950, sku: 'GEN-02', stock: 20, category: 'General Products', emoji: '✨', unit: 'pcs', isPopular: true },
        { id: 'o3', name: 'Compact Product C', price: 450, sku: 'GEN-03', stock: 60, category: 'General Products', emoji: '🏷️', unit: 'pcs' },
      ],
    },
    {
      id: 'cat_services',
      name: 'Services & Packages',
      icon: '🛠️',
      products: [
        { id: 'o4', name: 'Express Service Package', price: 2500, sku: 'SRV-EXP', stock: 999, category: 'Services & Packages', emoji: '⚡', unit: 'service', isPopular: true },
        { id: 'o5', name: 'Complete Care Package', price: 4800, sku: 'SRV-COM', stock: 999, category: 'Services & Packages', emoji: '🛡️', unit: 'service' },
      ],
    },
  ],
};

const BUSINESS_LABELS: Record<string, string> = {
  grocery: 'Supermarket / Grocery Store',
  restaurant: 'Café & Restaurant',
  clothing: 'Fashion & Apparel Boutique',
  pharmacy: 'Modern Care Pharmacy',
  salon: 'Beauty & Salon Studio',
  bakery: 'Artisan Bakery & Café',
  electronics: 'Tech & Electronics Store',
  other: 'Retail & Commercial Store',
};

export function generatePosTemplate(answers: WizardAnswers): PosConfig {
  const typeKey = answers.businessType || 'grocery';
  const baseCategories = TEMPLATES[typeKey] ?? TEMPLATES.other;

  // Clone so runtime changes don't mutate template
  const clonedCategories: PosCategory[] = JSON.parse(JSON.stringify(baseCategories));

  return {
    businessName: answers.businessName?.trim() || BUSINESS_LABELS[typeKey] || 'SmartPOS Enterprise',
    businessType: typeKey,
    tagline: answers.tagline || 'Fast, Modern & Intelligent Cloud POS',
    currency: answers.currency || 'Rs.',
    brandColor: answers.brandColor || '#4f46e5',
    features: answers.features && answers.features.length > 0
      ? answers.features
      : ['inventory', 'discounts', 'receipt', 'multiPayment', 'loyalty', 'barcode', 'holdOrder'],
    categories: clonedCategories,
    sampleCustomers: SAMPLE_CUSTOMERS,
    taxRate: 0,
    loyaltyRate: 1, // 1 point per 100 spent
    generatedBy: 'template',
  };
}
