// "use client"
import classes from './page.module.css';
import { allPosts } from 'contentlayer/generated';
import { PostSection } from '@/components/PostSection';
// import {useEffect, useState} from 'react';
// import {usePathname} from 'next/navigation';

export default function Post({ params }: { params: { slug: string } }) {
    let {slug} = params;
    const post = allPosts.find((post) => post.slugAsParams === slug);

    // console.log(window)

    // let [scrollReset, didScrollReset] = useState(false);
    
    // // const pathname = usePathname()
    // useEffect(() => {
    //     // scrollReset ? window.scroll(0, 0) : undefined;
    //     window.scroll(0,0)
    //     // didScrollReset(true)
    // },[])
  
    return (
        // scrollReset &&
        <main className={classes.main}>
            <section className={classes.post__frontmatter}>
                <video autoPlay loop muted>
                    <source src={post?.coverImage} />
                </video>

                <div className={classes.post__card__text__container}>
                    <h3>.</h3>
                    <h2>{post?.title}</h2>
                    <h4>{post?.subtitle}</h4>
                    <h5>{post?.date}</h5>
                </div>
            </section>
            <section>
                <PostSection code={post?.body.code} />
            </section>
        </main>
    )
}