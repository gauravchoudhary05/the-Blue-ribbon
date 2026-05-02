# The Blue Ribbon - Bakery & Cafe — PRD v1

## Purpose
An **Awwwards-grade** single-page landing site for The Blue Ribbon - Bakery & Cafe — a premium artisanal bakery at Polo Hills, Shillong. The experience must feel airy, luxury, and inviting, rivaling high-end patisserie boutiques.

## Core Design Philosophy
- **True WebGL 3D scroll** — Fixed React Three Fiber `<Canvas>` rendering a 3D branded cup.
- **Sensory 3D Engine** — As the user scrolls, the cup translates and rotates through 3D space.
- **"Live Vibes" utility** — real-time (simulated) CSS busy meter showing bakery capacity.
- **Glassmorphism** — frosted glass overlays for content, revealing the 3D canvas beneath.

## Sections

### Hero (HTML Layer)
- Typographic entrance: "Blue" (Playfair Display, bold) + italic "Ribbon" in Cerulean Blue.
- Subline: "Shillong's Premier Bakery & Artisanal Cafe."
- **BusyMeter widget**: Showing current bakery capacity.

### The Vibe (HTML Layer)
- Artisanal patisserie, English breakfast, warm inclusive atmosphere.
- Features: "Artisanal Patisserie" / "English Breakfast" / "Inclusive Spaces" (LGBTQ+ friendly, Women-owned).

### Menu (HTML Layer)
- Bakery & Cafe specialties.
- 5 tabs: Patisserie, Breakfast & Savories, Mains & Pizza, Coffee & Tea, Cold Beverages.
- Price tags in gold.

### Social Proof (HTML Layer)
- 3.9-star rating badge (200 reviews) — glassmorphism card.
- Testimonial cards featuring Blueberry Cheesecake and Caramel Custard highlights.

### Footer (HTML Layer)
- Minimalist navy layout, Polo Hills address, and hours.

## The True 3D WebGL Engine (Canvas)
- **`Scene3D.tsx`**: Full-screen `<Canvas>` at z-index 0.
- **Branded Model**: Updated with "THE BLUE RIBBON" decal.
- **Spatial Scroll Tracking**: Cup movement driven by scroll progress.

## Bakery Key Details
- **Rating**: 3.9 (200 Google Reviews)
- **Price Range**: ₹200–400
- **Highlights**: Best Caramel Custard, Blueberry Danish, English Breakfast
- **Atmosphere**: Casual, Cozy, Warm, Inclusive
- **USP**: Women-owned, LGBTQ+ friendly, artisanal baking methods
