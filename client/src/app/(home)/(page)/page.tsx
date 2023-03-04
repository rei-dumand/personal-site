'use client';
import classes from './page.module.css';
import About from '@/app/(home)/about/page';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [scrollReset, didScrollReset] = useState(false);
  const [cursorShown, isCursorShown] = useState(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const prevScrollY = useRef<number>(0);
  const [mousePositionDocument, setmousePositionDocument] = useState({ x: null, y: null });
  const [mousePositionScreen, setmousePositionScreen] = useState({ x: null, y: null });
  const [cursorTitle, setCursorTitle] = useState<string | null>(null);
  const [cursorSubtitle, setCursorSubtitle] = useState<string | null>(null);
  const [cursorDate, setCursorDate] = useState<string | null>(null);
  const [cursorID, setCursorID] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [mainHeight, setMainHeight] = useState<number | undefined>(undefined);

  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })

  useEffect(() => {
    scrollReset ? window.scroll(0, 0) : undefined;
    window.scroll(0, 0)
    didScrollReset(true)
  }, [])

  useEffect(() => {
    const scroll = () => {
      prevScrollY.current = scrollY;
      setScrollY(Math.floor(window.scrollY))
      console.log(scrollY, " ", prevScrollY)
    }

    const mouseMove = (e: any) => {
      setmousePositionDocument({
        x: e.pageX,
        y: e.pageY
      })
      setmousePositionScreen({
        x: e.clientX,
        y: e.clientY
      })
    }
    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("scroll", scroll)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("scroll", scroll)
    }
  })

  useEffect(() => {
    mainRef.current ? setMainHeight(mainRef.current.clientHeight) : undefined
  }, [mainRef.current, scrollReset])

  return (
    scrollReset &&
    <>
      <main className={classes.main} ref={mainRef}>
        {mainHeight && scrollY !== null &&
          <div
            className={classes.blog__grid}
            style={{
              height: mainHeight * 8,
              transform: `translate3d(${-(mousePositionScreen.x ? mousePositionScreen.x / 2 : 0)}px, ${-(mousePositionScreen.y ? mousePositionScreen.y / 2 : 0) - (scrollY * 2)}px, 0)`
            }}
          ></div>
        }

        {posts.map((post, index, posts) => {
          let postID = (() => {
            let res = String(posts.length - index)
            while (res.length < 3) res = 0 + res;
            return res
          })();

          return (
            <section className={classes.post__card} key={post.url}>
              <video autoPlay loop muted preload='true'>
                <source src={post.coverImage}/>
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
                  style={{ transform: `translate(calc(${mousePositionScreen.x}px + 12px), calc(${mousePositionScreen.y}px + 8px))` }}
                >

                  <div>{cursorTitle}</div>
                  <div>{cursorSubtitle}</div>
                  <div>{cursorDate}</div>
                  <div>ID: {cursorID}</div>
                  <div>{`x: ${mousePositionDocument.x}`}</div>
                  <div>{`y: ${mousePositionDocument.y}`}</div>

                  {/* <h2>{cursorTitle}</h2>
                  <h3>00{posts.length - index}</h3>
                  <h4>{cursorSubtitle}</h4>
                  <h5>{cursorDate}</h5> */}

                </section>
              }
            </section>
          )
        })}
      </main>

      <footer className={classes.footer}>
        <About />
      </footer>
    </>
  )
}
