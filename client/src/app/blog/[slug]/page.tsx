import classes from './page.module.css';
import markdown from './markdown.module.css';
import { getPostBySlug } from '@/lib/api';
// import markdownToHtml from '@/lib/markdownToHtml';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc'

import blog01 from '../../../../_posts/001_building-rei.mdx'

export default async function Post({ params }: { params: { slug: string } }) {
    let index = "";
    for (let i = 0; i < params.slug.length; i++) {
        if (params.slug[i] === "_") {
            index = params.slug.slice(0, i);
            break;
        }
    }

    const post = getPostBySlug(params.slug, ["title", "subtitle", "date", "coverImage", "content"]);
    // const content = await markdownToHtml(post.content || "");

    return (
        <main className={classes.main}>

            <section className={classes.post__frontmatter}>
                <video autoPlay loop muted>
                    <source src={post.coverImage} />
                </video>

                <div className={classes.post__card__text__container}>
                    <h3>{index}</h3>
                    <h2>{post.title}</h2>
                    <h4>{post.subtitle}</h4>
                    <h5>{post.date}</h5>
                </div>
                {/* <Link href={`/blog/${post.slug}`} className={classes.blog__button}></Link> */}
            </section>

            {/* <section
                className={[markdown["markdown"], markdown["container"]].join(" ")}
                dangerouslySetInnerHTML={{ __html: content }}
            /> */}
            <section className={[markdown["markdown"], markdown["container"]].join(" ")}>
                {/* @ts-expect-error Server Component */}
                <MDXRemote source={post.content} />

            </section>




        </main>
    )
}