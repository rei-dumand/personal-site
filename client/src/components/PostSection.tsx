// "use client"
import * as React from "react"
import { useMDXComponent as MDXComponent } from "next-contentlayer/hooks"
import Classes from './PostSection.module.css';
import { Bitter, Inter } from '@next/font/google';
import { PostSectionIntro as Intro } from './PostSectionIntro';
import Image from 'next/image';
// import { useEffect, useState } from "react";

const inter = Inter({ subsets: ['latin'] })
const PTSerif = Bitter({ weight: 'variable', style: 'normal', subsets: ['latin'] })

const components = {
  h2: ({ ...props }) => (
    <h2
      className={`${Classes["h2"]} ${inter.className}`}
      {...props}
    />
  ),
  p: ({ ...props }) => (
    <p
      className={`${Classes["p"]}`}
      {...props}
    />
  ),
  Intro: Intro,
  Image: ({ ...props }) => {
    // console.log(props)
    return (
      // <div style={{width: '100%', height: 'clamp(20em, 20vh, 100vh)', margin: '3em 0'}}>
      <div className={Classes["Image__Container"]}>
        {//@ts-expect-error}
          <Image
            className={Classes["Image"]}
            sizes="(max-width: 300px) 100vw, (max-width: 500px) 100vw, 800px,"
            {...props} />}
      </div>
      //</div>
    )
  },
  ImageDot: ({ ...props }) => (
    <div className={Classes["Image__Background"]} style={{ width: '100%', height: 'clamp(2em, 30vw, 100vh)', margin: '3em 0' }}>
      <div style={{ position: 'relative', height: '100%', maxWidth: '800px', margin: 'auto', }}>
        {//@ts-expect-error}
          <Image style={{ padding: '2em 0 2em 0', objectFit: 'cover' }} {...props} />}
      </div>
    </div>
  ),
  // Intro: ({...props}) => <span style={{color: 'blue'}} {...props}/>
}

interface MdxProps {
  code: string | undefined
}

export function PostSection({ code }: MdxProps) {

  const Component = code ? MDXComponent(code) : undefined;
  // const [Component, setComponent] = useState<React.ComponentType<any>>()

  // useEffect(() => {
  //   if (code) {
  //     setComponent(() => MDXComponent(code))
  //   }
  // }, [code])


  return (
    <div className={`${Classes["container"]} ${PTSerif.className}`}>
      {Component && <Component components={components} />}
    </div>
    // code
    //   ?
    //   (() => {
    //     return (
    //       <div className={`${Classes["container"]} ${PTSerif.className}`}>
    //         {Component && <Component components={components} />}
    //       </div>
    //     )
    //   })
    //   :
    //   <></>
  )
}