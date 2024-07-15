import React, { useEffect } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';

function ReactTable({ columns, data, searchValue }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }, // Extract globalFilter from state
    prepareRow,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } }, // Initialize pageSize here
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (searchValue !== globalFilter) {
      setGlobalFilter(searchValue || undefined);
    }
  }, [searchValue]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button className='nav' onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <span className='nav'>
          Page{' '}
          <input
            type="number"
            value={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          /> of {pageOptions.length}
        </span>{' '}
        <span className='nav'>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map(pageSizeOption => (
              <option key={pageSizeOption} value={pageSizeOption}>
                {pageSizeOption} rows
              </option>
            ))}
          </select>
        </span>
        <span className='nav'>
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button>
        </span>
      </div>
    </>
  );
}

export default ReactTable;
