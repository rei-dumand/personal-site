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
    // console.log(props.children)
    return (
        <div
            className={`${Classes["intro"]} ${inter.className}`}>
            <span>
                {/* {props.children.map((item, index) => {
                    console.log(index, item)
                    return <h4 key={index}>{item.props.children}</h4>
                })} */}
                {props.children.props.children}
            </span>
        </div>
    )
}
