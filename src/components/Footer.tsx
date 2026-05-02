"use client";

import { motion } from "framer-motion";

export function Footer() {
    return (
        <footer id="footer" className="bg-smoke pt-24 pb-12 px-6 border-t border-espresso-80">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-12 gap-16 md:gap-8 mb-20">

                    {/* Brand Col */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="md:col-span-5 pr-8"
                    >
                        <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold text-parchment mb-6">
                            Blue
                            <span className="italic font-normal text-blue-500"> Ribbon</span>
                        </h3>
                        <p className="text-parchment-40 text-[15px] leading-relaxed max-w-sm mb-8">
                            Premium artisanal bakery and cafe in the heart of Shillong. Famous for our blueberry cheesecake, caramel custard, and cozy atmosphere.
                        </p>
                        <div className="flex flex-col gap-4 mb-8">
                            <div className="flex items-center gap-3 text-parchment-60 text-sm">
                                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <span>069096 75920</span>
                            </div>
                        </div>
                        <div className="inline-flex flex-col">
                            <span className="text-gold font-medium mb-1 flex items-center gap-2">
                                <span>★</span> 3.9 Stars
                            </span>
                            <span className="text-parchment-20 text-xs">Based on 200 Google Reviews</span>
                        </div>
                    </motion.div>

                    {/* Address Col */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="md:col-span-3 md:col-start-7"
                    >
                        <h4 className="text-parchment text-xs tracking-[0.25em] uppercase font-semibold mb-6">
                            Find Us
                        </h4>
                        <address className="not-italic text-parchment-40 text-sm leading-loose">
                            <p>Polo Hills,</p>
                            <p>Opposite Stadium parking lot,</p>
                            <p>Golf Links, Shillong, Meghalaya</p>
                            <p>793001</p>
                        </address>
                        <a
                            href="https://maps.google.com/?q=The+Blue+Ribbon+Bakery+Shillong"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 text-gold hover:text-parchment text-sm mt-6 transition-colors duration-300"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span className="border-b border-gold/30 group-hover:border-parchment/30 pb-0.5 transition-colors">
                                Get Directions
                            </span>
                        </a>
                    </motion.div>

                    {/* Hours Col */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="md:col-span-3"
                    >
                        <h4 className="text-parchment text-xs tracking-[0.25em] uppercase font-semibold mb-6">
                            Hours
                        </h4>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between items-baseline border-b border-parchment/5 pb-2">
                                <span className="text-parchment-40">Mon – Sun</span>
                                <span className="text-parchment-80 font-medium">10:00 AM – 8:00 PM</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Divider + Copyright */}
                <div className="border-t border-parchment-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-parchment-20 text-xs">
                        © {new Date().getFullYear()} The Blue Ribbon Bakery. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-parchment-20 text-xs">
                        <a href="#" className="hover:text-parchment transition-colors">Instagram</a>
                        <a href="#" className="hover:text-parchment transition-colors">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
