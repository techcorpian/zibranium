// tables.js

import React, { useState, useEffect } from 'react';
import { BsSortUp } from "react-icons/bs";
import { BsSortDown } from "react-icons/bs";
import { TbArrowsSort } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import './Tables.css';

const Table = ({ datas, data, columns, setSearchTerm, searchTerm }) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (column) => {
    setSortColumn(column);
    setSortDirection(sortColumn === column ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc');
  };

  const sortedCustomers = sortColumn
? data.sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];
    if (columnA < columnB) return sortDirection === 'asc' ? -1 : 1;
    if (columnA > columnB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  })
: data;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentData = sortedCustomers.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (perPageValue) => {
    setPerPage(perPageValue);
    // Ensure current page remains valid after changing entries per page
    const newTotalPages = Math.ceil(datas.length / perPageValue);
    setCurrentPage(Math.min(currentPage, newTotalPages));
  };

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / perPage);

  return (
    <>
    <div className='flex justify-between mb-5'>
    <div className='mt-1'>
    <label className='border border-sky-300 bg-sky-50 p-2 text-sm rounded-md px-3 text-sky-700 font-light'>
      Show
      <select className='p-1 text-sky-700 font-light bg-transparent border-r border-l border-sky-300 text-md mx-1' value={perPage} onChange={(e) => handlePerPageChange(parseInt(e.target.value, 10))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      Entries
    </label>
    </div>

      {/* Search Box */}
      <div className='hidden md:block relative grow max-w-sm'>
        <div className=''>
        <input
          type="text"
          placeholder="Search..."
          className=' w-full h-[35px] bg-sky-50 text-gray placeholder:text-sky-300 placeholder:font-light outline-0 absolute inside-0 pl-[40px] pr-[10px] py-1 rounded-lg border border-sky-300 border-inherit focus:border-sky-50'
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <AiOutlineSearch className='w-5 h-5 absolute top-[8px] left-[15px] text-sky-700'/>
        </div>
      </div>
    </div>
    <div className='max-h-screen overflow-x-auto'>
      
      <table className='min-w-full border border-sky-300 table-auto'>
        {/* Table headers */}
        <thead>
        <tr className="bg-white">
            {columns.map((column, index) => (
              <th key={index} className={`py-3 px-4 border-b border-r border-sky-300 text-sky-700 hover:bg-sky-100 text-xs font-light uppercase ${column.class}`} onClick={() => handleSort(column.sort)}>
                {column.title}
                <button className='filter_button font-thin ml-1'>
                  {sortColumn === column.sort ? (sortDirection === 'asc' ? <BsSortUp /> : <BsSortDown />) : (<TbArrowsSort />)}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody className='bg-white'>
          {currentData.map((item) => (
            <tr className="hover:bg-sky-50 border border-sky-300 hover:border-sky-800  text-gray-700 "  key={item.id}>
              {columns.map((column) => (
                <td className={`py-1 px-4 border-b border-sky-300 text-sm font-light ${column.class}`} key={column.key}>{item[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className='pagination mt-[14px]'>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        {getPageNumbers().map((page) => (
          <button key={page} onClick={() => handlePageChange(page)} className={currentPage === page ? 'active' : ''}>{page}</button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default Table;
