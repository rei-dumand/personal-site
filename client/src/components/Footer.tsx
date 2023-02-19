import Link from 'next/link';
import classes from './Footer.module.css';

let Footer = () => {
    return (
        <section className={classes.footer__container}>
            This is the footer. In here I will put a disclaimer, some key info and my logo.
        </section>
    )
}

export default Footer;