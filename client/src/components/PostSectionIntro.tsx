import React from 'react'
import Classes from './PostSection.module.css'

type Props = {
  children: {
    type: Function,
    props: {
      children: String
    }
  }
}

export function PostSectionIntro(props: Props) {
  return (
    <div
      className={`${Classes.intro}`}
    >
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
