import './globals.css'
import NavDesktop from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Inter } from '@next/font/google'
import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rèï - Personal Portfolio',
  description: 'A personal portfolio & blog by Rèï',
  authors: [{name: 'Rèï Dumand'}],
  icons: {
    icon: '/favicon.png'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <NavDesktop />
        </header>
        {children}
        {/* <Footer></Footer> */}
      </body>
    </html>
  )
}
