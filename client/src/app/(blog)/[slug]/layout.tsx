// import './globals.css'
import Navbar from '@/components/navigation/NavbarBlog'
import Footer from '@/components/Footer'
import { Inter } from '@next/font/google'
import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] })


export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {children}
      </main>
    </>

  )
}