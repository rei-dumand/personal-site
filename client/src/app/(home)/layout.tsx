import React from 'react'
import Navbar from '@/components/navigation/Navbar'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      {children}
    </>

  )
}
