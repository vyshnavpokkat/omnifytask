import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeState } from '../state/atoms';
import SidebarItem from './SideBarItem';
import Image from 'next/image';

export const MobileNavbar: React.FC = () => {
    const [activeWindowState, setActiveWindowState] = useRecoilState(activeState);
    const setActiveState = useSetRecoilState(activeState);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [timezoneVisible, setTimezoneVisible] = useState(true);

    const handleSetActiveState = (value: string) => {
        setActiveState((prevActiveState) => ({
            ...prevActiveState,
            active: value,
        }));
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const renderLogo = () => (
        <div className="flex items-center justify-between p-3 fixed right-0 top-6">
            <Image width={20} height={20}
                src='assets/ic_sidenav_toggle.svg'
                className="w-7 h-7 cursor-pointer sm:hidden"
                alt="Toggle Menu"
                onClick={toggleMobileMenu}
            />
        </div>
    );

    const renderLocation = () => (
        <div
            className="flex justify-between p-2 text-gray-900 rounded-lg bg-white shadow-sm cursor-pointer transition-all duration-300"
            onClick={() => setTimezoneVisible(!timezoneVisible)}
        >
            <span className="ml-3 text-primary-text font-semibold">Location Name</span>
            <Image width={20} height={20} src='assets/ic_location.svg' className="w-5 h-5" alt="Location Icon" />
        </div>
    );

    const renderTimezoneForm = () => (
        <form className="w-11/12 mx-auto text-gray-900 text-sm bg-dark-box shadow-md transition-all duration-300 ease-in-out">
            <label className="flex gap-1 justify-center text-lg text-center font-medium text-gray-900 bg-dark-box py-2 transition-all duration-300 ease-in-out">
                <b>8:30 AM</b><span>Tue 20 Jan</span>
            </label>
            <div className='flex justify-center items-center bg-dark-box transition-all duration-300 ease-in-out'>
                <Image width={20} height={20} src='assets/ic_time_zone.svg' className="w-6 h-6 ml-2 transition-all duration-300 ease-in-out" alt="Time Zone Icon" />
                <select id="countries" className="text-md p-2.5 bg-transparent outline-none transition-all duration-300 ease-in-out">
                    <option selected>UTC: +5 hours</option>
                    <option value="US">UTC: +6 hours</option>
                    <option value="CA">UTC: +7 hours</option>
                    <option value="FR">UTC: +8 hours</option>
                    <option value="DE">UTC: +9 hours</option>
                </select>
            </div>
        </form>

    );

    const renderNavbarItems = () => (
        <ul className="space-y-2 font-small mt-4">
            <SidebarItem
                iconSrc='assets/ic_order.svg'
                label='Orders'
                isActive={activeWindowState.active === 'orders'}
                isCollapsed={false}
                onClick={() => handleSetActiveState('orders')}
            />
            <SidebarItem
                iconSrc='assets/ic_subscription.svg'
                label='Subscriptions'
                isActive={activeWindowState.active === 'subscriptions'}
                isCollapsed={false}
                onClick={() => handleSetActiveState('subscriptions')}
            />
            <SidebarItem
                iconSrc='assets/ic_calender.svg'
                label='Calendar'
                isActive={activeWindowState.active === 'calender'}
                isCollapsed={false}
                onClick={() => handleSetActiveState('calender')}
            />
            <SidebarItem
                iconSrc='assets/ic_waitlist.svg'
                label='Waitlist'
                isActive={activeWindowState.active === 'waitlist'}
                isCollapsed={false}
                onClick={() => handleSetActiveState('waitlist')}
            />
        </ul>
    );

    const renderFooter = () => (
        <div className="mx-auto pb-5 space-y-2 mt-4">
            <div className="flex items-center justify-center p-2 text-gray-900 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer">
                <Image width={20} height={20} src='assets/ic_db.svg' className="w-5 h-5" alt="Dashboard Icon" />
                <span className="ml-3 text-primary-text font-semibold flex-1 whitespace-nowrap">Dashboard</span>
                <Image width={20} height={20} src='assets/ic_db_secondary.svg' className="w-5 h-5" alt="Dashboard Icon" />
            </div>
            <div className="flex justify-between items-center p-2 text-gray-900 rounded-lg bg-white shadow-md transition-all duration-300 cursor-pointer">
                <div className='flex items-center'>
                    <Image width={20} height={20} src='assets/ic_admin.svg' className="w-9 h-9" alt="Admin Icon" />
                    <div className="ml-3 text-left">
                        <p className="text-primary-text font-semibold flex-1 whitespace-nowrap">Admin Name</p>
                        <p className="text-primary-text flex-1 whitespace-nowrap">admin@gmail.com</p>
                    </div>
                </div>
                <Image width={20} height={20} src='assets/ic_arrow_bottom.svg' className="w-5 h-5" alt="Arrow Icon" />
            </div>
            <div className="flex items-center p-2 text-gray-900 rounded-lg mx-3 cursor-pointer">
                <Image width={20} height={20} src='assets/ic_help.svg' className="w-5 h-5" alt="Help Center Icon" />
                <div className='ml-3 flex-col'>
                    <p className="text-primary-text text-sm font-semibold">Helpcenter</p>
                    <p className="text-primary-text text-sm font-normal">@2024 Omnify.Inc.</p>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent px-4 py-2 sm:hidden">
                {renderLogo()}
            </header>
            <div className={`fixed top-0 left-0 right-0 h-full bg-primary z-40 transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'} sm:hidden`}
                >
                <div className="w-full p-5">
                    <div className="flex items-center justify-center text-primary-text group py-5">
                        <Image width={20} height={20} src='assets/ic_logo.svg' className="flex-shrink-0 w-7 h-7 cursor-pointer" alt="FlowBite Logo" />
                        <span className="flex-1 ml-3 whitespace-nowrap text-xl font-bold">Front•Desk</span>
                    </div>
                    {renderLocation()}
                    {timezoneVisible && renderTimezoneForm()}
                    {renderNavbarItems()}
                    {renderFooter()}
                </div>
            </div>
        </div>
    );
};
