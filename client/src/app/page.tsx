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
        headers={['published', 'title', 'subtitle']}
        rows={posts.map((post, idx): Row => ({
          id: idx,
          url: post.url,
          cells: [{
            id: `${idx}-date`,
            label: post.date,
          },
          {
            id: `${idx}-title`,
            label: post.title,
          },
          {
            id: `${idx}-subtitle`,
            label: post.subtitle,
          }],
        }))}
      />

    </main>
  )
}
