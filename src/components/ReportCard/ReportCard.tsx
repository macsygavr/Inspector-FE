import React, { FC, useEffect, useState } from "react";
import css from "./index.module.css";
import { splitByThreeDigits } from "../UiKit/InputRange/helpers";
import PinOffSmallIcon from "../../assets/Icons/PinOffSmallIcon";
import WalkingIconForCard from "../../assets/Icons/WalkingIconForCard";
import Tag, { TagEnum } from "../UiKit/Tag/Tag";
import { PublicRoutes } from "../../routes";
import { formatDate } from "../../lib/formatters/dateFromatters";
import Link from "next/link";
import SkeletonRow from "../UiKit/SkeletonRow/SkeletonRow";
import {
  ApartDisadvantageType,
  BuildingDisadvantageType,
  ReportData,
} from "../../api/reportsApi";
import MetroIcon from "../UiKit/MetroIcon/MetroIcon";
import CarIcon from "../../assets/Icons/CarIcon";
import { getTagsCount } from "./helpers";
import ContactButton from "../ContactButton/ContactButton";
import cn from "classnames";

type Props = {
  report?: ReportData;
  skeletonMode?: boolean;
  withCallMeBtn?: boolean;
};

const ReportCard: FC<Props> = ({ report, skeletonMode, withCallMeBtn }) => {
  const [splittedPrice, setSplittedPrice] = useState("");
  const [splittedPricePerMeter, setSplittedPricePerMeter] =
    useState<string | null>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [canShowMockImg, setCanShowMockImg] = useState(false);

  const prewievImage =
    report?.Images?.find((item) => item.is_preview)?.image ?? "";

  useEffect(() => {
    setPreviewImgUrl(prewievImage);
  }, [prewievImage]);

  useEffect(() => {
    const pricePerMeter = ((report?.price ?? 0) / (report?.area ?? 0)).toFixed(
      0
    );

    setSplittedPrice(splitByThreeDigits(String(report?.price ?? "")));
    if (pricePerMeter === "NaN" || pricePerMeter === "Infinity") {
      setSplittedPricePerMeter(null);
    } else {
      setSplittedPricePerMeter(splitByThreeDigits(String(pricePerMeter)));
    }
  }, [report, splitByThreeDigits]);

  const apartDisadvantageCount = Object.keys(
    report?.ApartDisadvantage ?? {}
  ).reduce((acc, item) => {
    if (
      report?.ApartDisadvantage?.[item as keyof ApartDisadvantageType] === true
    ) {
      return (acc += 1);
    }
    return acc;
  }, 0);

  const buildingDisadvantageCount = Object.keys(
    report?.BuildingDisadvantage ?? {}
  ).reduce((acc, item) => {
    if (
      report?.BuildingDisadvantage?.[item as keyof BuildingDisadvantageType] ===
      true
    ) {
      return (acc += 1);
    }
    return acc;
  }, 0);

  const showTagsContainer =
    report?.bargaining ||
    buildingDisadvantageCount > 0 ||
    apartDisadvantageCount > 0;

  const tagsCount = getTagsCount(
    report?.bargaining,
    buildingDisadvantageCount > 0,
    apartDisadvantageCount > 0
  );

  const showErrorImg =
    (!previewImgUrl && canShowMockImg) || report?.Images?.length === 0;

  return (
    <>
      {skeletonMode ? (
        <div className={css.container}>
          <SkeletonRow
            style={{
              borderRadius: "16px 16px 0px 0px",
              height: "198px",
            }}
          />
          <div className={css.skeletonsContainer}>
            <SkeletonRow
              style={{
                width: "calc(100% - 12px)",
                height: "28px",
                borderRadius: "8px",
              }}
            />
            <SkeletonRow
              style={{
                width: "calc(100% - 92px)",
                height: "20px",
                borderRadius: "8px",
              }}
            />
            <SkeletonRow
              style={{
                width: "calc(100% - 42px)",
                height: "20px",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <Link href={PublicRoutes.REPORT.get(String(report?.id ?? ""))}>
            <div className={css.container}>
              {report?.sold && (
                <div className={css.soldTag}>
                  <Tag tag={TagEnum.ObjectSold} />
                </div>
              )}
              {previewImgUrl && (
                <img
                  className={css.img}
                  src={previewImgUrl}
                  alt={"Не удалось загрузить изображение"}
                  onError={() => {
                    setCanShowMockImg(true);
                    setPreviewImgUrl("/photoError.jpg");
                  }}
                  onLoad={() => setCanShowMockImg(true)}
                />
              )}
              {showErrorImg && (
                <img className={css.img} src={"/photoError.jpg"} />
              )}
              <div className={css.infoContainer}>
                <div className={css.generalInfo}>
                  {report?.rooms ? (
                    <>
                      {report?.rooms} комн. <span className={css.dot}>·</span>
                    </>
                  ) : report?.is_studio ? (
                    <>
                      Cтудия <span className={css.dot}>·</span>
                    </>
                  ) : (
                    ""
                  )}{" "}
                  {report?.area ?? "-"} м² <span className={css.dot}>· </span>
                  <span className={css.floorSpan}>
                    {report?.floor ?? "-"}/{report?.floors_total ?? "-"} этаж
                  </span>
                </div>
                {report?.sold ? (
                  <span className={css.soldText}>Объект продан</span>
                ) : (
                  <div className={css.priceContainer}>
                    <span className={css.price}>{splittedPrice ?? "-"} ₽</span>
                    <span className={css.pricePerMeter}>
                      {splittedPricePerMeter && (
                        <>
                          &nbsp;/&nbsp;
                          {splittedPricePerMeter} ₽ за м²
                        </>
                      )}
                    </span>
                  </div>
                )}
                <div className={css.addressContainer}>
                  <PinOffSmallIcon />
                  <span className={css.address}>
                    {report?.Location?.address ?? "-"}
                  </span>
                </div>
                <div className={css.geolocationContainer}>
                  {report?.Metros?.map((item, index) => (
                    <div className={css.metroRow} key={`${item}-${index}`}>
                      <MetroIcon
                        key={`${item.station}-${index}`}
                        color={item.color}
                      />
                      <span className={css.metroStation}>{item.station}</span>
                      <span className={css.time}>
                        {item.foot_time ?? item.transport_time ?? "-"} мин.
                      </span>
                      <div>
                        {item.foot_time ? <WalkingIconForCard /> : <CarIcon />}
                      </div>
                    </div>
                  ))}
                </div>
                {showTagsContainer && (
                  <div className={css.tagsContainer}>
                    {report?.bargaining && !report.sold ? (
                      <Tag size={"small"} tag={TagEnum.ReadyToTrade} />
                    ) : buildingDisadvantageCount > 0 ? (
                      <Tag
                        size={"small"}
                        tag={TagEnum.ResidentialComplexProblem}
                        countInText={buildingDisadvantageCount}
                      />
                    ) : (
                      apartDisadvantageCount > 0 && (
                        <Tag
                          size={"small"}
                          tag={TagEnum.ApartmentProblem}
                          countInText={apartDisadvantageCount}
                        />
                      )
                    )}
                    {tagsCount > 1 && (
                      <Tag
                        size={"small"}
                        tag={TagEnum.Empty}
                        customText={`+${tagsCount - 1}`}
                      />
                    )}
                  </div>
                )}
                <div
                  className={cn(
                    css.checkDateContainer,
                    withCallMeBtn && css.bigPadding
                  )}
                >
                  Дата проверки {formatDate(report?.createdAt)}
                </div>
              </div>
            </div>
          </Link>
          {withCallMeBtn && (
            <div className={css.callMeBtnContainer}>
              <ContactButton
                className={css.callMeBtn}
                locality={
                  report?.Location?.address
                    ? `${
                        report?.Location?.locality_name
                          ? `${report?.Location?.locality_name}, `
                          : ""
                      }${report?.Location?.address}`
                    : report?.Location?.parsed_address
                    ? `${
                        report?.Location?.locality_name
                          ? `${report?.Location?.locality_name}, `
                          : ""
                      }${report?.Location?.parsed_address ?? ""}`
                    : "Адрес не указан"
                }
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ReportCard;
