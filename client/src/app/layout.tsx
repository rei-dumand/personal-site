// import '@/styles/index.scss'
import React from 'react'
import '@/styles/index.css'

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
        {children}
      </body>
    </html>
  )
}
