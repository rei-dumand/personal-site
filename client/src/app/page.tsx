"use client"
import classes from './page.module.css';
import About from './about/page';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import PageLink from '@/components/PageLink';
// import { useRouter } from 'next/navigation';

export default function Home() {

  // const router = useRouter();

  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (

    <main className={classes.main}>

      {posts.map((post, index, posts) =>
      (<section className={classes.post__card} key={post.url}>
        <video autoPlay loop muted>
          <source src={post.coverImage} />
        </video>

        <div className={classes.post__card__text__container}>
          <h3>00{posts.length - index}</h3>
          <h2>{post.title}</h2>
          <h4>{post.subtitle}</h4>
          <h5>{post.date}</h5>
        </div>

        {/* <a href={post.url} className={classes.blog__button} onClick={() => router.push(post.url)}></a> */}
        {/* <Link scroll={false} href={post.url} className={classes.blog__button}></Link> */}
        <PageLink postURL={post.url}/>
      </section>)

      )}

      <footer className={classes.footer}>
        <About />
      </footer>

    </main>
  )
}
