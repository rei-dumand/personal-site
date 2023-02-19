import './globals.css'
import NavDesktop from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Inter } from '@next/font/google'
import About from './about/page'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={inter.className}>
        <header>
          <NavDesktop />
        </header>
        {children}
      </body>
    </html>
  )
}
