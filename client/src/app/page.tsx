"use client"
import classes from './page.module.css';
import About from './about/page';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { useState, useEffect } from 'react';

export default function Home() {
  const [cursorShown, isCursorShown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: undefined, y: undefined });
  const [cursorTitle, setCursorTitle] = useState<string | undefined>(undefined);
  const [cursorSubtitle, setCursorSubtitle] = useState<string | undefined>(undefined);
  const [cursorDate, setCursorDate] = useState<string | undefined>(undefined);
  const [cursorID, setCursorID] = useState<string | undefined>(undefined);

    let [scrollReset, didScrollReset] = useState(false);
    useEffect(() => {
        scrollReset ? window.scroll(0, 0) : undefined;
        window.scroll(0,0)
        didScrollReset(true)
    },[])

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
    scrollReset &&
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
              <h3>{postID}</h3>
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
                if (cursorShown) {
                  setCursorTitle(post.title)
                  setCursorSubtitle(post.subtitle)
                  setCursorDate(post.date)
                  setCursorID(postID)
                }
              }}
            >
            </Link>

            {cursorShown && cursorTitle && cursorSubtitle && cursorDate && cursorID &&
              <section
                className={classes.cursorText}
                style={{transform: `translate(calc(${mousePosition.x}px + 8px), calc(${mousePosition.y}px + 8px))`}}
              >

                  <div>{cursorTitle}</div>
                  <div>{cursorSubtitle}</div>
                  <div>{cursorDate}</div>
                  <div>ID: {cursorID}</div>

                {/* <h2>{cursorTitle}</h2>
            <h3>00{posts.length - index}</h3>
            <h4>{cursorSubtitle}</h4>
            <h5>{cursorDate}</h5> */}

              </section>
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
