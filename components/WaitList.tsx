import React, { useState, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tableColFilter, tableRowCount } from '@/state/atoms';
import { combinedFilter } from '@/state/selectors';
import { Filters } from './Filters';
import { Pagination } from './Pagination';
import Image from 'next/image';

export const Waitlist: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useRecoilState(tableRowCount);
    // const [tableData] = useRecoilState(filterTableData);
    const activeColumn = useRecoilValue(tableColFilter);
    const filteredData = useRecoilValue(combinedFilter);

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Memoized current items based on pagination
    const currentItems = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return filteredData.slice(indexOfFirstItem, indexOfLastItem);
    }, [currentPage, itemsPerPage, filteredData]);

    // Headers configuration
    const headers = [
        { name: 'Order Created On', icon: 'assets/ic_tbl_create.svg' },
        { name: 'Player', icon: 'assets/ic_tbl_player.svg' },
        { name: 'Status', icon: 'assets/ic_tbl_status.svg' },
        { name: 'Email', icon: 'assets/ic_tbl_hash.svg' },
        { name: 'Player Phone', icon: 'assets/ic_tbl_hash.svg' },
        { name: 'Service', icon: 'assets/ic_tbl_hash.svg' },
        { name: 'Scheduled', icon: 'assets/ic_tbl_schedule.svg' },
    ];

    // Render table content based on current items
    const renderTableContent = () => (
        
        <div className='px-2 bg-white' data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <div className="relative overflow-auto w-full mx-auto bg-white border rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr className="text-center">
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className={`px-6 py-3 text-tbl-head-text ${activeColumn.includes(header.name) ? '' : 'hidden'
                                        }`}
                                >
                                    <div className="flex items-center justify-center">
                                        {activeColumn.includes(header.name) && (
                                            <>
                                                <Image
                                                    width={20}
                                                    height={20}
                                                    src={header.icon}
                                                    className="w-4 h-4 transition duration-75 mr-2"
                                                    alt="Icon"
                                                />
                                                <span>{header.name}</span>
                                            </>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-3 py-2">
                                    <div className="flex items-center">
                                        <input
                                            id={`checkbox-table-search-${index}`}
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </td>
                                {activeColumn.includes('Order Created On') && <td className="px-3 py-2 text-center">{item.createdOn}</td>}
                                {activeColumn.includes('Player') && <td className="px-3 py-2 text-center">{item.player}</td>}
                                {activeColumn.includes('Status') && (
                                    <td className="px-3 py-2 text-center">
                                        {item.status === 'active' && (
                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-1 py-0.5 rounded-full">
                                                • Active
                                            </span>
                                        )}
                                        {item.status === 'inactive' && (
                                            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-1.5 py-0.5 rounded-full">
                                                • Inactive
                                            </span>
                                        )}
                                        {item.status === 'lead' && (
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-1 py-0.5 rounded-full">
                                                • Lead
                                            </span>
                                        )}
                                    </td>
                                )}
                                {activeColumn.includes('Email') && <td className="px-3 py-2 text-center">{item.email}</td>}
                                {activeColumn.includes('Player Phone') && <td className="px-3 py-2 text-center">{item.playerPhone}</td>}
                                {activeColumn.includes('Service') && <td className="px-3 py-2 text-center">{item.services}</td>}
                                {activeColumn.includes('Scheduled') && <td className="px-3 py-2 text-center">{item.scheduled}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <>
            <Filters />
            {renderTableContent()}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredData.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />
        </>
    );
};

