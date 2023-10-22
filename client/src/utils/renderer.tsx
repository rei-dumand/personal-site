import React, { ReactElement } from 'react'
import type { Post, PostTopic } from '../index'
import Arrow from '@/assets/icons/Arrow'

export function flattenText(block: ReactElement) {
  let res = ''
  for (const child of block.props.children) {
    if (typeof child === 'string') {
      res += child
      continue
    }
    res += flattenText(child)
  }
  return res
}

export function renderPost(post: Post): Post {
  const res = []
  const sections: ReactElement[][] = []
  let latestSection: ReactElement[] = []

  res.push(
    <section className="cover">
      <div className="cover__frontmatter">
        <div className='cover__frontmatter-sticky'>
          <h1 className="cover__frontmatter-title">{post.metadata.title}</h1>
        </div>
      </div>
    </section>,
    <section className='metadata-wrapper'>
      <section className='metadata'>
        <span className="metadata__published">
          <span className='metadata__item'>
            <span>Published</span>
            <Arrow variant="E" />
            <span>{post.metadata.published}</span>
          </span>
        </span>
        {post.metadata.updated ?
          <span className="metadata__updated">
            <span className='metadata__item'>
              <span>Updated </span>
              <Arrow variant="E" />
              <span>{post.metadata.updated}</span>
            </span>
          </span> : null}

        <div className="metadata__topics">
          <span className='metadata__item'>
            <span>Topics</span>
            {post.metadata.topics && post.metadata.topics.map((topic: PostTopic, idx: number) => (
              <span
                key={idx}
                className="metadata__topic"
                style={{ '--color': topic.color } as React.CSSProperties}
              >{topic.name}
              </span>
            ))}
          </span>
        </div>
        <div className='metadata__abstract'>
          <div className='metadata__abstract-title'>
            <Arrow variant="S" />
            Abstract
          </div>
          <span>
            {post.metadata.abstract}
          </span>
        </div>
      </section>
    </section>,
    <section className='table-of-contents'>
      <div className='table-of-contents__title'>
        <Arrow variant="S" />
        Contents
      </div>
      {post.tableOfContents.map(c => (
        <a key={`#${c.id}`} href={`#${c.id}`}>
          <div className={`table-of-contents__label--${c.header_type}`}>
            {c.label}
          </div>
        </a>
      )
      )}
    </section>
  )

  for (const block of post.JSXBlocks) {
    if (!block) continue

    if (block.type === 'h1') {
      sections.push(latestSection)
      const sectionNumber = String(sections.length).padStart(2, '0')
      const h1SectionNumber = <span className="h1__section-number">{sectionNumber}</span>
      const h1StickyElement = (
        <span className="section__underlay" id={`section__underlay--${sections.length}`}>
          <span className="section__underlay-sidebar">
            <span className="h1__vertical-flag">{sectionNumber} <span className="dynamic-dot" /> {flattenText(block)}</span>
          </span>
        </span>
      )
      latestSection = [h1SectionNumber, h1StickyElement, block]
      continue
    }
    latestSection.push(block)
  }
  if (latestSection.length) sections.push(latestSection)

  for (const [sectionIdx, section] of sections.entries()) {
    if (!section.length) continue
    res.push(
      <section className="section-main" id={`section-main--${sectionIdx}`}>
        <div className="section-content">{section.map(s => s)}</div>
      </section>,
    )
  }
  return { metadata: post.metadata, JSXBlocks: res, tableOfContents: post.tableOfContents }
}
