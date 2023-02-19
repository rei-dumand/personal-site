import classes from './page.module.css';
import { getPostBySlug } from '@/lib/api';
import markdownToHtml from '@/lib/markdownToHtml';
import Link from 'next/link';

export default async function Post({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug, ["title", "subtitle", "date", "coverImage", "content"]);
    const content = await markdownToHtml(post.content || "");

    return (
        <main className={classes.main}>

            <section className={classes.post__frontmatter}>
                <video autoPlay loop muted>
                    <source src={post.coverImage} />
                </video>

                <div className={classes.post__card__text__container}>
                    {/* <h3>00{posts.length - index}</h3> */}
                    <h2>{post.title}</h2>
                    <h4>{post.subtitle}</h4>
                    <h5>{post.date}</h5>
                </div>
                <Link href={`/blog/${post.slug}`} className={classes.blog__button}></Link>
            </section>

            <div
            className={classes["markdown"]}
            dangerouslySetInnerHTML={{ __html: content }}
          />



        </main>
    )
}