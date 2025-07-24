import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQ";
import { CartProvider } from "context/CartContext";
import WhatsappButton from "@/components/WhatsappButton";
import Script from "next/script";
import { InvestmentShareProvider } from "context/InvestmentContext";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kasa - Inversiones Inmobiliarias",
  description: "Invierte en inmuebles desde S/2,000 sin papeleos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="assets/logo192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} relative`}
      >

        <InvestmentShareProvider>
          <CartProvider>
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col">
              <Navbar />
              <WhatsappButton />
              <main className="flex-1 flex flex-col">{children}</main>
              <FAQSection />
              <Footer />
            </div>
          </CartProvider>
        </InvestmentShareProvider>
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
      </Script>

    </html>
  );
}
