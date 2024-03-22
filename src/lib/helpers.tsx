import { CitiesEnum } from "../pages/AllReportsPage/components/CityGeolocation/CityGeolocation";

export const getMockArrayForSkeletons = (value: number) =>
  new Array(value).fill("");

export const getMockFilters = () => ({
  city: CitiesEnum.Moscow,
});
