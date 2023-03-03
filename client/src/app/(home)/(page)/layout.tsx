// import './globals.css'
import Navbar from '@/components/navigation/NavbarHome'
import Footer from '@/components/Footer'
import { Inter } from '@next/font/google'
import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] })


export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Footer></Footer>
        </>

    )
}