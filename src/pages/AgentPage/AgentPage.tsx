import React, { FC, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import css from "./index.module.css";
import Button from "../../components/UiKit/Button/Button";
import ProfileOffIcon from "../../assets/Icons/ProfileOffIcon";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { getMockArrayForSkeletons } from "../../lib/helpers";
import ReportCard from "../../components/ReportCard/ReportCard";
import { AgentType, ReportData, getReportById } from "../../api/reportsApi";
import { useQuery } from "react-query";
import Pagination from "../../components/UiKit/Pagination/Pagination";
import { getSearchResultDescription } from "./helpers";
import {
  getAgentReports,
  getAgentReportsPlacemarks,
} from "../../api/agentsApi";
import SkeletonRow from "../../components/UiKit/SkeletonRow/SkeletonRow";
import CopyNumberIcon from "../../assets/Icons/CopyNumberIcon";
import { message } from "antd";
import CopyNumberHoverIcon from "../../assets/Icons/CopyNumberHoverIcon";
import Tabs from "../../components/UiKit/Tabs/Tabs";
import MapIconOn from "../../assets/Icons/MapIconOn";
import MapIconOff from "../../assets/Icons/MapIconOff";
import CardsIconOn from "../../assets/Icons/CardsIconOn";
import CardsIconOff from "../../assets/Icons/CardsIconOff";
import {
  Map,
  FullscreenControl,
  Clusterer,
  useYMaps,
} from "@pbe/react-yandex-maps";
import MyPlacemark from "./components/MyPlacemark/MyPlacemark";
import CardsModal from "./components/CardsModal/CardsModal";
import cn from "classnames";
import useCustomMediaQuery from "../../hooks/useCustomMediaQuery";

enum Mode {
  MAP = "MAP",
  CARDS = "CARDS",
}

const AgentPage: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [copyIconHover, setCopyIconHover] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [agent, setAgent] = useState<AgentType>({});
  const [allReports, setAllReports] = useState<ReportData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const [canShowAgent, setCanShowAgent] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [mode, setMode] = useState<Mode>(Mode.CARDS);
  const [checkedPlacemark, setCheckedPlacemark] =
    useState<ReportData[] | undefined>();
  const [checkedPlacemarkId, setCheckedPlacemarkId] = useState<number>();
  const [loadedReports, setLoadedReports] = useState<ReportData[]>([]);
  const [skeletonCardMode, setSkeletonCardMode] = useState(false);
  const [mapCenter, setMapCenter] = useState([
    [10, 10],
    [20, 20],
  ]);
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const pageSize = 12;

  const isMobile = useCustomMediaQuery("(max-width: 462px)");
  const router = useRouter();
  const { id } = router.query;

  const ymaps = useYMaps(["templateLayoutFactory"]);

  //TODO: поменять фильтры и возможно запрос при интеграции с бэком
  const {
    data: allReportsData,
    isFetching,
    error,
    refetch,
  } = useQuery(
    "allAgentReportsData",
    () =>
      getAgentReports({
        pageNumber: pageNumber - 1,
        pageSize,
        agentId: (id as string) ?? "",
      }),
    {
      enabled: Boolean(id),
    }
  );

  const { data: allPlacemarksData, refetch: refetchPlacemarks } = useQuery(
    "allAgentReportsPlacemarks",
    () => getAgentReportsPlacemarks((id as string) ?? ""),
    {
      enabled: Boolean(id),
    }
  );

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
    refetchPlacemarks();
  }, [id]);

  const phone = agent?.phone
    ? `+${agent?.phone?.[0] ?? 7} (${agent?.phone?.[1] ?? 0}${
        agent?.phone?.[2] ?? 0
      }${agent?.phone?.[3] ?? 0}) ${agent?.phone?.[4] ?? 0}${
        agent?.phone?.[5] ?? 0
      }${agent?.phone?.[6] ?? 0}-${agent?.phone?.[7] ?? 0}${
        agent?.phone?.[8] ?? 0
      }-${agent?.phone?.[9] ?? 0}${agent?.phone?.[10] ?? 0}`
    : "";

  const handleCopyPhone = () => {
    navigator.clipboard
      .writeText(phone)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Номер успешно скопирован!",
        });
      })
      .catch(() => {
        messageApi.open({
          type: "error",
          content: "Произошла ошибка при копировании",
        });
      });
  };

  useEffect(() => {
    if (allReportsData) {
      setAgent(allReportsData?.agent ?? {});
      setAllReports(allReportsData?.list ?? []);
      setTotal(allReportsData?.totalElements ?? 0);
      setCanShowAgent(true);
    }
    if (error) {
      setHasError(true);
    }
  }, [allReportsData, error]);

  useEffect(() => {
    if (id) {
      refetch();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [pageNumber, id]);

  const skeletonMode = !allReportsData || isFetching || !canShowAgent;

  const onClusterClick = (e: any) => {
    const geoObjectsCoordinates = e
      .get("target")
      .properties.get("geoObjects")
      ?.map((item: any) => item.geometry?._coordinates);

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

  const onPlacemarkClick = (id: string) => {
    setCheckedPlacemarkId(Number(id));
    setSkeletonCardMode(true);
    setCheckedPlacemark([{}]);

    const checkedPlacemark = loadedReports.find(
      (item) => String(item.id) === id
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

  if (hasError) {
    return <ErrorMessage />;
  }

  return (
    <div className={css.container}>
      {contextHolder}
      <div className={css.header}>
        <div className={css.agentContainer}>
          <div className={css.agentImgContainer}>
            {skeletonMode ? (
              <SkeletonRow className={css.avatarImg} />
            ) : !agent?.photo || avatarError ? (
              <ProfileOffIcon />
            ) : (
              <div className={css.imgDiv}>
                <img
                  className={css.avatarImg}
                  src={agent?.photo}
                  onError={() => setAvatarError(true)}
                />
              </div>
            )}
          </div>
          <div className={css.agentInfoContainer}>
            {skeletonMode ? (
              <SkeletonRow className={css.agentNameSkeleton} />
            ) : (
              <div className={css.agentName}>{agent?.name ?? "Не указано"}</div>
            )}
            {/* <div className={css.agentInfoText}>
              Руководитель офиса <span className={css.dot}>·</span> Москва
              Ботанический сад
            </div> */}
          </div>
        </div>
        {skeletonMode ? (
          <SkeletonRow className={css.buttonSkeleton} />
        ) : (
          <>
            {showPhoneNumber ? (
              <div className={css.numberContainer}>
                <div className={css.number}>{phone}</div>
                <div
                  className={css.copyButton}
                  onClick={handleCopyPhone}
                  onMouseEnter={() => setCopyIconHover(true)}
                  onMouseLeave={() => setCopyIconHover(false)}
                >
                  {copyIconHover ? <CopyNumberHoverIcon /> : <CopyNumberIcon />}
                </div>
              </div>
            ) : (
              <Button
                className={css.button}
                variant="primary"
                onClick={() => setShowPhoneNumber(true)}
              >
                Связаться
              </Button>
            )}
          </>
        )}
      </div>

      <div className={css.viewBlock}>
        <div className={css.objectsCountBlock}>
          <span className={css.objectsCountText}>
            {getSearchResultDescription(String(total))}
          </span>
          <Tabs
            className={css.tabs}
            type={"card"}
            activeKey={mode}
            onChange={(key) => setMode(key as Mode)}
            items={[
              {
                key: "MAP",
                label: mode === Mode.MAP ? <MapIconOn /> : <MapIconOff />,
              },
              {
                key: "CARDS",
                label: mode === Mode.CARDS ? <CardsIconOn /> : <CardsIconOff />,
              },
            ]}
          />
        </div>
        <div className={css.br}></div>
      </div>

      {mode === Mode.CARDS ? (
        <>
          <div className={css.cardsContainer}>
            {!isFetching &&
              allReports?.map((item) => (
                <ReportCard report={item} key={item.id} />
              ))}
            {isFetching &&
              getMockArrayForSkeletons(8)?.map((_, index) => (
                <ReportCard key={index} skeletonMode />
              ))}
          </div>
          {!hasError && (
            <Pagination
              total={total}
              showSizeChanger={false}
              current={pageNumber}
              pageSize={pageSize}
              onChange={(page) => setPageNumber(page)}
            />
          )}
        </>
      ) : (
        <>
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
                  const mapContainer = document.getElementById("mapContainer");
                  mapContainer?.scrollIntoView({
                    block: "center",
                  });
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
              <Clusterer
                options={{
                  preset: "islands#invertedOrangeClusterIcons",
                  groupByCoordinates: false,
                }}
                onClick={onClusterClick}
              >
                {(allPlacemarksData ?? []).map((item) => (
                  <MyPlacemark
                    key={item.id}
                    item={item}
                    ymaps={ymaps}
                    isActive={item.id === checkedPlacemarkId}
                    onClick={onPlacemarkClick}
                  />
                ))}
              </Clusterer>
            </Map>
          </div>
        </>
      )}
    </div>
  );
};

export default AgentPage;
