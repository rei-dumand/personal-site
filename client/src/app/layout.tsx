import React from 'react'
import '@/styles/index.css'
import Navbar from '@/components/navigation/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Rèï Dumand</title>
        <meta name="description" content="A personal portfolio & blog by Rèï" />
        <meta name="author" content="Rèï Dumand" />
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  )
}
