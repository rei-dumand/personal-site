'use client';
import classes from './page.module.css';
import About from '../about/page';
import Link from 'next/link';
import { allPosts } from 'contentlayer/generated';
import { compareAsc } from 'date-fns';
import { useState, useEffect } from 'react';


export default function Archive() {

    const posts = allPosts.sort((a, b) => {
        return compareAsc(new Date(a.date), new Date(b.date))
    })

    return (

        <main className={classes.main}>

            <table className={classes.table}>

                {posts.map((post, index) => {
                    let postID = (() => {
                        let res = String(index + 1)
                        while (res.length < 3) res = 0 + res;
                        return res
                    })();

                    return (
                        <tr key={post.url} className={classes.tr}>
                            <Link href={post.url} className={classes.table__link}>
                                <td className={classes.table__id}><h3>{postID}</h3></td>
                                <td className={classes.table__title}><h2>{post.title}</h2></td>
                                <td className={classes.table__subtitle}><h4>{post.subtitle}</h4></td>
                                <td className={classes.table__date}><h5>{post.date}</h5></td>
                            </Link>
                        </tr>

                    )
                })}
            </table>

            {/* <footer className={classes.footer}>
            <About />
          </footer> */}

        </main>
    )
}