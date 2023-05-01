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
