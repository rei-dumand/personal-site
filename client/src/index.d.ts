export declare type Cell = {
  id: string
  label: string
}

export declare type Row = {
  id: string | number
  cells: Cell[]
  url?: string
}
