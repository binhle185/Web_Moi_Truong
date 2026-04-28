import type { Metadata } from "next";
import { Montserrat, Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "AIRU",
  description: "Khảo sát và chấm điểm hành động cá nhân để bảo vệ môi trường không khí",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${montserrat.variable} ${beVietnamPro.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-10 backdrop-blur-sm bg-white/70 border-b border-white/60">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-[#1C398E]">
              AIRU
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href="/survey"
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#1C398E] hover:bg-white/80 transition"
              >
                Khảo sát
              </Link>
              <Link
                href="/policies"
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#1C398E] hover:bg-white/80 transition"
              >
                Đọc thông tư
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
