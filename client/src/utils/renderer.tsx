import React, { ReactElement } from 'react'
import type { Post, PostTopic } from '../index'

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

  console.log(post.metadata)
  res.push(
    <section className="cover">
      <img className="cover__background" src={post.metadata.cover} alt="cover" />
      <div className="cover__frontmatter">
        <span className="cover__frontmatter-published">{post.metadata.published}</span>
        <h1 className="cover__frontmatter-title">{post.metadata.title}</h1>
        <div className="cover__frontmatter-topics">
          {post.metadata.topics && post.metadata.topics.map((topic: PostTopic, idx: number) => (
            <span
              key={idx}
              style={{ backgroundColor: topic.color }}
              className="cover__frontmatter-topic"
            >
              {topic.name}
            </span>
          ))}
        </div>
        <div>{post.metadata.published}</div>
        <div>{post.metadata.updated}</div>
      </div>
    </section>,
  )

  for (const block of post.JSXBlocks) {
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
    res.push(
      <section className="section-main" id={`section-main--${sectionIdx}`}>
        <div className="section-content">{section.map(s => s)}</div>
      </section>,
    )
  }
  return { metadata: post.metadata, JSXBlocks: res }
}
