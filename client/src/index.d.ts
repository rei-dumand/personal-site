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

export declare type Metadata = {
  id: string,
  title: string
  published: string
  updated: string,
  topics: string[],
}

export declare type Post = {
  metadata: Metadata,
  JSXBlocks: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
}
