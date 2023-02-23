import * as React from "react"
import Classes from './PostSection.module.css';
import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

type props = {
    children: {
        type: Function,
        props: {
            children: String
          }
        }
}

export function PostSectionIntro(props: props) {
    return (
        <div
            className={`${Classes["intro"]} ${inter.className}`}
            {...props.children.props} />
    )
}
