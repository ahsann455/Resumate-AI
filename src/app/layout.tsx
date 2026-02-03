import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Resumate AI - Intelligent Resume Analysis & CV Evaluation Tool",
  description: "Resumate AI provides instant, AI-powered resume analysis, CV evaluation, and job matching. Get detailed feedback on your resume against job descriptions using advanced AI.",
  keywords: [
    "resume analysis",
    "CV evaluation",
    "AI resume checker",
    "job matching",
    "resume optimization",
    "ATS keyword match",
    "career assessment",
    "resume feedback",
    "intelligent resume analysis",
    "CV improvement tool"
  ],
  authors: [{ name: "Resumate AI" }],
  icons: {
    icon: '/resumate-logo.png',
  },
  openGraph: {
    title: "Resumate AI - Intelligent Resume Analysis",
    description: "Transform your resume with AI-powered analysis, personalized feedback, and job matching insights. Get hired with Resumate AI.",
    url: "https://resumate.ai",
    siteName: "Resumate AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resumate AI - Transform Your Resume",
    description: "AI-powered resume analysis & job matching in seconds",
    creator: "@resumate_ai",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
        <link rel="canonical" href="https://resumate.ai" />
        <link rel="icon" href="/resumate-logo.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Resumate AI",
            "description": "Intelligent resume analysis and AI-powered CV evaluation tool",
            "url": "https://resumate.ai",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white text-xs flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-1 mt-20">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
