import Link from 'next/link'
import React from 'react'
import type { Row } from '..'

declare type TableProps = {
  rows: Row[]
  headers: string[]
}

export default function Table(props: TableProps) {
  const { rows, headers } = props

  return (
    <table className="table-posts">
      <thead>
        <tr>
          {headers && headers.map((header, idx) => (
            <th key={idx}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows && rows.map(row => (
          <tr key={row.id}>
            {row.cells && row.cells.map(cell => (
              <td key={cell.id}>
                <Link href={`/${row.url}`}>
                  {cell.label}
                </Link>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
