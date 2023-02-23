import classes from './page.module.css';
import About from './about/page';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export default function Home() {
  const posts = allPosts.sort((a, b) => {
         return compareDesc(new Date(a.date), new Date(b.date))
     })

     posts.map((post, index, posts) => {
       console.log(post.url)

     })
     
     return (
       
       <main className={classes.main}>

      {posts.map((post, index, posts) => 
        (<section className={classes.post__card} key={post.url}>
          <video autoPlay loop muted>
            <source src={post.coverImage} />
          </video>

          <div className={classes.post__card__text__container}>
            <h3>00{posts.length-index}</h3>
            <h2>{post.title}</h2>
            <h4>{post.subtitle}</h4>
            <h5>{post.date}</h5>
          </div>

          <Link href={post.url} className={classes.blog__button}></Link>
        </section>)

      )}

      <footer>
        <About />
      </footer>

    </main>
  )
}
