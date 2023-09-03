'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import type { Row, Header } from '..'
import parseClasses from '@/utils/parseClasses'

declare type TableProps = {
  rows: Row[]
  headers: Header[]
}

export default function Table(props: TableProps) {
  const { rows, headers } = props

  const [activeRow, setActiveRow] = useState<string | number | null>(rows ? rows[0].id : null)

  return (
    <table className="posts-table">
      <thead>
        <tr>
          {headers && headers.map((header, idx) => (
            <th key={idx}>
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows && rows.map(row => (
          <tr
            key={row.id}
            onFocus={() => { if (activeRow !== row.id) setActiveRow(row.id) }}
            onMouseOver={() => { if (activeRow !== row.id) setActiveRow(row.id) }}
          >
            {row && row.cells.map(cell => {
              const headerKey = headers.map(h => h.key)
              if (headerKey.includes(cell.key)) {
                return (
                  <td
                    key={cell.id}
                    className={parseClasses(
                      activeRow === row.id && 'posts-table__row--active',
                      cell.key && `posts-table__row__${cell.key}`,
                    )}
                  >
                    <Link href={`/${row.url}`}>
                      {cell.label}
                    </Link>
                  </td>
                )
              } return null
            })}

            { activeRow === row.id && (
            <td className="posts-table__row__panel">
              <div>
                <Link href={`/${row.url}`}>
                  <div>
                    {row && row.cells.map((cell, id) => {
                      if (cell.key === 'subtitle') {
                        return (
                          <div key={id} className="posts-table__row__panel__subtitle">
                            {cell.label}
                          </div>
                        )
                      } return null
                    })}
                    {row && row.cells.map((cell, id) => {
                      if (cell.key === 'excerpt') {
                        return (
                          <div key={id} className="posts-table__row__panel__excerpt">
                            {cell.label}
                          </div>
                        )
                      } return null
                    })}
                  </div>
                  {/* <img alt="post" className="image-placeholder" /> */}
                </Link>
              </div>
            </td>
            )}
          </tr>

        ))}
      </tbody>
    </table>
  )
}
