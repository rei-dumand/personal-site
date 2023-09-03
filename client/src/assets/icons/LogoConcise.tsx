import React from 'react'

export default function LogoConcise(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50">
      <g id="logo-lightmode-concise-shape" style={props.style} fill={props.style?.fill}>
        <circle cx="97" cy="25" r="25" />
        <circle cx="155" cy="25" r="25" />
        <polygon points="0 0 47 0 68 50 21 50 0 0" />
      </g>
    </svg>
  )
}
