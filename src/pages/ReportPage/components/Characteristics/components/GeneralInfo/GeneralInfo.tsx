import React, { FC } from "react";
import css from "./index.module.css";
import PinSmallIcon from "../../../../../../assets/Icons/PinSmallIcon";
import Tag, { TagEnum } from "../../../../../../components/UiKit/Tag/Tag";
import useCustomMediaQuery from "../../../../../../hooks/useCustomMediaQuery";
import SkeletonRow from "../../../../../../components/UiKit/SkeletonRow/SkeletonRow";
import { ReportData } from "../../../../../../api/reportsApi";
import InfoIcon from "../../../../../../assets/Icons/InfoIcon";

export type GeneralInfoProps = {
  report?: ReportData;
  skeletonMode?: boolean;
  price?: string;
  pricePerMeter?: string | null;
};

const GeneralInfo: FC<GeneralInfoProps> = ({
  report,
  skeletonMode,
  price,
  pricePerMeter,
}) => {
  const isSmallDesktop = useCustomMediaQuery(
    "(max-width: 1024px) and (min-width: 768px)"
  );

  return (
    <>
      {skeletonMode ? (
        <>
          <div>
            <SkeletonRow
              style={{
                height: "32px",
                borderRadius: "16px",
              }}
            />
            <SkeletonRow
              style={{
                height: "24px",
                borderRadius: "16px",
                marginTop: "8px",
                width: "calc(100% - 60px)",
              }}
            />
          </div>
          <div className={css.skeletonPriceContainer}>
            <SkeletonRow
              style={{
                height: "32px",
                borderRadius: "16px",
                width: "35%",
              }}
            />
            <SkeletonRow
              style={{
                height: "20px",
                borderRadius: "16px",
                width: "45%",
              }}
            />
          </div>
        </>
      ) : (
        <>
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
          <div className={css.addressContainer}>
            <PinSmallIcon />
            <span className={css.address}>
              {report?.Location?.address
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
                : "Адрес не указан"}
            </span>
          </div>
          <div className={css.priceCardContainer}>
            {report?.sold ? (
              <div className={css.soldInfoContainer}>
                <div className={css.titleContainer}>
                  <div className={css.iconContainer}>
                    <InfoIcon />
                  </div>
                  <div className={css.title}>Объект продан</div>
                </div>
                <div className={css.subtitle}>
                  Этот объект уже продан, но мы можем вам рассказать про
                  аналогичные объекты, которые сейчас есть на рынке
                </div>
              </div>
            ) : (
              <>
                {report?.bargaining && !report.sold && (
                  <div className={css.tagContainer}>
                    <Tag tag={TagEnum.ReadyToTrade} size="small" />
                  </div>
                )}
                <div className={css.priceContainer}>
                  <span className={css.price}>{price} ₽</span>
                  <span className={css.pricePerMeter}>
                    {pricePerMeter && (
                      <>
                        {!isSmallDesktop && <>&nbsp;/&nbsp;</>}
                        {pricePerMeter} ₽ за м²
                      </>
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default GeneralInfo;
