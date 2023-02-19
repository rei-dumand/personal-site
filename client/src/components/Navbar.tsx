'use client';
import { useState } from 'react';
import Link from 'next/link';
import classes from './Navbar.module.css'

let Navbar = () => {
    const [showNavItems, setShowNavItems] = useState<boolean>(false);
    const [hasRun, setHasRun] = useState<boolean>(false);

    const handleShowNavItems = () => {
        if (!hasRun) setHasRun(true);
        setShowNavItems(!showNavItems)
    }

    return (
        <>
            <img
                onClick={handleShowNavItems}
                src="assets/logo/logo-lightmode.svg"
                alt="SVG navbar logo"
                className={classes.navMenu}
            />

            <nav className={`
                ${classes.navItems}
                ${!hasRun && classes.initial}
                ${!showNavItems && classes.hidden}
                ${showNavItems && classes.visible}`
            }>
                <Link href="/">What I Say</Link>
                <Link href="/projects">What I Do</Link>
                <Link href="/about">Who I Am</Link>
            </nav>
        </>
    )
}

export default Navbar;