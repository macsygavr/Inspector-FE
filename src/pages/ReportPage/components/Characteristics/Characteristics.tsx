import React, { FC } from "react";
import css from "./index.module.css";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import DetailedInfo from "./components/DetailedInfo/DetailedInfo";
import useCustomMediaQuery from "../../../../hooks/useCustomMediaQuery";
import ContactButton from "../../../../components/ContactButton/ContactButton";
import { ReportData } from "../../../../api/reportsApi";

type Props = {
  report?: ReportData;
  skeletonMode?: boolean;
  price?: string;
  pricePerMeter?: string | null;
};

const Characteristics: FC<Props> = ({ report, skeletonMode, price, pricePerMeter }) => {
  const isSmallScreen = useCustomMediaQuery("(max-width: 768px)");

  return (
    <div className={css.container}>
      {!isSmallScreen && (
        <>
          <GeneralInfo report={report} skeletonMode={skeletonMode} price={price} pricePerMeter={pricePerMeter} />
          <ContactButton
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
            skeletonMode={skeletonMode}
            className={css.button}
            isSoldButton={report?.sold}
          />
        </>
      )}
      <DetailedInfo report={report} skeletonMode={skeletonMode} />
    </div>
  );
};

export default Characteristics;
