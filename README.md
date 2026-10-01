# POS AI Demo Generator

Client කෙනෙකුට ප්‍රශ්න 5ක් අහලා, එයාගේ ව්‍යාපාරයට ගැලපෙන POS system demo එකක් auto-generate කරන tool එකක්.

## Flow

1. `/` — landing page, "Demo එක Generate කරන්න" button එක.
2. `/wizard` — ප්‍රශ්න 5:
   - ව්‍යාපාරයේ නම
   - ව්‍යාපාරයේ වර්ගය (grocery, restaurant, clothing, pharmacy, salon, other)
   - දිනකට විකුණන items ප්‍රමාණය (small/medium/large)
   - අවශ්‍ය features (inventory, discounts, receipt print, multi-payment, loyalty)
   - Brand color
3. Submit කරාම `/api/generate` (POST) call වෙනවා.
4. `/demo` — generate උනු data එකෙන් functional POS UI එකක් පෙන්නනවා: category tabs, product grid, cart, discount/payment/loyalty (features අනුව), checkout.

## AI generation

`app/api/generate/route.ts` එකේ:

- `ANTHROPIC_API_KEY` environment variable එක set කරලා තියෙනවා නම්, Claude API එකෙන් business type එකට ගැලපෙන categories/products JSON එකක් generate කරනවා.
- Key එකක් නැත්නම්, හෝ API call එක fail උනොත්, `lib/generatePos.ts` එකේ තියෙන smart templates (grocery/restaurant/clothing/pharmacy/salon/other) use කරලා automatic fallback එකක් generate කරනවා — demo එක API key එකක් නැතුවත් වැඩ කරනවා.

Set the key locally in `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-...
```

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Tech

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- No database — demo config is kept in `sessionStorage` on the client, good enough for a sales-demo tool. For production you'd persist generated configs per client (e.g. in a database) instead.

## Extending this for real sales use

- Save each generated demo with a shareable link (`/demo/[id]`) so you can send it to the client instead of relying on sessionStorage.
- Add your company branding to the landing page.
- Swap the `model` in `route.ts` for whichever Claude model you have access to.
