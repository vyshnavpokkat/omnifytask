import { activeState } from '@/state/atoms';
import React from 'react'
import { useRecoilState } from 'recoil';
import { Error } from './Error';
import { Waitlist } from './WaitList';

export const ContentPanel = () => {
  const [activeWindowState, setActiveWindowState] = useRecoilState(activeState);
  return (
    <div className={`${activeWindowState.collapse === true ? 'sm:ml-20' : 'sm:ml-64'} `}>
      {activeWindowState.active === 'waitlist' && <Waitlist />}
      {activeWindowState.active === 'orders' && <Error />}
      {activeWindowState.active === 'subscriptions' && <Error />}
      {activeWindowState.active === 'calender' && <Error />}
    </div>
  )
}
