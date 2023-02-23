import classes from './page.module.css';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { PostSection } from '@/components/PostSection';

export default async function Post({ params }: { params: { slug: string } }) {
    let {slug} = params;
    const post = allPosts.find((post) => post.slugAsParams === slug)
  
    return (
        <main className={classes.main}>

            <section className={classes.post__frontmatter}>
                <video autoPlay loop muted>
                    <source src={post?.coverImage} />
                </video>

                <div className={classes.post__card__text__container}>
                    <h3>hello</h3>
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