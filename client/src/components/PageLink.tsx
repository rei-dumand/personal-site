'use client';

import { useState } from "react";
import classes from '@/app/page.module.css';
import Link from "next/link";

export default function PageLink(props : any) {
    const {postURL} = props;

    return (
        <div>
            <Link scroll={false} href={postURL} className={classes.blog__button} onMouseEnter={() => console.log(postURL)}></Link>
        </div>
    )
}