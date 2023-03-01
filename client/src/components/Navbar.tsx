'use client';
import { useState } from 'react';
import Link from 'next/link';
import classes from './Navbar.module.css';
import NavMenu from 'public/assets/logo/logo-lightmode.svg';
import Logo from 'public/assets/logo/logo-concise-lightmode.svg';

let Navbar = () => {
    const [showNavItems, setShowNavItems] = useState<boolean>(false);
    const [hasRun, setHasRun] = useState<boolean>(false);

    const handleShowNavItems = () => {
        if (!hasRun) setHasRun(true);
        setShowNavItems(!showNavItems)
    }

    return (
        <>
            <NavMenu
                onClick={handleShowNavItems}
                alt="SVG navbar logo"
                className={classes.navMenu}
            />

            <nav className={`
                ${classes.navItems}
                ${!hasRun && classes.initial}
                ${!showNavItems && classes.hidden}
                ${showNavItems && classes.visible}`
            }>
                <div className={classes.navbarLeft}>
                    <Link href="/" className={classes.logo}><Logo /></Link>
                    <Link href="/projects">Archives</Link>
                </div>
                <Link href="/about">About</Link>
            </nav>
        </>
    )
}

export default Navbar;