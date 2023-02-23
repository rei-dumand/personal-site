import classes from './page.module.css';
import Logo from 'public/assets/logo/logo-concise-lightmode.svg';

export default function About() {
    return (
        <section className={classes.about}>

            <h1>Hi There.</h1>

            <section className={classes.content}>

                <div className={classes.column__intro}>
                    <p className={classes.headline}>I’m Rèï, an architecture grad who took a leap into tech and software development.</p>
                    <p className={classes.headline}>Currently based in the UK.</p>
                    <div className={classes.logo}><Logo/></div>
                </div>

                <div className={classes.column__contact}>
                    <a href='https://www.linkedin.com/in/rei-dumand/'>LinkedIn</a>
                    <a href='https://github.com/rei-dumand'>GitHub</a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href='/assets/CV_REI-DUMAND_en.pdf'
                    >CV</a>
                </div>
            </section>


        </section>
    )
}