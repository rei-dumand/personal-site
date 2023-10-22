import { ReactElement } from "react"

export declare type Header = {
  key: string
  label: string
}

export declare type Cell = {
  key: string
  id: string
  label: string
}

export declare type Row = {
  id: string | number
  cells: Cell[]
  url?: string
}

export declare type PostTopic = {
  name: string
  color: string
}

export declare type Metadata = {
  id: string,
  title?: string | undefined | null
  published?: string | undefined | null
  updated?: string | undefined | null,
  topics?: PostTopic[] | undefined | null,
  cover?: string | undefined | null,
  subtitle?: string | undefined | null
  abstract?: string | undefined | null
}

export declare type TableOfContents = { id: string, label: string, header_type: 'heading_1' | 'heading_2' | 'heading_3' }[]

export declare type Post = {
  metadata: Metadata,
  JSXBlocks: (ReactElement<any, string | JSXElementConstructor<any>> | null)[];
  tableOfContents: TableOfContents
}
