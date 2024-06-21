import Image from 'next/image';
import React from 'react';

interface SidebarItemProps {
    iconSrc: string;
    label: string;
    isActive: boolean;
    isCollapsed: boolean;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ iconSrc, label, isActive, isCollapsed, onClick }) => (
    <li onClick={onClick}>
        <div className={`flex items-center p-2 text-gray-900 rounded-lg hover:bg-white hover:shadow-md cursor-pointer
            ${isCollapsed ? 'justify-center' : ''} 
            ${isActive ? 'shadow-md bg-white' : ''}`}>
            <Image width={20} height={20} src={iconSrc} className="w-6 h-6 ml-2 transition duration-75" alt={`${label} Icon`} />
            {!isCollapsed && <span className="ml-3 text-primary-text font-semibold transition duration-75">{label}</span>}
        </div>
    </li>
);

export default SidebarItem;
