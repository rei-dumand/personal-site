import classes from './page.module.css';
import { allPosts } from 'contentlayer/generated';
import { PostSection } from '@/components/PostSection';

export default function Post({ params }: { params: { slug: string } }) {
    let {slug} = params;
    const post = allPosts.find((post) => post.slugAsParams === slug);
  
    let postID = ((slug) => {
        let res = "";
        for (let i = 0; i < slug.length; i++) {
            if (slug[i] === "_") break;
            res += slug[i]
        }
        return res
    })(slug);

    return (
        <main className={classes.main}>
            <section className={classes.post__frontmatter}>
                <video autoPlay loop muted>
                    <source src={post?.coverImage} />
                </video>
                <div className={classes.background__grid}></div>

                <div className={classes.text__container}>
                    <h3>{postID}</h3>
                    <h2>{post?.title}</h2>
                    <h4>{post?.subtitle}</h4>
                    <h5>{post?.date}</h5>
                    <p>{post?.excerpt}</p>
                </div>
            </section>
            <section>
                <PostSection code={post?.body.code} />
            </section>
        </main>
    )
}