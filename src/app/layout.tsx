import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-display",
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
    style: ["normal", "italic"],
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
    weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
    title: "Click Cafe Shillong | Premium Coffee & Hot Chocolate",
    description:
        "Specialty coffee, manual brews, and the best hot chocolate in Shillong. Cozy vibes, resident cats, and artisan food at Dhankheti, St. Peter's Building.",
    keywords: ["Click Cafe", "Shillong café", "specialty coffee Shillong", "Dhankheti coffee shop", "hot chocolate Shillong", "manual brew coffee"],
    openGraph: {
        title: "Click Cafe Shillong | Premium Coffee & Hot Chocolate",
        description: "Specialty coffee, manual brews & cozy vibes. Dhankheti, Shillong.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
            <body>{children}</body>
        </html>
    );
}
