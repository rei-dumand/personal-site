import React from 'react'
import { allPosts } from 'contentlayer/generated'
import { PostSection } from '@/components/PostSection'

export default function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = allPosts.find(p => p.slugAsParams === slug)

  const postID = (s => {
    let res = ''
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '_') break
      res += s[i]
    }
    return res
  })(slug)

  return (
    <main className="main">
      <section className="post__frontmatter">
        <video autoPlay loop muted>
          <source src={post?.coverImage} />
        </video>
        <div className="background__grid" />

        <div className="text__container">
          <h3>{postID}</h3>
          <h2>{post?.title}</h2>
          <h4>{post?.subtitle}</h4>
          <h5>{post?.date}</h5>
          <p>{post?.excerpt}</p>
        </div>
      </section>
      <section>
        <PostSection code={post?.body.code} />
      </section>
    </main>
  )
}
