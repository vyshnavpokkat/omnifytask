import { scheduleDateState, clientSearchParam, tagSearchParam, filterTableData, serviceSearchParam, filterByButton } from '@/state/atoms';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

export const FilterModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>('date');
    const [selectedRadio, setSelectedRadio] = useState<string>('search_name');
    const [selectedName, setSelectedName] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [tableData] = useRecoilState(filterTableData);
    const [scheduleDates, setScheduleDates] = useRecoilState(scheduleDateState);
    const [nameSearchParam, setNameSearchParam] = useRecoilState(clientSearchParam);
    const [serviceParam, setServiceParam] = useRecoilState(serviceSearchParam);
    const [tagParam, setTagParam] = useRecoilState(tagSearchParam);
    const [filterButtonData, setFilterButtonData] = useRecoilState(filterByButton);


    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const resetFilters = () => {
        setScheduleDates({ startDate: null, endDate: null });
        setNameSearchParam('');
        setServiceParam('');
        setTagParam({ serviceType: 'all', serviceStatus: 'all' });
        setFilterButtonData("All Waitlist")
        setIsOpen(!isOpen);
    };

    const applyFilters = () => {
        setIsOpen(!isOpen);
    };

    const handleFilterOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;

        // Update Recoil state based on the selected filter option
        if (selectedOption === 'all') {
            setScheduleDates({
                startDate: null,
                endDate: null,
            });
        } else if (selectedOption === 'last30days') {
            // Example: Set dates for last 30 days
            const endDate = new Date(); // Today
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30); // 30 days ago
            setScheduleDates({
                startDate,
                endDate,
            });
        } else if (selectedOption === 'thisMonth') {
            // Example: Set dates for the current month
            const endDate = new Date(); // Today
            const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1); // First day of the current month
            setScheduleDates({
                startDate,
                endDate,
            });
        } else if (selectedOption === 'lastMonth') {
            // Example: Set dates for the last month
            const endDate = new Date(); // Today
            const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1); // First day of the last month
            const lastDay = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate(); // Last day of the last month
            const endDateLastMonth = new Date(endDate.getFullYear(), endDate.getMonth() - 1, lastDay); // Last day of the last month
            setScheduleDates({
                startDate,
                endDate: endDateLastMonth,
            });
        } else if (selectedOption === 'thisQuarter') {
            // Example: Set dates for the current quarter
            const today = new Date();
            const quarter = Math.floor((today.getMonth() / 3));
            const startDate = new Date(today.getFullYear(), quarter * 3, 1);
            const endDate = new Date(today.getFullYear(), quarter * 3 + 3, 0);
            setScheduleDates({
                startDate,
                endDate,
            });
        } else if (selectedOption === 'lastQuarter') {
            // Example: Set dates for 2 quarters ago
            const today = new Date();
            const quarter = Math.floor((today.getMonth() / 3));
            const startDate = new Date(today.getFullYear(), (quarter - 2) * 3, 1);
            const endDate = new Date(today.getFullYear(), (quarter - 2) * 3 + 3, 0);
            setScheduleDates({
                startDate,
                endDate,
            });
        } else if (selectedOption === 'thisYear') {
            // Example: Set dates for this year
            const today = new Date();
            const startDate = new Date(today.getFullYear(), 0, 1);
            const endDate = new Date(today.getFullYear(), 11, 31);
            setScheduleDates({
                startDate,
                endDate,
            });
        } else if (selectedOption === 'lastYear') {
            // Example: Set dates for last year
            const today = new Date();
            const startDate = new Date(today.getFullYear() - 1, 0, 1);
            const endDate = new Date(today.getFullYear() - 1, 11, 31);
            setScheduleDates({
                startDate,
                endDate,
            });
        }
        else if (selectedOption === 'custom') {
            alert("select Date")
        }
    };

    const handleNameCheckboxChange = (name: string) => {
        if (selectedName === name) {
            // If the clicked checkbox is already selected, deselect it
            setSelectedName('');
            setNameSearchParam(''); // Clear nameSearchParam when no checkbox is selected
        } else {
            setSelectedName(name);
            setNameSearchParam(name); // Update nameSearchParam with the selected name
        }
    };

    const handleServiceCheckboxChange = (service: string) => {
        if (selectedService === service) {
            // If the clicked checkbox is already selected, deselect it
            setSelectedService('');
            setServiceParam(''); // Clear nameSearchParam when no checkbox is selected
        } else {
            setSelectedService(service);
            setServiceParam(service); // Update nameSearchParam with the selected name
        }
    };



    const handleTagFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = event.target;
        setTagParam((prevFilters) => ({
            ...prevFilters,
            [id]: value,
        }));
    };

    const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNameSearchParam(value); // Update Recoil state with trimmed value
    };

    const handleServiceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setServiceParam(value); // Update Recoil state with trimmed value
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScheduleDates({
            ...scheduleDates,
            startDate: e.target.value ? new Date(e.target.value) : null,
        });
        // console.log(new Date(e.target.value));
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setScheduleDates({
            ...scheduleDates,
            endDate: e.target.value ? new Date(e.target.value) : null,
        });
        // console.log(new Date(e.target.value));
    };

    const handleFilterChange = (data: string) => {
        setSelectedFilter(data);
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRadio(event.target.value);
    };

    const filteredNameData = tableData.filter(item =>
        item.player.toLowerCase().startsWith(nameSearchParam.toLowerCase())
    );

    const filteredServiceData = tableData.filter((item, index, self) =>
        item.services.toLowerCase().startsWith(serviceParam.toLowerCase()) &&
        index === self.findIndex((t) => t.services === item.services)
    );

    // components

    const scheduledDateContent = () => (
        <div className='p-3'>
            <form>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Show orders for
                </label>
                <select
                    id="countries"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                    onChange={handleFilterOptionChange}
                >
                    <option value="all" selected>All</option>
                    <option value="Custom">Custom</option>
                    <option value="last30days">Last 30 days</option>
                    <option value="thisMonth">This Month</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="thisQuarter">This quarter</option>
                    <option value="lastQuarter">2 quarters ago</option>
                    <option value="thisYear">This Year</option>
                    <option value="lastYear">Last Year</option>
                </select>
            </form>

            <div className='md:flex gap-2'>
                <div>
                    <label className="block mb-0.5 mt-2 text-sm font-medium text-gray-900">From</label>
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-1 "
                            placeholder="Select date"
                            value={scheduleDates.startDate ? scheduleDates.startDate.toISOString().substring(0, 10) : ''}
                            onChange={handleStartDateChange}
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-0.5 mt-2 text-sm font-medium text-gray-900">To</label>
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-1 "
                            placeholder="Select date"
                            value={scheduleDates.endDate ? scheduleDates.endDate.toISOString().substring(0, 10) : ''}
                            onChange={handleEndDateChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const peopleSearchContent = () => (
        <div className='p-3 sm:pl-0'>
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
            {nameSearchParam && (

                <div>
                    <p className='text-xs mb-1 text-gray-300'>Showing {filteredNameData.length} results matching {nameSearchParam}</p>
                    {filteredNameData.map((item) => (
                        <div className='flex items-center' key={item.id}>
                            <input
                                type='checkbox'
                                checked={selectedName === item.player}
                                onChange={() => handleNameCheckboxChange(item.player)}
                                className="mr-2"
                            />
                            <p className='text-sm text-primary-text'>{item.player}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const serviceComponent = () => (
        <div className='p-3 sm:pl-0'>
            <div className="flex pb-3">
                <div className="flex items-center me-4">
                    <input
                        id="inline-radio"
                        type="radio"
                        value="search_name"
                        name="inline-radio-group"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        checked={selectedRadio === 'search_name'}
                        onChange={handleRadioChange}
                    />
                    <label htmlFor="inline-radio" className="ms-2 text-sm font-medium text-gray-900">
                        Search by Name
                    </label>
                </div>
                <div className="flex items-center me-4">
                    <input
                        id="inline-2-radio"
                        type="radio"
                        value="search_tag"
                        name="inline-radio-group"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        checked={selectedRadio === 'search_tag'}
                        onChange={handleRadioChange}
                    />
                    <label htmlFor="inline-2-radio" className="ms-2 text-sm font-medium text-gray-900">
                        Search by Tags
                    </label>
                </div>
            </div>
            {selectedRadio === 'search_name' && searchByName()}
            {selectedRadio === 'search_tag' && searchByTag()}
        </div>
    );

    const searchByName = () => (
        <>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Search Service Name"
                    required
                    onChange={handleServiceFilter} />
            </div>
            {serviceParam && (

                <div>
                    <p className='text-xs mb-1 text-gray-300'>Showing {filteredServiceData.length} results matching {serviceParam}</p>
                    {filteredServiceData.map((item) => (
                        <div className='flex items-center' key={item.id}>
                            <input
                                type='checkbox'
                                checked={selectedService === item.services}
                                onChange={() => handleServiceCheckboxChange(item.services)}
                                className="mr-2"
                            />
                            <p className='text-sm text-primary-text'>{item.services}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );

    const searchByTag = () => (
        <div className="space-y-4">
            <form>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Service Type
                </label>
                <select
                    id="serviceType"
                    value={tagParam.serviceType}
                    onChange={handleTagFilterChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                >
                    <option value="all">Show all service types</option>
                    <option value="class">Class</option>
                    <option value="appointment">Appointment</option>
                    <option value="facility">Facility</option>
                    <option value="classpack">Class Pack</option>
                    <option value="membership">Membership</option>
                    <option value="generalitems">General items</option>
                </select>
            </form>
            <form>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Status
                </label>
                <select
                    id="serviceStatus"
                    value={tagParam.serviceStatus}
                    onChange={handleTagFilterChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                >
                    <option value="all">Show all statuses</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="disable">Disable</option>
                    <option value="draft">Draft</option>
                </select>
            </form>
        </div>
    );

    const getModalContent = () => {
        switch (selectedFilter) {
            case 'date':
                return scheduledDateContent();
            case 'player':
                return peopleSearchContent();
            case 'service':
                return serviceComponent();
            default:
                return null;
        }
    };

    return (
        <div>
            <button
                onClick={toggleModal}
                type="button"
                className="text-gray-900 text-xs md:text-sm w-full md:w-auto mt-1 bg-primary hover:bg-primary-dark border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-5 py-1.5 md:py-2 inline-flex items-center"
            >
                <Image
                    width={20}
                    height={20}
                    src="assets/ic_filter.svg"
                    className="inline-flex items-center justify-center w-3 h-3 md:w-5 md:h-5 mr-1"
                    alt="filter Icon"
                />
                Add Filter
            </button>
            {isOpen && (
                <div className="absolute w-full sm:w-auto sm:top-30 sm:left-65 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-0 shadow-sm border-2 rounded">
                    <div className="relative w-full max-w-xl">
                        <div className="bg-white shadow-lg">
                            <div className="sm:grid grid-cols-[4fr_7fr] gap-2">
                                <div className="bg-primary p-2 sm:min-h-60 border-r-2">
                                    <div onClick={() => handleFilterChange('date')} className={`flex items-center justify-center p-2 text-gray-900 rounded-lg hover:bg-primary-dark group mx-auto cursor-pointer ${selectedFilter == "date" && 'bg-primary-dark'}`}>
                                        <Image
                                            width={20}
                                            height={20}
                                            src="assets/ic_date.svg"
                                            className="w-5 h-5 transition duration-75"
                                            alt="Dashboard Icon"
                                        />
                                        <span className="text-xs sm:text-sm ml-3 text-primary-text font-semibold transition duration-75 flex-1 whitespace-nowrap">
                                            Scheduled Date
                                        </span>
                                    </div>
                                    <div onClick={() => handleFilterChange('player')} className={`flex items-center justify-center p-2 text-gray-900 rounded-lg hover:bg-primary-dark group mx-auto cursor-pointer ${selectedFilter == "player" && 'bg-primary-dark'}`}>
                                        <Image
                                            width={20}
                                            height={20}
                                            src="assets/ic_people.svg"
                                            className="w-5 h-5 transition duration-75"
                                            alt="Dashboard Icon"
                                        />
                                        <span className="text-xs sm:text-sm ml-3 text-primary-text font-semibold transition duration-75 flex-1 whitespace-nowrap">
                                            People
                                        </span>
                                    </div>
                                    <div onClick={() => handleFilterChange('service')} className={`flex items-center justify-center p-2 text-gray-900 rounded-lg hover:bg-primary-dark group mx-auto cursor-pointer ${selectedFilter == "service" && 'bg-primary-dark'}`}>
                                        <Image
                                            width={20}
                                            height={20}
                                            src="assets/ic_service.svg"
                                            className="w-5 h-5 transition duration-75"
                                            alt="Dashboard Icon"
                                        />
                                        <span className="text-xs sm:text-sm ml-3 text-primary-text font-semibold transition duration-75 flex-1 whitespace-nowrap">
                                            Services / Products
                                        </span>
                                    </div>
                                </div>
                                {getModalContent()}
                            </div>
                            <div className="inline-flex gap-2 w-full justify-end border-t-2 p-3" role="group">
                                <button type="button"
                                    className="px-2 py-2 text-xs font-medium text-gray-900 bg-transparent border rounded hover:bg-gray-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                                    onClick={resetFilters}>
                                    Reset To Default
                                </button>
                                <button type="button"
                                    className="px-2 py-2 text-xs font-medium text-white bg-black border rounded hover:bg-gray-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                                    onClick={applyFilters}>
                                    Apply
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

