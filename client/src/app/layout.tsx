'use client';
import './globals.css'
import NavDesktop from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Inter } from '@next/font/google'
import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] })
import {useSearchParams} from 'next/navigation';

// export const metadata: Metadata = {
//   title: 'Rèï - Personal Portfolio',
//   description: 'A personal portfolio & blog by Rèï',
//   authors: [{ name: 'Rèï Dumand' }],
//   icons: {
//     icon: '/favicon.svg',
//     // shortcut: '/favicon.svg',
//     // apple: '/favicon.svg',
//     // other: {
//     //   rel: 'favicon',
//     //   url: '/favicon.svg',
//     // },
//   },
//   viewport: {
//     width: 'device-width',
//     initialScale: 1,
//     maximumScale: 1
//   }
// }

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <title>Rèï Dumand</title>
        <meta name='description' content='A personal portfolio & blog by Rèï' />
        <meta name='author' content='Rèï Dumand' />
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        <header>
          <NavDesktop />
        </header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  )
}
