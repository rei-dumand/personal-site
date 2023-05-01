'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Arrow from '@/assets/icons/Arrow'
import LogoLightmode from '@/assets/icons/Logo'
import parseClasses from '@/utils/parseClasses'

function Navbar() {
  const [showNavItems, setShowNavItems] = useState<boolean>(false)
  const [hasRun, setHasRun] = useState<boolean>(false)

  const handleShowNavItems = () => {
    if (!hasRun) setHasRun(true)
    setShowNavItems(!showNavItems)
  }

  return (
    <>
      <LogoLightmode
        onClick={handleShowNavItems}
        className="navMenu"
      />

      <nav className={parseClasses(
        'navItems',
        !hasRun && 'initial',
        !showNavItems && 'hidden',
        showNavItems && 'visible',
      )}
      >
        <div className="navbarLeft">
          <Link href="/" className="backHome">
            <Arrow className="backArrow" />
            Home
          </Link>
        </div>
        <Link href="/about">About</Link>
      </nav>
    </>
  )
}

export default Navbar
