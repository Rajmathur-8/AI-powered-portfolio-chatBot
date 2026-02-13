// app/layout.jsx
import { Inter } from 'next/font/google';
import './globals.css';
import './globals-extended.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI-Powered Portfolio | John Doe',
  description: 'Interactive portfolio with AI co-browsing assistant powered by Gemini',
  keywords: 'portfolio, AI, chatbot, web developer, full stack',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}