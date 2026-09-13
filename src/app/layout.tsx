import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PULSE — Preventive Health Intelligence Platform",
  description:
    "A personal health companion that quietly watches over you. Learn your normal, notice when you're different.",
  keywords: [
    "Preventive Health",
    "Digital Twin",
    "Health Intelligence",
    "Symptom Tracking",
    "Clinical Brief",
    "Health Replay",
  ],
  authors: [{ name: "PULSE Health Intelligence" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F7F8F7] text-[#1F2A2A] selection:bg-[#EEF3F2] selection:text-[#2F7E79]">
        {children}
      </body>
    </html>
  );
}
