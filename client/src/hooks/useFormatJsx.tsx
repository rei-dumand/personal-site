import { compiler } from 'markdown-to-jsx'
import React from 'react'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/Base16/equilibrium-light.css'
// import 'highlight.js/styles/a11y-dark.css'
import 'highlight.js/styles/atom-one-light.css'

hljs.registerLanguage('javascript', javascript)

type CodeBlockProps = {
  children: JSX.Element;
};

function CodeBlock({ children }: CodeBlockProps) {
  const language = children?.props?.className.replace('lang-', '')
  const highlightedCode = children && hljs.highlight(children.props.children?.toString(), { language }).value

  return (
    <pre>
      <code className={`hljs ${language}`}>{highlightedCode}</code>
    </pre>
  )
}

const options = {
  // overrides: {
  //   pre: {
  //     component: CodeBlock,
  //   },
  // },
}

function convertToYoutubeEmbed(element: JSX.Element) {
  const converted: JSX.Element = { ...element }
  converted.type = 'div'
  const href = converted.props.children.pop()
  converted.props.children.push(React.createElement('iframe', {
    src: `https://www.youtube-nocookie.com/embed/${href.props.href.split('/').pop()}`,
    width: '100%',
    style: { aspectRatio: 16 / 9 },
    frameBorder: '0',
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    allowFullScreen: true,
    title: 'Embedded YouTube Video',
  }))
}

function unwrapImg(element: JSX.Element) {
  const converted: JSX.Element = { ...element }
  converted.type = 'figure'
  converted.props.children.push(
    React.createElement(
      'figcaption',
      {},
      String(converted.props.children[0].props.alt),
    ),
  )
  return converted
}

export function formatJsx(markdownStr: string) {
  const compiled = compiler(markdownStr, options)
  const spread = [...compiled.props.children]
  const res = spread.reduce((result, element) => {
    if (typeof element === 'string') return result

    if (
      element.type === 'p'
      && element.props.children[0].type === 'a'
      && element.props.children[0].props.children[0] === 'image'
    ) {
      const { href } = element.props.children[0].props
      const isYoutube = ['youtube', 'youtu.be'].some(str => href.includes(str))
      if (isYoutube) convertToYoutubeEmbed(element)
    }

    if (
      element.type === 'p'
      && element.props.children[0].type === 'img'
    ) {
      result.push(unwrapImg(element))
      return result
    }

    if (
      element.type === 'pre'
      && element.props.children.type === 'code'
    ) {
      const newCodeBlock = { ...element.props.children }
      console.log(newCodeBlock.props)
      const formatted = hljs.highlight(
        newCodeBlock.props.children,
        { language: newCodeBlock.props.className.replace('lang-', '') },
      ).value
      result.push(<pre dangerouslySetInnerHTML={{ __html: formatted }} />)
      return result
    }

    result.push(element)
    return result
  }, [])

  return res
}
