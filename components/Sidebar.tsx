import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { activeState } from '../state/atoms';
import SidebarItem from './SideBarItem';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const Sidebar: React.FC = () => {
    const [activeWindowState, setActiveWindowState] = useRecoilState(activeState);
    const setActiveState = useSetRecoilState(activeState);
    const [timezoneVisible, isTimezoneVisible] = useState(true)
    const router = useRouter()


    const handleSetActiveState = (value: string) => {
        setActiveState((prevActiveState) => ({
            ...prevActiveState,
            active: value,
        }));
    };

    const handleCollapse = () => {
        setActiveState((prevActiveState) => ({
            ...prevActiveState,
            collapse: !prevActiveState.collapse,
        }));
    }

    const renderLogo = () => (
        <div className="my-3 mx-3">
            <div className="flex items-center justify-center text-primary-text group">
                <Image width={20} height={20} src='assets/ic_logo.svg' className="flex-shrink-0 w-7 h-7 cursor-pointer" alt="FlowBite Logo" onClick={handleCollapse} />
                {!activeWindowState.collapse && (
                    <>
                        <span className="flex-1 ml-3 whitespace-nowrap text-xl font-bold">Front•Desk</span>
                        <Image
                            width={20}
                            height={20} src='assets/ic_sidenav_toggle.svg'
                            className="inline-flex items-center justify-center w-5 h-5 cursor-pointer ml-auto"
                            alt="Toggle Sidebar"
                            onClick={handleCollapse}
                        />
                    </>
                )}
            </div>
        </div>
    );

    const renderLocation = () => (
        <div
            className={`flex ${!activeWindowState.collapse ? 'justify-between' : 'justify-center'} p-2 text-gray-900 rounded-lg bg-white shadow-sm cursor-pointer`}
            onClick={() => isTimezoneVisible(!timezoneVisible)}>
            {!activeWindowState.collapse &&
                <span className="ml-3 text-primary-text font-semibold transition duration-75">Bengaluru, KA</span>}
            <Image width={20} height={20} src='assets/ic_location.svg' className="inline-flex items-center justify-center w-5 h-5" alt="Location Icon" />
        </div>
    );

    const renderTimezoneForm = () => (
        <form className={`w-11/12 mx-auto text-gray-900 text-sm bg-dark-box shadow-md ${!activeWindowState.collapse && 'slide-in'}`}>
            {!activeWindowState.collapse && (
                <label className="flex gap-1 justify-center text-lg font-medium text-primary-text bg-dark-box pt-2">
                    <b>8:30 AM</b><span>Tue 20 Jan</span>
                </label>
            )}
            <div className='flex justify-center items-center bg-dark-box transition-all duration-300 ease-in-out'>
                <Image width={20} height={20} src='assets/ic_time_zone.svg' className={`w-5 h-5 ${activeWindowState.collapse ? 'mx-auto' : 'ml-2.5'}`} alt="Time Zone Icon" />
                {!activeWindowState.collapse && (
                    <select id="countries" className="text-md font-semibold text-primary-text p-2.5 bg-transparent outline-none pl-0">
                        <option selected>UTC: +5 hours</option>
                        <option value="US">UTC: +6 hours</option>
                        <option value="CA">UTC: +7 hours</option>
                        <option value="FR">UTC: +8 hours</option>
                        <option value="DE">UTC: +9 hours</option>
                    </select>
                )}
            </div>
        </form>
    );

    const renderSidebarItems = () => (
        <ul className={`space-y-2 font-small mt-4 ${!activeWindowState.collapse && 'slide-in'}`}>
            <SidebarItem
                iconSrc='assets/ic_order.svg'
                label='Orders'
                isActive={activeWindowState.active === 'orders'}
                isCollapsed={activeWindowState.collapse}
                onClick={() => handleSetActiveState('orders')}
            />
            <SidebarItem
                iconSrc='assets/ic_subscription.svg'
                label='Subscriptions'
                isActive={activeWindowState.active === 'subscriptions'}
                isCollapsed={activeWindowState.collapse}
                onClick={() => handleSetActiveState('subscriptions')}
            />
            <SidebarItem
                iconSrc='assets/ic_calender.svg'
                label='Calendar'
                isActive={activeWindowState.active === 'calender'}
                isCollapsed={activeWindowState.collapse}
                onClick={() => handleSetActiveState('calender')}
            />
            <SidebarItem
                iconSrc='assets/ic_waitlist.svg'
                label='Waitlist'
                isActive={activeWindowState.active === 'waitlist'}
                isCollapsed={activeWindowState.collapse}
                onClick={() => handleSetActiveState('waitlist')}
            />
        </ul>
    );

    const renderFooter = () => (
        <div className={`mx-auto pb-5 space-y-2 fixed bottom-0 ${!activeWindowState.collapse && 'slide-in'}`}>
            <div className="flex items-center justify-center p-2 text-gray-900 rounded-lg hover:bg-white hover:shadow-md group mx-auto cursor-pointer">
                <Image width={20} height={20} src='assets/ic_db.svg' className="w-5 h-5 transition duration-75" alt="Dashboard Icon" />
                {!activeWindowState.collapse && (
                    <>
                        <span className="ml-3 text-primary-text font-semibold transition duration-75 flex-1 whitespace-nowrap">Dashboard</span>
                        <Image width={20} height={20} src='assets/ic_db_secondary.svg' className="w-5 h-5 transition duration-75" alt="Dashboard Icon" />
                    </>
                )}
            </div>
            <div className="flex justify-between items-center p-2 text-gray-900 rounded-lg bg-white shadow-md group mx-auto cursor-pointer">
                <Image width={20} height={20} src='assets/ic_admin.svg' className="w-9 h-9 transition duration-75" alt="Admin Icon" />
                {!activeWindowState.collapse && (
                    <div className="ml-3 text-left">
                        <p className="text-primary-text font-semibold transition duration-75 flex-1 whitespace-nowrap">Vyshnav P</p>
                        <p className="text-gray-400 transition duration-75 flex-1 whitespace-nowrap">admin@gmail.com</p>
                    </div>
                )}
                {!activeWindowState.collapse && <Image width={20} height={20} src='assets/ic_arrow_bottom.svg' className="w-5 h-5 transition duration-75" alt="Arrow Icon" />}
            </div>
            <div className="flex items-center p-2 text-gray-900 rounded-lg mx-3 cursor-pointer">
                <Image width={20} height={20} src='assets/ic_help.svg' className="w-5 h-5 transition duration-75" alt="Help Center Icon" />
                {!activeWindowState.collapse && (
                    <div className='ml-3 flex-col'>
                        <p className="text-primary-text text-sm font-semibold">Helpcenter</p>
                        <p className="text-primary-text text-sm font-normal">@2024 Omnify.Inc.</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 h-screen transition-transform bg-primary duration-300 hidden sm:block
                ${activeWindowState.collapse ? 'w-20' : 'w-64'}`}
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto">
                {renderLogo()}
                {renderLocation()}
                {timezoneVisible && renderTimezoneForm()}
                {renderSidebarItems()}
                {renderFooter()}
            </div>
        </aside>
    );
};

