import React from 'react'
import Footer from '../../../components/Footer'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>

  )
}
