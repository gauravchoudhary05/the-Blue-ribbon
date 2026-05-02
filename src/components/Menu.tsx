"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

/* ─── Data Types ─── */
interface MenuItem {
    name: string;
    price: number;
    description?: string;
    isPopular?: boolean;
}

interface SubCategory {
    name: string;
    icon: string;
    items: MenuItem[];
}

interface MenuTab {
    id: string;
    label: string;
    icon: string;
    subcategories: SubCategory[];
}

/* ─── Full Click Cafe Shillong Menu Data ─── */
const menuTabs: MenuTab[] = [
    {
        id: "patisserie",
        label: "Patisserie",
        icon: "🍰",
        subcategories: [
            {
                name: "Legendary Desserts",
                icon: "🍮",
                items: [
                    { name: "Caramel Custard", price: 180, description: "Silky smooth, melt-in-your-mouth custard with amber caramel.", isPopular: true },
                    { name: "Blueberry Cheesecake", price: 220, description: "Rich cream cheese topped with hand-picked local blueberries.", isPopular: true },
                    { name: "Cold Blueberry Cheesecake", price: 240, description: "Chilled perfection for those summer afternoons." },
                    { name: "Baked Cheesecake", price: 210, description: "Classic New York style, dense and decadent." },
                ],
            },
            {
                name: "Baked Goodies",
                icon: "🥐",
                items: [
                    { name: "Blueberry Danish", price: 160, description: "Flaky puff pastry with a sweet blueberry center.", isPopular: true },
                    { name: "Chocolate Brownie", price: 140, description: "Fudgy, gooey, and intensely chocolatey." },
                    { name: "Assorted Pastries", price: 120, description: "Ask our servers for today's selection." },
                ],
            },
        ],
    },
    {
        id: "breakfast-savories",
        label: "Breakfast & Savories",
        icon: "🍳",
        subcategories: [
            {
                name: "Breakfast Favorites",
                icon: "🥓",
                items: [
                    { name: "All Day English Breakfast", price: 350, description: "Eggs, sausages, bacon, beans, and grilled tomatoes.", isPopular: true },
                    { name: "Club Sandwich", price: 280, description: "Triple-layered classic with chicken, egg, and fresh veggies." },
                ],
            },
            {
                name: "Savory Bites",
                icon: "🥨",
                items: [
                    { name: "Ham and Cheese Croissants", price: 190, description: "Buttery, flaky croissant stuffed with premium ham and melted cheese.", isPopular: true },
                    { name: "Chicken Quiche", price: 170, description: "Savory custard tart with succulent chicken pieces." },
                    { name: "Pork Bao", price: 220, description: "Soft, steamed buns with a savory pork filling." },
                ],
            },
        ],
    },
    {
        id: "mains-pizza",
        label: "Mains & Pizza",
        icon: "🍕",
        subcategories: [
            {
                name: "Pasta & Bowls",
                icon: "🍝",
                items: [
                    { name: "Pasta Bolognese", price: 320, description: "Classic hearty meat sauce over al dente pasta." },
                    { name: "Spaghetti Bolognese", price: 320 },
                    { name: "Noodle Soup", price: 240, description: "Comforting broth with fresh noodles and veggies." },
                    { name: "Momos (Steamed/Fried)", price: 180, description: "Shillong's favorite dumplings." },
                ],
            },
            {
                name: "Artisan Pizza",
                icon: "🍕",
                items: [
                    { name: "Veg Lovers Pizza", price: 340, description: "Fresh dough, gooey cheese, and a garden of toppings.", isPopular: true },
                ],
            },
        ],
    },
    {
        id: "coffee-tea",
        label: "Coffee & Tea",
        icon: "☕",
        subcategories: [
            {
                name: "Local Favorites",
                icon: "🍵",
                items: [
                    { name: "Masala Tea", price: 60, description: "Spiced Indian tea brewed to perfection.", isPopular: true },
                    { name: "Lemon Tea", price: 50 },
                ],
            },
            {
                name: "Artisan Coffee",
                icon: "☕",
                items: [
                    { name: "Freshly Brewed Coffee", price: 120 },
                    { name: "Cappuccino", price: 140 },
                    { name: "Cafe Latte", price: 140 },
                ],
            },
        ],
    },
    {
        id: "cold-beverages",
        label: "Cold Beverages",
        icon: "🧊",
        subcategories: [
            {
                name: "Blueberry Specials",
                icon: "🫐",
                items: [
                    { name: "Blueberry Shake", price: 180, isPopular: true },
                    { name: "Iced Blueberry Tea", price: 160 },
                ],
            },
            {
                name: "Shakes & Coolers",
                icon: "🥤",
                items: [
                    { name: "Chocolate Shake", price: 170 },
                    { name: "Strawberry Shake", price: 170 },
                    { name: "Fresh Lime Soda", price: 120 },
                ],
            },
        ],
    },
];

/* ─── Single Menu Item Row (Editorial Style) ─── */
function MenuItemRow({ item }: { item: MenuItem }) {
    return (
        <motion.div 
            whileTap={{ scale: 0.97, opacity: 0.7 }}
            className="group py-4 md:py-5 flex flex-col gap-1 cursor-pointer select-none"
        >
            <div className="flex items-baseline justify-between w-full">
                <h4 className="font-[family-name:var(--font-display)] text-[1.15rem] md:text-xl font-semibold text-espresso dark:text-parchment m-0 tracking-wide">
                    {item.name}
                    {item.isPopular && (
                        <span className="ml-3 inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-gold/20 text-gold align-middle mb-1">
                            Popular
                        </span>
                    )}
                </h4>
                <div className="flex-1 border-b-2 border-dotted border-bark/15 dark:border-parchment-10 mx-4 relative top-[-6px] opacity-70" />
                <span className="font-[family-name:var(--font-display)] text-lg md:text-xl font-bold text-gold shrink-0">
                    ₹{item.price}
                </span>
            </div>
            {item.description && (
                <p className="text-sm md:text-[15px] text-bark/60 dark:text-parchment-60 max-w-[85%] leading-relaxed font-light">
                    {item.description}
                </p>
            )}
        </motion.div>
    );
}

/* ─── Subcategory Group ─── */
function SubCategoryGroup({ sub, index }: { sub: SubCategory; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className="mb-10 last:mb-0"
        >
            {/* Subcategory header */}
            <div className="flex items-center gap-3 mb-5">
                <span className="text-lg">{sub.icon}</span>
                <h4 className="font-[family-name:var(--font-display)] text-lg font-semibold text-espresso dark:text-parchment">
                    {sub.name}
                </h4>
                <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            </div>

            {/* Items list — single column editorial rows */}
            <div className="flex flex-col divide-y divide-bark/10 dark:divide-parchment-05">
                {sub.items.map((item) => (
                    <MenuItemRow key={`${sub.name}-${item.name}`} item={item} />
                ))}
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   useCupScreenPosition — Projects the 3D cup's world position
   to 2D viewport-percentage coordinates every frame.
═══════════════════════════════════════════════════════════════ */
function useCupScreenPosition() {
    const [pos, setPos] = useState({ x: 50, y: 50, r: 18 });
    const rafId = useRef(0);

    const lerp = useCallback(
        (p: number, inR: number[], outR: number[]) => {
            const clamped = Math.max(inR[0], Math.min(p, inR[inR.length - 1]));
            for (let i = 0; i < inR.length - 1; i++) {
                if (clamped >= inR[i] && clamped <= inR[i + 1]) {
                    const t = (clamped - inR[i]) / (inR[i + 1] - inR[i]);
                    return outR[i] + (outR[i + 1] - outR[i]) * t;
                }
            }
            return outR[outR.length - 1];
        },
        []
    );

    useEffect(() => {
        const tick = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

            const wx = lerp(progress, [0, 1], [-4, 4]);
            const wy = lerp(progress, [0, 1], [3, -3]);
            const wz = lerp(progress, [0, 0.4, 0.7, 1], [0, 1.5, 0.5, -1]);

            const camZ = 8;
            const half = Math.tan((45 * Math.PI) / 360);
            const d = camZ - wz;
            if (d <= 0.1) { rafId.current = requestAnimationFrame(tick); return; }

            const aspect = window.innerWidth / window.innerHeight;
            const sx = ((wx / (half * aspect * d)) + 1) * 50;
            const sy = ((1 - wy / (half * d))) * 50;
            const rr = (1.8 / (half * d)) * 50;

            setPos({ x: sx, y: sy, r: Math.max(rr, 10) });
            rafId.current = requestAnimationFrame(tick);
        };
        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
    }, [lerp]);

    return pos;
}

/* ─── Main Menu Component ─── */
export function Menu() {
    const [activeTab, setActiveTab] = useState("patisserie");
    const activeTabData = menuTabs.find((t) => t.id === activeTab)!;

    // Overlay tracking for the Gold Text Effect
    const goldRef = useRef<HTMLHeadingElement>(null);
    const cup = useCupScreenPosition();

    /* ═══ RAF-driven clip-path sync (GPU-ACCELERATED) ═══ */
    useEffect(() => {
        const el = goldRef.current;
        if (!el) return;

        // 🚀 FIX A: Cache layout — calculate ONCE, update only on resize
        let rect = el.getBoundingClientRect();
        const handleResize = () => { rect = el.getBoundingClientRect(); };
        window.addEventListener("resize", handleResize);

        let raf: number;
        const sync = () => {
            if (rect.width > 0 && rect.height > 0) {
                const cx = (cup.x / 100) * window.innerWidth - rect.left;
                const cy = (cup.y / 100) * window.innerHeight - rect.top;
                const rpx = (cup.r / 100) * window.innerHeight;

                // 🚀 FIX C: Single GPU-accelerated clip-path replaces CPU mask-image
                const maskWidth = rpx * 0.70;
                const maskHeight = rpx * 1.15;

                el.style.clipPath = `ellipse(${maskWidth}px ${maskHeight}px at ${cx}px ${cy}px)`;
            }
            raf = requestAnimationFrame(sync);
        };
        raf = requestAnimationFrame(sync);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", handleResize);
        };
    }, [cup]);

    return (
        <section id="menu" className="py-24 md:py-36 px-6 relative">
            <div className="absolute inset-0 bg-transparent pointer-events-none" />
            <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* ─── Header ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="mb-12 md:mb-16 text-center"
                >
                    <span className="text-forest dark:text-sage tracking-[0.3em] uppercase text-xs font-medium flex items-center justify-center gap-2">
                        <span className="w-6 h-px bg-forest/40 dark:bg-sage/40" />
                        The Menu
                        <span className="w-6 h-px bg-forest/40 dark:bg-sage/40" />
                    </span>

                    {/* ═══ Dual-Layer Text Intersection ═══ */}
                    <div className="relative mt-6" style={{ isolation: "isolate" }}>
                        {/* Layer 1 — Base WHITE text */}
                        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] w-full text-center">
                            Brew. Sip.
                            <br />
                            <span className="italic font-normal text-gold">
                                Savor.
                            </span>
                        </h2>

                        {/* Layer 2 — GOLD overlay clipped to the cup */}
                        <h2
                            ref={goldRef}
                            aria-hidden="true"
                            className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] absolute inset-0 w-full text-center pointer-events-none select-none"
                            style={{
                                color: "#C9A96E",
                                clipPath: "ellipse(0px 0px at 50% 50%)",
                                willChange: "clip-path",
                            }}
                        >
                            Brew. Sip.
                            <br />
                            <span className="italic font-normal" style={{ color: "transparent" }}>
                                Savor.
                            </span>
                        </h2>
                    </div>

                    <p className="text-bark/70 dark:text-parchment-60 mt-6 text-lg max-w-xl mx-auto leading-relaxed">
                        Specialty coffee, manual brews, and artisan food. Every cup crafted with care.
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 bg-forest/10 dark:bg-forest/20 text-forest dark:text-sage text-sm font-medium px-5 py-2.5 rounded-full border border-forest/20 dark:border-sage/20 backdrop-blur-none">
                        <span>☕</span>
                        <span>Add-on: Ice Cream / Whipped Cream / Hazelnut / Caramel — ₹40 each</span>
                    </div>
                </motion.div>

                {/* ... (The rest of your Tab Navigation and Tab Content stays exactly the same) ... */}

                {/* ─── Swipeable Tab Navigation ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-12 relative w-full max-w-4xl mx-auto"
                >
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none md:hidden" />
                    <div className="flex overflow-x-auto gap-3 pb-2 snap-x snap-mandatory hide-scrollbar px-2">
                        {menuTabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                whileTap={{ scale: 0.94 }}
                                onClick={() => setActiveTab(tab.id)}
                                className={`snap-center shrink-0 px-6 py-3.5 rounded-full text-[15px] font-medium flex items-center gap-2 border transition-all duration-300 ${
                                    activeTab === tab.id
                                        ? "border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(201,169,110,0.15)]"
                                        : "border-bark/15 dark:border-parchment-10 text-bark/70 dark:text-parchment-60 bg-white/5 dark:bg-zinc-950/40 hover:text-parchment"
                                }`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                <span className="tracking-wide">{tab.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* ─── Active Tab Content ─── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="max-w-4xl mx-auto px-2"
                    >
                        <div className="flex items-center gap-3 mb-8 pb-5 border-b border-bark/10 dark:border-parchment-10">
                            <span className="text-2xl">{activeTabData.icon}</span>
                            <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-espresso dark:text-parchment">
                                {activeTabData.label}
                            </h3>
                            <div className="ml-auto text-bark/40 dark:text-parchment-40 text-sm font-medium">
                                {activeTabData.subcategories.reduce((a, s) => a + s.items.length, 0)} items
                            </div>
                        </div>

                        {activeTabData.subcategories.map((sub, idx) => (
                            <SubCategoryGroup
                                key={`${activeTab}-${sub.name}`}
                                sub={sub}
                                index={idx}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}