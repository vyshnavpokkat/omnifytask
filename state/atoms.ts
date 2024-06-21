import { atom } from 'recoil';
import { dummyData } from '@/public/dummy/dummyData';

interface ActiveState {
  active: string;
  collapse: boolean;
}
interface TableDataType {
  id: number;
  createdOn: string;
  player: string;
  status: string;
  email: string;
  playerPhone: string;
  services: string;
  scheduled: string;
  serviceType: string;
  serviceStatus: string;

}[];

interface ScheduleDateState {
  startDate: Date | null;
  endDate: Date | null;
}

interface tagSearchParam {
  serviceType: string;
  serviceStatus: string;
}

interface dataCount {
  allWaitlist: number;
  newlyAdded: number;
  leads: number;
  currentPage:number;
}

const leadCount = dummyData.filter(item => item.status === 'lead').length;

export const activeState = atom<ActiveState>({
  key: 'activeState',
  default: {
    active: 'waitlist',
    collapse: false,
  },
});

export const filterTableData = atom<TableDataType[]>({
  key: 'filterTableData',
  default: dummyData,
})

export const tableRowCount = atom<number>({
  key: 'tableRowCount',
  default: dummyData.length <= 15 ? dummyData.length : 15,
})

export const tableColFilter = atom<string[]>({
  key: 'tableColFilter',
  default: ['Order Created On', 'Player', 'Status', 'Email', 'Player Phone', 'Service', 'Scheduled'],
})

export const scheduleDateState = atom<ScheduleDateState>({
  key: 'scheduleDateState',
  default: {
    startDate: null,
    endDate: null,
  },
});

export const clientSearchParam = atom<string>({
  key: 'clientSearchParam',
  default: '',
})

export const serviceSearchParam = atom<string>({
  key: 'serviceSearchParam',
  default: '',
})

export const tagSearchParam = atom<tagSearchParam>({
  key: 'tagSearchParam',
  default: {
    serviceType: 'all',
    serviceStatus: 'all',
  },
})

export const filterByButton = atom<string>({
  key: 'filterByButton',
  default: "All Waitlist"
})

export const applyFilter = atom<boolean>({
  key: 'applyFilter',
  default: true
})

export const dataCount = atom<dataCount>({
  key: 'dataCount',
  default: {
    allWaitlist: dummyData.length,
    newlyAdded: 10,
    leads: leadCount,
    currentPage:1
  },
})