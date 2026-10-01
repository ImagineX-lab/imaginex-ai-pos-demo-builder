import { NextRequest, NextResponse } from 'next/server';
import { generatePosTemplate } from '@/lib/generatePos';
import { PosConfig, WizardAnswers, PosCategory } from '@/lib/types';

export const runtime = 'nodejs';

const BUSINESS_LABELS: Record<string, string> = {
  grocery: 'Grocery & Supermarket',
  restaurant: 'Café & Restaurant',
  clothing: 'Clothing & Fashion Store',
  pharmacy: 'Pharmacy & Healthcare',
  salon: 'Salon & Spa Studio',
  bakery: 'Artisan Bakery & Pastry Shop',
  electronics: 'Electronics & Gadgets Store',
  other: 'Retail Store',
};

async function generateWithAI(answers: WizardAnswers): Promise<PosConfig | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const businessLabel = BUSINESS_LABELS[answers.businessType] ?? 'Retail Store';

  const prompt = `You are a specialized Point-of-Sale (POS) system architect.
Generate a realistic, professional demo product catalog JSON for the following business:
Business name: ${answers.businessName || businessLabel}
Business type: ${businessLabel}
Daily volume: ${answers.dailyItemsScale}
Features requested: ${answers.features.join(', ') || 'all features'}
Brand color: ${answers.brandColor}
Currency: ${answers.currency || 'Rs.'}

Return ONLY valid JSON matching this exact structure:
{
  "categories": [
    {
      "id": "string",
      "name": "string",
      "icon": "emoji string",
      "products": [
        {
          "id": "string",
          "name": "string",
          "price": number,
          "sku": "string",
          "stock": number,
          "category": "string",
          "emoji": "emoji string",
          "unit": "pcs" | "kg" | "pack" | "portion" | "btl" | "service",
          "barcode": "string",
          "isPopular": boolean
        }
      ]
    }
  ]
}

Rules:
1. Provide 3-4 realistic categories for this business type with suitable emojis.
2. Provide 4-6 realistic products per category with realistic prices in Sri Lankan Rupees (Rs.) or selected currency.
3. Realistic SKUs (e.g. BEV-01, CLO-02), sensible stock levels (e.g. 15-100), and appropriate emojis per product.
4. Mark 2-3 items as isPopular: true.
5. Return strictly raw JSON. No markdown backticks, no explanatory text.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2500,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    const text = (data?.content ?? [])
      .map((block: { type: string; text?: string }) => (block.type === 'text' ? block.text : ''))
      .filter(Boolean)
      .join('\n');

    const cleaned = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned) as { categories: PosCategory[] };
    if (!Array.isArray(parsed.categories) || parsed.categories.length === 0) return null;

    const baseTemplate = generatePosTemplate(answers);
    return {
      ...baseTemplate,
      businessName: answers.businessName?.trim() || businessLabel,
      categories: parsed.categories,
      generatedBy: 'ai',
    };
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const answers = (await req.json()) as WizardAnswers;
    const aiResult = await generateWithAI(answers);
    const config = aiResult ?? generatePosTemplate(answers);
    return NextResponse.json(config);
  } catch (err) {
    const fallback = generatePosTemplate({
      businessName: 'Smart Demo Store',
      businessType: 'grocery',
      dailyItemsScale: 'medium',
      features: ['inventory', 'discounts', 'receipt', 'multiPayment', 'loyalty'],
      brandColor: '#4f46e5',
      currency: 'Rs.',
    });
    return NextResponse.json(fallback);
  }
}
