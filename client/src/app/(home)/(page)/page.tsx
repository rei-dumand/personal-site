'use client';
import classes from './page.module.css';
import About from '@/app/(home)/about/page';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import getAllPosts from './helpers/getAllPosts';
import useThrottle from './helpers/useThrottle';
import { throttle } from 'lodash';
import { debounce } from 'lodash';

export default function Home() {
  const [scrollReset, didScrollReset] = useState(false);
  const [cursorShown, isCursorShown] = useState(false);
  const [mousePositionDocument, setmousePositionDocument] = useState({ x: null, y: null });
  const [mousePositionScreen, setmousePositionScreen] = useState({ x: null, y: null });
  const [cursorTitle, setCursorTitle] = useState<string | null>(null);
  const [cursorSubtitle, setCursorSubtitle] = useState<string | null>(null);
  const [cursorDate, setCursorDate] = useState<string | null>(null);
  const [cursorID, setCursorID] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const [mainHeight, setMainHeight] = useState<number | undefined>(undefined);
  // const [scrollIncrement, setScrollIncrement] = useState(0);
  const [scrollTrigger, setScrollTriger] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<string | null>(null)
  const scrollIncrement = useRef<number>(0);

  // const [scrollY, setScrollY] = useState<number>(0);
  // const [prevScrollY, setPrevScrollY] = useState<number>(0);
  // const prevScrollY = useRef<number>(0);
  const scrollY = useRef(0)

  const posts = getAllPosts();

  const blogList = useRef<HTMLDivElement>(null);
  const postCardHeight = useRef<number | null>(null);


  // const scroll = () => {
  //   // prevScrollY.current = scrollY;
  //   // setPrevScrollY(scrollY)
  //   // setScrollY(Math.floor(window.scrollY))
  //   prevScrollY.current = scrollY.current
  //   scrollY.current = Math.floor(window.scrollY);
  //   if(scrollY > prevScrollY) {
  //     // console.log(scrollIncrement)
  //     // window.scroll(0, window.outerHeight * scrollIncrement)
  //     // setScrollIncrement(scrollIncrement + 1)
  //   }
  //   console.log(prevScrollY.current, scrollY.current)

  // }

  // const scrollDirection = useThrottle(() => {
  //   scroll()
  // }, 500)

  useEffect(() => {
    const targetDiv = blogList?.current;

    if (!targetDiv) return;
    const observer = new ResizeObserver(() => {
      postCardHeight.current = targetDiv.clientHeight;
    });
    observer.observe(targetDiv)
    return () => { observer.disconnect() };
  }, [blogList.current])

  useEffect(() => {
    if (!scrollReset) {
      window.scroll(0, 0)
      didScrollReset(true)
    };
  }, [])

  let scrollTimeout: string | number | NodeJS.Timeout | undefined = undefined;
  let wheelTimeout: string | number | NodeJS.Timeout | undefined = undefined;

  // const [flag, setFlag]= useState<boolean>(true);
  const wheelFlag = useRef<boolean>(true);
  const direction = useRef<string | null>(null)

  useEffect(() => {
 
    const wheel = (e: any) => {
      e.preventDefault();
      if (wheelFlag.current) {
        // console.log("START scrolling")
        if (e.deltaY > 0 && scrollIncrement.current < posts.length) {
          window.scroll(0, window.outerHeight * Math.min(scrollIncrement.current + 1, posts.length))
          scrollIncrement.current = (Math.min(scrollIncrement.current + 1, posts.length))
          direction.current = "down";
          wheelFlag.current = false
        }
        else if (e.deltaY < 0 && scrollIncrement.current > 0) {
          direction.current = "up";
          window.scroll(0, window.outerHeight * Math.max(scrollIncrement.current - 1, 0))
          scrollIncrement.current = (Math.max(scrollIncrement.current - 1, 0))

          wheelFlag.current = false
        }
        // console.log(direction.current)
      };
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(function () {
        // console.log("END wheel ended")
        wheelFlag.current = true;
      }, 300)
    }
     

    // const scrollEvent = (e : any) => {
    //   e.preventDefault();
    //   clearTimeout(scrollTimeout);
    //   scrollTimeout = setTimeout(function () {
    //     console.log("END scroll ended")
    //     wheelFlag.current = true;
    //   }, 100)
    // }


    window.addEventListener("wheel", wheel, {passive: false})
    // window.addEventListener('scroll', scrollEvent, {passive: false});
    return () => {
      window.removeEventListener("wheel", wheel)
      // window.removeEventListener('scroll', scrollEvent)
    }
  }, [scrollIncrement.current, wheelFlag.current])

  //   useEffect(() => {
  //     console.log("running")
  //     let scrollEvent = () => {
  //       clearTimeout(scrollTimeout);
  //       scrollTimeout = setTimeout(function() {
  //         console.log("scroll ended")
  //         if (scrollIncrement !== null && blogList.current && scrollTrigger !== null && scrollDirection === "down") {
  //           setScrollIncrement(Math.min(scrollIncrement + 1, posts.length - 1));
  //         }
  //         if (scrollIncrement !== null && blogList.current && scrollTrigger !== null && scrollDirection === "up") {
  //           setScrollIncrement(Math.max(scrollIncrement - 1, 0));
  //         }
  //   }, 100);
  // }
  //       window.addEventListener('scroll', scrollEvent);

  //     if (scrollIncrement !== null && blogList.current && scrollTrigger !== null && scrollDirection === "down") {
  //       console.log(Math.min(scrollIncrement + 1, posts.length - 1));
  //       console.log('posts ', posts.length - 1) 
  //       blogList.current.children[Math.min(scrollIncrement + 1, posts.length - 1)].scrollIntoView({behavior: "smooth", block: "center"})
  //     }
  //     if (scrollIncrement !== null && blogList.current && scrollTrigger !== null && scrollDirection === "up") {
  //       console.log(Math.max(scrollIncrement - 1, 0)); 
  //       blogList.current.children[Math.max(scrollIncrement - 1, 0)].scrollIntoView({behavior: "smooth", block: "center"})
  //     }

  //     return () => {window.removeEventListener('scroll', scrollEvent)}
  //   },[scrollTrigger, scrollDirection, setScrollIncrement])

  useEffect(() => {
    // console.log(prevScrollY.current, scrollY.current)

    const scroll = (e: any) => {
      console.log('running')
      let interval = setInterval(() => {
        // prevScrollY.current = scrollY.current
        scrollY.current = Math.floor(window.scrollY);
        console.log("curr scroll: ", scrollY)

      }, 500)
      return clearInterval(interval)
    }

    // let wheelTimeout: string | number | NodeJS.Timeout | undefined = undefined;

    // const wheel = (e: any) => {
    //   // clearTimeout(wheelTimeout)

    //   // wheelTimeout = setTimeout(() => {
    //     if (scrollIncrement !== null && postCardHeight && postCardHeight.current) {
    //       if (e.deltaY > 0) {
    //         // setScrollIncrement(Math.min(scrollIncrement + 1, posts.length - 1));
    //         setScrollTriger(!scrollTrigger)
    //         setScrollDirection("down")
    //         // console.log(scrollIncrement)
    //         // console.log(scrollIncrement.current * postCardHeight.current)
    //         // window.scroll(0, scrollIncrement.current * postCardHeight.current)
    //       } else {
    //         // setScrollIncrement(Math.max(scrollIncrement - 1, 0));
    //         setScrollTriger(!scrollTrigger)
    //         setScrollDirection("up")
    //         // console.log(scrollIncrement)
    //         // console.log(scrollIncrement.current * postCardHeight.current)
    //         // window.scroll(0, scrollIncrement.current * postCardHeight.current)
    //       }
    //     }
    //   // }, 300)
    // }

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
    // window.addEventListener("wheel", wheel)
    // window.addEventListener("scroll", scroll)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      // window.removeEventListener("wheel", wheel)
      // window.removeEventListener("scroll", scroll)
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
              transform: `translate3d(${-(mousePositionScreen.x ? mousePositionScreen.x / 2 : 0)}px, 
              ${-(mousePositionScreen.y ? mousePositionScreen.y / 2 : 0) - (scrollY.current * 2)}px, 0)`
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
        </div>
      </main>

      <footer className={classes.footer}>
        <About />
      </footer>
    </>
  )
}
