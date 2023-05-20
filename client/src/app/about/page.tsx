import React from 'react'
import LogoConcise from '@/assets/icons/LogoConcise'

export default function About() {
  return (
    <section className="about">

      <h1>Hi There.</h1>

      <section className="content">

        <div className="column__intro">
          <p className="headline">
            I’m Rèï, an architecture grad who took a leap into tech and software development.
          </p>
          <p className="headline">Currently based in the UK.</p>
          <div className="logo"><LogoConcise /></div>
        </div>

        <div className="column__contact">
          <a href="https://www.linkedin.com/in/rei-dumand/">LinkedIn</a>
          <a href="https://github.com/rei-dumand">GitHub</a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="/assets/CV_REI-DUMAND_en.pdf"
          >CV
          </a>
        </div>
      </section>

    </section>
  )
}
