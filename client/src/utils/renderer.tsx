import React, { ReactElement } from 'react'
import type { Post } from '../index'

function flattenText(block: ReactElement) {
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
  for (const block of post.JSXBlocks) {
    if (block.type === 'h1') {
      console.log(block)
      sections.push(latestSection)
      const h1SectionNumber = <span className="h1__section-number">{String(sections.length).padStart(2, '0')}</span>
      const h1StickyElement = <span className="h1__vertical-flag">{flattenText(block)}</span>
      latestSection = [h1SectionNumber, h1StickyElement, block]
      continue
    }
    latestSection.push(block)
  }
  if (latestSection.length) sections.push(latestSection)

  for (const [sectionIdx, section] of sections.entries()) {
    res.push(<section className="section-main" id={`section-${sectionIdx}`}>{section.map(s => s)}</section>)
  }
  return { metadata: post.metadata, JSXBlocks: res }
}
