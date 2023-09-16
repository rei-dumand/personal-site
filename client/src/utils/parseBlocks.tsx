import React, { ReactElement } from 'react'
import {
  ParagraphBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  CalloutBlockObjectResponse,
  QuoteBlockObjectResponse,
  VideoBlockObjectResponse,
  ImageBlockObjectResponse,
  CodeBlockObjectResponse,
  ColumnBlockObjectResponse,
  ColumnListBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { Client } from '@notionhq/client'
import hljs from 'highlight.js'
import parseClasses from './parseClasses'
import { blocksToJSX } from './notion'

export async function appendChildren(client: Client, block: BlockObjectResponse) {
  const bliChildrenBlocks = await getPageBlocks(client, block.id)
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const bliChildrenJSX = await blocksToJSX(client, bliChildrenBlocks)
  return bliChildrenJSX
}

export function parseRichText(richTextObj: any, idx = 0) {
  let item: ReactElement | string = richTextObj.plain_text
  const { color } = richTextObj.annotations
  if (richTextObj.annotations.code) item = <code key={`${idx}-c`} className={color}>{item}</code>
  if (richTextObj.annotations.bold) item = <b key={`${idx}-b`} className={color}>{item}</b>
  if (richTextObj.annotations.italic) item = <i key={`${idx}-i`} className={color}>{item}</i>
  if (richTextObj.annotations.strikethrough) item = <s key={`${idx}-s`} className={color}>{item}</s>
  if (richTextObj.annotations.underline) item = <u key={`${idx}-u`} className={color}>{item}</u>
  if (richTextObj.href) item = <a key={`${idx}-a`} href={richTextObj.href}>{item}</a>
  return item
}

export function parseTextBlock(block: any, blockType: string) {
  const arr: (ReactElement | string)[] = []
  for (const [idx, richText] of block[blockType].rich_text.entries()) {
    const item = parseRichText(richText, idx)
    arr.push(item)
  }
  return arr
}

export function parseH1(block: Heading1BlockObjectResponse) {
  const { color: h1Color } = block.heading_1
  const h1Content = parseTextBlock(block, 'heading_1')
  return <h1 key={block.id} className={parseClasses('h1', h1Color !== 'default' && h1Color)}>{h1Content.map(i => i)}</h1>
}
export function parseH2(block: Heading2BlockObjectResponse) {
  const { color: h2Color } = block.heading_2
  const h2Content = parseTextBlock(block, 'heading_2')
  return <h2 key={block.id} className={parseClasses('h2', h2Color !== 'default' && h2Color)}>{h2Content.map(i => i)}</h2>
}
export function parseH3(block: Heading3BlockObjectResponse) {
  const { color: h3Color } = block.heading_3
  const h3Content = parseTextBlock(block, 'heading_3')
  return <h3 key={block.id} className={parseClasses('h3', h3Color !== 'default' && h3Color)}>{h3Content.map(i => i)}</h3>
}
export function parseP(block: ParagraphBlockObjectResponse) {
  const { color: pColor } = block.paragraph
  const pContent = parseTextBlock(block, 'paragraph')
  return <p key={block.id} className={parseClasses('p', pColor !== 'default' && pColor)}>{pContent.map(i => i)}</p>
}
export function parseQuote(block: QuoteBlockObjectResponse) {
  const { color: qColor } = block.quote
  const qContent = parseTextBlock(block, 'quote')
  return <blockquote key={block.id} className={parseClasses('blockquote', qColor !== 'default' ? qColor : undefined)}>{qContent.map(i => i)}</blockquote>
}
export async function parseOrderedList(notionClient: Client, block: NumberedListItemBlockObjectResponse) {
  const { color: nliColor } = block.numbered_list_item
  const nliContent = parseTextBlock(block, 'numbered_list_item')
  if (block.has_children) nliContent.push(...await appendChildren(notionClient, block))
  return <li key={block.id} className={parseClasses('li', nliColor !== 'default' && nliColor)}>{nliContent.map(i => i)}</li>
}
export async function parseUnorderedList(notionClient: Client, block: BulletedListItemBlockObjectResponse) {
  const { color: bliColor } = block.bulleted_list_item
  const bliContent = parseTextBlock(block, 'bulleted_list_item')
  if (block.has_children) bliContent.push(...await appendChildren(notionClient, block))
  return <li key={block.id} className={parseClasses('li', bliColor !== 'default' && bliColor)}>{bliContent.map(i => i)}</li>
}
export async function parseCallout(notionClient: Client, block: CalloutBlockObjectResponse) {
  const { color: calloutColor, icon } = block.callout
  const iconObj = {
    type: icon?.type,
    content: icon?.type === 'emoji' ? icon.emoji : icon?.type === 'external' ? icon.external.url : icon?.type === 'file' ? icon.file.url : undefined,
  }
  const calloutContent = parseTextBlock(block as CalloutBlockObjectResponse, 'callout')
  if (block.has_children) calloutContent.push(...await appendChildren(notionClient, block))
  const calloutTitle = calloutContent.shift()
  return (
    <div key={block.id} className={parseClasses('callout', calloutColor !== 'default' ? calloutColor : undefined)}>
      {iconObj.type === 'emoji'
        ? (
          <div>
            <span>{iconObj.content}</span>
            <span>{calloutTitle}</span>
          </div>
        )
        : (
          <div>
            <span><img src={iconObj.content} alt={icon?.type} /></span>
            <span>{calloutTitle}</span>
          </div>
        )}
      <div>{calloutContent.map(i => i)}</div>
    </div>
  )
}
export function parseVideo(block: VideoBlockObjectResponse) {
  const { url } = (block.video as any).external
  const youtubeDomains = ['www.youtube.com', 'www.youtube-nocookie.com', 'youtu.be']
  const isYoutubeLink = youtubeDomains.filter(str => ((block as any).video.external.url as string).includes(str))
  if (isYoutubeLink.length) {
    return (
      <iframe
        key={block.id}
        src={`https://www.youtube-nocookie.com/embed/${url.split('/').pop()}`}
        width="100%"
        style={{ aspectRatio: 16 / 9, border: 'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
      />
    )
  }
  return <div>Video Format not supported</div>
}
export function parseImage(block: ImageBlockObjectResponse) {
  if (block.image.type === 'external') {
    const caption = parseRichText(block.image.caption[0])
    return (
      <figure className="figure" key={block.id}>
        <img src={block.image.external.url} alt={block.image?.caption[0]?.plain_text || 'image missing caption'} />
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    )
  }
  return <div>Internal Images not supported</div>
}
export async function parseColumn(notionClient: Client, block: ColumnBlockObjectResponse) {
  const colContent: ReactElement[] = []
  if (block.has_children) colContent.push(...await appendChildren(notionClient, block))
  return <div key={block.id}>{colContent.map(i => i)}</div>
}
export async function parseColumnList(notionClient: Client, block: ColumnListBlockObjectResponse) {
  const colListContent: ReactElement[] = []
  if (block.has_children) colListContent.push(...await appendChildren(notionClient, block))
  return <div key={block.id} style={{ display: 'flex' }}>{colListContent.map(i => i)}</div>
}
export function parseCode(block: CodeBlockObjectResponse) {
  const codeString = block.code.rich_text[0].plain_text
  const { language } = block.code
  const highlightedCode = hljs.highlight(codeString, { language }).value
  return <pre key={block.id} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
}
function getPageBlocks(client: Client, id: any) {
  throw new Error('Function not implemented.')
}
