'use client'

import React, { useState } from 'react'
import { allPosts } from 'contentlayer/generated'
import { compareAsc } from 'date-fns'
// import getAllPosts from './helpers/getAllPosts'
import Table from '@/components/Table'
import { Row } from '..'

export default function Home() {
  // const posts = getAllPosts()
  const [posts] = useState(allPosts.sort((a, b) => compareAsc(new Date(b.date), new Date(a.date))))

  console.log(posts)
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
          //   key: 'subtitle',
          //   label: 'subtitle',
          // },
        ]}
        rows={posts.map((post, idx): Row => ({
          id: idx,
          url: post.url,
          cells: [{
            key: 'date',
            id: `${idx}-date`,
            label: post.date,
          },
          {
            key: 'title',
            id: `${idx}-title`,
            label: post.title,
          },
          {
            key: 'subtitle',
            id: `${idx}-subtitle`,
            label: post.subtitle,
          },
          {
            key: 'excerpt',
            id: `${idx}-excerpt`,
            label: post.excerpt,
          },
          ],
        }))}
      />

    </main>
  )
}
