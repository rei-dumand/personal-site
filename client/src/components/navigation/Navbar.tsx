'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/assets/icons/Logo'
import LogoConcise from '@/assets/icons/LogoConcise'
import parseClasses from '@/utils/parseClasses'
import Arrow from '@/assets/icons/Arrow'

function Navbar() {
  const [showNavItems, setShowNavItems] = useState<boolean>(false)
  const [hasRun, setHasRun] = useState<boolean>(false)
  const handleShowNavItems = () => {
    if (!hasRun) setHasRun(true)
    setShowNavItems(!showNavItems)
  }

  const homeLogo = useRef<HTMLAnchorElement>(null)

  const url = usePathname()
  const [isBlog, setIsBlog] = useState<boolean>(false)

  useEffect(() => {
    if (url.split('/').find(i => i === 'blog')) setIsBlog(true)
    else setIsBlog(false)
  }, [url])

  return (
    <>
      <Logo
        onClick={handleShowNavItems}
        className="navMenu"
        fill="white"
      />

      <nav className={parseClasses(
        'navItems',
        hasRun && 'initial',
        !showNavItems && 'hidden',
        showNavItems && 'visible',
      )}
      >
        <div className="navbarLeft">
          { isBlog
            ? (

              <Link href="/" className="backHome">
                <Arrow className="backArrow" fill="white" />
              </Link>
            )
            : (
              <Link
                ref={homeLogo}
                title="Homepage"
                data-title="Homepage"
                href="/"
                className="logo"
              >
                <LogoConcise fill="white" />
              </Link>
            )}
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
