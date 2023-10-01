import React from 'react'
import { Client } from '@notionhq/client'
import { getPost } from '@/utils/notion'
import { renderPost } from '@/utils/renderer'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export default async function Notion() {
  const post = await getPost(notion, 'notion-typology')
  if (!post) return null
  const renderedPost = renderPost(post)
  return renderedPost ? (
    <main className="blog-structure">
      {renderedPost.JSXBlocks.map(b => b)}
    </main>
  ) : null
}
