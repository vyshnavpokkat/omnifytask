import React, { useEffect, useMemo, useState } from 'react';
import { FilterModal } from './FilterModal';
import { EditColumnModal } from './EditColumnModal';
import { useRecoilState } from 'recoil';
import { clientSearchParam, dataCount, filterByButton, filterTableData, scheduleDateState, serviceSearchParam, tagSearchParam } from '@/state/atoms';
import Image from 'next/image';


export const Filters: React.FC = () => {
    const [tableData, setTableData] = useRecoilState(filterTableData);
    const [allWaitlist, setAllWaitList] = useState(tableData);
    const [searchQuery, setSearchQuery] = useState<string>('');
    // const [nameSearchParam, setNameSearchParam] = useRecoilState(clientSearchParam);
    const [scheduleDates, setScheduleDates] = useRecoilState(scheduleDateState);
    const [nameSearchParam, setNameSearchParam] = useRecoilState(clientSearchParam);
    const [serviceParam, setServiceParam] = useRecoilState(serviceSearchParam);
    const [tagParam, setTagParam] = useRecoilState(tagSearchParam);
    const [filterButtonData, setFilterButtonData] = useRecoilState(filterByButton);
    const [dataCounts]=useRecoilState(dataCount)

    const resetFilters = () => {
        setScheduleDates({ startDate: null, endDate: null });
        setNameSearchParam('');
        setServiceParam('');
        setTagParam({ serviceType: 'all', serviceStatus: 'all' });
        setFilterButtonData("All Waitlist")
    };

    const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNameSearchParam(value); // Update Recoil state with trimmed value
    };

    const handleButtonFilters = (label: string) => {
        label === "All Waitlist" ?
            resetFilters() :
            setFilterButtonData(label)
    }

    const renderFilterItem = (label: string, count: number) => (
        <div className={`w-full px-1 sm:px-2 py-2 text-xs md:text-sm font-medium text-gray-900 border rounded-lg hover:bg-primary focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white cursor-pointer
        ${filterButtonData === label ? 'bg-primary' : 'bg-transparent'}`}
            onClick={() => handleButtonFilters(label)}>
            <span className='font-semibold'>{label} </span><span className='font-normal'>{count}</span>
        </div>
    );

    const peopleSearchContent = () => (
        <div className='p-3 pl-0'>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search"
                    className="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Search client"
                    required
                    onChange={handleNameFilter}
                    value={nameSearchParam} // Bind the input value to Recoil state
                />
            </div>
        </div>
    );

    return (
        <div className='bg-white sticky top-0 z-10 p-3 border-t-12 border-primary'>
            <h4 className="ml-5 text-xl sm:text-2xl md:text-3xl font-bold leading-none tracking-tight text-primary-text">Waitlist</h4>
            <div className="inline-flex flex-row w-full gap-2 mt-3 mb-2 text-center">
                {renderFilterItem('All Waitlist', dataCounts.allWaitlist)}
                {renderFilterItem('Newly Added', dataCounts.newlyAdded)}
                {renderFilterItem('Leads', dataCounts.leads)}
            </div>
            <div className="relative inline-block md:inline-flex flex-row w-full gap-2">
                <FilterModal />
                <div className='flex gap-2 ml-auto items-center'>
                    {peopleSearchContent()}
                    <div className='flex gap-5 items-center'>
                        <Image width={20} height={20} src='assets/ic_search_refresh.svg'
                            className="w-10 h-10 cursor-pointer"
                            alt="Refresh Icon"
                            onClick={resetFilters}
                        />
                        <EditColumnModal />
                        <Image width={20} height={20} src='assets/ic_search_download.svg' className="w-10 h-10 cursor-pointer hidden md:block" alt="Download Icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}
