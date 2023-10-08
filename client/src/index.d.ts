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
  title?: string | null
  published?: string | undefined | null
  updated?: string | undefined | null,
  topics?: PostTopic[] | undefined | null,
  cover?: string | undefined | null,
}

export declare type Post = {
  metadata: Metadata,
  JSXBlocks: (ReactElement<any, string | JSXElementConstructor<any>> | null)[];
}
