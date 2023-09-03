import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { MdBlock } from 'notion-to-md/build/types'
import React, { ReactNode } from 'react'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

const n2m = new NotionToMarkdown({ notionClient: notion })

function getPageMetaData(post: any) {
  const getTopics = (tags: any) => {
    const allTags = tags.map((tag: any) => ({ name: tag.name, color: tag.color }))
    return allTags
  }

  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    published: post.properties.Published.date?.start,
    updated: post.properties.Updated.date?.start,
    topics: getTopics(post.properties.Topics.multi_select),
  }
}

export async function getAllPosts() {
  if (process.env.DATABASE_ID) {
    const res = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
      filter: {
        property: 'Status',
        select: { equals: 'Public' },
      },
      sorts: [
        {
          property: 'Published',
          direction: 'descending',
        },
      ],
    })
    const allPosts = res.results
    return allPosts.map(post => getPageMetaData(post))
  }
  return []
}

function extractLinks(markdown: string) {
  const linkRegex = /\[([^[]+)\]\(([^()]+)\)/g
  const result = []
  let lastIndex = 0
  // let match = linkRegex.exec(markdown)
  let match = linkRegex.exec(markdown)
  // eslint-disable-next-line no-cond-assign
  while (match) {
    // console.log(match)
    if (match.index > lastIndex) {
      result.push({
        type: 't',
        text: markdown.substring(lastIndex, match.index),
      })
    }

    result.push({
      type: 'a',
      text: match[1],
      link: match[2],
    })

    lastIndex = linkRegex.lastIndex
    match = linkRegex.exec(markdown)
  }

  if (lastIndex < markdown.length) {
    result.push({
      type: 't',
      text: markdown.substring(lastIndex),
    })
  }
  return result
}

export function parseNotionMdBlocks(blocks: MdBlock[]) {
  const res: ReactNode[] = []
  for (const block of blocks) {
    if (block.children.length) {
      res.push(parseNotionMdBlocks(block.children))
    }
    switch (block.type) {
      case 'paragraph':
        console.log(extractLinks(block.parent))
        res.push()
        break

      default:
        res.push()
    }
  }

  return res
}

export async function getPost(slug: string) {
  if (process.env.DATABASE_ID) {
    const response = await notion.databases.query({
      database_id: process.env.DATABASE_ID,
      filter: {
        property: 'Slug',
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    })
    const page = response.results[0]
    const metadata = getPageMetaData(page)
    const mdBlocks = await n2m.pageToMarkdown(page.id)
    const parsedBlocks = parseNotionMdBlocks(mdBlocks)
    const mdString = n2m.toMarkdownString(mdBlocks)
    return {
      metadata,
      markdown: mdString,
      parsedBlocks,
    }
  }
  return null
}
