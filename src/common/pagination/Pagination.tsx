import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 5) {
                for (let i = 1; i <= maxVisiblePages; i++) {
                    pageNumbers.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push('...');
                for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 2; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
            }
        }

        return pageNumbers.map((page, index) =>
            typeof page === 'number' ? (
                <span
                    key={index}
                    className={`mx-1 cursor-pointer ${page === currentPage ? 'font-bold' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </span>
            ) : (
                <span key={index} className="mx-1">
                    {page}
                </span>
            )
        );
    };

    return (
        <div className="flex text-[#595959] text-lg items-center justify-left pl-5">
            <span className='font-bold mr-5'>
                {itemsPerPage * (currentPage - 1) + 1}-{Math.min(itemsPerPage * currentPage, totalItems)}/{totalItems}
            </span>
            <span
                className={`mx-2 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            >
                &lt;
            </span>
            {renderPageNumbers()}
            <span
                className={`mx-2 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            >
                &gt;
            </span>
        </div>
    );
};

export default Pagination;
