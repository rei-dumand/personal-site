'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classes from './Navbar.module.css';
import NavMenu from 'public/assets/logo/logo-lightmode.svg';

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
                <Link href="/">What I Say</Link>
                <Link href="/projects">What I Do</Link>
                <Link href="/about">Who I Am</Link>
            </nav>
        </>
    )
}

export default Navbar;