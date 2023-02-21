import Image from 'next/image'
import { Inter } from '@next/font/google'
import classes from './page.module.css'
import About from './about/page'
import Link from 'next/link';

import { getAllPosts } from '@/lib/api';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const posts = getAllPosts(["slug", "title", "subtitle", "date", "excerpt", "coverImage"])

  return (

    <main className={classes.main}>

      {posts.map((post, index, posts) => 
        (<section className={classes.post__card} key={post.slug}>
          <video autoPlay loop muted>
            <source src={post.coverImage} />
          </video>

          <div className={classes.post__card__text__container}>
            <h3>00{posts.length-index}</h3>
            <h2>{post.title}</h2>
            <h4>{post.subtitle}</h4>
            <h5>{post.date}</h5>
          </div>

          <Link href={`/blog/${post.slug}`} className={classes.blog__button}></Link>
        </section>)

      )}

      <footer>
        <About />
      </footer>

    </main>
  )
}
