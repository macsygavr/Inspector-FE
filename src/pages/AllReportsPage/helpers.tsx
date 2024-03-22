import { CitiesFromUrl } from "../../../pages/reports/[[...city]]";
import { CitiesEnum } from "./components/CityGeolocation/CityGeolocation";
import { FiltersFormValues } from "./components/Filters/Filters";

export const getSearchResultDescription = (value?: string) => {
  const lastNumber = value?.slice(-1);
  const lastTwoNumbers = value?.slice(-2);

  switch (lastTwoNumbers) {
    case "11":
    case "12":
    case "13":
    case "14":
      return `Найдено ${value} объектов`;
  }

  switch (lastNumber) {
    case "0":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return `Найдено ${value} объектов`;

    case "1":
      return `Найден ${value} объект`;

    case "2":
    case "3":
    case "4":
      return `Найдено ${value} объекта`;

    default:
      return "";
  }
};

export const transformFilters = (filters: FiltersFormValues) => {
  return {
    ...filters,
    ...((filters.roomsCount?.length ?? 0) > 0
      ? {
          roomsCount: filters.roomsCount?.map((item) =>
            item === "Студия" ? 0 : Number(item)
          ),
        }
      : {}),
  };
};

export const getCityFromUrl = (city?: string) => {
  switch (city) {
    case CitiesFromUrl.spb:
      return CitiesEnum.StPetersburg;

    case CitiesFromUrl.rostov:
      return CitiesEnum.RostovOnDon;

    case CitiesFromUrl.sochi:
      return CitiesEnum.Sochi;

    case CitiesFromUrl.kazan:
      return CitiesEnum.Kazan;

    case CitiesFromUrl.irkutsk:
      return CitiesEnum.Irkutsk;

    case CitiesFromUrl.habarovsk:
      return CitiesEnum.Habarovsk;

    default:
      return CitiesEnum.Moscow;
  }
};

export const transformCityTitleToCityEnum = (city?: CitiesEnum) => {
  switch (city) {
    case CitiesEnum.StPetersburg:
      return CitiesFromUrl.spb;

    case CitiesEnum.RostovOnDon:
      return CitiesFromUrl.rostov;

    case CitiesEnum.Sochi:
      return CitiesFromUrl.sochi;

    case CitiesEnum.Kazan:
      return CitiesFromUrl.kazan;

    case CitiesEnum.Irkutsk:
      return CitiesFromUrl.irkutsk;

    case CitiesEnum.Habarovsk:
      return CitiesFromUrl.habarovsk;

    default:
      return "";
  }
};
