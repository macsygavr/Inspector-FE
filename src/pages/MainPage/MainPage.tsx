import React, { FC, useEffect, useState } from "react";
import Button from "../../components/UiKit/Button/Button";
import FreeIcon from "../../assets/Icons/FreeIcon";
import HalfHouse from "../../assets/Icons/HalfHouse";
import ClocksFast from "../../assets/Icons/ClocksFast";
import LocationOnMapIcon from "../../assets/Icons/LocationOnMapIcon";
import ReportCard from "../../components/ReportCard/ReportCard";
import css from "./index.module.css";
import OfferCard from "../MyRequestsPage/components/OfferCard/OfferCard";
import RevizorWithHouse from "../../assets/Icons/RevizorWithHouse";
import СonsultationBlock from "./components/СonsultationBlock/СonsultationBlock";
import CheckObject from "./components/CheckObject/CheckObject";
import AnimationBlock from "./components/AnimationBlock/AnimationBlock";
import { PublicRoutes } from "../../routes";
import { useRouter } from "next/router";
import MakeRequestButton from "../../components/MakeRequestButton/MakeRequestButton";
import { useQuery } from "react-query";
import { ReportData, getReports } from "../../api/reportsApi";
import { getMockArrayForSkeletons, getMockFilters } from "../../lib/helpers";

const MainPage: FC = ({}) => {
  const router = useRouter();
  const [offerReports, setOfferReports] = useState<ReportData[]>([]);

  const { data, isFetching } = useQuery("offerReports", () =>
    getReports({
      pageNumber: 0,
      pageSize: 8,
      filters: getMockFilters(),
    })
  );

  useEffect(() => {
    if (data) {
      setOfferReports(data.list);
    }
  }, [data]);

  return (
    <>
      <div className={css.offerContainer}>
        <div className={css.offerHeadBlock}>
          <div className={css.offerTextContainer}>
            <span className={css.offerTitle}>
              Инспектор. Недвижимость - сервис с проверенными квартирами
            </span>
            <span className={css.offerSubTitle}>
              Узнайте о потенциальных рисках до сделки не выходя из дома.
              Доверьте команде Инспектора проверку интересующей вас квартиры
            </span>
            <MakeRequestButton variant="primary" className={css.offerButton} />
          </div>
          <div className={css.revizorIconContainer}>
            <RevizorWithHouse />
          </div>
        </div>
        <div className={css.offerInfoCardsContainer}>
          <OfferCard
            icon={<FreeIcon />}
            title="Отчет бесплатный"
            subtitle="Отчет появится в общем списке объектов"
          />
          <OfferCard
            icon={<HalfHouse />}
            title="2 типа объектов"
            subtitle="Мы проверяем только квартиры и апартаменты"
          />
          <OfferCard
            icon={<ClocksFast />}
            title="От 2 до 7 дней"
            subtitle="Формирование отчета занимает от 2 до 7 дней"
          />
          <OfferCard
            icon={<LocationOnMapIcon />}
            title="Работаем в 4 городах"
            subtitle="Москва, Санкт-Петербург, Ростов-на-Дону, Сочи"
          />
        </div>
      </div>
      <div className={css.blockTitle} style={{ marginTop: "48px" }}>
        4 особенности отчета от сервиса Инспектор
      </div>
      <AnimationBlock />
      <CheckObject />
      <div className={css.checkedObjectsContainer}>
        <span className={css.blockTitle}>Уже проверенные объекты</span>
        <div className={css.cardsContainer}>
          {!isFetching &&
            offerReports?.map((item) => (
              <ReportCard report={item} key={item.id} />
            ))}
          {isFetching &&
            getMockArrayForSkeletons(8)?.map((_, index) => (
              <ReportCard key={index} skeletonMode />
            ))}
        </div>
        <Button
          onClick={() => router.push(PublicRoutes.ALL_REPORTS.static)}
          className={css.allObjectsBtn}
          variant="ghost"
        >
          Смотреть все
        </Button>
        <СonsultationBlock />
      </div>
    </>
  );
};

export default MainPage;
