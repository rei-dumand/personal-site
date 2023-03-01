"use client"
import classes from './page.module.css';
import About from './about/page';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { useState, useEffect } from 'react';

export default function Home() {
  const [cursorShown, isCursorShown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTitle, setCursorTitle] = useState<string | undefined>(undefined);
  const [cursorSubtitle, setCursorSubtitle] = useState<string | undefined>(undefined);
  const [cursorDate, setCursorDate] = useState<string | undefined>(undefined);
  const [cursorID, setCursorID] = useState<string | undefined>(undefined);

  useEffect(() => {
    const mouseMove = (e: any) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    window.addEventListener("mousemove", mouseMove)

    const timer = setTimeout(() => {
      isCursorShown(false)
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      clearTimeout(timer)
    }
  })

  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  return (

    <main className={classes.main}>

      {posts.map((post, index, posts) => {
        let postID = (() => {
          let res = String(posts.length - index)
          while (res.length < 3) res = 0 + res;
          return res
        })();
        return (
          <section className={classes.post__card} key={post.url}>
            <video autoPlay loop muted>
              <source src={post.coverImage} />
            </video>

            <div className={classes.post__card__text__container}>
              <h3>{postID}
              </h3>
              <h2>{post.title}</h2>
              <h4>{post.subtitle}</h4>
              <h5>{post.date}</h5>
            </div>


            <Link
              href={post.url}
              className={classes.blog__button}
              onMouseLeave={() => isCursorShown(false)}
              onMouseMove={() => {
                isCursorShown(true)
              }}
              onMouseEnter={() => {
                isCursorShown(true)
                setCursorTitle(post.title)
                setCursorSubtitle(post.subtitle)
                setCursorDate(post.date)
                setCursorID(postID)
              }}
            >
            </Link>
            {/* <PageLink
            postURL={post.url}
            postTitle={post.title}
            postSubtitle={post.subtitle}
            postDate={post.date}
            postID={posts.length - index}
            cursorShown={cursorShown}
            isCursorShown={isCursorShown}
            cursorTitle={cursorTitle}
            setCursorTitle={setCursorTitle}
          /> */}
            {/* <a href={post.url} className={classes.blog__button} onClick={() => router.push(post.url)}></a> */}
            {/* <Link scroll={false} href={post.url} className={classes.blog__button}></Link> */}


            {cursorShown &&
              <div
                className={classes.cursor}
                style={{
                  position: 'fixed',
                  transform: `translate(calc(${mousePosition.x}px + 8px), calc(${mousePosition.y}px + 8px))`,
                  color: 'white',
                  zIndex: 30,
                  mixBlendMode: 'difference',
                  pointerEvents: 'none',
                }}
              >
                <div>{cursorTitle}</div>
                <div>{cursorSubtitle}</div>
                <div>{cursorDate}</div>
                <div>ID: {cursorID}</div>

                {/* <h2>{cursorTitle}</h2>
            <h3>00{posts.length - index}</h3>
            <h4>{cursorSubtitle}</h4>
            <h5>{cursorDate}</h5> */}

              </div>
            }

          </section>
        )
      })}

      <footer className={classes.footer}>
        <About />
      </footer>

    </main>
  )
}
