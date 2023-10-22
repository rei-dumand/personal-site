import React from 'react'

export default function Arrow(props: React.SVGProps<SVGSVGElement> & { variant?: 'N' | 'S' | 'E' | 'W' }) {
  if (props.variant === 'N') {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.89 46.48">
        <g id="arrow-shape-up" style={props.style} fill={props.style?.fill}>
          <rect x="17.94" y="5.42" width="5" height="41.05" />
          <polygon points="40.89 17.68 40.89 25.03 20.45 7.34 0 25.03 0 17.68 20.45 0 40.89 17.68" />
        </g>
      </svg>
    )
  }
  if (props.variant === 'S') {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.89 46.48">
        <g id="arrow-shape-up" style={props.style} fill={props.style?.fill}>
          <rect x="17.95" width="5" height="41.05" />
          <polygon points="0 28.79 0 21.44 20.44 39.13 40.89 21.44 40.89 28.79 20.44 46.48 0 28.79" />
        </g>
      </svg>
    )
  }
  if (props.variant === 'E') {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.48 40.89">
        <g id="arrow-shape-up" style={props.style} fill={props.style?.fill}>
          <rect y="17.94" width="41.05" height="5" />
          <polygon points="28.79 40.89 21.44 40.89 39.13 20.45 21.44 0 28.79 0 46.48 20.45 28.79 40.89" />
        </g>
      </svg>
    )
  }
  if (props.variant === 'W') {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.48 40.89">
        <g id="arrow-shape" style={props.style} fill={props.style?.fill}>
          <rect x="5.42" y="17.95" width="41.05" height="5" />
          <polygon points="17.68 0 25.03 0 7.34 20.44 25.03 40.89 17.68 40.89 0 20.44 17.68 0" />
        </g>
      </svg>
    )
  }

  return ( // Defaults to W
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.48 40.89">
      <g id="arrow-shape" style={props.style} fill={props.style?.fill}>
        <rect x="5.42" y="17.95" width="41.05" height="5" />
        <polygon points="17.68 0 25.03 0 7.34 20.44 25.03 40.89 17.68 40.89 0 20.44 17.68 0" />
      </g>
    </svg>
  )
}
