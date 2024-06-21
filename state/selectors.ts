import { selector } from 'recoil';
import { clientSearchParam, filterByButton, filterTableData, scheduleDateState, serviceSearchParam, tagSearchParam } from './atoms';

export const combinedFilter = selector({
  key: 'combinedFilter',
  get: ({ get }) => {
    const { startDate, endDate } = get(scheduleDateState);
    const nameParam = get(clientSearchParam);
    const serviceParam = get(serviceSearchParam);
    const { serviceType, serviceStatus } = get(tagSearchParam);
    const buttonFilter = get(filterByButton);
    
    let data = get(filterTableData); // Use 'let' since 'data' will be reassigned

    // Apply button filter logic
    switch (buttonFilter) {
      case "Newly Added":
        // Sort by createdOn date in descending order and take the latest 10 entries
        data = [...data].sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()).slice(0, 10);
        break;
      case "Leads":
        data = data.filter(item => item.status === "lead");
        break;
      default:
        break;
    }

    // Filter the data
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.createdOn);

      // Check date range if both dates are provided
      const isDateInRange = (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);

      // Check name filter
      const isNameMatch = !nameParam || item.player.toLowerCase().startsWith(nameParam.toLowerCase());

      // Check service filter
      const isServiceMatch = !serviceParam || item.services.toLowerCase().startsWith(serviceParam.toLowerCase());

      // Check serviceType and serviceStatus filters
      const isServiceTypeMatch = serviceType === 'all' || item.serviceType.toLowerCase() === serviceType.toLowerCase();
      const isServiceStatusMatch = serviceStatus === 'all' || item.serviceStatus.toLowerCase() === serviceStatus.toLowerCase();

      // Return true if all conditions are met
      return isDateInRange && isNameMatch && isServiceMatch && isServiceTypeMatch && isServiceStatusMatch;
    });

    return filteredData;
  },
});
