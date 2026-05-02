# Design System: The Blue Ribbon v1

## 1. Visual Theme & Atmosphere
**Luxury Bakery & Artisanal Cafe.** The aesthetic is airy and sophisticated — deep cerulean blues contrasted by crisp slate whites and warm gold accents. Glassmorphism surfaces float like frosting on a cake. Every surface breathes: subtle grain overlays on blue backgrounds, soft glows on golden highlights, and clean typography for a premium patisserie experience.

**Dark mode** uses deep navy (#020617) and slate (#0F172A) with cerulean accents (#3B82F6) for a modern, high-end feel.

## 2. Color Palette & Roles

| Token         | Hex         | Role                                          |
|---------------|-------------|-----------------------------------------------|
| `espresso`    | `#0F172A`   | Primary hero/section background (Deep Blue)   |
| `forest`      | `#1E40AF`   | Accent color, CTAs (Royal Blue)               |
| `parchment`   | `#F1F5F9`   | Light text, card backgrounds (Slate White)    |
| `gold`        | `#C9A96E`   | Stars, highlights, prices (Signature Gold)    |
| `bark`        | `#334155`   | Secondary text on light sections              |
| `sage`        | `#60A5FA`   | Subtle blue accents, section labels           |
| `smoke`       | `#020617`   | Footer — deepest background                   |
| `cream`       | `#F8FAFC`   | Light-mode content wrapper background         |
| `warm-stone`  | `#E2E8F0`   | Cards, tab backgrounds, subtle surfaces       |
| `latte`       | `#CBD5E1`   | Borders, secondary card surfaces              |
| `mocha`       | `#64748B`   | Muted text, decorative elements               |
| `charcoal`    | `#020617`   | Dark-mode body background                     |
| `zinc-deep`   | `#0F172A`   | Dark-mode card surfaces                       |
| `zinc-mid`    | `#1E293B`   | Dark-mode borders                             |
| `amber-accent`| `#3B82F6`   | Dark-mode primary accent (Cerulean)           |

## 3. Typography Rules
- **Display / Headings**: `Playfair Display` — large, dramatic serif. Bold for `h1`/`h2`, italic normal-weight for emphasis
- **Body / UI**: `Inter` — clean, airy, 400–500 weight. No decorative elements.
- **Overlines**: Inter, weight 500, tracking `0.3em`, uppercase, 11–13px, sage or gold
- **Prices**: Playfair Display, semibold, gold color with ₹ prefix
- Letter-spacing for headings: `tracking-tight` to `leading-[0.9]` for dramatic compression

## 4. Component Stylings
- **Buttons/CTAs**: Pill-shaped (`rounded-full`), gold border, parchment text, `hover:bg-gold` transition
- **Cards**: Generously rounded (`rounded-2xl`), frosted glass (`.glass-card` utility: `bg-parchment/6 backdrop-blur-16 border-parchment/10`)
- **Menu Tabs**: Pill-shaped, horizontal scrollable row. Active = gold bg + espresso text + gold shadow. Inactive = warm-stone/40 bg
- **Menu Item Cards**: 3D tilt on hover (rotateX/Y up to 8°), cream bg (light) / zinc-deep bg (dark), gold price, steam lines on hover
- **BusyMeter**: Translucent (`bg-espresso/60 backdrop-blur-sm`), thin border `border-parchment/20`
- **FAB**: Circular (`rounded-full`), gold background, espresso text, `shadow-2xl`

## 5. Layout Principles
- **Generous whitespace**: sections `py-24 md:py-36` (menu), `py-32 md:py-44` (vibe/reviews)
- **Max width container**: `max-w-6xl mx-auto px-6`
- **Menu grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for items within subcategories
- **Tab navigation**: Flexbox wrap, centered, gap-2/3
- **Cup**: `position: fixed`, z-50, pointer-events-none — floats above all content

## 6. Animations
- **Steam**: CSS `@keyframes steam` — 2s ease-in infinite, 3 staggered lines
- **Float**: 4s ease-in-out infinite translateY bounce
- **Shimmer**: 3s ease-in-out infinite translateX sweep for badge highlights
- **Tab transitions**: Framer Motion AnimatePresence fade+slide (0.35s easeOut)
- **Card elevation**: `card-elevate` class — translateY(-4px) + shadow on hover
- **Divider grow**: Width animation from 0→100% for gold hero divider
- **Scroll indicator**: Mouse icon with bouncing dot + chevron

## 7. Menu Structure (5 Tabs)
1. **Patisserie** — Legendary Desserts (Caramel Custard, Blueberry Cheesecake) + Baked Goodies (Danish, Brownie)
2. **Breakfast & Savories** — English Breakfast, Club Sandwich, Ham & Cheese Croissants, Quiche
3. **Mains & Pizza** — Pasta Bolognese, Noodle Soup, Veg Lovers Pizza, Momos
4. **Coffee & Tea** — Masala Tea, Lemon Tea, Artisan Coffee (Cappuccino, Latte)
5. **Cold Beverages** — Blueberry Shake, Fruit Coolers, Shakes

## 8. Bakery Details
- **Name**: The Blue Ribbon - Bakery & Cafe
- **Rating**: 3.9 (200 Google Reviews)
- **Price Range**: ₹200–400
- **Location**: Polo Hills, opposite Stadium parking lot, Golf Links, Shillong, Meghalaya 793001
- **Hours**: Open till 8 PM
- **USP**: Best Caramel Custard & Blueberry Danish in town, All day English breakfast, Women-owned, LGBTQ+ friendly
- **Services**: Dine-in, Takeaway, No-contact Delivery
- **Atmosphere**: Casual, Cozy, Warm, Inclusive

## 9. Design System Notes for Stitch Generation
Generate screens using this palette: Deep Navy (#0F172A) hero backgrounds, Royal Blue (#1E40AF) accent sections, Slate White (#F8FAFC) content wrappers. Typography uses Playfair Display serif for headings and Inter sans-serif for body. Cards use frosted glass effects (`.glass-card` utility). Gold (#C9A96E) is used for ratings, prices, and premium highlights. Menu uses pill tabs with animated transitions. Dark mode uses Deepest Navy (#020617) body with Slate (#0F172A) surfaces and Cerulean (#3B82F6) accents. The atmosphere is "luxury artisanal bakery" — think high-end patisserie meets welcoming neighborhood cafe.
