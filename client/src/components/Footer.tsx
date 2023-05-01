'use client'

import React from 'react'
// { type MouseEvent }
import Link from 'next/link'
// import NavMenu from 'public/assets/logo/logo-lightmode.svg'
import classes from './Footer.module.css'

function Footer() {
  // const [showNavItems, setShowNavItems] = useState<boolean>(false)
  // const [hasRun, setHasRun] = useState<boolean>(false)

  // const handleShowNavItems = () => {
  //   if (!hasRun) setHasRun(true)
  //   setShowNavItems(!showNavItems)
  // }

  return (
    <div className={classes.footerItems}>
      <Link
        title="Grid View"
        data-tite="Grid View"
        className={classes.archiveButton}
        href="/archive"
        // onMouseEnter={({ currentTarget: ct }: MouseEvent<HTMLAnchorElement>) => { ct.title = '' }}
        // onMouseLeave={({ currentTarget: ct }: MouseEvent<HTMLAnchorElement>) => { ct.title = ct.dataset.title! }}
      >Grid View
      </Link>
    </div>
  )
}

export default Footer
