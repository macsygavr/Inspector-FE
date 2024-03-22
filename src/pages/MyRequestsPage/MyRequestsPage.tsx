import React, { FC, useEffect, useState } from "react";
import Button from "../../components/UiKit/Button/Button";
import RevizorOnChair from "../../assets/Icons/RevizorOnChair";
import FreeIcon from "../../assets/Icons/FreeIcon";
import HalfHouse from "../../assets/Icons/HalfHouse";
import ClocksFast from "../../assets/Icons/ClocksFast";
import LocationOnMapIcon from "../../assets/Icons/LocationOnMapIcon";
import ReportCard from "../../components/ReportCard/ReportCard";
import css from "./index.module.css";
import OfferCard from "./components/OfferCard/OfferCard";
import HowItWorksCard from "./components/HowItWorksCard/HowItWorksCard";
import MyRequests from "./components/MyRequests/MyRequests";
import { useRouter } from "next/router";
import { PublicRoutes } from "../../routes";
import MakeRequestButton from "../../components/MakeRequestButton/MakeRequestButton";
import { useProfileContext } from "../../contexts/ProfileContext";
import { getAllRequests } from "../../api/requestApi";
import { transformStatusToEnum } from "./components/helpers";
import { RequestRowType } from "./components/MyRequests/components/RequestRow/RequestRow";
import { useQuery } from "react-query";
import { ReportData, getReports } from "../../api/reportsApi";
import { getMockArrayForSkeletons, getMockFilters } from "../../lib/helpers";

const MyRequestsPage: FC = () => {
  const router = useRouter();
  const [allRequests, setAllRequests] = useState<RequestRowType[]>([]);
  const [offerReports, setOfferReports] = useState<ReportData[]>([]);

  const { isAuthorized } = useProfileContext();

  const showMyRequestsBlock = isAuthorized && allRequests?.length > 0;

  const { data: allRequestsData } = useQuery("allRequests", getAllRequests, {
    enabled: isAuthorized,
    refetchOnMount: "always",
  });

  const { data: offerReportsData, isFetching } = useQuery("offerReports", () =>
    getReports({
      pageNumber: 0,
      pageSize: 8,
      filters: getMockFilters(),
    })
  );

  useEffect(() => {
    if (allRequestsData) {
      const modifiedData = allRequestsData?.map((item) => ({
        id: String(item.offer_id),
        date: item.createdAt,
        status: transformStatusToEnum(item.status),
        url: item.user_link,
        reason: item.reason ?? "",
      }));
      setAllRequests(modifiedData);
    }
  }, [allRequestsData]);

  useEffect(() => {
    if (offerReportsData) {
      setOfferReports(offerReportsData.list);
    }
  }, [offerReportsData]);

  return (
    <>
      <div className={css.offerContainer}>
        {showMyRequestsBlock ? (
          <MyRequests requests={allRequests} />
        ) : (
          <>
            <div className={css.offerHeadBlock}>
              <div className={css.offerTextContainer}>
                <span className={css.offerTitle}>
                  Получите независимый отчет от наших инспекторов
                </span>
                <span className={css.offerSubTitle}>
                  Отправьте нам ссылку с любого онлайн сервиса с объявлениями
                  недвижимости и мы подготовим отчет об объекте
                </span>
                <MakeRequestButton
                  variant="primary"
                  className={css.offerButton}
                />
              </div>
              <div className={css.revizorIconContainer}>
                <RevizorOnChair />
              </div>
            </div>
            <div className={css.offerInfoCardsContainer}>
              <OfferCard
                icon={<FreeIcon />}
                title="Услуга бесплатна"
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
          </>
        )}
      </div>
      <div className={css.howItWorksContainer}>
        <span className={css.blockTitle}>Как это работает?</span>
        <div className={css.howItWorksCardsContainer}>
          <HowItWorksCard
            step={1}
            title="Отправьте заявку"
            innerImgSrc={"/img/step1.jpeg"}
            description="Прикрепите ссылку на объект с сайта, где он выставлен на продажу (Например, Авито)"
          />
          <HowItWorksCard
            step={2}
            title="Ожидайте проверки"
            innerImgSrc={"/img/step2.jpeg"}
            description="Формирование отчета занимает от 2 до 7 дней. За раз можно проверить один объект"
          />
          <HowItWorksCard
            step={3}
            title="Готово! Ознакомьтесь с отчетом"
            innerImgSrc={"/img/step3.jpeg"}
            description="После проверки вы сможете ознакомиться с отчетом, он будет выложен в общий доступ"
          />
        </div>
      </div>
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
      </div>
    </>
  );
};

export default MyRequestsPage;
