import { Inter } from '@next/font/google'
import NavDesktop from '@/components/Navbar'
const inter = Inter({ subsets: ['latin'] })

export default function BlogLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
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