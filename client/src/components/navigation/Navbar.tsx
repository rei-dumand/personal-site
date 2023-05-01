'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import Logo from '@/assets/icons/Logo'
import LogoConcise from '@/assets/icons/LogoConcise'
import parseClasses from '@/utils/parseClasses'

function Navbar() {
  const [showNavItems, setShowNavItems] = useState<boolean>(false)
  const [hasRun, setHasRun] = useState<boolean>(false)

  const handleShowNavItems = () => {
    if (!hasRun) setHasRun(true)
    setShowNavItems(!showNavItems)
  }

  const homeLogo = useRef<HTMLAnchorElement>(null)

  return (
    <>
      <Logo
        onClick={handleShowNavItems}
        className="navMenu"
        fill="white"
        // style={{ fill: 'white' }}
      />

      <nav className={parseClasses(
        'navItems',
        hasRun && 'initial',
        !showNavItems && 'hidden',
        showNavItems && 'visible',
      )}
      >
        <div className="navbarLeft">
          <Link
            ref={homeLogo}
            title="Homepage"
            data-title="Homepage"
            href="/"
            className="logo"
            // onMouseEnter={({ currentTarget: ct }: MouseEvent<HTMLAnchorElement>) => { ct.title = '' }}
            // onMouseLeave={({ currentTarget: ct }: MouseEvent<HTMLAnchorElement>) => { ct.title = ct.dataset.title! }}
          >
            <LogoConcise fill="white" />
          </Link>
        </div>
        <Link
          title="About"
          data-title="About"
          href="/about"
          // onMouseEnter={({ currentTarget: ct }: MouseEvent<HTMLAnchorElement>) => { ct.title = '' }}
          // onMouseLeave={({ currentTarget: ct }: MouseEvent<HTMLAnchorElement>) => { ct.title = ct.dataset.title! }}
        >About
        </Link>
      </nav>
    </>
  )
}

export default Navbar
