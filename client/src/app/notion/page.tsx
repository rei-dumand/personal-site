import React from 'react'
import { Client } from '@notionhq/client'
import { getPost } from '@/utils/notion'

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export default async function Notion() {
  const post = await getPost(notion, 'notion-typology')
  return post ? (
    <main className="blog-structure">
      {post.JSXBlocks.map(b => b)}
    </main>
  ) : undefined
}
