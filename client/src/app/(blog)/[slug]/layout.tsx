import React from 'react'
import Navbar from '@/components/navigation/NavbarBlog'

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
