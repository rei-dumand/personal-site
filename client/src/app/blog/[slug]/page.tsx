import React from 'react'
import { getPost } from '@/hooks/useNotionClient'
import { formatJsx } from '@/hooks/useFormatJsx'
import { PostTopic } from '@/index'

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post = await getPost(slug)
  const cleanedPost = post?.markdown ? formatJsx(post.markdown) : null
  return post
    ? (
      <main className="blog-page">
        <section className="blog-page__frontmatter">
          <span className="blog-page__frontmatter__published">{post.metadata.published}</span>
          <h1>{post.metadata.title}</h1>
          <div className="blog-page__frontmatter__topics">
            {post.metadata.topics && post.metadata.topics.map((topic: PostTopic, idx: number) => (
              <span
                key={idx}
                style={{ backgroundColor: topic.color }}
                className="blog-page__frontmatter__topic"
              >
                {topic.name}
              </span>
            ))}
          </div>
        </section>
        <section className="blog-page__body">
          {cleanedPost && cleanedPost.map((item: JSX.Element) => item)}
        </section>
      </main>
    ) : null
}

export const revalidate = 5
