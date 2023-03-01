'use client';
import { useState } from 'react';
import Link from 'next/link';
import classes from './Footer.module.css';
import NavMenu from 'public/assets/logo/logo-lightmode.svg';

let Footer = () => {
    const [showNavItems, setShowNavItems] = useState<boolean>(false);
    const [hasRun, setHasRun] = useState<boolean>(false);

    const handleShowNavItems = () => {
        if (!hasRun) setHasRun(true);
        setShowNavItems(!showNavItems)
    }

    return (
        <div className={classes.footerItems}>
            <div className={classes.viewSwitch}>
                <button className={classes.viewSwitchIcon}>Archive</button>

            </div>
            <button>It's me</button>
        </div>
    )
}

export default Footer;