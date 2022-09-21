import React from 'react';
import './Pagination.css';

function Pagination({nPages, currentPage, setCurrentPage}) {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
        if(currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const previousPage = () => {
        if(currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    return (
        <nav className='pagination'>
            <ul>
                <li className='page-item' onClick={previousPage}><a className='page-link'>Previous</a></li>
                {pageNumbers.map(pageNumber => (
                    <li
                        key={pageNumber}
                        className={`page-item ${currentPage === pageNumber?'active':''}`}
                        onClick={()=>setCurrentPage(pageNumber)}>
                        <a className='page-link'>{pageNumber}</a>
                    </li>
                ))}
                <li className='page-item' onClick={nextPage}><a className='page-link'>Next</a></li>
            </ul>
        </nav>
    )
};

export default Pagination;