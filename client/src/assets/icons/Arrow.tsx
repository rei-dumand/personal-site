import React from 'react'

export default function Arrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.48 40.89">
      <g id="arrow-shape" style={props.style} fill={props.style?.fill}>
        <rect x="5.42" y="17.95" width="41.05" height="5" />
        <polygon points="17.68 0 25.03 0 7.34 20.44 25.03 40.89 17.68 40.89 0 20.44 17.68 0" />
      </g>
    </svg>
  )
}