import React, { FC, useState } from "react";
import Carousel from "./components/Carousel/Carousel";
import Report from "./components/Report/Report";
import Characteristics from "./components/Characteristics/Characteristics";
import GeneralInfo from "./components/Characteristics/components/GeneralInfo/GeneralInfo";
import Tabs from "../../components/UiKit/Tabs/Tabs";
import css from "./index.module.css";
import ContactButton from "../../components/ContactButton/ContactButton";
import { ImageType, ReportData } from "../../api/reportsApi";
import useCustomMediaQuery from "../../hooks/useCustomMediaQuery";
import cn from "classnames";

type Props = {
  ssrReport?: ReportData;
  price?: string;
  pricePerMeter?: string | null;
  imagesForCarousel?: ImageType[];
};

enum TabsEnum {
  Report = "Отчет",
  Characteristics = "Параметры",
}

const ReportPage: FC<Props> = ({
  ssrReport: report,
  price,
  pricePerMeter,
  imagesForCarousel,
}) => {
  const isMobile = useCustomMediaQuery("(max-width: 768px)");
  const [activeTab, setActiveTab] = useState(TabsEnum.Report);

  const isSkeletonMode = !report;

  return (
    <>
      {isMobile ? (
        <div className={css.smallContainer}>
          <Carousel
            report={report}
            skeletonMode={isSkeletonMode}
            imagesForCarousel={imagesForCarousel}
          />
          <GeneralInfo
            report={report}
            skeletonMode={isSkeletonMode}
            price={price}
            pricePerMeter={pricePerMeter}
          />
          <div className={css.hr} />
          <Tabs
            className={css.tabs}
            type={"card"}
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as TabsEnum)}
            items={[
              {
                key: "Отчет",
                label: "Отчет",
              },
              {
                key: "Параметры",
                label: "Параметры",
              },
            ]}
          />
          <div
            className={cn(
              css.hidden,
              activeTab === TabsEnum.Report && css.visible
            )}
          >
            <Report report={report} skeletonMode={isSkeletonMode} />
          </div>
          <div
            className={cn(
              css.hidden,
              activeTab === TabsEnum.Characteristics && css.visible
            )}
          >
            <Characteristics
              report={report}
              skeletonMode={isSkeletonMode}
              price={price}
              pricePerMeter={pricePerMeter}
            />
          </div>
          <div className={css.buttonContainer}>
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
              skeletonMode={isSkeletonMode}
              className={css.button}
              isSoldButton={report?.sold}
            />
          </div>
        </div>
      ) : (
        <div className={css.bigContainer}>
          <div className={css.leftBlock}>
            <Carousel
              report={report}
              skeletonMode={isSkeletonMode}
              imagesForCarousel={imagesForCarousel}
            />
            <Report report={report} skeletonMode={isSkeletonMode} />
          </div>
          <div className={css.rightBlock}>
            <Characteristics
              report={report}
              skeletonMode={isSkeletonMode}
              price={price}
              pricePerMeter={pricePerMeter}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReportPage;
