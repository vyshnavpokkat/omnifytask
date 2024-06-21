import React from 'react';
import { useRecoilState } from 'recoil';
import { tableRowCount } from '@/state/atoms';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const [itemsPerPage, setItemsPerPage] = useRecoilState(tableRowCount);

    // Function to handle previous page button click
    const handlePreviousPage = () => {
        if (!isFirstPage) {
            onPageChange(currentPage - 1);
        }
    };

    // Function to handle next page button click
    const handleNextPage = () => {
        if (!isLastPage) {
            onPageChange(currentPage + 1);
        }
    };

    // Function to handle input change for items per page
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 8) {
            setItemsPerPage(value);
        }
    };

    // Render page count section
    const renderPageCount = () => (
        <div className="gap-1 items-center hidden md:block">
            <span>Displaying </span>
            <input
                type="number"
                id="number-input"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 w-2/12 text-center cursor-auto"
                value={itemsPerPage}
                onChange={handleInputChange}
                required
            />
            <span> Out of </span><span className='font-semibold'>{150}</span>
        </div>
    );

    // Render pagination buttons
    const renderPaginationButtons = () => {
        if (!totalPages || totalPages < 1) return null; // Handle invalid totalPages

        return (
            <ul className="flex flex-wrap items-center content-center text-sm font-medium text-gray-500 sm:mt-0">
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm">
                        <li>
                            <button
                                onClick={handlePreviousPage}
                                className={`flex items-center justify-center px-3 h-8 ${isFirstPage ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                    } bg-white  rounded-s-lg focus:outline-none`}
                                disabled={isFirstPage}
                            >
                                Previous
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index + 1}>
                                <button
                                    onClick={() => onPageChange(index + 1)}
                                    className={`flex items-center justify-center px-3 mr-1 h-8 ${currentPage === index + 1 ? 'border' : 'text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700'
                                        } rounded focus:outline-none`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={handleNextPage}
                                className={`flex items-center justify-center px-3 h-8 ${isLastPage ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                    } bg-white rounded-e-lg focus:outline-none`}
                                disabled={isLastPage}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </ul>
        );
    };

    return (
        <footer className="w-full sticky bottom-0 bg-white border-y-12 sm:border-t-0 border-primary flex items-end justify-end md:items-center md:justify-between md:p-4">
            {renderPageCount()}
            {renderPaginationButtons()}
        </footer>
    );
};
