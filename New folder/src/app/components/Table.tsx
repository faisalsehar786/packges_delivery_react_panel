import React, { useCallback, useState } from 'react'
import { FaSortDown, FaSortUp } from 'react-icons/fa'

interface DataTableProps {
  value: any[]
  children: React.ReactNode
  onSort: (key: string, order: string) => void
}

const DataTable: React.FC<DataTableProps> = ({ value, children, onSort }) => {
  const [sortKey, setSortKey] = useState('')
  const [sortOrder, setSortOrder] = useState('ASC')

  const handleSort = useCallback(
    (key: string) => {
      const newSortOrder = key === sortKey ? (sortOrder === 'ASC' ? 'DESC' : 'ASC') : 'ASC'
      setSortKey(key)
      setSortOrder(newSortOrder)
      onSort(key, newSortOrder)
    },
    [onSort, sortKey, sortOrder]
  )

  const sortedValue = React.useMemo(() => {
    return value.sort((a, b) => {
      if (sortOrder === 'ASC') {
        return a[sortKey] > b[sortKey] ? 1 : -1
      }
      return a[sortKey] < b[sortKey] ? 1 : -1
    })
  }, [sortOrder, sortKey, value])

  return (
    <div className='table-responsive'>
      <table className='table align-middle gs-0 gy-4'>
        <thead>
          <tr className='fw-bold text-muted bg-light'>
            {React.Children.map(children, (child, index) => {
              if (React.isValidElement(child) && child.type === Column) {
                let className = ''
                if (index === 0) {
                  className = 'ps-4 rounded-start'
                } else if (index === React.Children.count(children) - 1) {
                  className = 'text-end rounded-end px-4'
                }
                return (
                  <th className={className} onClick={() => handleSort(child.props.field)}>
                    {child.props.header}
                    {sortKey === child.props.field && (
                      <>
                        {sortOrder === 'ASC' ? (
                          <FaSortUp className='ms-2 pointer' />
                        ) : (
                          <FaSortDown className='ms-2 pointer' />
                        )}
                      </>
                    )}
                  </th>
                )
              }
              return null
            })}
          </tr>
        </thead>
        <tbody>
          {sortedValue.map((item) => (
            <tr key={item.id}>
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === Column) {
                  return (
                    <td>
                      <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6"'>
                        {child.props.body(item)}
                      </span>
                    </td>
                  )
                }
                return null
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface ColumnProps {
  field?: string
  header?: string
  body?: (data: any) => React.ReactNode
}

const Column: React.FC<ColumnProps> = ({ children }) => {
  return <>{children}</>
}

export { Column, DataTable }
