import React, { FC, useEffect } from "react";
import css from "./index.module.css";
import ModalCloseIcon from "../../../../assets/Icons/ModalCloseIcon";
import { ReportData } from "../../../../api/reportsApi";
import ReportCard from "../../../../components/ReportCard/ReportCard";
import SkeletonRow from "../../../../components/UiKit/SkeletonRow/SkeletonRow";
import { getCardsModalTitle } from "./helpers";
import cn from "classnames";
import useCustomMediaQuery from "../../../../hooks/useCustomMediaQuery";

type Props = {
  reports?: ReportData[];
  skeletonCardMode?: boolean;
  onCancel?: () => void;
  wrapperClassName?: string;
  containerClassName?: string;
};

const CardsModal: FC<Props> = ({
  reports,
  skeletonCardMode,
  wrapperClassName,
  containerClassName,
  onCancel,
}) => {
  const isMobile = useCustomMediaQuery("(max-width: 462px)");

  useEffect(() => {
    const body = document.body;
    if (isMobile) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
    const mapContainer = document.getElementById("mapContainer");
    mapContainer?.scrollIntoView({
      block: "center",
    });
  }, [isMobile, reports]);

  return (
    <div className={cn(css.wrapper, wrapperClassName)}>
      <div className={cn(css.container, containerClassName)}>
        <div className={css.header}>
          <div className={css.headerText}>
            {skeletonCardMode ? (
              <SkeletonRow
                style={{
                  height: "24px",
                  width: "100px",
                  borderRadius: "16px",
                }}
              />
            ) : (
              `${getCardsModalTitle(String(reports?.length))}`
            )}
          </div>
          <button className={css.closeIcon} onClick={onCancel}>
            <ModalCloseIcon />
          </button>
        </div>
        <div className={css.cardsContainer}>
          {reports?.map((item, index) => (
            <ReportCard
              key={`${item.id}-${index}`}
              report={item}
              skeletonMode={skeletonCardMode}
              withCallMeBtn
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsModal;
