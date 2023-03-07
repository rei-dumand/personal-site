import classes from './page.module.css';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareAsc } from 'date-fns';

export default function Archive() {

    const posts = allPosts.sort((a, b) => {
        return compareAsc(new Date(a.date), new Date(b.date))
    })

    return (

        <main className={classes.main}>

            <table className={classes.table}>
                <tbody>


                    {posts.map((post, index) => {
                        let postID = (() => {
                            let res = String(index + 1)
                            while (res.length < 3) res = 0 + res;
                            return res
                        })();

                        return (
                            <tr key={post.url} className={classes.tr}>
                                <td className={classes.table__id}><Link href={post.url} className={classes.table__link}><h3>{postID}</h3> </Link></td>
                                <td className={classes.table__title}><Link href={post.url} className={classes.table__link}><h2>{post.title}</h2></Link></td>
                                <td className={classes.table__subtitle}><Link href={post.url} className={classes.table__link}><h4>{post.subtitle}</h4></Link></td>
                                <td className={classes.table__date}><Link href={post.url} className={classes.table__link}><h5>{post.date}</h5></Link></td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>

            {/* <footer className={classes.footer}>
            <About />
          </footer> */}

        </main>
    )
}