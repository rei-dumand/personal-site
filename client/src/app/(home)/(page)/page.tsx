'use client';
import classes from './page.module.css';
import About from '@/app/(home)/about/page';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import getAllPosts from './helpers/getAllPosts';

export default function Home() {
  const posts = getAllPosts();

  // Reset Scroll to Top
  const [scrollReset, didScrollReset] = useState(false);
  useEffect(() => {
    if (!scrollReset) {
      window.scroll(0, 0)
      didScrollReset(true)
    };
  }, [])

  // Monitor Height of each Blog Post Card
  const blogList = useRef<HTMLDivElement>(null);
  const postCardHeight = useRef<number | null>(null);
  useEffect(() => {
    const targetDiv = blogList?.current;
    if (!targetDiv) return;
    const observer = new ResizeObserver(() => {
      postCardHeight.current = targetDiv.clientHeight / posts.length;
    });
    observer.observe(targetDiv)
    return () => { observer.disconnect() };
  }, [blogList.current])

  // Monitor Client Dimensions (W, H)
  const [clientDim, setClientDim] = useState<{ x: number | null, y: number | null }>({ x: null, y: null })
  useEffect(() => {
    const handleWindowResize = (e: any) => {
      setClientDim({ x: window.innerWidth, y: window.innerHeight })
    }
    addEventListener('resize', handleWindowResize)
    return () => {
      removeEventListener('resize', handleWindowResize)
    }
  }, [])

  // Full Page Scroll Mechanism for screens.W > 768px
  let wheelTimeout: string | number | NodeJS.Timeout | undefined = undefined;
  const wheelFlag = useRef<boolean>(true);
  const scrollIncrement = useRef<number>(0);
  useEffect(() => {
    if (clientDim.x !== null && clientDim.x <= 768) return
    const wheel = (e: any) => {
      e.preventDefault();
      if (wheelFlag.current && postCardHeight.current) {
        if (e.deltaY > 0 && scrollIncrement.current < posts.length) {
          window.scroll(0, postCardHeight.current * Math.min(scrollIncrement.current + 1, posts.length))
          scrollIncrement.current = (Math.min(scrollIncrement.current + 1, posts.length))
          wheelFlag.current = false
        }
        else if (e.deltaY < 0 && scrollIncrement.current > 0) {
          window.scroll(0, postCardHeight.current * Math.max(scrollIncrement.current - 1, 0))
          scrollIncrement.current = (Math.max(scrollIncrement.current - 1, 0))
          wheelFlag.current = false
        }
      };
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(function () {
        wheelFlag.current = true;
      }, 150)
    }
    window.addEventListener("wheel", wheel, { passive: false })
    return () => {
      window.removeEventListener("wheel", wheel)
    }
  }, [scrollIncrement.current, wheelFlag.current, clientDim])

  // Cursor for screens.W > 768px
  const [cursorTitle, setCursorTitle] = useState<string | null>(null);
  const [cursorSubtitle, setCursorSubtitle] = useState<string | null>(null);
  const [cursorDate, setCursorDate] = useState<string | null>(null);
  const [cursorID, setCursorID] = useState<string | null>(null);
  const [cursorShown, isCursorShown] = useState(false);
  const [mousePositionDocument, setmousePositionDocument] = useState({ x: null, y: null });
  const [mousePositionScreen, setmousePositionScreen] = useState({ x: null, y: null });
  useEffect(() => {
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
    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  })

  // Height of All Blog Posts ::: TO REVIEW
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [mainHeight, setMainHeight] = useState<number | undefined>(undefined);
  useEffect(() => {
    setClientDim({ x: window.innerWidth, y: window.innerHeight })
    mainRef.current ? setMainHeight(mainRef.current.clientHeight) : undefined
  }, [mainRef.current, scrollReset])

  return (
    scrollReset &&
    <>
      <main className={classes.main} ref={mainRef}>
        {mainHeight &&
          <div
            className={classes.blog__grid}
            style={{
              height: mainHeight * 8,
              transform: `translate3d(${-(mousePositionScreen.x ? mousePositionScreen.x / 2 : 0)}px, 
              ${-(mousePositionScreen.y ? mousePositionScreen.y / 2 : 0)}px, 0)`
            }}
          ></div>
        }

        <div className={classes.blog__list} ref={blogList}>

          {posts.map((post, index, posts) => {
            let postID = (() => {
              let res = String(posts.length - index)
              while (res.length < 3) res = 0 + res;
              return res
            })();

            return (
              <section className={classes.post__card} key={post.url} id={String(index)}>
                <video autoPlay loop muted preload='true'>
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

                {cursorShown && cursorTitle && cursorSubtitle && cursorDate && cursorID && clientDim.x && clientDim.x > 768 &&
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
        </div>
      </main>

      <footer className={classes.footer}>
        <About />
      </footer>
    </>
  )
}