import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Generator Absensi BAPAS',
  description: 'Aplikasi untuk generate lembar absensi apel staf bulanan secara otomatis.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
