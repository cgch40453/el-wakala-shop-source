import './globals.css';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'خدمات السوشيال ميديا - زيادة متابعين، مشاهدات، لايكات وتعليقات',
  description: 'منصة متكاملة لخدمات السوشيال ميديا - زيادة متابعين، مشاهدات، لايكات وتعليقات على جميع منصات التواصل الاجتماعي',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
