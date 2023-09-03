/* eslint-disable no-case-declarations */
import React from 'react'
import { Client } from '@notionhq/client'
import {
  ListBlockChildrenResponse,
  BlockObjectResponse,
  ParagraphBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  CalloutBlockObjectResponse,
  QuoteBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/Pojoaque.css'
import parseClasses from '@/utils/parseClasses'

hljs.registerLanguage('javascript', javascript)

const notion = new Client({ auth: process.env.NOTION_TOKEN })

function getPageMetaData(post: any) {
  const getTopics = (tags: any) => {
    const allTags = tags.map((tag: any) => ({ name: tag.name, color: tag.color }))
    return allTags
  }
  return {
    id: post.id,
    title: post.properties.Name.title[0].plain_text,
    published: post.properties.Published.date?.start,
    updated: post.properties.Updated.date?.start,
    topics: getTopics(post.properties.Topics.multi_select),
  }
}

/**
     * Taken from Notion2Markdown Package
     */
async function getPageBlocks(notionClient: Client, blockId: string, totalPage = null) {
  try {
    const result = []
    let pageCount = 0
    let startCursor
    do {
      const response: ListBlockChildrenResponse = (await notionClient.blocks.children.list({
        start_cursor: startCursor,
        block_id: blockId,
      }))
      result.push(...response.results as BlockObjectResponse[])
      startCursor = response === null || response === undefined ? undefined : response.next_cursor
      pageCount += 1
    }
    while (startCursor != null && (totalPage == null || pageCount < totalPage))
    return result
  } catch (e) {
    console.log(e)
    return []
  }
}

// declare type BlockType = 'archived' | 'bookmark' | 'image' | 'video' | 'pdf' | 'file' | 'audio' | 'code' | 'equation' | 'divider' | 'breadcrumb' | 'table_of_contents' | 'link_to_page' | 'table_row' | 'heading_1' | 'heading_2' | 'heading_3' | 'paragraph' | 'bulleted_list_item' | 'numbered_list_item' | 'quote' | 'to_do' | 'toggle' | 'template' | 'callout' | 'synced_block' | 'table'
// declare type RichTextTypes = Heading1BlockObjectResponse | Heading2BlockObjectResponse | ParagraphBlockObjectResponse

function parseRichText(richTextObj: any, idx = 0) {
  let item: ReactElement | string = richTextObj.plain_text
  const { color } = richTextObj.annotations
  if (richTextObj.annotations.code) item = <code key={`${idx}-c`} className={color !== 'default' ? color : undefined}>{item}</code>
  if (richTextObj.annotations.bold) item = <b key={`${idx}-b`} className={color !== 'default' ? color : undefined}>{item}</b>
  if (richTextObj.annotations.italic) item = <i key={`${idx}-i`} className={color !== 'default' ? color : undefined}>{item}</i>
  if (richTextObj.annotations.strikethrough) item = <s key={`${idx}-s`} className={color !== 'default' ? color : undefined}>{item}</s>
  if (richTextObj.annotations.underline) item = <u key={`${idx}-u`} className={color !== 'default' ? color : undefined}>{item}</u>
  if (richTextObj.href) item = <a key={`${idx}-a`} href={richTextObj.href}>{item}</a>
  return item
}

function parseTextBlock(block: any, blockType: string) {
  const arr: (ReactElement | string)[] = []
  for (const [idx, richText] of block[blockType].rich_text.entries()) {
    const item = parseRichText(richText, idx)
    arr.push(item)
  }
  return arr
}

async function blocksToJSX(
  notionClient: Client,
  blockArr: (BlockObjectResponse)[],
) {
  async function appendChildren(client: Client, block: BlockObjectResponse) {
    const bliChildrenBlocks = await getPageBlocks(client, block.id)
    const bliChildrenJSX = await blocksToJSX(client, bliChildrenBlocks)
    return bliChildrenJSX
  }
  const result: ReactElement[] = []

  let numberedListArr: ReactElement[] = []
  let bulletedListArr: ReactElement[] = []
  for (const [idx, block] of blockArr.entries()) {
    switch (block.type) {
      case 'heading_1':
        const { color: h1Color } = (block as Heading1BlockObjectResponse).heading_1
        const h1Content = parseTextBlock(block as Heading1BlockObjectResponse, 'heading_1')
        result.push(<h1 key={block.id} className={parseClasses(h1Color !== 'default' ? h1Color : undefined)}>{h1Content.map(i => i)}</h1>)
        break

      case 'heading_2':
        const { color: h2Color } = (block as Heading2BlockObjectResponse).heading_2
        const h2Content = parseTextBlock(block as Heading2BlockObjectResponse, 'heading_2')
        result.push(<h2 key={block.id} className={h2Color !== 'default' ? h2Color : undefined}>{h2Content.map(i => i)}</h2>)
        break

      case 'heading_3':
        const { color: h3Color } = (block as Heading3BlockObjectResponse).heading_3
        const h3Content = parseTextBlock(block as Heading3BlockObjectResponse, 'heading_3')
        result.push(<h3 key={block.id} className={h3Color !== 'default' ? h3Color : undefined}>{h3Content.map(i => i)}</h3>)
        break

      case 'paragraph':
        const { color: pColor } = (block as ParagraphBlockObjectResponse).paragraph
        const pContent = parseTextBlock(block as ParagraphBlockObjectResponse, 'paragraph')
        result.push(<p key={block.id} className={pColor !== 'default' ? pColor : undefined}>{pContent.map(i => i)}</p>)
        break

      case 'quote':
        const { color: qColor } = (block as QuoteBlockObjectResponse).quote
        const qContent = parseTextBlock(block as QuoteBlockObjectResponse, 'quote')
        result.push(<blockquote key={block.id} className={qColor !== 'default' ? qColor : undefined}>{qContent.map(i => i)}</blockquote>)
        break

      case 'numbered_list_item':
        const { color: nliColor } = (block as NumberedListItemBlockObjectResponse).numbered_list_item
        const nliContent = parseTextBlock(block as NumberedListItemBlockObjectResponse, 'numbered_list_item')
        if (block.has_children) nliContent.push(...await appendChildren(notionClient, block))
        numberedListArr.push(<li key={block.id} className={nliColor !== 'default' ? nliColor : undefined}>{nliContent.map(i => i)}</li>)
        break

      case 'bulleted_list_item':
        const { color: bliColor } = (block as BulletedListItemBlockObjectResponse).bulleted_list_item
        const bliContent = parseTextBlock(block as BulletedListItemBlockObjectResponse, 'bulleted_list_item')
        if (block.has_children) bliContent.push(...await appendChildren(notionClient, block))
        bulletedListArr.push(<li key={block.id} className={bliColor !== 'default' ? bliColor : undefined}>{bliContent.map(i => i)}</li>)
        break

      case 'callout':
        const { color: calloutColor, icon } = (block as CalloutBlockObjectResponse).callout
        const iconObj = {
          type: icon?.type,
          content: icon?.type === 'emoji' ? icon.emoji : icon?.type === 'external' ? icon.external.url : icon?.type === 'file' ? icon.file.url : undefined,
        }
        const calloutContent = parseTextBlock(block as CalloutBlockObjectResponse, 'callout')
        if (block.has_children) calloutContent.push(...await appendChildren(notionClient, block))
        result.push(
          <div key={block.id} className={calloutColor !== 'default' ? calloutColor : undefined}>
            {iconObj.type === 'emoji' ? <div>{iconObj.content}</div> : <img src={iconObj.content} alt={icon?.type} />}
            <div>{calloutContent.map(i => i)}</div>
          </div>,
        )
        break

      case 'image':
        if (block.image.type === 'external') {
          const caption = parseRichText(block.image.caption[0])
          result.push(
            <figure key={block.id}>
              <img src={block.image.external.url} alt={block.image?.caption[0]?.plain_text || 'image missing caption'} />
              {caption && <figcaption>{caption}</figcaption>}
            </figure>,
          )
        }
        break

      case 'video':
        const { url } = (block.video as any).external
        const youtubeDomains = ['www.youtube.com', 'www.youtube-nocookie.com', 'youtu.be']
        const isYoutubeLink = youtubeDomains.filter(str => ((block as any).video.external.url as string).includes(str))
        if (isYoutubeLink.length) {
          result.push(<iframe
            key={block.id}
            src={`https://www.youtube-nocookie.com/embed/${url.split('/').pop()}`}
            width="100%"
            style={{ aspectRatio: 16 / 9, border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded YouTube Video"
          />)
        }
        break

      case 'divider':
        result.push(<br key={block.id} />)
        break

      case 'column':
        const colContent: ReactElement[] = []
        if (block.has_children) colContent.push(...await appendChildren(notionClient, block))
        result.push(<div key={block.id}>{colContent.map(i => i)}</div>)
        break

      case 'column_list':
        const colListContent: ReactElement[] = []
        if (block.has_children) colListContent.push(...await appendChildren(notionClient, block))
        result.push(<div key={block.id} style={{ display: 'flex' }}>{colListContent.map(i => i)}</div>)
        break

      case 'code':
        const codeString = block.code.rich_text[0].plain_text
        const { language } = block.code
        const highlightedCode = hljs.highlight(codeString, { language }).value
        result.push(
          <pre key={block.id} dangerouslySetInnerHTML={{ __html: highlightedCode }} />,
        )
        break

      default:
        console.log(block)
    }

    if (block.type !== 'bulleted_list_item' && bulletedListArr.length) {
      result.push(<ul key={idx}>{numberedListArr}</ul>)
      bulletedListArr = []
    }
    if (block.type !== 'numbered_list_item' && numberedListArr.length) {
      result.push(<ol key={idx}>{numberedListArr}</ol>)
      numberedListArr = []
    }
  }
  if (bulletedListArr.length) result.push(<ul key={result.length++}>{bulletedListArr}</ul>)
  if (numberedListArr.length) result.push(<ul key={result.length++}>{numberedListArr}</ul>)

  return result
}

async function getPost(notionClient: Client, slug: string) {
  if (process.env.DATABASE_ID) {
    const response = await notionClient.databases.query({
      database_id: process.env.DATABASE_ID,
      filter: {
        property: 'Slug',
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    })
    const page = response.results[0]
    const metadata = getPageMetaData(page)
    const blocks = await getPageBlocks(notionClient, page.id)
    const JSXBlocks = await blocksToJSX(notionClient, blocks)

    return {
      metadata,
      JSXBlocks,
    }
  }
  return null
}

export default async function Notion() {
  const post = await getPost(notion, 'notion-typology')
  return post ? (
    <main className="blog-page">
      {post.JSXBlocks.map(b => b)}
    </main>
  ) : undefined
}
