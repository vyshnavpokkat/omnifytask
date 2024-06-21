import { tableColFilter } from '@/state/atoms';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const EditColumnModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCols, setSelectedCols] = useState<string[]>([]);
    const [activeColumn, setActiveColumn] = useRecoilState(tableColFilter);

    useEffect(() => {
        // Set the selectedCols state to the current activeColumn state when the modal opens
        if (isOpen) {
            setSelectedCols(activeColumn);
        }
    }, [isOpen, activeColumn]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (value: string) => {
        setSelectedCols(prevSelectedCols => {
            if (!prevSelectedCols.includes(value)) {
                return [...prevSelectedCols, value];
            } else {
                return prevSelectedCols.filter(item => item !== value);
            }
        });
    };

    const applyFilter = () => {
        setActiveColumn(selectedCols);
        toggleModal();
    };

    const applyReset = () => {
        setActiveColumn(checkboxItems);
        setSelectedCols(checkboxItems);
        toggleModal();
    };

    const checkboxItems = ['Order Created On', 'Player', 'Status', 'Email', 'Player Phone', 'Service', 'Scheduled'];

    return (
        <div>
            <Image width={20} height={20} src='assets/ic_search_columns.svg' className="min-w-10 h-10 cursor-pointer" alt="filter Icon" onClick={toggleModal} />
            {isOpen &&
                <div className="absolute top-35 right-5 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-0 shadow-sm">
                    <div className="relative">
                        <div className="bg-white shadow-lg">
                            <ul className="text-sm font-medium text-gray-900 bg-white border rounded-lg p-3 gap-x-2">
                                <p className='font-semibold text-md px-3'>Edit Columns</p>
                                <p className='text-xs text-gray-500 px-3 pb-2'>Select the columns to rearrange</p>
                                {checkboxItems.map((item, index) => (
                                    <li className="w-full rounded-t-lg mb-2" key={index}>
                                        <div className="flex items-center ps-3">
                                            <input
                                                id={`col-${index}`}
                                                type="checkbox"
                                                value={item}
                                                checked={selectedCols.includes(item)}
                                                className="w-4 h-4 text-black focus:ring-black accent-black bg-gray-100 border-gray-300 rounded"
                                                onChange={(e) => handleCheckboxChange(e.target.value)}
                                            />
                                            <label htmlFor={`col-${index}`} className="w-full py-2 px-2 ms-2 text-sm font-medium text-gray-900 border rounded">
                                                {item}
                                            </label>
                                        </div>
                                    </li>
                                ))}
                                <div className="flex justify-end gap-2 mt-4" role="group">
                                    <button type="button"
                                        onClick={applyReset}
                                        className="px-2 py-2 text-xs font-medium text-gray-900 bg-transparent border rounded hover:bg-gray-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
                                        Reset To Default
                                    </button>
                                    <button type="button"
                                        onClick={applyFilter}
                                        className="px-2 py-2 text-xs font-medium text-white bg-black border rounded hover:bg-gray-600 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
                                        Apply
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};
