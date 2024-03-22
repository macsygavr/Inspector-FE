import React, { FC, useEffect, useState } from "react";
import InputSearch from "../../components/UiKit/InputSearch/InputSearch";
import InputDropDown from "../../components/UiKit/InputDropDown/InputDropDown";
import InputRange from "../../components/UiKit/InputRange/InputRange";
import Button from "../../components/UiKit/Button/Button";
import FilterIcon from "../../assets/Icons/FilterIcon";
import ReportCard from "../../components/ReportCard/ReportCard";
import modalCss from "../AgentPage/components/CardsModal/index.module.css";
import css from "./index.module.css";
import Filters, { FiltersFormValues } from "./components/Filters/Filters";
import CityGeolocation, {
  CitiesEnum,
} from "./components/CityGeolocation/CityGeolocation";
import { useModalState } from "../../hooks/useModalState";
import Pagination from "../../components/UiKit/Pagination/Pagination";
import {
  ReportData,
  SliderValues,
  getAllReportsPlacemarks,
  getReportById,
  getReports,
  getSliderValues,
} from "../../api/reportsApi";
import { getMockArrayForSkeletons } from "../../lib/helpers";
import {
  getCityFromUrl,
  getSearchResultDescription,
  transformCityTitleToCityEnum,
  transformFilters,
} from "./helpers";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useQuery } from "react-query";
import DropDownIcon from "../../assets/Icons/DropDownIcon";
import cn from "classnames";
import { Tooltip } from "antd";
import useCustomMediaQuery from "../../hooks/useCustomMediaQuery";
import { useRouter } from "next/router";
import { PublicRoutes } from "../../routes";
import { getCityForTitle } from "../../../pages/reports/[[...city]]";
import Tabs from "../../components/UiKit/Tabs/Tabs";
import MapIconOn from "../../assets/Icons/MapIconOn";
import MapIconOff from "../../assets/Icons/MapIconOff";
import CardsIconOn from "../../assets/Icons/CardsIconOn";
import CardsIconOff from "../../assets/Icons/CardsIconOff";
import CardsModal from "../AgentPage/components/CardsModal/CardsModal";
import {
  FullscreenControl,
  Map,
  ObjectManager,
  useYMaps,
} from "@pbe/react-yandex-maps";
import MockTabsIcon from "./components/MockTabsIcon";

enum Mode {
  MAP = "MAP",
  CARDS = "CARDS",
}

type Props = {
  city?: string;
};

const AllReportsPage: FC<Props> = ({ city }) => {
  const filtersModal = useModalState();
  const [sliderValues, setSliderValues] = useState<SliderValues | null>(null);
  const [filters, setFilters] = useState<FiltersFormValues>({});
  const [allReports, setAllReports] = useState<ReportData[]>([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [canMakeRequest, setCanMakeRequest] = useState(false);
  const [isFiltered, setIsFiltered] = useState(true);
  const [showMockComponents, setShowMockComponents] = useState(true);
  const [canShowMap, setCanShowMap] = useState(true);
  const [initialSkeleton, setInitialSkeleton] = useState(true);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CitiesEnum>(
    getCityFromUrl(city)
  );
  const [mode, setMode] = useState<Mode>(Mode.CARDS);
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [checkedPlacemark, setCheckedPlacemark] =
    useState<ReportData[] | undefined>();
  const [checkedPlacemarkId, setCheckedPlacemarkId] = useState<number>();
  const [skeletonCardMode, setSkeletonCardMode] = useState(false);
  const [loadedReports, setLoadedReports] = useState<ReportData[]>([]);
  const [mapCenter, setMapCenter] = useState([
    [10, 10],
    [20, 20],
  ]);
  const pageSize = 12;

  const router = useRouter();
  const ymaps = useYMaps(["templateLayoutFactory"]);

  const isMobile = useCustomMediaQuery("(max-width: 462px)");

  const { data: sliderValuesData } = useQuery("sliderValues", getSliderValues);

  const {
    data: allReportsData,
    isFetching,
    error,
    refetch,
  } = useQuery(
    "allReportsData",
    () =>
      getReports({
        pageNumber: pageNumber - 1,
        pageSize,
        filters: transformFilters({ ...filters, city: selectedCity }),
      }),
    {
      enabled: canMakeRequest,
    }
  );

  const { data: allPlacemarksData, refetch: refetchPlacemarks } = useQuery(
    "allReportsPlacemarks",
    () =>
      getAllReportsPlacemarks({
        filters: transformFilters({ ...filters, city: selectedCity }),
      }),
    {
      enabled: canMakeRequest,
    }
  );

  useEffect(() => {
    setCanShowMap(false);
    setTimeout(() => {
      setCanShowMap(true);
    }, 10);
    setCheckedPlacemark(undefined);
    setCheckedPlacemarkId(undefined);
  }, [allPlacemarksData]);

  useEffect(() => {
    if (canMakeRequest) {
      refetch();
      refetchPlacemarks();
      setIsTooltipOpen(false);
    }
  }, [canMakeRequest]);

  useEffect(() => {
    if (sliderValuesData) {
      setSliderValues(sliderValuesData);
    }
  }, [sliderValuesData]);

  useEffect(() => {
    const listener = (e: any) => {
      if (e.key === "Escape") {
        setFullScreenMode(false);
      }
    };

    document.addEventListener("keydown", listener);

    return () => document.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    if (allReportsData) {
      setAllReports(allReportsData?.list ?? []);
      setTotal(allReportsData?.totalElements ?? 0);
      setIsFiltered(allReportsData?.filtered ?? true);
    }
    if (error) {
      setHasError(true);
    }
  }, [allReportsData, error]);

  useEffect(() => {
    if (allPlacemarksData) {
      const minX = Math.min(
        ...allPlacemarksData.map((item) => item.Location?.latitude ?? 0)
      );
      const minY = Math.min(
        ...allPlacemarksData.map((item) => item.Location?.longitude ?? 0)
      );
      const maxX = Math.max(
        ...allPlacemarksData.map((item) => item.Location?.latitude ?? 0)
      );
      const maxY = Math.max(
        ...allPlacemarksData.map((item) => item.Location?.longitude ?? 0)
      );

      if (minX === maxX || minY === maxY) {
        setMapCenter([
          [minX - 0.001, minY - 0.001],
          [maxX + 0.001, maxY + 0.001],
        ]);
      } else {
        setMapCenter([
          [minX, minY],
          [maxX, maxY],
        ]);
      }
    }
  }, [allPlacemarksData]);

  useEffect(() => {
    const filtersFromSessionStorage = window.sessionStorage.getItem("filters");
    const paginationFromSessionStorage =
      window.sessionStorage.getItem("pagination");
    if (filtersFromSessionStorage) {
      setFilters({
        ...JSON.parse(filtersFromSessionStorage ?? ""),
        city: getCityFromUrl(city),
      });
      setCanMakeRequest(true);
    } else {
      setFilters({
        city: getCityFromUrl(city),
      });
      setCanMakeRequest(true);
    }
    if (paginationFromSessionStorage) {
      setPageNumber(JSON.parse(paginationFromSessionStorage ?? ""));
    }
    setShowMockComponents(false);
    setInitialSkeleton(false);
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    window.sessionStorage.setItem("pagination", JSON.stringify(pageNumber));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageNumber]);

  useEffect(() => {
    if (canMakeRequest) {
      refetch();
      refetchPlacemarks();
    }
  }, [pageNumber, canMakeRequest]);

  const handleSubmit = () => {
    if (canMakeRequest) {
      refetch();
      refetchPlacemarks();
    }
    setIsTooltipOpen(false);
  };

  const handleSetSelectedCity = (value: CitiesEnum) => {
    setSelectedCity(value);
  };

  useEffect(() => {
    router.push(
      `${PublicRoutes.ALL_REPORTS.static}/${transformCityTitleToCityEnum(
        selectedCity
      )}`
    );
    handleSubmit();
  }, [selectedCity]);

  const handleSetFilters = (
    value: FiltersFormValues,
    isFromCityTooltip?: boolean
  ) => {
    if (!filtersModal.opened && !isFromCityTooltip) {
      setIsTooltipOpen(true);
    }
    setFilters(value);
    setPageNumber(1);
  };

  const handleClearFilters = () => {
    const filtersFromSessionStorage = window.sessionStorage.getItem("filters");
    if (!filtersModal.opened && (filtersFromSessionStorage?.length ?? 0) > 26) {
      setIsTooltipOpen(true);
    }
    setFilters({
      city: filters.city,
    });
  };

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      city: getCityFromUrl(city),
    }));
    setSelectedCity(getCityFromUrl(city));
    setPageNumber(1);
  }, [city, canMakeRequest]);

  const disableSliders = !sliderValues;

  const onPlacemarkClick = (id: string) => {
    setCheckedPlacemarkId(Number(id));
    setSkeletonCardMode(true);
    setCheckedPlacemark([{}]);

    const checkedPlacemark = loadedReports.find(
      (item) => String(item.id) === String(id)
    );

    if (checkedPlacemark) {
      setCheckedPlacemark([checkedPlacemark]);
      setSkeletonCardMode(false);
    }

    if (!checkedPlacemark) {
      getReportById(id)
        .then((data) => {
          setLoadedReports((prev) => [...prev, data]);
          setCheckedPlacemark([data]);
        })
        .finally(() => setSkeletonCardMode(false));
    }
  };

  const onClusterClick = (e: any) => {
    const clickedClusterId = e.get("objectId");
    const geoObjectsCoordinates = e.originalEvent.currentTarget._clustersById[
      clickedClusterId
    ].features?.map((item: any) => item.geometry.coordinates);

    const firstCoordinates = geoObjectsCoordinates?.[0] ?? [];

    const isSameCoordinates = geoObjectsCoordinates?.every(
      (item: any) =>
        item[0] === firstCoordinates[0] && item[1] === firstCoordinates[1]
    );

    if (isSameCoordinates) {
      setCheckedPlacemarkId(undefined);
      setSkeletonCardMode(true);
      setCheckedPlacemark([{}]);

      const allCurrentCoordinatesObjectsIds = (allPlacemarksData ?? [])
        .filter(
          (item) =>
            item.Location?.latitude === firstCoordinates[0] &&
            item.Location?.longitude === firstCoordinates[1]
        )
        .map((item) => item.id);

      Promise.all(
        allCurrentCoordinatesObjectsIds.map((item) =>
          getReportById(String(item))
        )
      )
        .then((data) => {
          setLoadedReports((prev) => [...prev, ...data]);
          setCheckedPlacemark(data);
        })
        .finally(() => setSkeletonCardMode(false));
    }
  };

  const getPrice = (itemPrice?: number) => {
    if (itemPrice) {
      const price = (Number(itemPrice) / 1000000)
        .toFixed(1)
        .toString()
        .replace(".", ",");

      if (price[price.length - 1] === "0") {
        return `${price.slice(0, -2)} млн`;
      }

      return `${price} млн`;
    }
    return "-";
  };

  const template = ymaps?.templateLayoutFactory.createClass(
    `
    <div class=${css.rootContainerPin}>
      <div class=$[properties.containerPinClassName]>
        <div class=$[properties.pricePinClassName]>
          $[properties.price]
        </div>
      </div>
      <div class=${css.linePin}>
        $[properties.upperSvg]
      </div>
      <div class=${css.pinPin}>
        $[properties.downSvg]
      </div>
    </div>
    `,
    {
      build: function () {
        // @ts-ignore
        template?.superclass?.build.call(this);
        const pinContainer: HTMLElement =
          // @ts-ignore
          this.getParentElement().getElementsByClassName(
            css.rootContainerPin
          )[0];
        const pinWidth = pinContainer.getClientRects()?.[0].width;
        // @ts-ignore
        this.getData().options.set("shape", {
          type: "Rectangle",
          coordinates: [
            [0, 0],
            [pinWidth ?? 60, 25],
          ],
        });
      },
    }
  );

  return (
    <>
      <div className={css.container}>
        <div className={css.titleContainer}>
          <span
            className={css.title}
          >{`Проверенные квартиры в ${getCityForTitle(city)}`}</span>
          <CityGeolocation
            initialValue={filters.city ?? CitiesEnum.Moscow}
            groupName={"geolocation1"}
            filters={filters}
            setFilters={handleSetFilters}
            handleSetSelectedCity={handleSetSelectedCity}
          />
        </div>
        <div className={css.inputsContainer}>
          {!showMockComponents ? (
            <>
              <InputSearch
                label={"Адрес"}
                customPlaceholder={"Введите"}
                filters={filters}
                onSetFilters={handleSetFilters}
                withRange
              />
              <InputDropDown
                label="Количество комнат"
                options={dropDownOptions}
                onChange={(value) => {
                  handleSetFilters({
                    ...filters,
                    roomsCount: value,
                  });
                }}
                value={filters.roomsCount ?? []}
              />
              <InputRange
                label="Стоимость"
                type="range"
                unit="₽"
                min={sliderValues?.cost?.from}
                max={sliderValues?.cost?.to}
                isSplitByThreeDigits
                step={50000}
                onChange={(value) => {
                  handleSetFilters({
                    ...filters,
                    cost: value,
                  });
                }}
                value={[
                  filters.cost?.[0] ?? sliderValues?.cost?.from ?? 0,
                  filters.cost?.[1] ?? sliderValues?.cost?.to ?? 0,
                ]}
                disabled={disableSliders}
              />
            </>
          ) : (
            <>
              <div className={css.skeletonFiltersContainer}>
                <div className={css.label}>Адрес</div>
                <div className={css.skeletonFilters}>
                  <span className={css.skeletonFiltersPlaceholderSearch}>
                    Введите
                  </span>
                </div>
              </div>
              <div className={css.skeletonFiltersContainer}>
                <div className={css.label}>Количество комнат</div>
                <div className={css.skeletonFilters}>
                  <div className={css.skeletonFiltersPlaceholderDropDown}>
                    <span>Выберите</span>
                    <div className={css.iconContainer}>
                      <DropDownIcon />
                    </div>
                  </div>
                </div>
              </div>
              <div className={css.skeletonFiltersContainer}>
                <div className={css.label}>Стоимость</div>
                <div
                  className={cn(
                    css.skeletonFilters,
                    css.borderRadiusBottomNone
                  )}
                >
                  <div className={css.smallWidth}>
                    <span className={css.mockValue}>0 ₽</span>
                    <span className={css.hyphen}>–</span>
                    <span className={css.mockValue}>0 ₽</span>
                  </div>
                </div>
              </div>
            </>
          )}
          <Tooltip
            color={"rgba(0, 0, 0, 0.48)"}
            overlayClassName={css.customTooltip}
            open={isTooltipOpen && !filtersModal.opened && !isMobile}
            placement="bottomRight"
            title={"Применить фильтры"}
            zIndex={1}
          >
            <Button
              className={css.btn}
              variant="primary"
              onClick={handleSubmit}
            >
              Найти
            </Button>
          </Tooltip>
        </div>
        <div className={css.filtersContainer}>
          <div className={css.filtersText}>
            {!showMockComponents ? (
              <Tabs
                className={css.tabs}
                type={"card"}
                activeKey={mode}
                onChange={(key) => {
                  setCheckedPlacemarkId(undefined);
                  setCheckedPlacemark(undefined);
                  setMode(key as Mode);
                }}
                items={[
                  {
                    key: "MAP",
                    label: mode === Mode.MAP ? <MapIconOn /> : <MapIconOff />,
                  },
                  {
                    key: "CARDS",
                    label:
                      mode === Mode.CARDS ? <CardsIconOn /> : <CardsIconOff />,
                  },
                ]}
              />
            ) : (
              <MockTabsIcon />
            )}
            {isFiltered ? (
              getSearchResultDescription(String(total))
            ) : (
              <>
                <span className={css.red}>
                  {getSearchResultDescription("0")}
                </span>
                <div>Посмотрите похожие объекты ниже</div>
              </>
            )}
          </div>
          <div className={css.btnsContainer}>
            <Button
              className={css.cleanBtn}
              onClick={handleClearFilters}
              variant="ghost"
            >
              Очистить фильтр
            </Button>
            <Button
              onClick={() => filtersModal.open()}
              className={css.allFiltersBtn}
              variant="secondary"
            >
              <FilterIcon />
              &nbsp; Все фильтры
            </Button>
          </div>
        </div>
        <div className={css.br}></div>
        {hasError ? (
          <ErrorMessage />
        ) : mode === Mode.CARDS ? (
          <>
            <div className={css.cardsContainer}>
              {!isFetching &&
                allReports?.map((item) => (
                  <ReportCard report={item} key={item.id} />
                ))}
              {(isFetching || initialSkeleton) &&
                getMockArrayForSkeletons(8)?.map((_, index) => (
                  <ReportCard key={index} skeletonMode />
                ))}
            </div>
          </>
        ) : (
          <>
            {canShowMap && (allPlacemarksData ?? []).length > 0 && (
              <div
                className={cn(
                  css.mapContainer,
                  (fullScreenMode || (isMobile && checkedPlacemark)) &&
                    css.fullScreenContainer
                )}
                id="mapContainer"
                style={{ height: `600px` }}
              >
                {checkedPlacemark && (
                  <CardsModal
                    skeletonCardMode={skeletonCardMode}
                    reports={checkedPlacemark}
                    onCancel={() => {
                      setCheckedPlacemarkId(undefined);
                      setCheckedPlacemark(undefined);
                      const body = document.body;
                      body.style.overflow = "";
                    }}
                    wrapperClassName={
                      fullScreenMode || (isMobile && checkedPlacemark)
                        ? css.fullScreenCardsWrapper
                        : ""
                    }
                    containerClassName={
                      fullScreenMode || (isMobile && checkedPlacemark)
                        ? css.fullScreenCardsContainer
                        : ""
                    }
                  />
                )}
                <Map
                  width="100%"
                  height="100%"
                  defaultState={{
                    bounds: mapCenter,
                    zoom: 10,
                  }}
                >
                  <FullscreenControl
                    onClick={() => setFullScreenMode((prev) => !prev)}
                  />
                  <ObjectManager
                    options={{
                      clusterize: true,
                      clusterHasBalloon: false,
                    }}
                    objects={{
                      iconLayout: template,
                      iconOffset: [-30, -30],
                    }}
                    clusters={{
                      preset: "islands#invertedOrangeClusterIcons",
                    }}
                    instanceRef={(ref: any) => {
                      const closeModalBtn = document.querySelector(
                        `.${modalCss.closeIcon}`
                      );
                      closeModalBtn?.addEventListener("click", () => {
                        for (let obj in ref?.objects._objectsById) {
                          const objectProperties =
                            ref.objects._objectsById[obj].properties;
                          objectProperties.containerPinClassName =
                            css.containerPin;
                          objectProperties.pricePinClassName = css.pricePin;
                          objectProperties.upperSvg = `<svg
                          width="13"
                          height="2"
                          viewBox="0 0 13 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                         >
                         <rect width="13" height="2" fill="white" />
                         </svg>`;
                          objectProperties.downSvg = `<svg
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                         <path
                           d="M6 0.5H0V1V1.5C1.37366 1.5 2.23508 1.95094 2.81892 2.58786C3.42194 3.2457 3.77171 4.14841 4.01493 5.12127C4.13564 5.6041 4.2269 6.0899 4.31288 6.55891C4.31928 6.59379 4.32565 6.62864 4.33202 6.66344C4.40993 7.0893 4.48632 7.50684 4.57743 7.87127C4.67412 8.25802 4.80024 8.64214 5.00032 8.937C5.21612 9.25501 5.54322 9.5 6 9.5C6.45678 9.5 6.78388 9.25501 6.99968 8.937C7.19976 8.64214 7.32588 8.25802 7.42257 7.87127C7.51368 7.50684 7.59007 7.0893 7.66798 6.66344C7.67435 6.62864 7.68072 6.59379 7.68712 6.55891C7.7731 6.0899 7.86436 5.6041 7.98507 5.12127C8.22829 4.14841 8.57806 3.2457 9.18108 2.58786C9.76492 1.95094 10.6263 1.5 12 1.5V1V0.5H6Z"
                           fill="white"
                            stroke="#F89657"
                          />
                        </svg>`;
                        }
                      });

                      if (!ref?.clusters.events.types.click?.length) {
                        ref?.clusters.events.add("click", (e: any) => {
                          onClusterClick(e);
                          for (let obj in ref?.objects._objectsById) {
                            const objectProperties =
                              ref.objects._objectsById[obj].properties;
                            objectProperties.containerPinClassName =
                              css.containerPin;
                            objectProperties.pricePinClassName = css.pricePin;
                            objectProperties.upperSvg = `<svg
                          width="13"
                          height="2"
                          viewBox="0 0 13 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                         >
                         <rect width="13" height="2" fill="white" />
                         </svg>`;
                            objectProperties.downSvg = `<svg
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                         <path
                           d="M6 0.5H0V1V1.5C1.37366 1.5 2.23508 1.95094 2.81892 2.58786C3.42194 3.2457 3.77171 4.14841 4.01493 5.12127C4.13564 5.6041 4.2269 6.0899 4.31288 6.55891C4.31928 6.59379 4.32565 6.62864 4.33202 6.66344C4.40993 7.0893 4.48632 7.50684 4.57743 7.87127C4.67412 8.25802 4.80024 8.64214 5.00032 8.937C5.21612 9.25501 5.54322 9.5 6 9.5C6.45678 9.5 6.78388 9.25501 6.99968 8.937C7.19976 8.64214 7.32588 8.25802 7.42257 7.87127C7.51368 7.50684 7.59007 7.0893 7.66798 6.66344C7.67435 6.62864 7.68072 6.59379 7.68712 6.55891C7.7731 6.0899 7.86436 5.6041 7.98507 5.12127C8.22829 4.14841 8.57806 3.2457 9.18108 2.58786C9.76492 1.95094 10.6263 1.5 12 1.5V1V0.5H6Z"
                           fill="white"
                            stroke="#F89657"
                          />
                        </svg>`;
                          }
                        });
                      }

                      if (ref?.clusters.events.types.click) {
                        ref.clusters.events.types.click = [];
                        ref?.clusters.events.add("click", (e: any) => {
                          onClusterClick(e);
                          for (let obj in ref?.objects._objectsById) {
                            const objectProperties =
                              ref.objects._objectsById[obj].properties;
                            objectProperties.containerPinClassName =
                              css.containerPin;
                            objectProperties.pricePinClassName = css.pricePin;
                            objectProperties.upperSvg = `<svg
                          width="13"
                          height="2"
                          viewBox="0 0 13 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                         >
                         <rect width="13" height="2" fill="white" />
                         </svg>`;
                            objectProperties.downSvg = `<svg
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                         <path
                           d="M6 0.5H0V1V1.5C1.37366 1.5 2.23508 1.95094 2.81892 2.58786C3.42194 3.2457 3.77171 4.14841 4.01493 5.12127C4.13564 5.6041 4.2269 6.0899 4.31288 6.55891C4.31928 6.59379 4.32565 6.62864 4.33202 6.66344C4.40993 7.0893 4.48632 7.50684 4.57743 7.87127C4.67412 8.25802 4.80024 8.64214 5.00032 8.937C5.21612 9.25501 5.54322 9.5 6 9.5C6.45678 9.5 6.78388 9.25501 6.99968 8.937C7.19976 8.64214 7.32588 8.25802 7.42257 7.87127C7.51368 7.50684 7.59007 7.0893 7.66798 6.66344C7.67435 6.62864 7.68072 6.59379 7.68712 6.55891C7.7731 6.0899 7.86436 5.6041 7.98507 5.12127C8.22829 4.14841 8.57806 3.2457 9.18108 2.58786C9.76492 1.95094 10.6263 1.5 12 1.5V1V0.5H6Z"
                           fill="white"
                            stroke="#F89657"
                          />
                        </svg>`;
                          }
                        });
                      }

                      if (!ref?.objects.events.types.click?.length) {
                        ref?.objects.events.add("click", (e: any) => {
                          const id = e.get("objectId");
                          onPlacemarkClick(id);
                        });
                      }
                      if (ref?.objects.events.types.click) {
                        ref.objects.events.types.click = [];
                        ref.objects.events.add("click", (e: any) => {
                          const id = e.get("objectId");
                          onPlacemarkClick(id);
                          if (
                            ref.objects._objectsById[checkedPlacemarkId ?? ""]
                          ) {
                            const object =
                              ref.objects._objectsById[
                                checkedPlacemarkId ?? ""
                              ];
                            object.properties.containerPinClassName =
                              css.containerPin;
                            object.properties.pricePinClassName = css.pricePin;
                            object.properties.upperSvg = `<svg
                          width="13"
                          height="2"
                          viewBox="0 0 13 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                         >
                         <rect width="13" height="2" fill="white" />
                         </svg>`;
                            object.properties.downSvg = `<svg
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                         <path
                           d="M6 0.5H0V1V1.5C1.37366 1.5 2.23508 1.95094 2.81892 2.58786C3.42194 3.2457 3.77171 4.14841 4.01493 5.12127C4.13564 5.6041 4.2269 6.0899 4.31288 6.55891C4.31928 6.59379 4.32565 6.62864 4.33202 6.66344C4.40993 7.0893 4.48632 7.50684 4.57743 7.87127C4.67412 8.25802 4.80024 8.64214 5.00032 8.937C5.21612 9.25501 5.54322 9.5 6 9.5C6.45678 9.5 6.78388 9.25501 6.99968 8.937C7.19976 8.64214 7.32588 8.25802 7.42257 7.87127C7.51368 7.50684 7.59007 7.0893 7.66798 6.66344C7.67435 6.62864 7.68072 6.59379 7.68712 6.55891C7.7731 6.0899 7.86436 5.6041 7.98507 5.12127C8.22829 4.14841 8.57806 3.2457 9.18108 2.58786C9.76492 1.95094 10.6263 1.5 12 1.5V1V0.5H6Z"
                           fill="white"
                            stroke="#F89657"
                          />
                        </svg>`;
                          }
                          if (ref.objects._objectsById[id]) {
                            const object = ref.objects._objectsById[id];
                            object.properties.containerPinClassName =
                              css.activeContainerPin;
                            object.properties.pricePinClassName =
                              css.activePricePin;
                            object.properties.upperSvg = `<svg
                          width="13"
                          height="2"
                          viewBox="0 0 13 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="13" height="2" fill="#FF6503" />
                        </svg>`;
                            object.properties.downSvg = `<svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                         d="M6 0.5H0V1V1.5C1.37366 1.5 2.23508 1.95094 2.81892 2.58786C3.42194 3.2457 3.77171 4.14841 4.01493 5.12127C4.13564 5.6041 4.2269 6.0899 4.31288 6.55891C4.31928 6.59379 4.32565 6.62864 4.33202 6.66344C4.40993 7.0893 4.48632 7.50684 4.57743 7.87127C4.67412 8.25802 4.80024 8.64214 5.00032 8.937C5.21612 9.25501 5.54322 9.5 6 9.5C6.45678 9.5 6.78388 9.25501 6.99968 8.937C7.19976 8.64214 7.32588 8.25802 7.42257 7.87127C7.51368 7.50684 7.59007 7.0893 7.66798 6.66344C7.67435 6.62864 7.68072 6.59379 7.68712 6.55891C7.7731 6.0899 7.86436 5.6041 7.98507 5.12127C8.22829 4.14841 8.57806 3.2457 9.18108 2.58786C9.76492 1.95094 10.6263 1.5 12 1.5V1V0.5H6Z"
                         fill="#FF6503"
                         stroke="white"
                       />
                      </svg>`;
                          }
                        });
                      }
                    }}
                    defaultFeatures={allPlacemarksData?.map((item) => ({
                      type: "Feature",
                      id: item.id,
                      geometry: {
                        type: "Point",
                        coordinates: [
                          item.Location?.latitude,
                          item.Location?.longitude,
                        ],
                      },
                      properties: {
                        ...item,
                        price: getPrice(item.price),
                        containerPinClassName: css.containerPin,
                        pricePinClassName: css.pricePin,
                        upperSvg: `<svg
                        width="13"
                        height="2"
                        viewBox="0 0 13 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                       >
                       <rect width="13" height="2" fill="white" />
                       </svg>`,
                        downSvg: `<svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                       <path
                         d="M6 0.5H0V1V1.5C1.37366 1.5 2.23508 1.95094 2.81892 2.58786C3.42194 3.2457 3.77171 4.14841 4.01493 5.12127C4.13564 5.6041 4.2269 6.0899 4.31288 6.55891C4.31928 6.59379 4.32565 6.62864 4.33202 6.66344C4.40993 7.0893 4.48632 7.50684 4.57743 7.87127C4.67412 8.25802 4.80024 8.64214 5.00032 8.937C5.21612 9.25501 5.54322 9.5 6 9.5C6.45678 9.5 6.78388 9.25501 6.99968 8.937C7.19976 8.64214 7.32588 8.25802 7.42257 7.87127C7.51368 7.50684 7.59007 7.0893 7.66798 6.66344C7.67435 6.62864 7.68072 6.59379 7.68712 6.55891C7.7731 6.0899 7.86436 5.6041 7.98507 5.12127C8.22829 4.14841 8.57806 3.2457 9.18108 2.58786C9.76492 1.95094 10.6263 1.5 12 1.5V1V0.5H6Z"
                         fill="white"
                          stroke="#F89657"
                        />
                      </svg>`,
                      },
                    }))}
                  />
                </Map>
              </div>
            )}
          </>
        )}
      </div>
      {filtersModal.opened && (
        <Filters
          sliderValues={sliderValues}
          open={filtersModal.opened}
          filters={filters}
          setFilters={handleSetFilters}
          clearFilters={handleClearFilters}
          onCancel={() => {
            filtersModal.close();
            handleSubmit();
          }}
          disableSliders={disableSliders}
        />
      )}
      {!hasError && !showMockComponents && mode === Mode.CARDS && (
        <Pagination
          total={total}
          showSizeChanger={false}
          current={pageNumber}
          pageSize={pageSize}
          onChange={(page) => setPageNumber(page)}
        />
      )}
    </>
  );
};

export default AllReportsPage;

const dropDownOptions = [
  {
    label: "Студия",
    value: "Студия",
  },
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "6",
    value: "6",
  },
  {
    label: "7",
    value: "7",
  },
  {
    label: "8",
    value: "8",
  },
];
