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
  VideoBlockObjectResponse,
  ImageBlockObjectResponse,
  CodeBlockObjectResponse,
  ColumnBlockObjectResponse,
  ColumnListBlockObjectResponse,
  // TableOfContentsBlockObjectResponse,
  RichTextItemResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  BookmarkBlockObjectResponse,
  LinkPreviewBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import React, { ReactElement } from 'react'
import { Client } from '@notionhq/client'
import 'highlight.js/styles/Pojoaque.css'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import { HTMLElement, parse } from 'node-html-parser'
import parseClasses from '@/utils/parseClasses'
import type { Metadata, Post, TableOfContents } from '../index'

hljs.registerLanguage('javascript', javascript)

export function flattenTextBlock(block: RichTextItemResponse[]) {
  let res = ''
  for (const child of block) {
    res += child.plain_text
  }
  return res
}

type SelectPropertyResponse = {
  id: string;
  name: string;
  color: string;
};

function getPageMetaData(post: PageObjectResponse | PartialPageObjectResponse): Metadata {
  const getTopics = (tags: SelectPropertyResponse[] | null) => {
    const allTags = tags?.map((tag: any) => ({ name: tag.name, color: tag.color })) || []
    return allTags
  }

  if ('parent' in post) {
    return {
      id: post.id,
      title: post.properties.Name.type === 'title' ? post.properties.Name.title[0].plain_text : null,
      published: post.properties.Published.type === 'date' ? post.properties.Published.date?.start : null,
      updated: post.properties.Updated.type === 'date' ? post.properties.Updated.date?.start : null,
      topics: getTopics(post.properties.Topics.type === 'multi_select' ? post.properties.Topics.multi_select : null),
      cover: post.cover?.type === 'external' ? post?.cover?.external?.url : post.cover?.type === 'file' ? post.cover.file.url : null,
      abstract: post.properties.Abstract.type === 'rich_text' ? flattenTextBlock(post.properties.Abstract.rich_text) : null,
    }
  }
  return { id: post.id }
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
    console.warn(e)
    return []
  }
}

// declare type BlockType = 'archived' | 'bookmark' | 'image' | 'video' | 'pdf' | 'file' | 'audio' | 'code' | 'equation' | 'divider' | 'breadcrumb' | 'table_of_contents' | 'link_to_page' | 'table_row' | 'heading_1' | 'heading_2' | 'heading_3' | 'paragraph' | 'bulleted_list_item' | 'numbered_list_item' | 'quote' | 'to_do' | 'toggle' | 'template' | 'callout' | 'synced_block' | 'table'
// declare type RichTextTypes = Heading1BlockObjectResponse | Heading2BlockObjectResponse | ParagraphBlockObjectResponse

function parseRichText(richTextObj: any, idx = 0) {
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

declare type TextBlock = Heading1BlockObjectResponse | Heading2BlockObjectResponse | Heading3BlockObjectResponse
  | ParagraphBlockObjectResponse | QuoteBlockObjectResponse | CalloutBlockObjectResponse
  | NumberedListItemBlockObjectResponse | BulletedListItemBlockObjectResponse

function parseTextBlock(block: TextBlock, blockType: TextBlock['type']) {
  const arr: (ReactElement | string | null)[] = []
  const richTextArr = (block as any)[blockType].rich_text as Array<RichTextItemResponse>
  if (!richTextArr.length) return arr
  for (const [idx, richText] of richTextArr.entries()) {
    const item = parseRichText(richText, idx)
    arr.push(item)
  }
  return arr
}
async function appendChildren(client: Client, block: BlockObjectResponse, tableOfContents: TableOfContents) {
  const bliChildrenBlocks = await getPageBlocks(client, block.id)
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const bliChildrenJSX = await blocksToJSX(client, bliChildrenBlocks, tableOfContents)
  return bliChildrenJSX
}

function parseH1(block: Heading1BlockObjectResponse, tableOfContents: TableOfContents) {
  const { color: h1Color } = block.heading_1
  const h1Content = parseTextBlock(block, 'heading_1')
  tableOfContents.push({ id: block.id, label: flattenTextBlock(block.heading_1.rich_text), header_type: 'heading_1' })
  return <h1 id={block.id} key={block.id} className={parseClasses('h1', h1Color !== 'default' && h1Color)}>{h1Content.map(i => i)}</h1>
}
function parseH2(block: Heading2BlockObjectResponse, tableOfContents: TableOfContents) {
  const { color: h2Color } = block.heading_2
  const h2Content = parseTextBlock(block, 'heading_2')
  tableOfContents.push({ id: block.id, label: flattenTextBlock(block.heading_2.rich_text), header_type: 'heading_2' })
  return <h2 id={block.id} key={block.id} className={parseClasses('h2', h2Color !== 'default' && h2Color)}>{h2Content.map(i => i)}</h2>
}
function parseH3(block: Heading3BlockObjectResponse, tableOfContents: TableOfContents) {
  const { color: h3Color } = block.heading_3
  const h3Content = parseTextBlock(block, 'heading_3')
  tableOfContents.push({ id: block.id, label: flattenTextBlock(block.heading_3.rich_text), header_type: 'heading_3' })
  return <h3 id={block.id} key={block.id} className={parseClasses('h3', h3Color !== 'default' && h3Color)}>{h3Content.map(i => i)}</h3>
}
function parseP(block: ParagraphBlockObjectResponse) {
  const { color: pColor } = block.paragraph
  const pContent = parseTextBlock(block, 'paragraph')
  if (!pContent.length) return null
  return <p key={block.id} className={parseClasses('p', pColor !== 'default' && pColor)}>{pContent.map(i => i)}</p>
}
function parseQuote(block: QuoteBlockObjectResponse) {
  const { color: qColor } = block.quote
  const qContent = parseTextBlock(block, 'quote')
  return <blockquote key={block.id} className={parseClasses('blockquote', qColor !== 'default' ? qColor : undefined)}>{qContent.map(i => i)}</blockquote>
}
async function parseOrderedList(
  notionClient: Client,
  block: NumberedListItemBlockObjectResponse,
  tableOfContents: TableOfContents,
) {
  const { color: nliColor } = block.numbered_list_item
  const nliContent = parseTextBlock(block, 'numbered_list_item')
  if (block.has_children) nliContent.push(...await appendChildren(notionClient, block, tableOfContents))
  return <li key={block.id} className={parseClasses('li', nliColor !== 'default' && nliColor)}>{nliContent.map(i => i)}</li>
}
async function parseUnorderedList(
  notionClient: Client,
  block: BulletedListItemBlockObjectResponse,
  tableOfContents: TableOfContents,
) {
  const { color: bliColor } = block.bulleted_list_item
  const bliContent = parseTextBlock(block, 'bulleted_list_item')
  if (block.has_children) bliContent.push(...await appendChildren(notionClient, block, tableOfContents))
  return <li key={block.id} className={parseClasses('li', bliColor !== 'default' && bliColor)}>{bliContent.map(i => i)}</li>
}
async function parseCallout(notionClient: Client, block: CalloutBlockObjectResponse, tableOfContents: TableOfContents) {
  const { color: calloutColor, icon } = block.callout
  const iconObj = {
    type: icon?.type,
    content: icon?.type === 'emoji' ? icon.emoji : icon?.type === 'external' ? icon.external.url : icon?.type === 'file' ? icon.file.url : undefined,
  }
  const calloutContent = parseTextBlock(block as CalloutBlockObjectResponse, 'callout')
  if (block.has_children) calloutContent.push(...await appendChildren(notionClient, block, tableOfContents))
  const calloutTitle = calloutContent.shift()
  return (
    <div key={block.id} className={parseClasses('callout', calloutColor !== 'default' ? calloutColor : undefined)}>
      {iconObj.type === 'emoji'
        ? (
          <div className="callout__header">
            <span>{iconObj.content}</span>
            <span>{calloutTitle}</span>
          </div>
        )
        : (
          <div className="callout__header">
            <span><img src={iconObj.content} alt={icon?.type} /></span>
            <span>{calloutTitle}</span>
          </div>
        )}
      <div>{calloutContent.map(i => i)}</div>
    </div>
  )
}


async function fetchUrlContent(url: string) {
  const response = await fetch(url, { cache: 'no-store' })
  const htmlContent = await response.text()

  const doc = parse(htmlContent)
  return doc
}
function getDomain(url: string) {
  const [domain, ...slug] = url.replace(/^https?:\/\//, '').split('/')
  return { domain, slug: slug.join('/') }
}
async function getFavicon(url: string, document: HTMLElement) {
  const linkElements = document.querySelectorAll('link[rel~="icon"], link[rel~="apple-touch-icon"], link[rel~="shortcut icon"]')
  const preferredSizes = ['64x64', '48x48', '32x32', 'shortcut icon', null]

  let faviconUrl = null
  for (const size of preferredSizes) {
    for (const linkElement of linkElements) {
      const sizes = linkElement.getAttribute('sizes')
      if (!size || sizes?.includes(size)) {
        faviconUrl = linkElement.getAttribute('href')
        break
      }
    }
    if (faviconUrl) break
  }

  faviconUrl = faviconUrl?.startsWith('/') ? `https://${getDomain(url).domain}/${encodeURIComponent(faviconUrl.slice(1))}` : faviconUrl
  if (faviconUrl) {
    const http = await fetch(faviconUrl, { cache: 'no-store' })
    if (http.status === 404) faviconUrl = null
  }
  return faviconUrl
}

function getTitle(document: HTMLElement) {
  return document.querySelector('title')?.textContent
}
function getDescription(document: HTMLElement) {
  return document.querySelector('meta[name="description"]')?.getAttribute('content')
}
async function buildPreview(url: string, document: HTMLElement) {
  const title = getTitle(document)
  const metaDescription = getDescription(document)
  const faviconUrl = await getFavicon(url, document)

  return (
    <a target='_blank' rel="noopener noreferrer" className='preview-card bookmark' href={url}>
      <div className='bookmark__title'>{title}</div>
      <div className='bookmark__description'>{metaDescription}</div>
      <div className='bookmark__hyperlink'>
        {faviconUrl ? <img width={28} height={28} className='bookmark__favicon' src={faviconUrl} alt="" /> : null}
        <span className='bookmark__url'>{url}</span>
      </div>
    </a>
  )
}

async function buildGithubPreview(url: string, document: HTMLElement) {
  const routePattern = document.querySelector('meta[name="route-pattern"]')?.getAttribute('content')
  const title = getTitle(document)
  const { slug } = getDomain(url)

  // if (routePattern === '/:user_id(.:format)') {
  //   return <>return a user profile</>
  // }
  if (routePattern === '/:user_id/:repository') {

    const sanitisedTitle = title?.replace('GitHub - ', '') || ''
    const [user, repository] = slug.split('/')
    const [, repositoryDescription] = sanitisedTitle.split(':')
    const avatarUrl = `https://github.com/${user}.png`
    return (
      <a target='_blank' rel="noopener noreferrer" className='preview-card preview-link preview-link--github' href={url}>
        {avatarUrl ? <img width={36} height={36} className='preview-link__icon' src={avatarUrl} alt="" /> : null}
        <div>
          <div className='preview-link__title'>{repository}</div>
          <span className='preview-link__user'>{user}</span>
          <div className='preview-link__description'>{repositoryDescription}</div>
        </div>
      </a>
    )
  }
  return buildPreview(url, document)
}

async function parseLinkPreview(block: LinkPreviewBlockObjectResponse) {
  const { url } = block[block.type]
  const { domain } = getDomain(url)

  const document = await fetchUrlContent(url)

  if (domain === 'github.com') return buildGithubPreview(url, document)
  return buildPreview(url, document)
}

async function parseBookmark(block: BookmarkBlockObjectResponse) {
  const { url } = block[block.type]
  const document = await fetchUrlContent(url)
  return buildPreview(url, document)
}


function parseCaption(captionGroup: RichTextItemResponse[]) {
  if (!captionGroup.length) return null
  const res: (ReactElement | string)[] = []
  for (const [idx, richText] of captionGroup.entries()) {
    const item = parseRichText(richText, idx)
    res.push(<div>{item}</div>)
  }
  return res
}
function parseVideo(block: VideoBlockObjectResponse) {
  const { url } = (block.video as any).external
  const youtubeDomains = ['www.youtube.com', 'www.youtube-nocookie.com', 'youtu.be']
  const isYoutubeLink = youtubeDomains.filter(str => ((block as any).video.external.url as string).includes(str))
  const caption = parseCaption(block.video.caption)
  if (isYoutubeLink.length) {
    return (
      <figure className="figure" key={block.id}>
        <iframe
          key={block.id}
          src={`https://www.youtube-nocookie.com/embed/${url.split('/').pop()}`}
          width="100%"
          style={{ aspectRatio: 16 / 9, border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded YouTube Video"
        />
        {caption ? <figcaption key={`${block.id}-caption`}>{caption}</figcaption> : null}
      </figure>
    )
  }
  return <div>Video Format not supported</div>
}
function parseImage(block: ImageBlockObjectResponse) {
  if (block.image.type === 'external') {
    const caption = parseCaption(block.image.caption)
    return (
      <figure className="figure" key={block.id}>
        <img src={block.image.external.url} alt={block.image?.caption[0]?.plain_text || 'image missing caption'} />
        {caption ? <figcaption key={`${block.id}-caption`}>{caption}</figcaption> : null}
      </figure>
    )
  }
  return <div>Internal Images not supported</div>
}
async function parseColumn(
  notionClient: Client,
  block: ColumnBlockObjectResponse,
  tableOfContents: TableOfContents,
) {
  const colContent: (ReactElement | null)[] = []
  if (block.has_children) colContent.push(...await appendChildren(notionClient, block, tableOfContents))
  return <div key={block.id}>{colContent.map(i => i)}</div>
}
async function parseColumnList(
  notionClient: Client,
  block: ColumnListBlockObjectResponse,
  tableOfContents: TableOfContents,
) {
  const colListContent: (ReactElement | null)[] = []
  if (block.has_children) colListContent.push(...await appendChildren(notionClient, block, tableOfContents))
  return <div key={block.id} className={`column-${colListContent.length}`}>{colListContent.map(i => i)}</div>
}
function parseCode(block: CodeBlockObjectResponse) {
  const codeString = block.code.rich_text[0].plain_text
  const { language } = block.code
  const highlightedCode = hljs.highlight(codeString, { language }).value
  return <pre key={block.id} dangerouslySetInnerHTML={{ __html: highlightedCode }} />
}
// function parseTableOfContents(block: TableOfContentsBlockObjectResponse) {
//   return <div id={block.id} key={block.id} className="table-of-contents">To Fill</div>
// }

// let tocId: string
async function blocksToJSX(
  notionClient: Client,
  blockArr: (BlockObjectResponse)[],
  tableOfContents: TableOfContents,
): Promise<(ReactElement | null)[]> {
  const result: (ReactElement | null)[] = []

  let numberedListArr: ReactElement[] = []
  let bulletedListArr: ReactElement[] = []
  for (const [idx, block] of blockArr.entries()) {
    if (block.type !== 'bulleted_list_item' && bulletedListArr.length) {
      result.push(<ul className="ul" key={idx}>{bulletedListArr}</ul>)
      bulletedListArr = []
    }
    if (block.type !== 'numbered_list_item' && numberedListArr.length) {
      result.push(<ol className="ol" key={idx}>{numberedListArr}</ol>)
      numberedListArr = []
    }

    switch (block.type) {
      case 'heading_1':
        result.push(parseH1(block, tableOfContents))
        break
      case 'heading_2':
        result.push(parseH2(block, tableOfContents))
        break
      case 'heading_3':
        result.push(parseH3(block, tableOfContents))
        break
      case 'paragraph':
        result.push(parseP(block))
        break
      case 'quote':
        result.push(parseQuote(block))
        break
      case 'numbered_list_item':
        numberedListArr.push(await parseOrderedList(notionClient, block, tableOfContents))
        break
      case 'bulleted_list_item':
        bulletedListArr.push(await parseUnorderedList(notionClient, block, tableOfContents))
        break
      case 'callout':
        result.push(await parseCallout(notionClient, block, tableOfContents))
        break
      case 'image':
        result.push(parseImage(block))
        break
      case 'video':
        result.push(parseVideo(block))
        break
      case 'divider':
        result.push(<br key={block.id} />)
        break
      case 'column':
        result.push(await parseColumn(notionClient, block, tableOfContents))
        break
      case 'column_list':
        result.push(await parseColumnList(notionClient, block, tableOfContents))
        break
      case 'code':
        result.push(parseCode(block))
        break
      case 'table_of_contents':
        // tocId = block.id
        // result.push(parseTableOfContents(block))
        break
      case 'bookmark':
        result.push(await parseBookmark(block))
        break
      case 'link_preview':
        result.push(await parseLinkPreview(block))
        break
      default:
        result.push(<div className='unsupported'>{block.type} is not currently supported.</div>)
    }
  }

  if (bulletedListArr.length) result.push(<ul className="ul" key={result.length++}>{bulletedListArr}</ul>)
  if (numberedListArr.length) result.push(<ol className="ol" key={result.length++}>{numberedListArr}</ol>)

  return result
}

// function findAndAmendElement(
//   elements: (ReactElement | null)[],
//   targetId: string,
//   newElement: ReactElement,
// ): (ReactElement | null)[] {
//   return elements.map(element => {
//     if (element?.props && element.props.id === targetId) {
//       return React.cloneElement((element as ReactElement), {}, newElement)
//     }
//     if (element?.props && element.props.children) {
//       const newChildren = findAndAmendElement(
//         Array.isArray(element.props.children) ? element.props.children : [element.props.children],
//         targetId,
//         newElement,
//       )
//       return React.cloneElement(element, {}, newChildren)
//     }
//     return element
//   })
// }

export async function getPost(notionClient: Client, slug: string): Promise<Post | null> {
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

    const tableOfContents: TableOfContents = []
    const JSXBlocks = await blocksToJSX(notionClient, blocks, tableOfContents)

    return {
      metadata,
      JSXBlocks,
      tableOfContents,
    }
  }
  return null
}
