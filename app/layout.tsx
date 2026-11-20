import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartProvider } from "@/components/cart-provider";
import { AuthProvider } from "@/components/auth-provider";
const dmSans=DM_Sans({variable:"--font-dm-sans",subsets:["latin"]});
const playfair=Playfair_Display({variable:"--font-playfair",subsets:["latin"]});
export const metadata:Metadata={title:"LUXORA — Timeless Elegance",description:"Modern handbags crafted for timeless elegance."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${dmSans.variable} ${playfair.variable}`}><AuthProvider><CartProvider><SiteHeader/>{children}<SiteFooter/></CartProvider></AuthProvider></body></html>}
