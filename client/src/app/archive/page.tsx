import React from 'react'
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { compareAsc } from 'date-fns'

export default function Archive() {
  const posts = allPosts.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))

  return (

    <main className="archive">

      <table className="table">
        <tbody>

          {posts.map((post, index) => {
            const postID = (() => {
              let res = String(index + 1)
              while (res.length < 3) res = 0 + res
              return res
            })()

            return (
              <tr key={post.url} className="tr">
                <td className="table__id">
                  <Link href={post.url} className="table__link"><h3>{postID}</h3></Link>
                </td>
                <td className="table__title">
                  <Link href={post.url} className="table__link"><h2>{post.title}</h2></Link>
                </td>
                <td className="table__subtitle">
                  <Link href={post.url} className="table__link"><h4>{post.subtitle}</h4></Link>
                </td>
                <td className="table__date">
                  <Link href={post.url} className="table__link"><h5>{post.date}</h5></Link>
                </td>
              </tr>

            )
          })}
        </tbody>
      </table>
    </main>
  )
}
