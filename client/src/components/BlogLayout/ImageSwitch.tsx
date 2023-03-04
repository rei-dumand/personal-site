'use client'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Classes from '@/components/PostSection.module.css';


export default function ImageSwitch({ ...props }) {
    const [switched, hasSwitched] = useState(false);
    const [clicked, hasClicked] = useState(false);
    const { imagebase, imagereveal, alt } = props;

    useEffect(() => {
        console.log(clicked)
        if (clicked) hasSwitched(true)
        else hasSwitched(false)
    }, [clicked])

    return (
        <div className={Classes["Image__Container"]}>
            {switched || clicked ?
            <div className={Classes["Image__Active"]}></div>
            : <></>
            }
         
            <Image
                fill
                src={switched ? imagereveal : imagebase}
                alt={alt}
                className={Classes["Image"]}
                sizes="(max-width: 300px) 100vw, (max-width: 500px) 100vw, 800px,"
                // placeholder="blur"
                onClick={() => hasClicked(!clicked)}
                onMouseEnter={() => !clicked && hasSwitched(true)}
                onMouseLeave={() => !clicked && hasSwitched(false)}
                {...props} />
        </div>
    )
}