import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import CharacteristicsRow from "../CharacteristicsRow/CharacteristicsRow";
import WalkingIcon from "../../../../../../assets/Icons/WalkingIcon";
import CarIcon from "../../../../../../assets/Icons/CarIcon";
import css from "./index.module.css";
import cn from "classnames";
import {
  YMaps,
  Map,
  FullscreenControl,
  ZoomControl,
  Placemark,
} from "@pbe/react-yandex-maps";
import useCustomMediaQuery from "../../../../../../hooks/useCustomMediaQuery";
import {
  getFinishingDescription,
  getHouseTypeDescription,
  getObjectTypeDescription,
  getTypeOfLayoutDescription,
  getWindowViewDescription,
} from "./helpers";
import SkeletonRow from "../../../../../../components/UiKit/SkeletonRow/SkeletonRow";
import { ReportData } from "../../../../../../api/reportsApi";
import MetroIcon from "../../../../../../components/UiKit/MetroIcon/MetroIcon";

export type DetailedInfoProps = {
  report?: ReportData;
  skeletonMode?: boolean;
};

const DetailedInfo: FC<DetailedInfoProps> = ({ report, skeletonMode }) => {
  const isLaptop = useCustomMediaQuery("(max-width: 768px)");
  const [mapHeight, setMapHeight] = useState(0);
  const location = [
    report?.Location?.latitude ?? 0,
    report?.Location?.longitude ?? 0,
  ];

  useEffect(() => {
    const mapContainer = document.getElementById("mapContainer");
    if (mapContainer) {
      setMapHeight(mapContainer?.clientWidth / 1.7);
    }
  });

  useEffect(() => {
    setMapHeight(isLaptop ? 394 : 204);
    const mapContainer = document.getElementById("mapContainer");

    const resizeListener = () => {
      if (mapContainer) {
        setMapHeight(mapContainer?.clientWidth / 1.7);
      }
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [isLaptop]);

  return (
    <>
      {skeletonMode ? (
        <div className={css.skeletonMainContainer}>
          <SkeletonRow
            style={{
              height: "32px",
              borderRadius: "16px",
              marginBottom: "16px",
              width: "30%",
            }}
          />
          <div className={css.skeletonContainer}>
            <div className={css.skeletonBlock}>
              <SkeletonRow
                style={{
                  height: "20px",
                  borderRadius: "16px",
                  width: "90%",
                }}
              />
              <SkeletonRow
                style={{
                  height: "20px",
                  borderRadius: "16px",
                  width: "70%",
                }}
              />
              <SkeletonRow
                style={{
                  height: "20px",
                  borderRadius: "16px",
                }}
              />
              <SkeletonRow
                style={{
                  height: "20px",
                  borderRadius: "16px",
                  width: "60%",
                }}
              />
            </div>
            <div className={cn(css.skeletonBlock, css.right)}>
              <SkeletonRow
                style={{
                  height: "20px",
                  borderRadius: "16px",
                  width: "50%",
                }}
              />
              <SkeletonRow
                style={{
                  height: "20px",
                  borderRadius: "16px",
                  width: "70%",
                }}
              />
              <SkeletonRow
                style={{
                  height: "20px",
                  borderRadius: "16px",
                  width: "80%",
                }}
              />
              <SkeletonRow
                style={{
                  height: "20px",
                  borderRadius: "16px",
                  width: "40%",
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={css.block}>
            <span className={css.title}>Объект</span>
            <CharacteristicsRow
              title={"Тип объекта"}
              value={getObjectTypeDescription(report?.categoryId)}
            />
            <CharacteristicsRow
              title={"Количество комнат"}
              value={String(report?.rooms ?? "-")}
            />
            <CharacteristicsRow
              title={"Общая площадь"}
              value={report?.area ? `${report?.area} м²` : "-"}
            />
            <CharacteristicsRow
              title={"Этаж"}
              value={`${report?.floor ?? "-"}/${report?.floors_total ?? "-"}`}
            />
            <CharacteristicsRow
              title={"Высота потолков"}
              value={
                report?.ceiling_height ? `${report?.ceiling_height} м` : "-"
              }
            />
            <CharacteristicsRow
              title={"Отделка"}
              value={getFinishingDescription(report?.renovationId)}
            />
            <CharacteristicsRow
              title={"Вид планировки"}
              value={getTypeOfLayoutDescription(report?.rooms_type)}
            />
            <CharacteristicsRow
              title={"Вид из окна"}
              value={getWindowViewDescription(report?.window_view)}
            />
          </div>
          <div className={css.block}>
            <span className={css.title}>Жилой комплекс</span>
            <CharacteristicsRow
              title={"Тип дома"}
              value={getHouseTypeDescription(report?.building_typeId)}
            />
            <CharacteristicsRow
              title={"Год постройки"}
              value={report?.built_year ? `${report?.built_year} г` : "-"}
            />
            <CharacteristicsRow
              title={"Этажей в доме"}
              value={String(report?.floors_total ?? "-")}
            />
            <CharacteristicsRow
              title={"Наличие лифта"}
              value={
                report?.lift === true
                  ? "Да"
                  : report?.lift === false
                  ? "Нет"
                  : "-"
              }
            />
            <CharacteristicsRow
              title={"Наличие паркинга"}
              value={
                report?.parking === true
                  ? "Да"
                  : report?.parking === false
                  ? "Нет"
                  : "-"
              }
            />
          </div>
          <div className={css.block}>
            <span className={css.title}>Расположение</span>
            {report?.Metros?.map((item, index) => (
              <div
                className={css.locationRowContainer}
                key={`${item.station}-${index}`}
              >
                <MetroIcon
                  key={`${item.station}-${index}`}
                  color={item.color}
                />
                <CharacteristicsRow
                  title={item.station ?? ""}
                  value={`${item.foot_time ?? item.transport_time ?? "-"} мин`}
                />
                &nbsp;
                {item.foot_time ? <WalkingIcon /> : <CarIcon />}
              </div>
            ))}
            <div
              className={css.mapContainer}
              id="mapContainer"
              style={{ height: `${mapHeight}px` }}
            >
              <YMaps>
                <Map
                  width="100%"
                  height="100%"
                  state={{ center: location, zoom: 16 }}
                >
                  <FullscreenControl />
                  <ZoomControl
                    options={{
                      position: {
                        top: `${mapHeight / 3}px`,
                        left: "10px",
                      },
                      size: "small",
                    }}
                  />
                  <Placemark
                    geometry={location}
                    options={{
                      iconLayout: "default#image",
                      iconImageHref: "/pinIcon.svg",
                      iconImageSize: [20, 30],
                    }}
                  />
                </Map>
              </YMaps>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailedInfo;
