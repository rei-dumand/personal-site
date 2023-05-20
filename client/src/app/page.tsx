import React from 'react'
import Table from '@/components/Table'
import { Row } from '..'

import { getAllPosts } from '@/hooks/useNotionClient'

export default async function Home() {
  const posts = await getAllPosts()
  // console.log('👺', posts)
  posts?.map(post => console.log(post.topics))

  return (
    <main className="home-page">
      <Table
        headers={[
          {
            key: 'date',
            label: 'published',
          },
          {
            key: 'title',
            label: 'title',
          },
          // {
          //   key: 'topics',
          //   label: 'topics',
          // },
        ]}
        rows={posts && posts.map((post, idx): Row => ({
          id: idx,
          url: `blog/${String(post.title).replaceAll(' ', '-').toLowerCase()}`,
          cells: [{
            key: 'date',
            id: `${idx}-date`,
            label: post.published,
          },
          {
            key: 'title',
            id: `${idx}-title`,
            label: post.title,
          },
          // {
          //   key: 'topics',
          //   id: `${idx}-topics`,
          //   label: post.topics,
          // },
          // {
          //   key: 'subtitle',
          //   id: `${idx}-subtitle`,
          //   label: post.subtitle,
          // },
          // {
          //   key: 'excerpt',
          //   id: `${idx}-excerpt`,
          //   label: post.excerpt,
          // },
          ],
        }))}
      />

    </main>
  )
}

export const revalidate = 600
