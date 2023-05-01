import React from 'react'

export default function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 225">
      <g id="logo-lightmode-shape" style={props.style} fill={props.style?.fill}>
        <circle cx="167.5" cy="80" r="25" />
        <circle cx="167.5" cy="145" r="25" />
        <polygon points="132.5 170 82.5 170 32.5 55 82.5 55 132.5 170" />
      </g>
    </svg>
  )
}
